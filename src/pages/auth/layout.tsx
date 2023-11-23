import { ThemeToggle } from '@/components/theme-toggle'
import { buttonVariants } from '@/components/ui/button'
import { useIsPWA } from '@/hooks/use-is-pwa'
import { cn } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isPWA = useIsPWA()

  return (
    <div className=" bg-space-light light">
      <div className="fixed top-3 left-5 right-5 flex justify-between">
        {!isPWA ? (
          <Link
            href="/"
            className={cn(
              buttonVariants({
                size: 'sm',
                variant: 'link',
                className: 'gap-2',
              })
            )}
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </Link>
        ) : (
          <div />
        )}
        <ThemeToggle />
      </div>
      <div className="grid place-items-center min-h-screen py-10 px-4">
        <div className="max-w-sm dark:bg-space-dark w-full p-8 shadow-xl rounded-xl light border border-muted">
          {children}
        </div>
      </div>
    </div>
  )
}
