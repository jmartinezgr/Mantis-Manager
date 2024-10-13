from datetime import timedelta, datetime
from sqlalchemy import case

from typing import List
from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import JSONResponse
from sqlalchemy import func
from sqlalchemy.orm import Session
from fastapi.security import HTTPBearer
from config.db import get_db
from models.ticket_model import Ticket
from models.machine_model import Machine 
from models.user_model import User, Role
from schemas.ticket_schema import TicketCreate, TicketData, TicketAssign, TicketStateUpdate

bearer_scheme = HTTPBearer()

# Crear un router para los tickets
ticket_router = APIRouter(tags=["Tickets"])

# Crear un ticket (POST)
@ticket_router.post(
    "/ticket",
    summary="",
    response_model=TicketData
)
async def create_ticket(
    request: Request = None,
    ticket: TicketCreate = None,
    db: Session = Depends(get_db),
    dependencies = Depends(HTTPBearer())
):
    """
    Crea un nuevo ticket con el estado predeterminado 'pendiente'.
    
    Parámetros:
    - ticket: Los datos del ticket a crear, descripción, serial de la máquina a la que 
      pertenece el ticket y prioridad (description, machine, priority).
    - db: Sesión de la base de datos. (Dependencia)
    
    Retorna:
    - Datos del ticket creado.
    """
    # Verificar si la máquina existe en la base de datos
    machine = db.query(Machine).filter(Machine.serial == ticket.machine).first()
    if not machine:
        raise HTTPException(status_code=404, detail="La máquina con el serial proporcionado no existe.")

    # Obtener el ID del usuario desde el token
    user_info = request.state.user  # Asegúrate de que tu middleware de autenticación coloca esta información
    user_id = user_info.get("sub")
    
    # Validar que el usuario existe en la base de datos
    creator = db.query(User).filter(User.id == user_id).first()
    if not creator:
        raise HTTPException(status_code=404, detail="Usuario creador no encontrado.")

    # Establecer el deadline basado en la prioridad
    priority_deadlines = {
        'baja': timedelta(weeks=1),
        'media': timedelta(days=3),
        'alta': timedelta(days=1)
    }

    if ticket.priority not in priority_deadlines:
        raise HTTPException(status_code=404, detail="Prioridad no válida.")

    # Calcular el deadline según la prioridad
    deadline = datetime.now() + priority_deadlines[ticket.priority]
    
    # Crear el ticket si la máquina existe
    new_ticket = Ticket(
        description=ticket.description,
        state="pendiente",  
        machine_id=machine.id,
        priority=ticket.priority,
        created_by=user_id,  # Asignar el creador desde el token
        created_at=func.now(),  # Usar SQLAlchemy para la fecha/hora actual
        deadline=deadline
    )

    db.add(new_ticket)
    db.commit()
    db.refresh(new_ticket)
    
    # Retornar la información del ticket creado
    return TicketData(
        id=new_ticket.id,
        description=new_ticket.description,
        state=new_ticket.state,
        priority=new_ticket.priority,  
        machine_serial=machine.serial,  
        created_by=creator.id,
        assigned_to=new_ticket.assigned_to,  
        created_at=new_ticket.created_at,
        deadline=new_ticket.deadline
    )

@ticket_router.get("/tickets/{ticket_id}", response_model=TicketData)
async def get_ticket(ticket_id: int, db: Session = Depends(get_db), dependencies=Depends(bearer_scheme)):
    """
    Obtiene un ticket por su ID.
    
    Parámetros:
    - ticket_id: ID del ticket a buscar.
    
    Retorna:
    - Datos del ticket encontrado.
    """
    # Unimos el ticket con la máquina y los usuarios (creador y asignado) para obtener la información necesaria
    ticket = db.query(Ticket, User).join(Ticket.machine).join(User, Ticket.created_by == User.id).filter(Ticket.id == ticket_id).first()

    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket no encontrado")

    ticket_info, creator = ticket

    # Obtener el nombre completo del creador del ticket
    created_by_name = f"{creator.first_name} {creator.last_name}"

    # Obtener el nombre completo de la persona asignada (si existe)
    assigned_to_name = None
    if ticket_info.assigned_to:
        assigned_user = db.query(User).filter(User.id == ticket_info.assigned_to).first()
        if assigned_user:
            assigned_to_name = f"{assigned_user.first_name} {assigned_user.last_name}"

    # Devolver la respuesta con los nombres completos en lugar de los IDs
    return TicketData(
        id=ticket_info.id,
        description=ticket_info.description,
        state=ticket_info.state,
        priority=ticket_info.priority,
        machine_serial=ticket_info.machine.serial,
        created_by=created_by_name,  # Nombre completo del creador
        assigned_to=assigned_to_name,  # Nombre completo del asignado (si existe)
        created_at=ticket_info.created_at,
        deadline=ticket_info.deadline
    )

