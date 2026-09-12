import type { CraftVaultAnalysis } from '../types/save'
import { Categorizer, type ElementCategory } from '../services/categorizer'
import { useI18n } from '../i18n/LanguageContext'
import { translateElementName } from '../i18n/elementNames'
import '../styles/categories-view.css'

interface CategoriesViewProps {
  analysis: CraftVaultAnalysis
  onElementClick: (elementId: string) => void
}

export function CategoriesView({ analysis, onElementClick }: CategoriesViewProps) {
  const { language } = useI18n()
  const categorized = Categorizer.categorizeAll(analysis.elements)

  // Ordenar por quantidade de elementos (maior primeiro)
  const sortedCategories = Array.from(categorized.entries())
    .filter(([_, elements]) => elements.length > 0)
    .sort((a, b) => b[1].length - a[1].length)

  return (
    <div className="categories-view">
      <div className="categories-header">
        <h2>Elementos por Categoria</h2>
        <p className="categories-subtitle">
          {analysis.elements.length} elementos classificados
        </p>
      </div>

      <div className="categories-grid">
        {sortedCategories.map(([category, elements]) => (
          <div key={category} className="category-section">
            <div className="category-title">
              <h3>{Categorizer.getCategoryLabel(category as ElementCategory)}</h3>
              <span className="category-count">{elements.length}</span>
            </div>

            <div className="category-elements">
              {elements.slice(0, 8).map((el) => (
                <button
                  key={el.id}
                  className="category-element-button"
                  onClick={() => onElementClick(el.id)}
                  title={translateElementName(el.name, language)}
                >
                  <span className="cat-emoji">{el.emoji}</span>
                  <span className="cat-name">
                    {translateElementName(el.name, language)}
                  </span>
                </button>
              ))}
              
              {elements.length > 8 && (
                <div className="category-more">
                  +{elements.length - 8} mais
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
