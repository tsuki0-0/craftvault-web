import '../styles/auth-loading.css'

export function AuthLoading() {
  return (
    <div className="auth-loading">
      <div className="auth-loading-grid" />

      <div className="auth-loading-content">
        <div className="auth-loading-logo">
          <span>C</span>
        </div>

        <div className="auth-loading-brand">
          <strong>CRAFT<span>VAULT</span></strong>
          <small>Discover. Analyze. Share.</small>
        </div>

        <div className="auth-loading-spinner">
          <div />
        </div>

        <p className="auth-loading-title">Autenticando</p>
        <p className="auth-loading-status">
          Verificando sua sessão...
        </p>

        <div className="auth-loading-progress">
          <span />
        </div>
      </div>
    </div>
  )
}
