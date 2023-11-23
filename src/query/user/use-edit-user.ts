import { toast } from '@/components/ui/use-toast'
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { userKey } from '../keys-factory'

export function useEditUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (args: TArgs) => {
      const response = await axios.put('/api/user', args)
      return response.data
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: userKey })
    },
    onError() {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem editing your infos.',
      })
    },
  })
}

type TArgs = {
  name?: string
  last_name?: string

  email?: string
  phone_number?: string
}
