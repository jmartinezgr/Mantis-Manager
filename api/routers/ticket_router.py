from datetime import timedelta, datetime
from sqlalchemy import case

from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Request, Path,Query
from fastapi.responses import JSONResponse
from sqlalchemy import func
from sqlalchemy.orm import Session
from fastapi.security import HTTPBearer

from config.db import get_db
from models.ticket_model import Ticket
from models.machine_model import Machine 
from models.user_model import User, Role
from schemas.ticket_schema import TicketCreate, TicketData, TicketAssign, TicketStateUpdate, TicketResponse, TicketSearchResponse

bearer_scheme = HTTPBearer()

# Crear un router para los tickets
ticket_router = APIRouter(tags=["Tickets"])

# Crear un ticket (POST)
@ticket_router.post(
    "/ticket",
    summary="Crear un ticket como solicitud de revision",
    description="Solicitar una revisión de una maquina a traves de un ticket",
    response_model=TicketResponse
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
        ticket: Los datos del ticket a crear, descripción, id de la máquina a la que 
            pertenece el ticket y prioridad (description, machine, priority).
    
    Retorna:
        Datos del ticket creado.
    """
    # Verificar si la máquina existe en la base de datos
    machine = db.query(Machine).filter(Machine.id == ticket.machine).first()
    if not machine:
        raise HTTPException(status_code=404, detail="La máquina con el serial proporcionado no existe.")

    user_info = request.state.user  
    user_id = user_info.get("sub")
    
    # Validar que el usuario existe en la base de datos
    creator = db.query(User).filter(User.id == user_id).first()
    if not creator:
        raise HTTPException(status_code=404, detail="Usuario creador no encontrado.")


    priority_deadlines = {
        'baja': timedelta(weeks=1),
        'media': timedelta(days=3),
        'alta': timedelta(days=1)
    }

    if ticket.priority not in priority_deadlines:
        raise HTTPException(status_code=400, detail="Prioridad no válida.")

    # Calcular el deadline según la prioridad
    deadline = datetime.now() + priority_deadlines[ticket.priority]
    
    # Crear el ticket si la máquina existe
    new_ticket = Ticket(
        description=ticket.description,
        state="pendiente",  
        machine_id=machine.id,
        priority=ticket.priority,
        created_by=user_id,
        created_at=func.now(), 
        deadline=deadline
    )

    db.add(new_ticket)
    db.commit()
    db.refresh(new_ticket)
    
    # Retornar la información del ticket creado
    return TicketResponse(
        id=new_ticket.id,
        description=new_ticket.description,
        state=new_ticket.state,
        created_at=new_ticket.created_at,
        priority=new_ticket.priority, 
        deadline=new_ticket.deadline,
        machine_id=machine.id,  
        created_by=creator.id
    )

@ticket_router.get(
    "/tickets/{ticket_id}", 
    summary="Obtener un ticket por su ID",
    description="Obtener la información de un ticket por su ID",
    response_model=TicketSearchResponse
)
async def get_ticket(
    ticket_id: int = Path(..., title="ID del ticket a buscar"), 
    db: Session = Depends(get_db), 
    dependencies=Depends(bearer_scheme)
):
    """
    Obtiene un ticket por su ID, incluyendo los nombres completos y los IDs de las personas involucradas.
    """
    # Unimos el ticket con la máquina y los usuarios (creador y asignado) para obtener la información necesaria
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()

    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket no encontrado")

    # Obtener el creador del ticket
    creator = db.query(User).filter(User.id == ticket.created_by).first()
    if not creator:
        raise HTTPException(status_code=404, detail="Usuario creador no encontrado")
    created_by_name = f"{creator.first_name} {creator.last_name}"

    # Obtener el usuario asignado (si existe)
    assigned_to_name = None
    assigned_to_id = None
    if ticket.assigned_to:
        assigned_user = db.query(User).filter(User.id == ticket.assigned_to).first()
        if assigned_user:
            assigned_to_name = f"{assigned_user.first_name} {assigned_user.last_name}"
            assigned_to_id = assigned_user.id

    # Devolver la respuesta con los nombres completos y los IDs
    return TicketSearchResponse(
        id=ticket.id,
        description=ticket.description,
        state=ticket.state,
        priority=ticket.priority,
        machine_serial=ticket.machine.serial,
        created_by_id=creator.id, 
        created_by_name=created_by_name,  
        assigned_to_id=assigned_to_id, 
        assigned_to_name=assigned_to_name, 
        created_at=ticket.created_at,
        deadline=ticket.deadline
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

@ticket_router.patch(
    "/tickets/assing/{ticket_id}",
    summary="Asignar un responsable a un ticket",
    description="Puede autoasignarse el ticket o asignarlo a otra persona si es un jefe de mantenimiento"
)
async def assign_ticket(
    req : Request,
    ticket_id : str = Path(..., title="ID del ticket a asignar"),
    user_id: Optional[str] = Query(None, title="Usuario al que se le asigna el ticket"), 
    db: Session = Depends(get_db),
    token: str = Depends(bearer_scheme)
):
    """
    Asignar un responsable de atencion del ticket:
    Si se omite el parametro user_id se autoasigna la responsabilidad del ticket,
    si no es omitido se verifica que el usuario sea un jefe de mantenimiento, que es el
    unico con el poder de asignarle un ticket a otro usuario.
    
    Parámetros:
        ticket_id: ID del ticket a editar
        user_id: el id de la persona a la cual se le asiganara el ticket (assigned_to).
    
    
    Retorna:
       Información del ticket actualizado.
    """
    
    user_to_assing = None
    
    if user_id  != None:
        aux_user = req.state.user
        
        if aux_user.get("scopes") != 4:
            raise HTTPException(status_code=400,detail="No tienes permiso para realizar esta accion (No eres jefe de mantenimiento)")
        user_to_assing = user_id
    else:
        user_to_assing = req.state.user.get("sub")
        
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket no encontrado")
    
    user = db.query(User).filter(User.id == user_to_assing).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="Usuario al que se le asignara el ticket no encontrado")
    
    ticket.assigned_to = user.id
    db.commit()
    db.refresh(ticket)
    
    return  TicketSearchResponse(
        id=ticket.id,
        description=ticket.description,
        state=ticket.state,
        priority=ticket.priority,
        created_by_id= ticket.created_by,
        assigned_to_id= ticket.assigned_to,
        created_at=ticket.created_at,
    )

@ticket_router.patch("/tickets/{ticket_id}/assign", response_model=TicketData)
async def assign_ticket1(ticket_id: int, ticket_assign: TicketAssign, db: Session = Depends(get_db)):
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
        created_by=created_by_name,
        assigned_to=assigned_to_name, 
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