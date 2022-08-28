import axios from 'axios'
import {
  LoginUserRequest,
  LoginUserResponse,
  RegisterUserRequest,
  RegisterUserResponse
} from './auth'

const API_URL = '/api/users'

const registerUser = async (
  userData: RegisterUserRequest
): Promise<RegisterUserResponse> => {
  const response = await axios.post<RegisterUserResponse>(API_URL, userData)

  if (response.data != null) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

const logoutUser = (): void => localStorage.removeItem('user')

const loginUser = async (
  userData: LoginUserRequest
): Promise<LoginUserResponse> => {
  const response = await axios.post<LoginUserResponse>(
    `${API_URL}/login`,
    userData
  )

  if (response.data != null) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

const authService = {
  registerUser,
  logoutUser,
  loginUser
}

export default authService
