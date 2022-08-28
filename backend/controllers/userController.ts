import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'
import { UserJWTAuthRequest } from '../middleware/authMiddleware'
import userModel from '../models/userModel'

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body

    if (name == null || email == null || password == null) {
      res.status(400)
      throw new Error('Please include all fields')
    }

    // Find if user already exists
    const userExists = await userModel.findOne({
      email
    })

    if (userExists != null) {
      res.status(400)
      throw new Error('User already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword
    })

    if (user != null) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }

    res.send('Register Route')
  }
)

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = await userModel.findOne({ email })

  // Check user and passwords match
  if (user != null && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error('Invalid credentials')
  }
})

export const getMe = asyncHandler(
  async (req: UserJWTAuthRequest, res: Response) => {
    const user = {
      id: req.user?._id,
      email: req.user?.email,
      name: req.user?.name
    }
    res.status(200).json(user)
  }
)

// Generate token
const generateToken = (id: Types.ObjectId): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '30d'
  })
}
