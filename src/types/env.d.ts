declare global {
  namespace NodeJS {
    interface ProcessEnv {
      RESEND_DOMAIN: string
      RESEND_SECRET: string

      NEXTAUTH_URL: string
      NEXTAUTH_SECRET: string
    }
  }
}

export {}
