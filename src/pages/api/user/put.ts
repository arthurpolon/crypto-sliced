import { prisma } from '@/lib/database'
import { Prisma } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Session } from 'next-auth'

export async function putHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) {
  const { name, last_name, email, phone_number } = req.body

  const prismaUpdate: Prisma.UserUpdateArgs['data'] = {}

  if (name) {
    prismaUpdate.name = name
  }
  if (email) {
    prismaUpdate.email = email
    prismaUpdate.emailVerified = null
  }
  if (phone_number) {
    prismaUpdate.phone_number = phone_number
  }
  if (last_name) prismaUpdate.last_name = last_name

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: prismaUpdate,
  })

  return res.json(true)
}
