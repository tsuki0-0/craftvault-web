import '../styles/mobile-menu.css'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  onNavigate: (page: 'home' | 'community' | 'dashboard') => void
  user: any
  onLogout: () => void
  onLogin: () => void
}

export function MobileMenu({ isOpen, onClose, onNavigate, user, onLogout, onLogin }: MobileMenuProps) {
  if (!isOpen) return null

  const menuItems = [
    { id: 'home', label: 'Início', icon: '🏠' },
    { id: 'community', label: 'Comunidade', icon: '🌍' },
    { id: 'dashboard', label: 'Meus Crafts', icon: '📊' },
  ]

  return (
    <>
      <div className="mobile-menu-overlay" onClick={onClose} />

      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <h2>CRAFTVAULT</h2>
          <button className="mobile-menu-close" onClick={onClose}>✕</button>
        </div>

        <nav className="mobile-menu-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className="mobile-menu-item"
              onClick={() => {
                onNavigate(item.id as 'home' | 'community' | 'dashboard')
                onClose()
              }}
            >
              <span className="mobile-menu-icon">{item.icon}</span>
              <span className="mobile-menu-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mobile-menu-footer">
          {user ? (
            <>
              <p className="mobile-menu-email">{user.email}</p>
              <button className="mobile-menu-logout" onClick={() => { onLogout(); onClose() }}>
                Sair
              </button>
            </>
          ) : (
            <button className="mobile-menu-login" onClick={() => { onLogin(); onClose() }}>
              Login / Criar Conta
            </button>
          )}
        </div>
      </div>
    </>
  )
}
