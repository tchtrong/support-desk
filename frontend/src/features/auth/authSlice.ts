import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  LoginUserRequest,
  RegisterUserRequest,
  RegisterUserResponse
} from './auth'
import authService from './authService'

export interface AuthState {
  user: RegisterUserResponse | null
  status: 'error' | 'loading' | 'success' | 'initial'
  message: string
}

const user = localStorage.getItem('user')

const initialState: AuthState = {
  user: user != null ? JSON.parse(user) : null,
  status: 'initial',
  message: ''
}

export const registerAsync = createAsyncThunk(
  'auth/register',
  async (user: RegisterUserRequest, thunkAPI) => {
    try {
      return await authService.registerUser(user)
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message as string)
    }
  }
)

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (user: LoginUserRequest, thunkAPI) => {
    try {
      return await authService.loginUser(user)
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message as string)
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      authService.logoutUser()
      state = initialState
    }
  },
  extraReducers (builder) {
    builder
      .addCase(registerAsync.pending, (state) => {
        state.status = 'loading'
        state.message = ''
      })
      .addCase(registerAsync.fulfilled, (state, aciton) => {
        state.status = 'success'
        state.user = aciton.payload
      })
      .addCase(registerAsync.rejected, (state, aciton) => {
        state.status = 'error'
        state.message = aciton.payload as string
      })
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading'
        state.message = ''
      })
      .addCase(loginAsync.fulfilled, (state, aciton) => {
        state.status = 'success'
        state.user = aciton.payload
      })
      .addCase(loginAsync.rejected, (state, aciton) => {
        state.status = 'error'
        state.message = aciton.payload as string
      })
  }
})

export const { logout } = authSlice.actions

export default authSlice.reducer
