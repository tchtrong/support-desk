import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  CreateTicketRequest,
  GetAllTicketsThunkAPI,
  TicketResponse,
  TicketState,
  TicketsThunkAPI
} from './ticket'
import ticketService from './ticketService'

const initialState: TicketState = {
  message: '',
  status: 'initial',
  ticket: null,
  tickets: []
}

export const createTicketAsync = createAsyncThunk<
TicketResponse,
CreateTicketRequest,
TicketsThunkAPI
>('tickets/create', async (ticketData: CreateTicketRequest, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token
    return await ticketService.createTicket(ticketData, token as string)
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.message as string)
  }
})

export const getAllTicketsAsync = createAsyncThunk<
TicketResponse[],
undefined,
GetAllTicketsThunkAPI
>('tickets/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token
    return await ticketService.getAllTickets(token as string)
  } catch (error: any) {
    return thunkAPI.rejectWithValue(JSON.stringify(error))
  }
})

export const getTicketAsync = createAsyncThunk<
TicketResponse,
string | undefined,
GetAllTicketsThunkAPI
>('tickets/get', async (ticketId: string | undefined, thunkAPI) => {
  if (ticketId == null) {
    return thunkAPI.rejectWithValue(JSON.stringify('Bad Request'))
  }
  try {
    const token = thunkAPI.getState().auth.user?.token
    return await ticketService.getTicket(ticketId, token as string)
  } catch (error: any) {
    return thunkAPI.rejectWithValue(JSON.stringify(error))
  }
})

export const closeTicketAsync = createAsyncThunk<
TicketResponse,
string | undefined,
GetAllTicketsThunkAPI
>('tickets/close', async (ticketId: string | undefined, thunkAPI) => {
  if (ticketId == null) {
    return thunkAPI.rejectWithValue(JSON.stringify('Bad Request'))
  }
  try {
    const token = thunkAPI.getState().auth.user?.token
    return await ticketService.closeTicket(ticketId, token as string)
  } catch (error: any) {
    return thunkAPI.rejectWithValue(JSON.stringify(error))
  }
})

export const ticketSlice = createSlice({
  initialState,
  name: 'tickets',
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTicketAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(createTicketAsync.fulfilled, (state, action) => {
        state.status = 'success'
      })
      .addCase(createTicketAsync.rejected, (state, action) => {
        state.status = 'error'
        state.message = action.payload as string
      })
      .addCase(getAllTicketsAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getAllTicketsAsync.fulfilled, (state, action) => {
        state.status = 'success'
        state.tickets = action.payload
      })
      .addCase(getAllTicketsAsync.rejected, (state, action) => {
        state.status = 'error'
        state.message = action.payload as string
      })
      .addCase(getTicketAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getTicketAsync.fulfilled, (state, action) => {
        state.status = 'success'
        state.ticket = action.payload
      })
      .addCase(getTicketAsync.rejected, (state, action) => {
        state.status = 'error'
        state.message = action.payload as string
      })
      .addCase(closeTicketAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(closeTicketAsync.fulfilled, (state, action) => {
        state.status = 'success'
        state.tickets.map((ticket) =>
          ticket._id === action.payload._id
            ? (ticket.status = 'closed')
            : ticket
        )
      })
      .addCase(closeTicketAsync.rejected, (state, action) => {
        state.status = 'error'
        state.message = action.payload as string
      })
  }
})

export default ticketSlice.reducer