@ticket_router.patch("/tickets/{ticket_id}/self_assign", response_model=TicketData)
async def self_assign(ticket_id: int, request: Request, db: Session = Depends(get_db)):
    """
    Asigna el ticket al usuario autenticado.
    
    Parámetros:
    - ticket_id: ID del ticket a editar
    - db: Sesión de la base de datos. (Dependencia)1

    Retorna:
    - Información del ticket actualizado.
    """
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()

    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket no encontrado")

    user_info = request.state.user  
    user_id = user_info.get("sub")  # ID del usuario que envía la solicitud

    # Buscar al usuario autenticado
    employer = db.query(User).filter(User.id == user_id).first()

    if not employer:
        raise HTTPException(status_code=404, detail="Usuario autenticado no encontrado")

    # Verificar si el usuario tiene el rol correcto
    role = db.query(Role).filter(Role.id == employer.role_id).first()

    if role.name != "Operario de Mantenimiento":
        raise HTTPException(status_code=400, detail="El usuario no es un Operario de Mantenimiento")

    # Cambiar el estado a "asignado" si está pendiente
    if ticket.state == "pendiente":
        ticket.state = "asignado"

    ticket.assigned_to = employer.id
    db.commit()
    db.refresh(ticket)

    created_by_name = f"{db.query(User).filter(User.id == ticket.created_by).first().first_name} {db.query(User).filter(User.id == ticket.created_by).first().last_name}"

    return TicketData(
        id=ticket.id,
        description=ticket.description,
        state=ticket.state,
        priority=ticket.priority,
        machine_serial=ticket.machine.serial,
        created_by=created_by_name,
        assigned_to=f"{employer.first_name} {employer.last_name}",
        created_at=ticket.created_at,
        deadline=ticket.deadline
    )



@ticket_router.patch("/tickets/{ticket_id}/assign", response_model=TicketData)
async def assign_ticket(ticket_id: int, ticket_assign: TicketAssign, db: Session = Depends(get_db)):
    """
    Operario de Mantenimeinto o Jefe de Mantenimiento asigna o cede un ticket a un operario de mantenimiento.
    
    Parámetros:
    - ticket_id: ID del ticket a editar
    - ticket_assign: el id de la persona a la cual se le asiganara el ticket (assigned_to).
    - db: Sesión de la base de datos. (Dependencia)
    
    Retorna:
    - Información del ticket actualizado.
    """
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()

    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket no encontrado")

    # Buscar al usuario que será asignado
    employer = db.query(User).filter(User.id == ticket_assign.assigned_to).first()

    if not employer:
        raise HTTPException(status_code=404, detail="Usuario asignado no encontrado")

    # Verificar si el usuario asignado tiene el rol correcto
    role = db.query(Role).filter(Role.id == employer.role_id).first()

    if role.name != "Operario de Mantenimiento":
        raise HTTPException(status_code=400, detail="El usuario no es un Operario de Mantenimiento")

    # Cambiar el estado a "asignado" si está pendiente
    if ticket.state == "pendiente":
        ticket.state = "asignado"

    ticket.assigned_to = employer.id
    db.commit()
    db.refresh(ticket)

    # Obtener el nombre completo del creador del ticket
    creator = db.query(User).filter(User.id == ticket.created_by).first()
    if not creator:
        raise HTTPException(status_code=404, detail="Creador del ticket no encontrado")

    created_by_name = f"{creator.first_name} {creator.last_name}"

    # Obtener el nombre completo de la persona asignada
    assigned_to_name = f"{employer.first_name} {employer.last_name}"

    return TicketData(
        id=ticket.id,
        description=ticket.description,
        state=ticket.state,
        priority=ticket.priority,
        machine_serial=ticket.machine.serial,
        created_by=created_by_name,  # Nombre completo del creador
        assigned_to=assigned_to_name,  # Nombre completo del asignado
        created_at=ticket.created_at,
        deadline=ticket.deadline
    )

