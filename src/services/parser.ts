import { decompress } from 'fflate'
import type { InfiniteCraftRawSave } from '../types/save'

export class SaveParser {
  /**
   * Tenta fazer parse de um arquivo .ic do Infinite Craft
   * 1. Valida se é gzip
   * 2. Descompacta
   * 3. Faz parse do JSON
   * 4. Valida estrutura
   */
  static async parseFile(file: File): Promise<InfiniteCraftRawSave> {
    // Passo 1: Ler arquivo como ArrayBuffer
    const buffer = await file.arrayBuffer()
    const uint8Array = new Uint8Array(buffer)

    // Passo 2: Validar se é GZIP (começa com 1f 8b)
    if (uint8Array[0] !== 0x1f || uint8Array[1] !== 0x8b) {
      throw new Error(
        'Invalid file format. Expected a .ic file (GZIP compressed).'
      )
    }

    // Passo 3: Descompactar com fflate
    let decompressed: Uint8Array
    try {
      decompressed = await new Promise((resolve, reject) => {
        decompress(uint8Array, (err, data) => {
          if (err) reject(err)
          else resolve(data)
        })
      })
    } catch (error) {
      throw new Error(
        `Failed to decompress file: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }

    // Passo 4: Converter bytes para string UTF-8
    const text = new TextDecoder().decode(decompressed)

    // Passo 5: Parse JSON
    let json: unknown
    try {
      json = JSON.parse(text)
    } catch (error) {
      throw new Error(
        `Invalid JSON inside file: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }

    // Passo 6: Validar estrutura esperada
    const save = json as InfiniteCraftRawSave
    if (
      !save.name ||
      !save.version ||
      !Array.isArray(save.items)
    ) {
      throw new Error(
        'Invalid save structure. Missing required fields: name, version, items.'
      )
    }

    return save
  }
}
