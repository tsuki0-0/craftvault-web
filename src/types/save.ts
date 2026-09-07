// Estrutura real do arquivo .ic do Infinite Craft
export interface InfiniteCraftRawSave {
  name: string
  version: string
  created: number
  updated: number
  instances: unknown[]
  items: InfiniteCraftElement[]
}

export interface InfiniteCraftElement {
  id: number
  text: string
  emoji: string
  recipes: number[][] // array de [ingrediente1, ingrediente2]
}

// Estrutura normalizada que o CraftVault usa internamente
export interface CraftVaultElement {
  id: string
  name: string
  emoji: string
  source: "original" // ORIGINAL | ANALYZED | INFERENCE | COMMUNITY
  metadata: {
    infiniteCraftId?: number
    recipes?: string[] // IDs das combinações
  }
}

export interface CraftVaultCombination {
  id: string
  inputs: string[] // IDs dos elementos
  output: string // ID do elemento resultado
  source: "original"
}

export interface CraftVaultAnalysis {
  saveId: string
  totalElements: number
  elements: CraftVaultElement[]
  combinations: CraftVaultCombination[]
  statistics: {
    discoveredAt?: number
    rareElements?: number
  }
}
