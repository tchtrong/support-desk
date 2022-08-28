import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import BackButton from '../components/BackButton'
import { createTicketAsync } from '../features/tickets/ticketSlice'

const NewTicket: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth)
  const [product, setProduct] = useState('iMac')
  const [description, setDescription] = useState('')

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    dispatch(createTicketAsync({ description, product }))
      .unwrap()
      .then(() => {
        toast.success('New ticket created!')
        navigate('/tickets')
      })
      .catch(toast.error)
  }

  return (
    <>
      <BackButton />

      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            value={user?.name}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Customer Name</label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            value={user?.email}
            disabled
          />
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={(e) => setProduct(e.currentTarget.value)}
            >
              <option value="iPhone">iPhone</option>
              <option value="iMac">iMac</option>
              <option value="iPad">iPad</option>
              <option value="Macbook Pro">Macbook Pro</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description of the issue</label>
            <textarea
              className="form-control"
              name="description"
              id="description"
              value={description}
              placeholder="Description"
              onChange={(e) => setDescription(e.currentTarget.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default NewTicket
