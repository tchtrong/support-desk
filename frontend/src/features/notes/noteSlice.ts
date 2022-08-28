import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  CreateNoteRequest,
  CreateNoteThunkAPI,
  GetNotesThunkAPI,
  NoteResponse,
  NoteState
} from './note'
import noteService from './noteService'

export const getNotesAsync = createAsyncThunk<
NoteResponse[],
string | undefined,
GetNotesThunkAPI
>('notes/getAll', async (ticketId, thunkAPI) => {
  if (ticketId == null) {
    return thunkAPI.rejectWithValue(JSON.stringify('Bad Request'))
  }
  try {
    const token = thunkAPI.getState().auth.user?.token
    return await noteService.getNotes(ticketId, token as string)
  } catch (error: any) {
    return thunkAPI.rejectWithValue(JSON.stringify(error))
  }
})

export const createNoteAsync = createAsyncThunk<
NoteResponse,
CreateNoteRequest,
CreateNoteThunkAPI
>('notes/create', async (noteData, thunkAPI) => {
  if (noteData.ticketId == null) {
    return thunkAPI.rejectWithValue(JSON.stringify('Bad Request'))
  }
  try {
    const token = thunkAPI.getState().auth.user?.token
    console.log('nodeData.text:', noteData.text)
    return await noteService.createNote(
      noteData.ticketId,
      noteData.text,
      token as string
    )
  } catch (error: any) {
    return thunkAPI.rejectWithValue(JSON.stringify(error))
  }
})

const initialState: NoteState = {
  message: '',
  status: 'initial',
  note: null,
  notes: []
}

export const noteSlice = createSlice({
  initialState,
  name: 'notes',
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNotesAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getNotesAsync.fulfilled, (state, action) => {
        state.status = 'success'
        state.notes = action.payload
      })
      .addCase(getNotesAsync.rejected, (state, action) => {
        state.status = 'error'
        state.message = action.payload as string
      })
      .addCase(createNoteAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(createNoteAsync.fulfilled, (state, action) => {
        state.status = 'success'
        state.notes.push(action.payload)
      })
      .addCase(createNoteAsync.rejected, (state, action) => {
        state.status = 'error'
        state.message = action.payload as string
      })
  }
})

const noteReducer = noteSlice.reducer

export default noteReducer
