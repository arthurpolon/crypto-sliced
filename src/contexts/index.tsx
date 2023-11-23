import { ReactNode } from 'react'
import { ThemeProvider } from './theme'
import { ReactQueryProvider } from './react-query'
import { AuthProvider } from './auth'

export function AppContext(props: { children: ReactNode; pageProps: any }) {
  return (
    <AuthProvider session={props.pageProps.session}>
      <ReactQueryProvider>
        <ThemeProvider>{props.children}</ThemeProvider>
      </ReactQueryProvider>
    </AuthProvider>
  )
}
