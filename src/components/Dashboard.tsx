import { useMemo, useState } from 'react'
import type { CraftVaultAnalysis } from '../types/save'
import { SaveAnalyzer } from '../services/analyzer'
import { Categorizer, type ElementCategory } from '../services/categorizer'
import { SearchBar } from './SearchBar'
import { useI18n } from '../i18n/LanguageContext'
import { translateElementName } from '../i18n/elementNames'
import '../styles/dashboard.css'

interface DashboardProps {
  analysis: CraftVaultAnalysis
  onElementClick: (elementId: string) => void
}

type CategorySelection = 'all' | ElementCategory

export function Dashboard({
  analysis,
  onElementClick,
}: DashboardProps) {
  const { t, language } = useI18n()
  const [selectedCategory, setSelectedCategory] =
    useState<CategorySelection>('all')

  const stats = useMemo(
    () => SaveAnalyzer.analyze(analysis),
    [analysis]
  )

  const topElements = useMemo(
    () => SaveAnalyzer.getTopElements(analysis, 5),
    [analysis]
  )

  const mostUsedElements = useMemo(
    () => SaveAnalyzer.getMostUsedElements(analysis, 5),
    [analysis]
  )

  const basicElements = useMemo(
    () => SaveAnalyzer.getBasicElements(analysis, 5),
    [analysis]
  )

  const categoryStats = useMemo(
    () => SaveAnalyzer.getCategoryStats(analysis),
    [analysis]
  )

  const categoryElements = useMemo(() => {
    if (selectedCategory === 'all') {
      return analysis.elements
    }

    return SaveAnalyzer.getElementsByCategory(
      analysis,
      selectedCategory
    )
  }, [analysis, selectedCategory])

  const visibleCategoryElements =
    categoryElements.slice(0, 48)

  const selectedCategoryLabel =
    selectedCategory === 'all'
      ? 'Todos os elementos'
      : Categorizer.getCategoryLabel(selectedCategory)

  const selectedCategoryIcon =
    selectedCategory === 'all'
      ? '✦'
      : Categorizer.getCategoryIcon(selectedCategory)

  const mostUsedCount = stats.mostUsedElement
    ? SaveAnalyzer.getUsageCount(
        analysis,
        stats.mostUsedElement.id
      )
    : 0

  return (
    <div className="dashboard">
      <SearchBar
        analysis={analysis}
        onElementSelect={onElementClick}
      />

      <div className="dashboard-header">
        <h2>{t('saveAnalysis')}</h2>
        <p className="save-name">
          {analysis.saveId}
        </p>
      </div>

      <section className="stats-grid">
        <StatCard
          label={t('totalElements')}
          value={stats.totalElements}
          icon="📦"
        />

        <StatCard
          label={t('combinations')}
          value={stats.totalCombinations}
          icon="🔗"
        />

        <StatCard
          label={t('withRecipes')}
          value={stats.elementsWithRecipes}
          icon="✨"
        />

        <StatCard
          label={t('basicElements')}
          value={stats.elementsWithoutRecipes}
          icon="🌱"
        />
      </section>

      <section className="dashboard-highlights">
        <HighlightCard
          icon="🏆"
          title="Mais produtivo"
          element={stats.mostProductiveElement}
          value={
            stats.mostProductiveElement
              ? `${
                  stats.mostCommonRecipeCount
                } receitas`
              : 'Nenhum'
          }
          language={language}
          onElementClick={onElementClick}
        />

        <HighlightCard
          icon="🔥"
          title="Mais utilizado"
          element={stats.mostUsedElement}
          value={
            stats.mostUsedElement
              ? `${mostUsedCount} usos`
              : 'Nenhum'
          }
          language={language}
          onElementClick={onElementClick}
        />

        <div className="highlight-card">
          <div className="highlight-icon">🧬</div>

          <div className="highlight-content">
            <span className="highlight-title">
              Conexões
            </span>

            <strong className="highlight-number">
              {stats.highlyConnectedElements.toLocaleString()}
            </strong>

            <small>
              elementos altamente conectados
            </small>
          </div>
        </div>

        <div className="highlight-card">
          <div className="highlight-icon">📐</div>

          <div className="highlight-content">
            <span className="highlight-title">
              Média de receitas
            </span>

            <strong className="highlight-number">
              {stats.averageRecipesPerElement}
            </strong>

            <small>
              receitas por elemento
            </small>
          </div>
        </div>
      </section>

      <section className="categories-section category-browser">
        <div className="category-browser-header">
          <span className="section-label">
            ORGANIZAÇÃO
          </span>

          <h3>Categorias dos elementos</h3>

          <p>
            Explore os elementos do seu save por
            categoria.
          </p>
        </div>

        <div className="category-filters">
          <button
            type="button"
            className={`category-filter ${
              selectedCategory === 'all'
                ? 'active'
                : ''
            }`}
            onClick={() =>
              setSelectedCategory('all')
            }
          >
            <span className="category-filter-icon">
              ✦
            </span>

            <span className="category-filter-content">
              <span className="category-filter-name">
                Todos
              </span>

              <span className="category-filter-count">
                {analysis.elements.length.toLocaleString()}{' '}
                elementos
              </span>
            </span>
          </button>

          {categoryStats.map((item) => (
            <button
              type="button"
              key={item.category}
              className={`category-filter ${
                selectedCategory === item.category
                  ? 'active'
                  : ''
              }`}
              onClick={() =>
                setSelectedCategory(item.category)
              }
              disabled={item.count === 0}
            >
              <span className="category-filter-icon">
                {Categorizer.getCategoryIcon(
                  item.category
                )}
              </span>

              <span className="category-filter-content">
                <span className="category-filter-name">
                  {Categorizer.getCategoryLabel(
                    item.category
                  )}
                </span>

                <span className="category-filter-count">
                  {item.count.toLocaleString()}{' '}
                  elementos
                </span>
              </span>
            </button>
          ))}
        </div>

        <div className="category-results">
          <div className="category-results-header">
            <div>
              <h4 className="category-results-title">
                <span>
                  {selectedCategoryIcon}
                </span>

                <span>
                  {selectedCategoryLabel}
                </span>
              </h4>

              <span className="category-results-count">
                {categoryElements.length.toLocaleString()}{' '}
                elementos encontrados
              </span>
            </div>
          </div>

          {visibleCategoryElements.length > 0 ? (
            <>
              <div className="category-elements-grid">
                {visibleCategoryElements.map(
                  (element) => (
                    <button
                      type="button"
                      key={element.id}
                      className="category-element-button"
                      onClick={() =>
                        onElementClick(element.id)
                      }
                    >
                      <span className="element-emoji">
                        {element.emoji}
                      </span>

                      <div className="element-info">
                        <strong>
                          {translateElementName(
                            element.name,
                            language
                          )}
                        </strong>

                        <small>
                          {element.metadata.recipes
                            ?.length ?? 0}{' '}
                          {t('recipes')}
                        </small>
                      </div>
                    </button>
                  )
                )}
              </div>

              {categoryElements.length >
                visibleCategoryElements.length && (
                <div className="category-more">
                  +
                  {(
                    categoryElements.length -
                    visibleCategoryElements.length
                  ).toLocaleString()}{' '}
                  outros elementos
                </div>
              )}
            </>
          ) : (
            <div className="category-empty">
              Nenhum elemento encontrado nesta
              categoria.
            </div>
          )}
        </div>
      </section>

      <section className="elements-section">
        <div className="elements-list">
          <h3>{t('mostProductiveElements')}</h3>

          <div className="element-items">
            {topElements.map((element) => (
              <button
                type="button"
                key={element.id}
                className="element-item-button"
                onClick={() =>
                  onElementClick(element.id)
                }
              >
                <span className="element-emoji">
                  {element.emoji}
                </span>

                <div className="element-info">
                  <strong>
                    {translateElementName(
                      element.name,
                      language
                    )}
                  </strong>

                  <small>
                    {element.metadata.recipes
                      ?.length ?? 0}{' '}
                    {t('recipes')}
                  </small>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="elements-list">
          <h3>Mais utilizados</h3>

          <div className="element-items">
            {mostUsedElements.map((element) => (
              <button
                type="button"
                key={element.id}
                className="element-item-button"
                onClick={() =>
                  onElementClick(element.id)
                }
              >
                <span className="element-emoji">
                  {element.emoji}
                </span>

                <div className="element-info">
                  <strong>
                    {translateElementName(
                      element.name,
                      language
                    )}
                  </strong>

                  <small>
                    {SaveAnalyzer.getUsageCount(
                      analysis,
                      element.id
                    )}{' '}
                    usos como ingrediente
                  </small>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="elements-list">
          <h3>{t('basicElementsList')}</h3>

          <div className="element-items">
            {basicElements.map((element) => (
              <button
                type="button"
                key={element.id}
                className="element-item-button"
                onClick={() =>
                  onElementClick(element.id)
                }
              >
                <span className="element-emoji">
                  {element.emoji}
                </span>

                <div className="element-info">
                  <strong>
                    {translateElementName(
                      element.name,
                      language
                    )}
                  </strong>

                  <small>
                    {t('startingElement')}
                  </small>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="dashboard-footer-stats">
        <div>
          <span>Entradas de receitas</span>
          <strong>
            {stats.totalRecipeInputs.toLocaleString()}
          </strong>
        </div>

        <div>
          <span>Elementos isolados</span>
          <strong>
            {stats.isolatedElements.toLocaleString()}
          </strong>
        </div>

        <div>
          <span>Conexões médias</span>
          <strong>
            {stats.averageUsesPerElement}
          </strong>
        </div>
      </section>
    </div>
  )
}

interface StatCardProps {
  label: string
  value: number
  icon: string
}

function StatCard({
  label,
  value,
  icon,
}: StatCardProps) {
  return (
    <div className="stat-card-dashboard">
      <div className="stat-icon">
        {icon}
      </div>

      <div className="stat-content">
        <div className="stat-value">
          {value.toLocaleString()}
        </div>

        <div className="stat-label">
          {label}
        </div>
      </div>
    </div>
  )
}

interface HighlightCardProps {
  icon: string
  title: string
  element: CraftVaultAnalysis['elements'][number] | null
  value: string
  language: string
  onElementClick: (elementId: string) => void
}

function HighlightCard({
  icon,
  title,
  element,
  value,
  language,
  onElementClick,
}: HighlightCardProps) {
  return (
    <div className="highlight-card">
      <div className="highlight-icon">
        {element?.emoji ?? icon}
      </div>

      <div className="highlight-content">
        <span className="highlight-title">
          {title}
        </span>

        <strong className="highlight-element">
          {element
            ? translateElementName(
                element.name,
                language
              )
            : 'Nenhum'}
        </strong>

        <small>
          {value}
        </small>

        {element && (
          <button
            type="button"
            className="highlight-open"
            onClick={() =>
              onElementClick(element.id)
            }
          >
            Ver elemento →
          </button>
        )}
      </div>
    </div>
  )
}
