import type { CraftVaultAnalysis } from '../types/save'
import { Categorizer } from '../services/categorizer'
import { useI18n } from '../i18n/LanguageContext'
import { translateElementName } from '../i18n/elementNames'
import '../styles/element-detail.css'

interface ElementDetailProps {
  analysis: CraftVaultAnalysis
  elementId: string
  onClose: () => void
  onElementClick?: (elementId: string) => void
}

export function ElementDetail({
  analysis,
  elementId,
  onClose,
  onElementClick,
}: ElementDetailProps) {
  const element = analysis.elements.find(
    (el) => el.id === elementId
  )

  const { t, language } = useI18n()

  if (!element) return null

  const category = Categorizer.categorize(element)
  const categoryLabel =
    Categorizer.getCategoryLabel(category)

  const categoryIcon =
    Categorizer.getCategoryIcon(category)

  const combinationsAsOutput =
    analysis.combinations.filter(
      (combination) =>
        combination.output === elementId
    )

  const combinationsAsInput =
    analysis.combinations.filter(
      (combination) =>
        combination.inputs.includes(elementId)
    )

  const getElement = (id: string) => {
    return analysis.elements.find(
      (el) => el.id === id
    )
  }

  const getElementName = (id: string) => {
    const foundElement = getElement(id)

    return foundElement
      ? translateElementName(
          foundElement.name,
          language
        )
      : 'Unknown'
  }

  const getElementEmoji = (id: string) => {
    return getElement(id)?.emoji || '❓'
  }

  const openElement = (id: string) => {
    if (id === elementId) return

    onElementClick?.(id)
  }

  const displayName = translateElementName(
    element.name,
    language
  )

  return (
    <div
      className="element-detail-overlay"
      onClick={onClose}
    >
      <div
        className="element-detail"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <button
          className="close-button"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="element-header">
          <div className="element-emoji-large">
            {element.emoji}
          </div>

          <div className="element-header-text">
            <h2>{displayName}</h2>

            <div className="element-category">
              <span className="category-badge">
                {categoryIcon} {categoryLabel}
              </span>
            </div>

            <p className="element-id">
              {element.id}
            </p>
          </div>
        </div>

        <div className="element-stats">
          <div className="stat">
            <div className="stat-value">
              {combinationsAsOutput.length}
            </div>

            <div className="stat-label">
              {t('waysToCreate')}
            </div>
          </div>

          <div className="stat">
            <div className="stat-value">
              {combinationsAsInput.length}
            </div>

            <div className="stat-label">
              {t('usedInRecipes')}
            </div>
          </div>
        </div>

        {combinationsAsOutput.length > 0 && (
          <section className="recipes-section">
            <h3>
              {t('waysToCreateTitle')} {displayName}
            </h3>

            <div className="recipes-list">
              {combinationsAsOutput.map(
                (combination) => (
                  <div
                    key={combination.id}
                    className="recipe-item"
                  >
                    <div className="recipe-inputs">
                      {combination.inputs.map(
                        (inputId, index) => (
                          <div
                            key={`${combination.id}-${inputId}-${index}`}
                            className="recipe-ingredient"
                          >
                            <button
                              type="button"
                              className="recipe-element-button"
                              onClick={() =>
                                openElement(inputId)
                              }
                              title={`Abrir ${getElementName(inputId)}`}
                            >
                              <span className="ingredient-emoji">
                                {getElementEmoji(inputId)}
                              </span>

                              <span className="ingredient-name">
                                {getElementName(inputId)}
                              </span>
                            </button>

                            {index <
                              combination.inputs.length - 1 && (
                              <span className="recipe-separator">
                                +
                              </span>
                            )}
                          </div>
                        )
                      )}
                    </div>

                    <div className="recipe-arrow">
                      →
                    </div>

                    <button
                      type="button"
                      className="recipe-element-button recipe-output-button"
                      onClick={() =>
                        openElement(combination.output)
                      }
                      title={`Abrir ${getElementName(combination.output)}`}
                    >
                      <span className="ingredient-emoji">
                        {element.emoji}
                      </span>

                      <span className="ingredient-name">
                        {displayName}
                      </span>
                    </button>
                  </div>
                )
              )}
            </div>
          </section>
        )}

        {combinationsAsInput.length > 0 && (
          <section className="recipes-section">
            <h3>
              {displayName} {t('isUsedToCreate')}
            </h3>

            <div className="recipes-list">
              {combinationsAsInput
                .slice(0, 10)
                .map((combination) => (
                  <div
                    key={combination.id}
                    className="recipe-item"
                  >
                    <div className="recipe-inputs">
                      {combination.inputs.map(
                        (inputId, index) => (
                          <div
                            key={`${combination.id}-${inputId}-${index}`}
                            className="recipe-ingredient"
                          >
                            <button
                              type="button"
                              className="recipe-element-button"
                              onClick={() =>
                                openElement(inputId)
                              }
                              title={`Abrir ${getElementName(inputId)}`}
                            >
                              <span className="ingredient-emoji">
                                {getElementEmoji(inputId)}
                              </span>

                              <span className="ingredient-name">
                                {getElementName(inputId)}
                              </span>
                            </button>

                            {index <
                              combination.inputs.length - 1 && (
                              <span className="recipe-separator">
                                +
                              </span>
                            )}
                          </div>
                        )
                      )}
                    </div>

                    <div className="recipe-arrow">
                      →
                    </div>

                    <button
                      type="button"
                      className="recipe-element-button recipe-output-button"
                      onClick={() =>
                        openElement(combination.output)
                      }
                      title={`Abrir ${getElementName(combination.output)}`}
                    >
                      <span className="ingredient-emoji">
                        {getElementEmoji(
                          combination.output
                        )}
                      </span>

                      <span className="ingredient-name">
                        {getElementName(
                          combination.output
                        )}
                      </span>
                    </button>
                  </div>
                ))}

              {combinationsAsInput.length > 10 && (
                <div className="more-recipes">
                  +
                  {combinationsAsInput.length - 10}{' '}
                  {t('recipes')}
                </div>
              )}
            </div>
          </section>
        )}

        {combinationsAsOutput.length === 0 &&
          combinationsAsInput.length === 0 && (
            <div className="element-empty-state">
              <span>🌱</span>
              <p>
                Este elemento ainda não possui
                receitas registradas neste save.
              </p>
            </div>
          )}
      </div>
    </div>
  )
}
