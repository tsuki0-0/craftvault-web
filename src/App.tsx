import { useRef, useState } from 'react'
import './App.css'
import { SaveParser } from './services/parser'
import { SaveNormalizer } from './services/normalizer'
import { Dashboard } from './components/Dashboard'
import { ElementDetail } from './components/ElementDetail'
import { LanguageSwitcher } from './components/LanguageSwitcher'
import { useI18n } from './i18n/LanguageContext'
import type { CraftVaultAnalysis } from './types/save'

function App() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [analysis, setAnalysis] = useState<CraftVaultAnalysis | null>(null)
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { t } = useI18n()

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    setSelectedFile(file)
    setError(null)
    setLoading(true)

    try {
      const rawSave = await SaveParser.parseFile(file)
      const normalized = SaveNormalizer.normalize(rawSave, `save_${Date.now()}`)
      setAnalysis(normalized)
      setSelectedElementId(null)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  function openFilePicker() {
    fileInputRef.current?.click()
  }

  if (analysis) {
    return (
      <div className="app">
        <header className="header">
          <div className="logo">
            <span className="logo-mark">C</span>
            <span>CRAFT<span>VAULT</span></span>
          </div>

          <nav className="nav">
            <a href="#explore" onClick={() => setAnalysis(null)}>
              {t('home')}
            </a>
            <a href="#community">{t('community')}</a>
            <a href="#about">{t('about')}</a>
          </nav>

          <div className="header-buttons">
            <LanguageSwitcher />
            <button className="header-button" onClick={() => setAnalysis(null)}>
              {t('newImport')}
            </button>
          </div>
        </header>

        <Dashboard analysis={analysis} onElementClick={setSelectedElementId} />

        {selectedElementId && (
          <ElementDetail
            analysis={analysis}
            elementId={selectedElementId}
            onClose={() => setSelectedElementId(null)}
          />
        )}

        <footer id="about">
          <div className="logo">
            <span className="logo-mark">C</span>
            <span>CRAFT<span>VAULT</span></span>
          </div>
          <p>{t('slogan')}</p>
        </footer>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <span className="logo-mark">C</span>
          <span>CRAFT<span>VAULT</span></span>
        </div>

        <nav className="nav">
          <a href="#explore">{t('home')}</a>
          <a href="#community">{t('community')}</a>
          <a href="#about">{t('about')}</a>
        </nav>

        <div className="header-buttons">
          <LanguageSwitcher />
          <button className="header-button">{t('getStarted')}</button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-badge">
            <span></span>
            {t('heroTagline')}
          </div>

          <h1>
            {t('heroTitle1')}
            <br />
            <span>{t('heroTitle2')}</span>
          </h1>

          <p className="hero-description">{t('heroDescription')}</p>

          <div className="hero-actions">
            <button className="primary-button" onClick={openFilePicker}>
              {t('importYourSave')}
              <span>→</span>
            </button>
            <button className="secondary-button">{t('exploreCommunity')}</button>
          </div>
        </section>

        <section className="stats">
          <div className="stat-card">
            <strong>0</strong>
            <span>{t('elementsAnalyzed')}</span>
          </div>
          <div className="stat-card">
            <strong>0</strong>
            <span>{t('combinations')}</span>
          </div>
          <div className="stat-card">
            <strong>0</strong>
            <span>{t('communitySaves')}</span>
          </div>
          <div className="stat-card">
            <strong>∞</strong>
            <span>{t('possibilities')}</span>
          </div>
        </section>

        <section className="import-section" id="explore">
          <div className="section-heading">
            <span className="section-label">{t('startExploring')}</span>
            <h2>{t('bringDiscoveries')}</h2>
            <p>{t('importDescription')}</p>
          </div>

          <div className="import-card">
            <div className="upload-icon">{loading ? '⏳' : '↑'}</div>
            <h3>{t('uploadSave')}</h3>
            <p>{t('uploadDescription')}</p>

            <input
              ref={fileInputRef}
              type="file"
              hidden
              accept=".ic"
              onChange={handleFileChange}
            />

            <button
              className="primary-button"
              onClick={openFilePicker}
              disabled={loading}
            >
              {loading ? t('processing') : t('chooseFile')}
              <span>→</span>
            </button>

            {selectedFile && (
              <div className="selected-file">
                <strong>{selectedFile.name}</strong>
                <span>{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span>
              </div>
            )}

            {error && (
              <div className="error-message">
                <strong>{t('error')}:</strong> {error}
              </div>
            )}

            <small>{t('supportedFormat')}</small>
          </div>
        </section>

        <section className="features" id="community">
          <div className="feature">
            <div className="feature-number">01</div>
            <h3>{t('analyze')}</h3>
            <p>{t('analyzeDescription')}</p>
          </div>
          <div className="feature">
            <div className="feature-number">02</div>
            <h3>{t('organize')}</h3>
            <p>{t('organizeDescription')}</p>
          </div>
          <div className="feature">
            <div className="feature-number">03</div>
            <h3>{t('share')}</h3>
            <p>{t('shareDescription')}</p>
          </div>
        </section>
      </main>

      <footer id="about">
        <div className="logo">
          <span className="logo-mark">C</span>
          <span>CRAFT<span>VAULT</span></span>
        </div>
        <p>{t('slogan')}</p>
      </footer>
    </div>
  )
}

export default App
