import { NextFunction, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { Request as JWTRequest } from 'express-jwt'
import { HydratedDocument, Types } from 'mongoose'
import userModel, { UserType } from '../models/userModel'

export type UserTypeResponse = Omit<UserType, 'password'>

export interface UserJWTAuthRequest extends JWTRequest<{ id: Types.ObjectId }> {
  user?: HydratedDocument<UserTypeResponse>
}

export const userAuth = asyncHandler(
  async (req: UserJWTAuthRequest, res: Response, next: NextFunction) => {
    if (req.auth == null) {
      res.status(401)
      throw new Error('Not authorised')
    }
    const user = await userModel.findById(req.auth.id, '-password')
    if (user != null) {
      req.user = user
      next()
    } else {
      res.status(401)
      throw new Error('Not authorised')
    }
  }
)
