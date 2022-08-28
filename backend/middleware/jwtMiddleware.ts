import express from 'express'
import { expressjwt } from 'express-jwt'

export const jwtBearer = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  void expressjwt({
    secret: process.env.JWT_SECRET as string,
    algorithms: ['HS256'],
    getToken: function fromHeader (req) {
      if (
        req.headers.authorization != null &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
      ) {
        return req.headers.authorization.split(' ')[1]
      } else {
        return undefined
      }
    }
  })(req, res, next)
}
