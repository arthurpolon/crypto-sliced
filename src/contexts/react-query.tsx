import { ReactNode } from 'react'
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { toast } from '@/components/ui/use-toast'
import { isAxiosError } from 'axios'
import { ToastAction } from '@/components/ui/toast'
import Link from 'next/link'

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError(error, query) {
      if (isAxiosError(error) && error.response?.status === 402) {
        toast({
          variant: 'destructive',
          title: 'Check your subscription',
          description: 'Your subscription is currently not active',
          action: (
            <ToastAction
              altText="Manage subscription"
              className="border !border-current !border-opacity-100"
              asChild
            >
              <Link href="/api/checkout/portal">Manage subscription</Link>
            </ToastAction>
          ),
          duration: +Infinity,
          className: 'border !border-red-100 !border-opacity-100',
        })

        return
      }

      if (typeof query?.meta?.errorMessage === 'string') {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: query.meta.errorMessage,
        })
      }
    },
  }),

  defaultOptions: {
    queries: {
      retry(failureCount, error) {
        if (isAxiosError(error) && error.response?.status === 402) {
          return false
        }

        return failureCount < 3
      },
    },
  },
})

export function ReactQueryProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