@ticket_router.patch("/tickets/{ticket_id}/state", response_model=TicketData)
async def change_ticket_state(ticket_id: int, ticket_update: TicketStateUpdate, db: Session = Depends(get_db)):
    """
    Cambia el estado de un ticket (a excepción de finalizado o en caso de que ya esté finalizado) 

    Parámetros:
    - ticket_id: ID del ticket a editar
    - ticket_update: el estado al cual va a cambiar el ticket (state).
    - db: Sesión de la base de datos. (Dependencia)
    
    Retorna:
    - Información del ticket actualizado.
    """
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()

    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket no encontrado")

    if ticket_update.state not in ["asignado", "en proceso", "pendiente"]:
        raise HTTPException(status_code=400, detail="Estado no válido para cambio directo.")

    # Actualizar el estado del ticket
    ticket.state = ticket_update.state
    db.commit()
    db.refresh(ticket)

    # Obtener el nombre completo del creador del ticket
    creator = db.query(User).filter(User.id == ticket.created_by).first()
    if not creator:
        raise HTTPException(status_code=404, detail="Creador del ticket no encontrado")

    created_by_name = f"{creator.first_name} {creator.last_name}"

    # Obtener el nombre completo de la persona asignada, si está asignado
    assigned_to_name = None
    if ticket.assigned_to:
        assigned_user = db.query(User).filter(User.id == ticket.assigned_to).first()
        if assigned_user:
            assigned_to_name = f"{assigned_user.first_name} {assigned_user.last_name}"

    return TicketData(
        id=ticket.id,
        description=ticket.description,
        state=ticket.state,
        priority=ticket.priority,
        machine_serial=ticket.machine.serial,
        created_by=created_by_name,  # Nombre completo del creador
        assigned_to=assigned_to_name,  # Nombre completo del asignado, si existe
        created_at=ticket.created_at,
        deadline=ticket.deadline
    )


@ticket_router.get("/finalizado", response_model=List[TicketData])
async def get_finalized_tickets(db: Session = Depends(get_db), dependencies=Depends(bearer_scheme)):
    """
    Obtiene todos los tickets de estado "finalizado" con sus datos.
    
    Parámetros:
    - db: Sesión de la base de datos. (Dependencia)
    
    Retorna:
    - Una lista de tickets con estado 'finalizado'.
    """
    # Consultar los tickets con estado "finalizado"
    tickets = db.query(Ticket).filter(Ticket.state == "finalizado").all()
    
    if not tickets:
        raise HTTPException(status_code=404, detail="No se encontraron tickets con estado 'finalizado'.")
    
    # Devolver los tickets filtrados con los nombres completos
    return [
        TicketData(
            id=ticket.id,
            description=ticket.description,
            state=ticket.state,
            priority=ticket.priority,
            machine_serial=ticket.machine.serial,
            created_by=f"{db.query(User).filter(User.id == ticket.created_by).first().first_name} {db.query(User).filter(User.id == ticket.created_by).first().last_name}",  # Nombre completo del creador
            assigned_to=(f"{db.query(User).filter(User.id == ticket.assigned_to).first().first_name} {db.query(User).filter(User.id == ticket.assigned_to).first().last_name}" if ticket.assigned_to else None),  # Nombre completo del asignado si existe
            created_at=ticket.created_at,
            deadline=ticket.deadline
        )
        for ticket in tickets
    ]

