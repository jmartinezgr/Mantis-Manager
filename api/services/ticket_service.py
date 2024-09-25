from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from models import Ticket

def actualizar_prioridad_y_deadline(db: Session):
    """
    actualizar la prioridad de un ticket.
    """

    tickets_vencidos = db.query(Ticket).filter(
        Ticket.deadline < datetime.now(),
        Ticket.state != 'finalizado'
    ).all()

    #print(f"Tickets vencidos: {len(tickets_vencidos)}")
    for ticket in tickets_vencidos:
        if ticket.priority == 'baja':
            ticket.priority = 'media'
            ticket.deadline = datetime.now() + timedelta(days=3) 
        elif ticket.priority == 'media':
            ticket.priority = 'alta'
            ticket.deadline = datetime.now() + timedelta(days=1)
        elif ticket.priority == 'alta':
            #aqui se podria enviar una notificacion a la persona que tenga asignado el ticket o algo xd
            pass
        

        ticket.created_at = datetime.now()
        
        db.commit()
        db.refresh(ticket)
