import { supabase } from '../lib/supabase'
import type { CraftVaultAnalysis } from '../types/save'

export interface CommunitySave {
  id: string
  user_id: string
  name: string
  description: string
  downloads: number
  created_at: string
  updated_at: string
  user_email?: string
}

export const CommunitySavesService = {
  async uploadSave(
    name: string,
    description: string,
    analysis: CraftVaultAnalysis
  ) {
    const { data, error } = await supabase
      .from('community_saves')
      .insert([
        {
          name,
          description,
          data: analysis
        }
      ])
      .select()

    if (error) throw error
    return data?.[0]
  },

  async listSaves(limit = 50, offset = 0) {
    const { data, error, count } = await supabase
      .from('community_saves')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) throw error
    return { saves: data || [], total: count || 0 }
  },

  async getSave(id: string) {
    const { data, error } = await supabase
      .from('community_saves')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  async getUserSaves(userId: string) {
    const { data, error } = await supabase
      .from('community_saves')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  async deleteSave(id: string) {
    const { error } = await supabase
      .from('community_saves')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  async updateSave(
    id: string,
    name: string,
    description: string
  ) {
    const { data, error } = await supabase
      .from('community_saves')
      .update({ name, description, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()

    if (error) throw error
    return data?.[0]
  }
}
