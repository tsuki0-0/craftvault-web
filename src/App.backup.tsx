import './App.css'

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <span className="logo-mark">C</span>
          <span>
            CRAFT<span>VAULT</span>
          </span>
        </div>

        <nav className="nav">
          <a href="#explore">Explore</a>
          <a href="#community">Community</a>
          <a href="#about">About</a>
        </nav>

        <button className="header-button">Get Started</button>
      </header>

      <main>
        <section className="hero">
          <div className="hero-badge">
            <span></span>
            The Infinite Craft knowledge archive
          </div>

          <h1>
            Discover.
            <br />
            <span>Analyze. Share.</span>
          </h1>

          <p className="hero-description">
            Transform your Infinite Craft discoveries into organized,
            searchable and shareable knowledge.
          </p>

          <div className="hero-actions">
            <button className="primary-button">
              Import your save
              <span>→</span>
            </button>

            <button className="secondary-button">
              Explore community
            </button>
          </div>
        </section>

        <section className="stats">
          <div className="stat-card">
            <strong>0</strong>
            <span>Elements analyzed</span>
          </div>

          <div className="stat-card">
            <strong>0</strong>
            <span>Discoveries</span>
          </div>

          <div className="stat-card">
            <strong>0</strong>
            <span>Community saves</span>
          </div>

          <div className="stat-card">
            <strong>∞</strong>
            <span>Possibilities</span>
          </div>
        </section>

        <section className="import-section" id="explore">
          <div className="section-heading">
            <span className="section-label">START EXPLORING</span>

            <h2>Bring your discoveries into the Vault.</h2>

            <p>
              Import your Infinite Craft data and let CraftVault organize
              what you've discovered.
            </p>
          </div>

          <div className="import-card">
            <div className="upload-icon">↑</div>

            <h3>Import your save</h3>

            <p>
              Upload your save data or paste it directly.
              <br />
              Your original data will never be modified.
            </p>

            <button className="primary-button">
              Choose file
              <span>→</span>
            </button>

            <small>
              Supported formats will be detected automatically.
            </small>
          </div>
        </section>

        <section className="features" id="community">
          <div className="feature">
            <div className="feature-number">01</div>

            <h3>Analyze</h3>

            <p>
              Understand your collection with statistics, categories,
              discoveries and useful insights.
            </p>
          </div>

          <div className="feature">
            <div className="feature-number">02</div>

            <h3>Organize</h3>

            <p>
              Turn thousands of elements into a structured knowledge base
              that is easy to explore.
            </p>
          </div>

          <div className="feature">
            <div className="feature-number">03</div>

            <h3>Share</h3>

            <p>
              Publish your discoveries and contribute to a growing
              community archive.
            </p>
          </div>
        </section>
      </main>

      <footer id="about">
        <div className="logo">
          <span className="logo-mark">C</span>

          <span>
            CRAFT<span>VAULT</span>
          </span>
        </div>

        <p>Discover. Analyze. Share.</p>
      </footer>
    </div>
  )
}

export default App
