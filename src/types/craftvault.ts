export type DataProvenance =
  | 'ORIGINAL'
  | 'ANALYZED'
  | 'INFERENCE'
  | 'COMMUNITY'

export type ClassificationStatus =
  | 'CONFIRMED'
  | 'INFERRED'
  | 'UNKNOWN'

export interface CraftElement {
  id: string
  name: string
  discovered: boolean
  category: string[]
  rarity: number | null
  sources: string[]
  metadata: Record<string, unknown>
  provenance: DataProvenance
  classificationStatus: ClassificationStatus
}

export interface ImportedSave {
  id: string
  fileName: string
  fileSize: number
  importedAt: string
  rawData: unknown
  elements: CraftElement[]
}