@ticket_router.get("/seguimiento", response_model=List[TicketData])
async def get_my_tickets(request: Request, db: Session = Depends(get_db), dependencies=Depends(bearer_scheme)):
    """
    Obtiene todos los tickets creados por el usuario autenticado.
    
    Parámetros:.
    - db: Sesión de la base de datos. (Dependencia)
    
    Retorna:
    - Una lista de tickets creados por el usuario autenticado.

    """
    # Extraer el ID del usuario autenticado desde el token
    user_info = request.state.user  
    user_id = user_info.get("sub")  
    
    if not user_id:
        raise HTTPException(status_code=401, detail="Problema con la autenticacion de usuario.")
    
    # Consultar los tickets creados por el usuario autenticado
    tickets = db.query(Ticket).filter(Ticket.created_by == user_id).all()
    
    if not tickets:
        raise HTTPException(status_code=404, detail="No has creado ningún ticket.")
    
    # Devolver los tickets con los nombres completos
    return [
        TicketData(
            id=ticket.id,
            description=ticket.description,
            state=ticket.state,
            priority=ticket.priority,
            machine_serial=ticket.machine.serial,
            created_by=f"{db.query(User).filter(User.id == ticket.created_by).first().first_name} {db.query(User).filter(User.id == ticket.created_by).first().last_name}",  # Nombre completo del creador
            assigned_to=(f"{db.query(User).filter(User.id == ticket.assigned_to).first().first_name} {db.query(User).filter(User.id == ticket.assigned_to).first().last_name}" if ticket.assigned_to else None),  # Nombre completo del asignado si existe
            created_at=ticket.created_at,
            deadline=ticket.deadline
        )
        for ticket in tickets
    ]


@ticket_router.get("/my-tickets", response_model=List[TicketData])
async def get_assigned_tickets(request: Request, db: Session = Depends(get_db), dependencies=Depends(bearer_scheme)):
    """
    Obtiene todos los tickets asignados al usuario autenticado, ordenados por prioridad
    y antigüedad.
    
    Orden:
    - Primero los de prioridad 'alta', luego 'media', luego 'baja', y por último los 'finalizados'.
    - Dentro de cada grupo, de los más antiguos a los más nuevos.
    """
    # Extraer el ID del usuario autenticado desde el token
    user_info = request.state.user  
    user_id = user_info.get("sub")  
    
    if not user_id:
        raise HTTPException(status_code=401, detail="Problema con la autenticacion de usuario.")
    
    # Consultar los tickets asignados al usuario autenticado y ordenarlos según estado, prioridad y fecha de creación
    
    tickets = db.query(Ticket).filter(Ticket.assigned_to == user_id).order_by(
        # Primero los tickets que no están finalizados, luego los finalizados
        case(
            (Ticket.state != 'finalizado', 1),
            else_=2  # Los tickets finalizados tienen menor prioridad en el orden
        ).asc(),
        # Luego dentro de los que no están finalizados, se ordenan por prioridad
        case(
            (Ticket.priority == 'alta', 1),
            (Ticket.priority == 'media', 2),
            (Ticket.priority == 'baja', 3),
            else_=4  # En caso de otros valores
        ).asc(),
        # Finalmente, ordenamos por la fecha de creación para cada grupo
        Ticket.created_at.asc()
    ).all()
    
    if not tickets:
        raise HTTPException(status_code=404, detail="No tienes tickets asignados.")
    
    # Devolver los tickets con los nombres completos
    return [
        TicketData(
            id=ticket.id,
            description=ticket.description,
            state=ticket.state,
            priority=ticket.priority,
            machine_serial=ticket.machine.serial,
            created_by=f"{db.query(User).filter(User.id == ticket.created_by).first().first_name} {db.query(User).filter(User.id == ticket.created_by).first().last_name}",
            assigned_to=f"{db.query(User).filter(User.id == ticket.assigned_to).first().first_name} {db.query(User).filter(User.id == ticket.assigned_to).first().last_name}" if ticket.assigned_to else None,
            created_at=ticket.created_at,
            deadline=ticket.deadline
        )
        for ticket in tickets
    ]