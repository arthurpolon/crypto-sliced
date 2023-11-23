import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

export const AuthProvider = ({
  children,
  session,
}: {
  children: ReactNode
  session: Session
}) => {
  return (
    <SessionProvider session={session} refetchInterval={60 * 5}>
      {children}
    </SessionProvider>
  )
}
