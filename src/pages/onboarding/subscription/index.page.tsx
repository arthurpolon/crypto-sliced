import OnboardingLayout from '../layout'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { GetStaticProps, InferGetStaticPropsType } from 'next'

type TProps = InferGetStaticPropsType<typeof getStaticProps>

export default function Page(props: TProps) {
  const { subscription } = props

  return (
    <OnboardingLayout
      title={`🥳 Start your ${subscription.freeTrialDays}-day free trial now!`}
    >
      <main className="w-full">
        <div className="flex flex-col m-auto w-full ">
          <div className="flex flex-col gap-4 pb-8">
            <p className="dark:text-white text-center text-black text-lg font-medium">
              We won&apos;t charge you today
            </p>
          </div>
          <div className="grid gap-4 grid-cols-1">
            <div
              className={
                'p-4 border dark:border-emerald-500 border-emerald-400 rounded-lg'
              }
            >
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <p className="text">{subscription.name}</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-xs -mb-1">
                    after {subscription.freeTrialDays} days
                  </p>
                  <p className="text-lg">$ {subscription.monthlyPrice}/month</p>
                </div>
              </div>
            </div>
          </div>

          <Link href={`#`} prefetch={false} className="mt-4">
            <Button className="w-full" type="submit" size={'sm'}>
              Continue with {subscription.name}
            </Button>
          </Link>
        </div>
      </main>
    </OnboardingLayout>
  )
}

export const getStaticProps: GetStaticProps<{
  subscription: TFakeSubscription
}> = async () => {
  return {
    props: {
      subscription: {
        name: 'Premium',
        freeTrialDays: 14,
        monthlyPrice: 4.99,
      },
    },
  }
}

type TFakeSubscription = {
  name: string
  freeTrialDays: number
  monthlyPrice: number
}
