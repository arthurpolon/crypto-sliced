import { Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'

export default function OnboardingLayout({
  children,
  title,
}: {
  children: React.ReactNode
  title: string
}) {
  const { data: session, status } = useSession({
    required: true,
  })

  const loading = (
    <div className="grid place-items-center">
      <div className="flex items-center gap-2 animate-pulse">
        <Loader2 className="animate-spin" size={18} />
        <p className="text-sm font-mono">Loading...</p>
      </div>
    </div>
  )

  return (
    <div className="h-screen">
      <div className="grid place-items-center sm:min-h-screen sm:py-0 py-8 h-full">
        <div className="flex flex-col items-center">
          <h2 className="sm:text-3xl font-medium text-lg text-center pb-8">
            {title}
          </h2>
          <div className="w-full sm:min-w-[400px] min-w-[300px] max-w-sm p-8 border dark:border-zinc-800 border-zinc-200 rounded-xl">
            {status === 'loading' || !session ? loading : children}
          </div>
        </div>
      </div>
    </div>
  )
}
