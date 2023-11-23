import { NextApiRequest as Req, NextApiResponse as Res } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './options'
import { Session } from 'next-auth'

type THandler = (req: Req, res: Res, session: Session) => any

export function AuthMiddleware(handler: THandler) {
  return async (req: Req, res: Res) => {
    const session = await getServerSession(req, res, authOptions)

    if (!session) {
      return res.status(401).send({ error: 'Unauthorized' })
    }

    return handler(req, res, session)
  }
}
