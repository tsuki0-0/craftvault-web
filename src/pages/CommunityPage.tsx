import { useEffect, useState } from 'react'
import { CommunitySavesService, type CommunitySave } from '../services/communitySaves'
import '../styles/community.css'

export function CommunityPage() {
  const [saves, setSaves] = useState<CommunitySave[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadSaves()
  }, [])

  async function loadSaves() {
    try {
      setLoading(true)
      const { saves } = await CommunitySavesService.listSaves()
      setSaves(saves)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar saves')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="community-page">
      <div className="community-header">
        <h1>🌍 Comunidade CraftVault</h1>
        <p>Descubra e compartilhe saves incríveis com a comunidade</p>
      </div>

      {loading ? (
        <div className="community-loading">Carregando saves...</div>
      ) : error ? (
        <div className="community-error">{error}</div>
      ) : saves.length === 0 ? (
        <div className="community-empty">
          <p>Nenhum save compartilhado ainda.</p>
          <p>Seja o primeiro a compartilhar seu save! 🎉</p>
        </div>
      ) : (
        <div className="community-grid">
          {saves.map((save) => (
            <div key={save.id} className="community-card">
              <h3>{save.name}</h3>
              <p className="save-description">{save.description}</p>
              <div className="save-stats">
                <span>📥 {save.downloads} downloads</span>
                <span>📅 {new Date(save.created_at).toLocaleDateString('pt-BR')}</span>
              </div>
              <button className="download-button">
                ⬇️ Baixar Save
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
