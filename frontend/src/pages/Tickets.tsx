import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import BackButton from '../components/BackButton'
import TicketItem from '../features/tickets/components/TicketItem'
import { getAllTicketsAsync } from '../features/tickets/ticketSlice'

const Tickets: React.FC = () => {
  const { tickets } = useAppSelector((state) => state.tickets)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllTicketsAsync()).unwrap().catch(toast.error)
  }, [dispatch])

  return (
    <>
      <BackButton />
      <h1>Tickets</h1>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets.map((ticket) => (
          <TicketItem key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </>
  )
}

export default Tickets
