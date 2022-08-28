export interface RegisterUserRequest {
  name: string
  email: string
  password: string
}

export interface LoginUserRequest {
  email: string
  password: string
}

export interface RegisterUserResponse {
  _id: string
  name: string
  email: string
  token: string
}

export interface LoginUserResponse extends RegisterUserResponse {}
