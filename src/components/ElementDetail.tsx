import type { CraftVaultAnalysis } from '../types/save'
import { useI18n } from '../i18n/LanguageContext'
import { translateElementName } from '../i18n/elementNames'
import '../styles/element-detail.css'

interface ElementDetailProps {
  analysis: CraftVaultAnalysis
  elementId: string
  onClose: () => void
}

export function ElementDetail({ analysis, elementId, onClose }: ElementDetailProps) {
  const element = analysis.elements.find((el) => el.id === elementId)
  const { t, language } = useI18n()

  if (!element) return null

  const combinationsAsOutput = analysis.combinations.filter(
    (c) => c.output === elementId
  )

  const combinationsAsInput = analysis.combinations.filter((c) =>
    c.inputs.includes(elementId)
  )

  const getElementName = (id: string) => {
    const el = analysis.elements.find((el) => el.id === id)
    return el ? translateElementName(el.name, language) : 'Unknown'
  }

  const getElementEmoji = (id: string) => {
    return analysis.elements.find((el) => el.id === id)?.emoji || '❓'
  }

  const displayName = translateElementName(element.name, language)

  return (
    <div className="element-detail-overlay" onClick={onClose}>
      <div className="element-detail" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          ✕
        </button>

        <div className="element-header">
          <div className="element-emoji-large">{element.emoji}</div>
          <div className="element-header-text">
            <h2>{displayName}</h2>
            <p className="element-id">{element.id}</p>
          </div>
        </div>

        <div className="element-stats">
          <div className="stat">
            <div className="stat-value">
              {combinationsAsOutput.length}
            </div>
            <div className="stat-label">{t('waysToCreate')}</div>
          </div>
          <div className="stat">
            <div className="stat-value">
              {combinationsAsInput.length}
            </div>
            <div className="stat-label">{t('usedInRecipes')}</div>
          </div>
        </div>

        {combinationsAsOutput.length > 0 && (
          <section className="recipes-section">
            <h3>
              {t('waysToCreateTitle')} {displayName}
            </h3>
            <div className="recipes-list">
              {combinationsAsOutput.map((combo) => (
                <div key={combo.id} className="recipe-item">
                  <div className="recipe-inputs">
                    {combo.inputs.map((inputId, idx) => (
                      <div key={inputId} className="recipe-ingredient">
                        <span className="ingredient-emoji">
                          {getElementEmoji(inputId)}
                        </span>
                        <span className="ingredient-name">
                          {getElementName(inputId)}
                        </span>
                        {idx < combo.inputs.length - 1 && (
                          <span className="recipe-separator">+</span>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="recipe-arrow">→</div>
                  <div className="recipe-output">
                    <span className="ingredient-emoji">
                      {element.emoji}
                    </span>
                    <span className="ingredient-name">{displayName}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {combinationsAsInput.length > 0 && (
          <section className="recipes-section">
            <h3>
              {displayName} {t('isUsedToCreate')}
            </h3>
            <div className="recipes-list">
              {combinationsAsInput.slice(0, 10).map((combo) => (
                <div key={combo.id} className="recipe-item">
                  <div className="recipe-inputs">
                    {combo.inputs.map((inputId, idx) => (
                      <div key={inputId} className="recipe-ingredient">
                        <span className="ingredient-emoji">
                          {getElementEmoji(inputId)}
                        </span>
                        <span className="ingredient-name">
                          {getElementName(inputId)}
                        </span>
                        {idx < combo.inputs.length - 1 && (
                          <span className="recipe-separator">+</span>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="recipe-arrow">→</div>
                  <div className="recipe-output">
                    <span className="ingredient-emoji">
                      {getElementEmoji(combo.output)}
                    </span>
                    <span className="ingredient-name">
                      {getElementName(combo.output)}
                    </span>
                  </div>
                </div>
              ))}
              {combinationsAsInput.length > 10 && (
                <div className="more-recipes">
                  +{combinationsAsInput.length - 10} {t('recipes')}
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
