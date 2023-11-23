import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useEditUser } from '@/query/user/use-edit-user'

const onboardingSchema = z.object({
  name: z.string().min(2).max(64),
  last_name: z.string().min(2).max(64),
})

export function OnboardingForm() {
  const router = useRouter()

  const { data: session } = useSession()

  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      name: '' + session?.user.first_name,
      last_name: '' + session?.user.last_name,
    },
  })

  const editUser = useEditUser()

  async function onSubmit(values: z.infer<typeof onboardingSchema>) {
    try {
      setLoading(true)

      await editUser.mutateAsync({
        name: values.name,
        last_name: values.last_name,
      })

      toast({
        title: 'Updated',
        description: 'You have successfully changed your personal information',
        variant: 'default',
      })

      router.push('/onboarding/subscription')
    } catch (err) {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col m-auto w-full ">
      <div className="flex flex-col pb-8">
        <p className="dark:text-white text-black text-lg font-medium text-center">
          Add Account Details
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} className="w-full" type="submit">
            {loading && <Loader2 size={20} className="animate-spin mr-1" />}{' '}
            Continue
          </Button>
        </form>
      </Form>
    </div>
  )
}
