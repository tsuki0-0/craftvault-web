import { useState } from 'react'
import '../styles/logo-menu.css'

interface LogoMenuProps {
  onNavigate: (page: 'home' | 'community' | 'dashboard') => void
  currentPage: 'home' | 'dashboard' | 'community'
}

export function LogoMenu({ onNavigate, currentPage }: LogoMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { id: 'home', label: 'Início', icon: '🏠' },
    { id: 'community', label: 'Comunidade', icon: '🌍' },
    { id: 'dashboard', label: 'Meus Crafts', icon: '📊' },
    { id: 'settings', label: 'Configurações', icon: '⚙️' },
  ]

  return (
    <div className="logo-menu-container">
      <button 
        className="logo-menu-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="logo-mark">C</span>
      </button>

      {isOpen && (
        <>
          <div className="logo-menu-overlay" onClick={() => setIsOpen(false)} />
          
          <div className="logo-menu-dropdown">
            <div className="menu-header">
              <h3>CRAFTVAULT</h3>
              <p>Discover. Analyze. Share.</p>
            </div>

            <div className="menu-items">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  className={`menu-item ${currentPage === item.id ? 'active' : ''}`}
                  onClick={() => {
                    if (item.id !== 'settings') {
                      onNavigate(item.id as 'home' | 'community' | 'dashboard')
                    }
                    setIsOpen(false)
                  }}
                >
                  <span className="menu-icon">{item.icon}</span>
                  <span className="menu-label">{item.label}</span>
                  {currentPage === item.id && <span className="menu-active-dot">●</span>}
                </button>
              ))}
            </div>

            <div className="menu-footer">
              <p>v1.0 • 2026</p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
