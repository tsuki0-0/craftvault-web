import type {
  InfiniteCraftRawSave,
  CraftVaultElement,
  CraftVaultCombination,
  CraftVaultAnalysis,
} from '../types/save'

export class SaveNormalizer {
  /**
   * Transforma um save bruto do Infinite Craft em estrutura CraftVault
   * 
   * Mapa de IDs:
   * - Infinite Craft: id (number) ex: 1, 201, 193
   * - CraftVault: id (string) ex: "ic_1", "ic_201", "ic_193"
   */
  static normalize(rawSave: InfiniteCraftRawSave, saveId: string): CraftVaultAnalysis {
    // Passo 1: Mapear elementos
    const elements: CraftVaultElement[] = rawSave.items.map((item) => ({
      id: `ic_${item.id}`,
      name: item.text,
      emoji: item.emoji,
      source: 'original',
      metadata: {
        infiniteCraftId: item.id,
        recipes: [], // Preencheremos depois
      },
    }))

    // Passo 2: Construir mapa ID → elemento para busca rápida
    const elementMap = new Map<number, CraftVaultElement>()
    rawSave.items.forEach((item, index) => {
      elementMap.set(item.id, elements[index])
    })

    // Passo 3: Mapear combinações (receitas)
    const combinations: CraftVaultCombination[] = []
    const combinationMap = new Map<string, CraftVaultCombination>()

    rawSave.items.forEach((item) => {
      item.recipes.forEach((recipe) => {
        const [input1Id, input2Id] = recipe
        const input1 = elementMap.get(input1Id)
        const input2 = elementMap.get(input2Id)
        const output = elements.find((el) => el.metadata.infiniteCraftId === item.id)

        if (input1 && input2 && output) {
          const combinationId = `ic_${input1Id}_${input2Id}_${item.id}`
          const combination: CraftVaultCombination = {
            id: combinationId,
            inputs: [input1.id, input2.id],
            output: output.id,
            source: 'original',
          }

          combinationMap.set(combinationId, combination)

          // Adicionar ao metadata do elemento output
          if (!output.metadata.recipes) {
            output.metadata.recipes = []
          }
          output.metadata.recipes.push(combinationId)
        }
      })
    })

    combinations.push(...combinationMap.values())

    // Passo 4: Retornar análise normalizada
    return {
      saveId,
      totalElements: elements.length,
      elements,
      combinations,
      statistics: {
        discoveredAt: rawSave.created,
        rareElements: 0, // Calcularemos depois
      },
    }
  }
}
