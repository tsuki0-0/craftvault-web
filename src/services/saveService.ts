import { supabase } from '../lib/supabase'

export type SaveVisibility = 'PRIVATE' | 'UNLISTED' | 'PUBLIC'

export interface SaveMetadata {
  name: string
  description?: string
  fileSize?: number
  elementCount?: number
  discoveryCount?: number
  combinationCount?: number
  visibility?: SaveVisibility
}

export async function uploadSaveFile(
  file: File,
  userId: string,
  saveId: string,
): Promise<string> {
  const extension = file.name.toLowerCase().endsWith('.ic')
    ? '.ic'
    : ''

  if (!extension) {
    throw new Error('Apenas arquivos .ic são permitidos.')
  }

  if (file.size > 10 * 1024 * 1024) {
    throw new Error('O arquivo excede o limite de 10 MB.')
  }

  const filePath = `${userId}/${saveId}.ic`

  const { error } = await supabase.storage
    .from('craftvault-saves')
    .upload(filePath, file, {
      upsert: false,
      contentType: file.type || 'application/octet-stream',
    })

  if (error) {
    throw error
  }

  return filePath
}

export async function createSave(
  userId: string,
  metadata: SaveMetadata,
) {
  const { data, error } = await supabase
    .from('saves')
    .insert({
      user_id: userId,
      name: metadata.name,
      description: metadata.description ?? null,
      file_path: '',
      file_size: metadata.fileSize ?? null,
      element_count: metadata.elementCount ?? 0,
      discovery_count: metadata.discoveryCount ?? 0,
      combination_count: metadata.combinationCount ?? 0,
      visibility: metadata.visibility ?? 'PRIVATE',
    })
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}

export async function updateSaveFilePath(
  saveId: string,
  userId: string,
  filePath: string,
) {
  const { data, error } = await supabase
    .from('saves')
    .update({
      file_path: filePath,
    })
    .eq('id', saveId)
    .eq('user_id', userId)
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}

export async function createSaveWithFile(
  file: File,
  userId: string,
  metadata: SaveMetadata,
) {
  const save = await createSave(userId, {
    ...metadata,
    fileSize: file.size,
  })

  try {
    const filePath = await uploadSaveFile(
      file,
      userId,
      save.id,
    )

    return await updateSaveFilePath(
      save.id,
      userId,
      filePath,
    )
  } catch (error) {
    await supabase
      .from('saves')
      .delete()
      .eq('id', save.id)
      .eq('user_id', userId)

    throw error
  }
}

export async function getMySaves(userId: string) {
  const { data, error } = await supabase
    .from('saves')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return data
}

export async function deleteSave(
  saveId: string,
  userId: string,
  filePath: string,
) {
  const { error: storageError } = await supabase.storage
    .from('craftvault-saves')
    .remove([filePath])

  if (storageError) {
    throw storageError
  }

  const { error } = await supabase
    .from('saves')
    .delete()
    .eq('id', saveId)
    .eq('user_id', userId)

  if (error) {
    throw error
  }
}
