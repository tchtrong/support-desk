import axios, { AxiosRequestConfig } from 'axios'
import { NoteResponse } from './note'

const API_URL = '/api/tickets/'

const getNotes = async (
  ticketId: string,
  token: string
): Promise<NoteResponse[]> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(API_URL + ticketId + '/notes', config)

  return response.data
}

const createNote = async (
  ticketId: string,
  noteText: string,
  token: string
): Promise<NoteResponse> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  console.log('createNote: noteText:', noteText)

  const response = await axios.post(
    API_URL + ticketId + '/notes',
    { text: noteText },
    config
  )

  return response.data
}

const noteService = {
  getNotes,
  createNote
}

export default noteService
