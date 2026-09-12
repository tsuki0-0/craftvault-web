import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { PasswordStrength } from './PasswordStrength'
import '../styles/auth.css'

interface SignUpFormProps {
  onSwitchToLogin: () => void
}

export function SignUpForm({ onSwitchToLogin }: SignUpFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const { signUp } = useAuth()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('As senhas não coincidem')
      return
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres')
      return
    }

    setLoading(true)

    try {
      await signUp(email, password)
      setSuccess(true)
      setEmail('')
      setPassword('')
      setConfirmPassword('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar conta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>CRAFTVAULT</h1>
          <p>Discover. Analyze. Share.</p>
        </div>

        {success ? (
          <div className="auth-success">
            <h3>✓ Conta criada com sucesso!</h3>
            <p>Verifique seu email para confirmar a conta.</p>
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="auth-button"
            >
              Ir para Login
            </button>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Senha Forte</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Crie uma senha forte"
                  required
                />
                <PasswordStrength password={password} />
                <small style={{ color: '#aaaaaa', marginTop: '4px' }}>
                  ⚠️ Use maiúsculas, números e símbolos para uma senha mais segura
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmar Senha</label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirme sua senha"
                  required
                />
              </div>

              {error && <div className="auth-error">{error}</div>}

              <button type="submit" disabled={loading} className="auth-button">
                {loading ? 'Criando conta...' : 'Criar Conta'}
              </button>
            </form>

            <div className="auth-footer">
              <p>
                Já tem conta?{' '}
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="auth-link"
                >
                  Faça login
                </button>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
