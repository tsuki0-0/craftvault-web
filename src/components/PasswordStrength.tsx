import '../styles/password-strength.css'

interface PasswordStrengthProps {
  password: string
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const getStrength = (pwd: string) => {
    let strength = 0
    
    if (pwd.length >= 8) strength++
    if (pwd.length >= 12) strength++
    if (/[a-z]/.test(pwd)) strength++
    if (/[A-Z]/.test(pwd)) strength++
    if (/[0-9]/.test(pwd)) strength++
    if (/[!@#$%^&*]/.test(pwd)) strength++
    
    return strength
  }

  const getLevel = (strength: number) => {
    if (strength < 2) return { level: 'Fraca', color: '#ff6666' }
    if (strength < 4) return { level: 'Média', color: '#ffaa66' }
    if (strength < 5) return { level: 'Forte', color: '#66ff66' }
    return { level: 'Muito Forte', color: '#00ff00' }
  }

  if (!password) return null

  const strength = getStrength(password)
  const { level, color } = getLevel(strength)

  return (
    <div className="password-strength">
      <div className="strength-bar">
        <div 
          className="strength-fill" 
          style={{
            width: `${(strength / 6) * 100}%`,
            backgroundColor: color
          }}
        />
      </div>
      <span className="strength-label" style={{ color }}>
        Força: {level}
      </span>
    </div>
  )
}
