import { useI18n } from '../i18n/LanguageContext'
import '../styles/language-switcher.css'

export function LanguageSwitcher() {
  const { language, toggleLanguage } = useI18n()

  return (
    <button className="language-switcher" onClick={toggleLanguage}>
      <span className="lang-icon">🌐</span>
      <span className="lang-code">{language === 'pt-BR' ? 'PT' : 'EN'}</span>
    </button>
  )
}
