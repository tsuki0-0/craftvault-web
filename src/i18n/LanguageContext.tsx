import { createContext, useContext, type ReactNode } from 'react'
import { useLanguage } from './useLanguage'
import type { TranslationKey } from './translations'

interface LanguageContextType {
  language: string
  t: (key: TranslationKey) => string
  toggleLanguage: () => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { language, t, toggleLanguage } = useLanguage()

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useI18n must be used within LanguageProvider')
  }
  return context
}
