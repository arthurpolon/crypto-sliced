import { PrismaAdapter } from '@auth/prisma-adapter'
import { randomUUID } from 'crypto'
import NextAuth, { AuthOptions } from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import { sendMagicLinkEmail } from '../email/mailer'
import { prisma } from '../database'

export const authOptions = {
  session: {
    strategy: 'database',
  },
  pages: {
    signIn: '/auth/sign-in',
    verifyRequest: '/auth/magic-link-sent',
    newUser: '/onboarding/account',
  },
  callbacks: {
    async session({ session, user }) {
      const dbUser = await prisma.user.findUnique({
        where: { id: user.id },
      })

      if (dbUser) {
        session.user.id = dbUser.id
        session.user.last_name = dbUser.last_name ?? ''
        session.user.first_name = dbUser.name ?? ''
        session.user.phone_number = dbUser.phone_number ?? ''
      }

      return session
    },
  },
  providers: [
    EmailProvider({
      async sendVerificationRequest({ identifier: email, url }) {
        await sendMagicLinkEmail(email, url)
      },
      async generateVerificationToken() {
        return 'magic_link_' + randomUUID()
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
} as AuthOptions

export default NextAuth(authOptions)
