import { AppThunkAPIState } from '../../app/store'

export interface Note {
  user: string
  ticket: string
  text: string
  isStaff: boolean
  staff?: string
}

export interface NoteResponse extends Note {
  _id: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface NoteState {
  notes: NoteResponse[]
  note: NoteResponse | null
  status: 'initial' | 'loading' | 'success' | 'error'
  message: string
}

export interface CreateNoteRequest {
  ticketId: string | undefined
  text: string
}

export interface NotesThunkAPI extends AppThunkAPIState {
  rejectValue: string
}

export interface GetNotesThunkAPI extends NotesThunkAPI {}

export interface CreateNoteThunkAPI extends NotesThunkAPI {}
