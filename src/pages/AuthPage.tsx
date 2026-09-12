import { useState } from 'react'
import { LoginForm } from '../components/LoginForm'
import { SignUpForm } from '../components/SignUpForm'

type AuthMode = 'login' | 'signup'

export function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('login')

  return (
    <>
      {mode === 'login' ? (
        <LoginForm onSwitchToSignUp={() => setMode('signup')} />
      ) : (
        <SignUpForm onSwitchToLogin={() => setMode('login')} />
      )}
    </>
  )
}
