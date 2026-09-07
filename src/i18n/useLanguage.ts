import { useState, useEffect } from 'react'
import { translations, type Language, type TranslationKey } from './translations'

export function useLanguage() {
  const [language, setLanguage] = useState<Language>(() => {
    // Tentar obter do localStorage
    const saved = localStorage.getItem('craftvault-language')
    if (saved === 'pt-BR' || saved === 'en-US') {
      return saved
    }

    // Detectar do navegador
    const browserLang = navigator.language
    if (browserLang.startsWith('pt')) {
      return 'pt-BR'
    }
    return 'en-US'
  })

  useEffect(() => {
    localStorage.setItem('craftvault-language', language)
  }, [language])

  function t(key: TranslationKey): string {
    return translations[language][key] || key
  }

  function toggleLanguage() {
    setLanguage((prev) => (prev === 'pt-BR' ? 'en-US' : 'pt-BR'))
  }

  return {
    language,
    setLanguage,
    t,
    toggleLanguage,
  }
}
