import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import Modal, { Styles } from 'react-modal'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import NoteItem from '../features/notes/components/NoteItem'
import { createNoteAsync, getNotesAsync } from '../features/notes/noteSlice'
import {
  closeTicketAsync,
  getTicketAsync
} from '../features/tickets/ticketSlice'
import { UrlPrms } from '../utils/utils'

const customStyles: Styles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative'
  }
}

Modal.setAppElement('#root')

const Ticket: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [noteText, setNoteText] = useState('')

  const { ticketId } = useParams<UrlPrms>()

  const { ticket, status: ticketStatus } = useAppSelector(
    (state) => state.tickets
  )
  const { notes, status: noteStatus } = useAppSelector((state) => state.notes)
  const dispatch = useAppDispatch()

  const naviate = useNavigate()

  const onTicketClose: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    dispatch(closeTicketAsync(ticketId))
      .unwrap()
      .then(() => {
        toast.success('Ticket Closed')
        naviate('/tickets')
      })
      .catch(toast.error)
  }

  const onNoteSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    dispatch(createNoteAsync({ ticketId, text: noteText }))
      .unwrap()
      .then(() => {
        setNoteText('')
        closeModal()
      })
      .catch(toast.error)
  }

  // Open/close modal
  const openModal: React.MouseEventHandler<HTMLButtonElement> = () =>
    setModalIsOpen(true)
  const closeModal = (): void => setModalIsOpen(false)

  useEffect(() => {
    dispatch(getTicketAsync(ticketId)).unwrap().catch(toast.error)
    dispatch(getNotesAsync(ticketId)).unwrap().catch(toast.error)
  }, [dispatch, ticketId])

  if (ticket == null) {
    if (ticketStatus === 'loading') {
      return <Spinner />
    }
    return <></>
  }

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
        </h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of the Issue</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>

      {ticket.status !== 'closed' && (
        <button type="button" onClick={openModal} className="btn">
          <FaPlus /> Add Note
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Note"
      >
        <h2>Add Note</h2>
        <button type="button" className="btn-close" onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea
              name="noteText"
              id="noteText"
              className="form-control"
              placeholder="Note text"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {noteStatus === 'success'
        ? (
            notes.map((note) => <NoteItem key={note._id} note={note} />)
          )
        : (
        <Spinner />
          )}

      {ticket.status !== 'closed' && (
        <button
          type="submit"
          className="btn btn-block btn-danger"
          onClick={onTicketClose}
        >
          Close Ticket
        </button>
      )}
    </div>
  )
}

export default Ticket
