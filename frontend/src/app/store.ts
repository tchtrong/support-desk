import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import noteReducer from '../features/notes/noteSlice'
import ticketReducer from '../features/tickets/ticketSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tickets: ticketReducer,
    notes: noteReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>
export interface AppThunkAPIState {
  state: RootState
}
export interface AppThunkAPIDispatch {
  dispatch: AppDispatch
}
export type AppThunkAPI = AppThunkAPIState & AppThunkAPIDispatch
