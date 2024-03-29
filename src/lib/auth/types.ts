import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      first_name: string
      last_name: string
      phone_number: string
    } & DefaultSession['user']
  }
}
