import type {
  CraftVaultAnalysis,
  CraftVaultElement,
} from '../types/save'

import {
  Categorizer,
  type ElementCategory,
} from './categorizer'

export interface SaveStats {
  totalElements: number
  totalCombinations: number
  elementsWithRecipes: number
  elementsWithoutRecipes: number
  averageRecipesPerElement: number
  mostCommonRecipeCount: number

  mostProductiveElement: CraftVaultElement | null
  mostUsedElement: CraftVaultElement | null

  totalRecipeInputs: number
  averageUsesPerElement: number

  isolatedElements: number
  highlyConnectedElements: number
}

export interface CategoryStats {
  category: ElementCategory
  count: number
  percentage: number
}

export class SaveAnalyzer {
  static analyze(
    analysis: CraftVaultAnalysis
  ): SaveStats {
    const { elements, combinations } = analysis

    let elementsWithRecipes = 0
    let elementsWithoutRecipes = 0

    let totalRecipes = 0

    for (const element of elements) {
      const recipeCount =
        element.metadata.recipes?.length ?? 0

      totalRecipes += recipeCount

      if (recipeCount > 0) {
        elementsWithRecipes++
      } else {
        elementsWithoutRecipes++
      }
    }

    const averageRecipesPerElement =
      elements.length > 0
        ? totalRecipes / elements.length
        : 0

    let mostProductiveElement:
      CraftVaultElement | null = null

    let mostCommonRecipeCount = 0

    for (const element of elements) {
      const recipeCount =
        element.metadata.recipes?.length ?? 0

      if (recipeCount > mostCommonRecipeCount) {
        mostCommonRecipeCount = recipeCount
        mostProductiveElement = element
      }
    }

    const usageCount = new Map<string, number>()

    for (const combination of combinations) {
      for (const input of combination.inputs) {
        usageCount.set(
          input,
          (usageCount.get(input) ?? 0) + 1
        )
      }
    }

    let mostUsedElement:
      CraftVaultElement | null = null

    let highestUsage = 0

    for (const element of elements) {
      const uses = usageCount.get(element.id) ?? 0

      if (uses > highestUsage) {
        highestUsage = uses
        mostUsedElement = element
      }
    }

    const totalRecipeInputs =
      combinations.reduce(
        (total, combination) =>
          total + combination.inputs.length,
        0
      )

    const averageUsesPerElement =
      elements.length > 0
        ? totalRecipeInputs / elements.length
        : 0

    let isolatedElements = 0
    let highlyConnectedElements = 0

    for (const element of elements) {
      const recipesCreated =
        element.metadata.recipes?.length ?? 0

      const recipesUsed =
        usageCount.get(element.id) ?? 0

      const connections =
        recipesCreated + recipesUsed

      if (connections === 0) {
        isolatedElements++
      }

      if (connections >= 10) {
        highlyConnectedElements++
      }
    }

    return {
      totalElements: elements.length,
      totalCombinations: combinations.length,
      elementsWithRecipes,
      elementsWithoutRecipes,
      averageRecipesPerElement:
        Math.round(
          averageRecipesPerElement * 100
        ) / 100,

      mostCommonRecipeCount,

      mostProductiveElement,
      mostUsedElement,

      totalRecipeInputs,

      averageUsesPerElement:
        Math.round(
          averageUsesPerElement * 100
        ) / 100,

      isolatedElements,
      highlyConnectedElements,
    }
  }

  static getCategoryStats(
    analysis: CraftVaultAnalysis
  ): CategoryStats[] {
    const categorized =
      Categorizer.categorizeAll(
        analysis.elements
      )

    const stats: CategoryStats[] = []

    categorized.forEach(
      (elements, category) => {
        const count = elements.length

        stats.push({
          category,
          count,
          percentage:
            analysis.elements.length > 0
              ? Math.round(
                  (count /
                    analysis.elements.length) *
                    100
                )
              : 0,
        })
      }
    )

    return stats
  }

  static getElementsByCategory(
    analysis: CraftVaultAnalysis,
    category: ElementCategory
  ): CraftVaultElement[] {
    return analysis.elements.filter(
      (element) =>
        Categorizer.categorize(element) ===
        category
    )
  }

  static getTopElements(
    analysis: CraftVaultAnalysis,
    limit: number = 10
  ): CraftVaultElement[] {
    return [...analysis.elements]
      .sort(
        (a, b) =>
          (b.metadata.recipes?.length ?? 0) -
          (a.metadata.recipes?.length ?? 0)
      )
      .slice(0, limit)
  }

  static getMostUsedElements(
    analysis: CraftVaultAnalysis,
    limit: number = 10
  ): CraftVaultElement[] {
    const usage = new Map<string, number>()

    for (const combination of analysis.combinations) {
      for (const input of combination.inputs) {
        usage.set(
          input,
          (usage.get(input) ?? 0) + 1
        )
      }
    }

    return [...analysis.elements]
      .sort(
        (a, b) =>
          (usage.get(b.id) ?? 0) -
          (usage.get(a.id) ?? 0)
      )
      .slice(0, limit)
  }

  static getUsageCount(
    analysis: CraftVaultAnalysis,
    elementId: string
  ): number {
    let count = 0

    for (const combination of analysis.combinations) {
      count += combination.inputs.filter(
        (input) => input === elementId
      ).length
    }

    return count
  }

  static getBasicElements(
    analysis: CraftVaultAnalysis,
    limit: number = 10
  ): CraftVaultElement[] {
    return [...analysis.elements]
      .filter(
        (element) =>
          !element.metadata.recipes ||
          element.metadata.recipes.length === 0
      )
      .slice(0, limit)
  }
}
