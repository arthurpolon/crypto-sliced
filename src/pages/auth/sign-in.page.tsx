import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AlertTriangle, Loader2, Lock } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import AuthLayout from './layout'
import { Label } from '@/components/ui/label'
import { preventDefault } from '@/lib/utils'

export default function Page() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const [authError, setAuthError] = useState<string | null>(null)

  const query = useSearchParams()

  useEffect(() => {
    const error = query?.get('error')

    if (error) {
      switch (error) {
        case 'EmailSignin':
          setAuthError('There was an error sending your sign in link.')
          break
      }
    }
  }, [query])

  return (
    <AuthLayout>
      <div className="flex flex-col">
        {authError && (
          <Alert
            variant={'destructive'}
            className="space-x-2 mb-6 font-bold !text-red-500 !border-red-500"
          >
            <AlertTriangle stroke="rgb(239 68 68 / var(--tw-text-opacity))" />
            <p>{authError}</p>
          </Alert>
        )}
        <div className="shrink-0">
          <Lock size={18} />
        </div>

        <div className="flex flex-col py-8">
          <p className="text-lg font-medium ">Welcome</p>
          <p className="text-zinc-400">{'Please sign in or sign up below.'}</p>
        </div>
        <form
          className="flex flex-col gap-4"
          onSubmit={preventDefault(async () => {
            setLoading(true)
            await signIn('email', {
              email: email,
              callbackUrl: query?.get('callbackUrl') || '/onboarding/account',
            })
          })}
        >
          <Label>
            <p className="text-sm text-zinc-400 pb-2">Email</p>

            <Input
              value={email}
              className="light"
              type="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="martin.shrekli@turing.com"
            />
          </Label>

          <Button
            disabled={loading}
            type="submit"
            className="rounded-md disabled:opacity-60"
          >
            {loading && <Loader2 size={20} className="animate-spin mr-1" />}
            Continue with Email
          </Button>
        </form>
        <p className="text-xs text-zinc-400 pt-4">
          By signing in, you agree to our terms, acceptable use, and privacy
          policy.
        </p>
      </div>
    </AuthLayout>
  )
}
