import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { AppContext } from '@/contexts'
import { Toaster } from '@/components/ui/toaster'
import Head from 'next/head'
import { setDefaultOptions } from 'date-fns'
import { enUS } from 'date-fns/locale'

setDefaultOptions({ locale: enUS })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppContext pageProps={pageProps}>
      <Head>
        <link rel="shortcut icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#06092b" />
      </Head>
      <Component {...pageProps} />
      <Toaster />
    </AppContext>
  )
}
