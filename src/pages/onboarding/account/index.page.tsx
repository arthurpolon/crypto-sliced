import { OnboardingForm } from './(components)/onboarding-form'
import OnboardingLayout from '../layout'

export default function Page() {
  return (
    <OnboardingLayout title="👋 Welcome, let's get started">
      <main className="w-full">
        <OnboardingForm />
      </main>
    </OnboardingLayout>
  )
}
