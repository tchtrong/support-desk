import axios, { AxiosRequestConfig } from 'axios'
import { CreateTicketRequest, TicketResponse } from './ticket'

const API_URL = '/api/tickets/'

const createTicket = async (
  ticketData: CreateTicketRequest,
  token: string
): Promise<TicketResponse> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.post(API_URL, ticketData, config)
  return response.data
}

const getAllTickets = async (token: string): Promise<TicketResponse[]> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL, config)
  return response.data
}

const getTicket = async (
  ticketId: string,
  token: string
): Promise<TicketResponse> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL + ticketId, config)
  return response.data
}

const closeTicket = async (
  ticketId: string,
  token: string
): Promise<TicketResponse> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.put(
    API_URL + ticketId,
    { status: 'closed' },
    config
  )
  return response.data
}

const ticketService = {
  createTicket,
  getAllTickets,
  getTicket,
  closeTicket
}

export default ticketService
