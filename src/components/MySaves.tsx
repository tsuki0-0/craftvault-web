import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import {
  createSaveWithFile,
  deleteSave,
  getMySaves,
  type SaveVisibility,
} from '../services/saveService'
import '../styles/my-saves.css'

interface Save {
  id: string
  name: string
  description: string | null
  file_path: string
  file_size: number | null
  element_count: number
  discovery_count: number
  combination_count: number
  visibility: SaveVisibility
  created_at: string
}

export function MySaves() {
  const { user } = useAuth()

  const [saves, setSaves] = useState<Save[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const loadSaves = useCallback(async () => {
    if (!user) {
      setSaves([])
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError('')

      const data = await getMySaves(user.id)
      setSaves((data ?? []) as Save[])
    } catch (err) {
      console.error(err)
      setError('Não foi possível carregar seus saves.')
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    loadSaves()
  }, [loadSaves])

  async function handleUpload(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0]

    if (!file || !user) {
      return
    }

    try {
      setUploading(true)
      setError('')
      setSuccess('')

      const saveName = file.name.replace(/\.ic$/i, '')

      await createSaveWithFile(file, user.id, {
        name: saveName,
        description: 'Save importado pelo CraftVault.',
        visibility: 'PRIVATE',
      })

      setSuccess('Save importado com sucesso.')
      await loadSaves()
    } catch (err) {
      console.error(err)

      let message = 'Não foi possível importar o save.'

      if (err instanceof Error) {
        message = err.message
      } else if (err && typeof err === 'object') {
        const e = err as {
          message?: string
          error_description?: string
          details?: string
          hint?: string
        }

        message =
          e.message ||
          e.error_description ||
          e.details ||
          e.hint ||
          message
      }

      console.error('CRAFTVAULT UPLOAD ERROR:', err)
      setError(`Erro ao importar: ${message}`)
    } finally {
      setUploading(false)
      event.target.value = ''
    }
  }

  async function handleDelete(save: Save) {
    const confirmed = window.confirm(
      `Excluir o save "${save.name}"? Esta ação não pode ser desfeita.`,
    )

    if (!confirmed || !user) {
      return
    }

    try {
      setError('')
      setSuccess('')

      await deleteSave(
        save.id,
        user.id,
        save.file_path,
      )

      setSaves((current) =>
        current.filter((item) => item.id !== save.id),
      )

      setSuccess('Save excluído.')
    } catch (err) {
      console.error(err)
      setError('Não foi possível excluir o save.')
    }
  }

  function formatSize(bytes: number | null) {
    if (bytes === null) {
      return 'Tamanho desconhecido'
    }

    if (bytes < 1024) {
      return `${bytes} B`
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  }

  if (!user) {
    return (
      <section className="my-saves">
        <div className="my-saves-empty">
          <h2>Meus Saves</h2>
          <p>
            Faça login para armazenar e gerenciar seus saves.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="my-saves">
      <div className="my-saves-header">
        <div>
          <span className="my-saves-kicker">
            VAULT / PERSONAL
          </span>

          <h2>Meus Saves</h2>

          <p>
            Seus arquivos do Infinite Craft armazenados
            com segurança.
          </p>
        </div>

        <label
          className={`my-saves-upload ${
            uploading ? 'is-uploading' : ''
          }`}
        >
          <input
            type="file"
            accept=".ic,application/octet-stream"
            onChange={handleUpload}
            disabled={uploading}
          />

          {uploading
            ? 'Importando...'
            : '+ Importar Save'}
        </label>
      </div>

      {error && (
        <div className="my-saves-message error">
          {error}
        </div>
      )}

      {success && (
        <div className="my-saves-message success">
          {success}
        </div>
      )}

      {loading ? (
        <div className="my-saves-loading">
          Carregando seus saves...
        </div>
      ) : saves.length === 0 ? (
        <div className="my-saves-empty">
          <div className="my-saves-empty-icon">C</div>

          <h3>Nenhum save ainda</h3>

          <p>
            Importe seu primeiro arquivo <strong>.ic</strong>{' '}
            para começar a construir seu Vault.
          </p>
        </div>
      ) : (
        <div className="my-saves-grid">
          {saves.map((save) => (
            <article
              className="my-save-card"
              key={save.id}
            >
              <div className="my-save-card-top">
                <span className="my-save-file">
                  .IC
                </span>

                <span
                  className={`my-save-visibility ${save.visibility.toLowerCase()}`}
                >
                  {save.visibility}
                </span>
              </div>

              <h3>{save.name}</h3>

              <p className="my-save-description">
                {save.description ||
                  'Sem descrição.'}
              </p>

              <div className="my-save-stats">
                <span>
                  <strong>
                    {save.element_count}
                  </strong>
                  elementos
                </span>

                <span>
                  <strong>
                    {save.discovery_count}
                  </strong>
                  descobertas
                </span>

                <span>
                  <strong>
                    {save.combination_count}
                  </strong>
                  combinações
                </span>
              </div>

              <div className="my-save-footer">
                <span>
                  {formatSize(save.file_size)}
                </span>

                <button
                  type="button"
                  onClick={() => handleDelete(save)}
                >
                  Excluir
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
