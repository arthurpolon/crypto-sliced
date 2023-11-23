// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { AuthMiddleware } from '@/lib/auth/middleware'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Session } from 'next-auth'
import { putHandler } from './put'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) {
  switch (req.method) {
    case 'PUT': {
      return putHandler(req, res, session)
    }

    default:
      return res.status(404).send(null)
  }
}

export default AuthMiddleware(handler)
