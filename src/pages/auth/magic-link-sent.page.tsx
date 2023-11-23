import { Mail } from 'lucide-react'
import AuthLayout from './layout'

export default function Page() {
  return (
    <AuthLayout>
      <div className="flex flex-col">
        <div className="shrink-0">
          <Mail size={18} />
        </div>

        <div className="flex flex-col pt-8">
          <p className="dark:text-white text-black text-lg font-medium">
            Magic link sent
          </p>
          <p className="text-zinc-400">
            {'Please check your email for a magic sign-in link.'}
          </p>
        </div>
      </div>
    </AuthLayout>
  )
}
