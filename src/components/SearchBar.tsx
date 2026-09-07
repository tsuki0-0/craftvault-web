import { useState } from 'react'
import type { CraftVaultAnalysis } from '../types/save'
import { useI18n } from '../i18n/LanguageContext'
import { translateElementName } from '../i18n/elementNames'
import '../styles/search-bar.css'

interface SearchBarProps {
  analysis: CraftVaultAnalysis
  onElementSelect: (elementId: string) => void
}

export function SearchBar({ analysis, onElementSelect }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const { t, language } = useI18n()

  const results = query.trim()
    ? analysis.elements
        .filter((el) => {
          const translatedName = translateElementName(el.name, language)
          return (
            translatedName.toLowerCase().includes(query.toLowerCase()) ||
            el.emoji.includes(query)
          )
        })
        .slice(0, 8)
    : []

  function handleSelect(elementId: string) {
    onElementSelect(elementId)
    setQuery('')
    setIsOpen(false)
  }

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder={t('searchPlaceholder')}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          className="search-input"
        />
        {query && (
          <button
            className="clear-button"
            onClick={() => setQuery('')}
          >
            ✕
          </button>
        )}
      </div>

      {isOpen && (query || results.length > 0) && (
        <div className="search-results">
          {results.length > 0 ? (
            <div className="results-list">
              {results.map((el) => (
                <button
                  key={el.id}
                  className="result-item"
                  onClick={() => handleSelect(el.id)}
                >
                  <span className="result-emoji">{el.emoji}</span>
                  <div className="result-info">
                    <div className="result-name">
                      {translateElementName(el.name, language)}
                    </div>
                    <div className="result-recipes">
                      {el.metadata.recipes?.length ?? 0} {t('recipes')}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : query.trim() ? (
            <div className="no-results">
              {t('noElementsFound')} "{query}"
            </div>
          ) : null}
        </div>
      )}

      {isOpen && (
        <div
          className="search-overlay"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
