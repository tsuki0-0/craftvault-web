import { useState } from 'react'
import type { CraftVaultAnalysis } from '../types/save'
import { SaveAnalyzer } from '../services/analyzer'
import { SearchBar } from './SearchBar'
import { CategoriesView } from './CategoriesView'
import { useI18n } from '../i18n/LanguageContext'
import { translateElementName } from '../i18n/elementNames'
import '../styles/dashboard.css'

interface DashboardProps {
  analysis: CraftVaultAnalysis
  onElementClick: (elementId: string) => void
}

export function Dashboard({ analysis, onElementClick }: DashboardProps) {
  const [showCategories, setShowCategories] = useState(false)
  const stats = SaveAnalyzer.analyze(analysis)
  const topElements = SaveAnalyzer.getTopElements(analysis, 5)
  const basicElements = SaveAnalyzer.getBasicElements(analysis, 5)
  const { t, language } = useI18n()

  return (
    <div className="dashboard">
      <SearchBar analysis={analysis} onElementSelect={onElementClick} />

      <div className="dashboard-header">
        <h2>{t('saveAnalysis')}</h2>
        <p className="save-name">{analysis.saveId}</p>
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

      <section className="insights-grid">
        <InsightCard
          title={t('averageRecipesPerElement')}
          value={stats.averageRecipesPerElement.toString()}
          description={t('howManyWays')}
        />
        <InsightCard
          title={t('mostUsedElement')}
          value={stats.mostCommonRecipeCount.toString()}
          description={t('maxRecipes')}
        />
      </section>

      <div className="categories-toggle">
        <button
          className="toggle-button"
          onClick={() => setShowCategories(!showCategories)}
        >
          {showCategories ? '▼' : '▶'} Ver Categorias
        </button>
      </div>

      {showCategories && (
        <CategoriesView
          analysis={analysis}
          onElementClick={onElementClick}
        />
      )}

      <section className="elements-section">
        <div className="elements-list">
          <h3>{t('mostProductiveElements')}</h3>
          <div className="element-items">
            {topElements.map((el) => (
              <button
                key={el.id}
                className="element-item-button"
                onClick={() => onElementClick(el.id)}
              >
                <span className="element-emoji">{el.emoji}</span>
                <div className="element-info">
                  <strong>{translateElementName(el.name, language)}</strong>
                  <small>
                    {el.metadata.recipes?.length ?? 0} {t('recipes')}
                  </small>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="elements-list">
          <h3>{t('basicElementsList')}</h3>
          <div className="element-items">
            {basicElements.slice(0, 5).map((el) => (
              <button
                key={el.id}
                className="element-item-button"
                onClick={() => onElementClick(el.id)}
              >
                <span className="element-emoji">{el.emoji}</span>
                <div className="element-info">
                  <strong>{translateElementName(el.name, language)}</strong>
                  <small>{t('startingElement')}</small>
                </div>
              </button>
            ))}
          </div>
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

function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <div className="stat-card-dashboard">
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <div className="stat-value">{value.toLocaleString()}</div>
        <div className="stat-label">{label}</div>
      </div>
    </div>
  )
}

interface InsightCardProps {
  title: string
  value: string
  description: string
}

function InsightCard({ title, value, description }: InsightCardProps) {
  return (
    <div className="insight-card">
      <h4>{title}</h4>
      <div className="insight-value">{value}</div>
      <p className="insight-description">{description}</p>
    </div>
  )
}
