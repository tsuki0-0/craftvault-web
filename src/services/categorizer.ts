import type { CraftVaultElement } from '../types/save'

export type ElementCategory = 
  | 'nature' | 'science' | 'technology' | 'people' | 'places'
  | 'animals' | 'objects' | 'concepts' | 'culture' | 'history'
  | 'mythology' | 'fiction' | 'food' | 'materials' | 'phenomena'
  | 'universe' | 'unknown'

const categoryPatterns: Record<ElementCategory, RegExp[]> = {
  nature: [
    /fire|water|earth|air|wind|storm|rain|snow|ice|cloud|dust|sand|rock|stone|mud|lava|volcano/i,
    /tree|plant|grass|flower|leaf|wood|forest|jungle|desert|mountain|hill|valley|river|lake|ocean|sea/i,
    /sun|moon|star|sky|night|day|weather|climate|season/i,
  ],
  animals: [
    /dog|cat|bird|fish|snake|dragon|dinosaur|spider|bee|butterfly|lion|tiger|bear|wolf|fox|rabbit|horse|cow/i,
    /animal|creature|beast|pet|wildlife/i,
  ],
  science: [
    /atom|molecule|electron|proton|neutron|quantum|energy|force|gravity|physics|chemistry|biology/i,
    /virus|bacteria|microbe|dna|gene|protein/i,
  ],
  technology: [
    /robot|android|cyborg|computer|machine|engine|motor|gear|circuit|chip|pixel|digital|software|hardware/i,
    /phone|camera|telescope|microscope|satellite|drone|ai|artificial/i,
  ],
  people: [
    /human|person|man|woman|child|boy|girl|baby|adult|people|folk/i,
    /king|queen|prince|princess|warrior|knight|soldier|hero|villain|superhero|batman|superman/i,
  ],
  places: [
    /city|town|village|country|nation|kingdom|island|continent|planet|world|universe|space/i,
    /house|home|building|castle|tower|temple|church|school|hospital|bank|store|restaurant|cafe/i,
    /street|road|path|bridge|gate|wall|door|room|chamber|hall|court/i,
  ],
  mythology: [
    /god|goddess|titan|nymph|spirit|demon|angel|devil|poseidon|hades|zeus|odin|buddha|allah|jesus/i,
    /mythical|legendary|divine|sacred|holy|cursed|enchanted/i,
  ],
  fiction: [
    /wizard|witch|vampire|werewolf|zombie|mummy|ghost|phantom|phantom|monster|alien|creature/i,
    /magic|spell|potion|curse|enchant|fantasy|sci-fi|scifi/i,
  ],
  objects: [
    /sword|gun|weapon|tool|knife|axe|bow|arrow|shield|armor|helmet|boots|gloves|ring|necklace/i,
    /book|scroll|map|treasure|chest|box|bag|bottle|cup|plate|fork|spoon|knife|dish/i,
    /car|truck|bike|bicycle|train|airplane|boat|ship|rocket|vehicle/i,
  ],
  food: [
    /food|eat|drink|meal|breakfast|lunch|dinner|snack|cake|bread|rice|pasta|fruit|vegetable/i,
    /apple|orange|banana|grape|carrot|potato|tomato|lettuce|bread|cheese|milk|egg|meat/i,
    /pizza|burger|sandwich|salad|soup|stew|sauce|candy|chocolate|coffee|tea|beer|wine/i,
  ],
  materials: [
    /metal|gold|silver|iron|copper|bronze|steel|aluminum|plastic|rubber|glass|ceramic|porcelain/i,
    /wood|paper|cotton|silk|leather|wool|fabric|cloth|material/i,
  ],
  culture: [
    /art|music|dance|song|painting|sculpture|drawing|theater|play|movie|film|book|novel|poem/i,
    /tradition|festival|holiday|christmas|halloween|easter|birthday|wedding|ceremony|ritual/i,
  ],
  history: [
    /ancient|medieval|renaissance|modern|old|new|era|age|period|war|battle|revolution/i,
    /historical|historic|past|present|future|yesterday|today|tomorrow/i,
  ],
  phenomena: [
    /lightning|thunder|wind|tornado|hurricane|earthquake|tsunami|volcano|eruption|explosion/i,
    /light|shadow|darkness|color|sound|noise|vibration|wave|radiation/i,
  ],
  universe: [
    /planet|star|galaxy|nebula|black hole|comet|asteroid|meteor|satellite|spacecraft|spaceship|nasa/i,
    /space|cosmos|cosmic|astro|lunar|solar|earth|mars|venus|jupiter|saturn|moon/i,
  ],
  concepts: [
    /love|hate|fear|hope|joy|sorrow|peace|war|freedom|justice|truth|lie|good|evil|right|wrong/i,
    /time|space|dimension|reality|dream|nightmare|thought|idea|wisdom|knowledge/i,
  ],
  unknown: [],
}

export class Categorizer {
  static categorize(element: CraftVaultElement): ElementCategory {
    const name = element.name.toLowerCase()

    for (const [category, patterns] of Object.entries(categoryPatterns)) {
      if (category === 'unknown') continue
      
      for (const pattern of patterns) {
        if (pattern.test(name)) {
          return category as ElementCategory
        }
      }
    }

    return 'unknown'
  }

  static categorizeAll(elements: CraftVaultElement[]): Map<ElementCategory, CraftVaultElement[]> {
    const result = new Map<ElementCategory, CraftVaultElement[]>()

    for (const category of Object.keys(categoryPatterns) as ElementCategory[]) {
      result.set(category, [])
    }

    for (const element of elements) {
      const category = this.categorize(element)
      const items = result.get(category) || []
      items.push(element)
      result.set(category, items)
    }

    return result
  }

  static getCategoryLabel(category: ElementCategory): string {
    const labels: Record<ElementCategory, string> = {
      nature: 'Natureza',
      science: 'Ciência',
      technology: 'Tecnologia',
      people: 'Pessoas',
      places: 'Lugares',
      animals: 'Animais',
      objects: 'Objetos',
      concepts: 'Conceitos',
      culture: 'Cultura',
      history: 'História',
      mythology: 'Mitologia',
      fiction: 'Ficção',
      food: 'Alimentos',
      materials: 'Materiais',
      phenomena: 'Fenômenos',
      universe: 'Universo',
      unknown: 'Desconhecido',
    }
    return labels[category]
  }
}
