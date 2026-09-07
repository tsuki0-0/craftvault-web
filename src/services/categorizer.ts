import type { CraftVaultElement } from '../types/save'

export type ElementCategory =
  | 'elements'
  | 'nature'
  | 'animals'
  | 'food'
  | 'science'
  | 'space'
  | 'magic'
  | 'history'
  | 'mythology'
  | 'people'
  | 'entertainment'
  | 'gaming'
  | 'art'
  | 'sports'
  | 'objects'
  | 'places'
  | 'transportation'
  | 'concepts'
  | 'events'
  | 'internet'
  | 'colors'
  | 'numbers'
  | 'letters'
  | 'symbols'
  | 'unknown'

export interface CategoryInfo {
  id: ElementCategory
  label: string
  icon: string
}

export const CATEGORY_INFO: Record<
  ElementCategory,
  CategoryInfo
> = {
  elements: {
    id: 'elements',
    label: 'Elementos e Materiais',
    icon: '⚗️',
  },
  nature: {
    id: 'nature',
    label: 'Natureza e Ambiente',
    icon: '🌿',
  },
  animals: {
    id: 'animals',
    label: 'Animais e Criaturas',
    icon: '🐾',
  },
  food: {
    id: 'food',
    label: 'Comida e Culinária',
    icon: '🍕',
  },
  science: {
    id: 'science',
    label: 'Ciência e Tecnologia',
    icon: '🔬',
  },
  space: {
    id: 'space',
    label: 'Espaço e Cosmos',
    icon: '🌌',
  },
  magic: {
    id: 'magic',
    label: 'Magia e Fantasia',
    icon: '✨',
  },
  history: {
    id: 'history',
    label: 'História e Cultura',
    icon: '🏛️',
  },
  mythology: {
    id: 'mythology',
    label: 'Mitologia e Lendas',
    icon: '📜',
  },
  people: {
    id: 'people',
    label: 'Pessoas e Personagens',
    icon: '👥',
  },
  entertainment: {
    id: 'entertainment',
    label: 'Entretenimento e Mídia',
    icon: '🎬',
  },
  gaming: {
    id: 'gaming',
    label: 'Jogos e Diversão',
    icon: '🎮',
  },
  art: {
    id: 'art',
    label: 'Arte e Criatividade',
    icon: '🎨',
  },
  sports: {
    id: 'sports',
    label: 'Esportes e Atividades',
    icon: '⚽',
  },
  objects: {
    id: 'objects',
    label: 'Objetos e Ferramentas',
    icon: '🔧',
  },
  places: {
    id: 'places',
    label: 'Lugares e Localizações',
    icon: '🗺️',
  },
  transportation: {
    id: 'transportation',
    label: 'Transportes',
    icon: '🚗',
  },
  concepts: {
    id: 'concepts',
    label: 'Conceitos e Ideias',
    icon: '💡',
  },
  events: {
    id: 'events',
    label: 'Eventos e Feriados',
    icon: '🎉',
  },
  internet: {
    id: 'internet',
    label: 'Internet e Memes',
    icon: '🌐',
  },
  colors: {
    id: 'colors',
    label: 'Cores',
    icon: '🎨',
  },
  numbers: {
    id: 'numbers',
    label: 'Números',
    icon: '🔢',
  },
  letters: {
    id: 'letters',
    label: 'Letras',
    icon: '🔤',
  },
  symbols: {
    id: 'symbols',
    label: 'Símbolos',
    icon: '🔣',
  },
  unknown: {
    id: 'unknown',
    label: 'Outros',
    icon: '❓',
  },
}

const categoryPatterns: Record<
  ElementCategory,
  RegExp[]
> = {
  colors: [
    /^(red|blue|green|yellow|orange|purple|pink|black|white|gray|grey|brown|cyan|magenta|violet|indigo|gold|silver)$/i,
  ],

  numbers: [
    /^\d+$/,
    /^(zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|hundred|thousand|million|billion)$/i,
  ],

  letters: [
    /^[a-z]$/i,
    /^(letter|alphabet|uppercase|lowercase)$/i,
  ],

  symbols: [
    /^[!@#$%^&*()+\-=/\\|[\]{}<>?~`]+$/,
    /^(symbol|emoji|icon)$/i,
  ],

  elements: [
    /fire|water|earth|air|wind|steam|dust|mud|lava|stone|rock|sand|metal|gold|silver|iron|copper|bronze|steel/i,
    /aluminum|plastic|rubber|glass|ceramic|porcelain|paper|cotton|silk|leather|wool|fabric|material/i,
    /hydrogen|helium|lithium|beryllium|boron|carbon|nitrogen|oxygen|fluorine|neon|sodium|magnesium/i,
    /silicon|phosphorus|sulfur|chlorine|argon|potassium|calcium|uranium/i,
  ],

  nature: [
    /tree|plant|grass|flower|leaf|wood|forest|jungle|desert|mountain|hill|valley|river|lake|ocean|sea/i,
    /sun|moon|sky|cloud|rain|snow|ice|storm|weather|climate|season|lightning|thunder|tornado|hurricane/i,
    /volcano|earthquake|tsunami|waterfall|island|beach|cave|nature|environment/i,
  ],

  animals: [
    /dog|cat|bird|fish|snake|dragon|dinosaur|spider|bee|butterfly|lion|tiger|bear|wolf|fox|rabbit|horse|cow/i,
    /sheep|goat|pig|chicken|duck|shark|whale|dolphin|elephant|monkey|ape|animal|creature|beast|wildlife/i,
  ],

  food: [
    /food|eat|drink|meal|breakfast|lunch|dinner|snack|cake|bread|rice|pasta|fruit|vegetable/i,
    /apple|orange|banana|grape|carrot|potato|tomato|lettuce|cheese|milk|egg|meat/i,
    /pizza|burger|sandwich|salad|soup|sauce|candy|chocolate|coffee|tea/i,
  ],

  science: [
    /atom|molecule|electron|proton|neutron|quantum|energy|force|gravity|physics|chemistry|biology/i,
    /virus|bacteria|microbe|dna|gene|protein|cell|laboratory|experiment/i,
    /robot|android|cyborg|computer|machine|engine|motor|gear|circuit|chip|pixel|digital|software|hardware/i,
    /phone|camera|telescope|microscope|satellite|drone|artificial intelligence|artificial/i,
  ],

  space: [
    /planet|star|galaxy|nebula|black hole|comet|asteroid|meteor|spacecraft|spaceship|nasa/i,
    /space|cosmos|cosmic|astro|lunar|solar|mars|venus|jupiter|saturn|mercury|uranus|neptune/i,
  ],

  magic: [
    /wizard|witch|vampire|werewolf|zombie|mummy|ghost|phantom|monster|alien/i,
    /magic|spell|potion|curse|enchant|fantasy|sci-fi|scifi|fairy|elf|orc|goblin/i,
  ],

  mythology: [
    /god|goddess|titan|nymph|spirit|demon|angel|devil|poseidon|hades|zeus|odin/i,
    /thor|loki|apollo|athena|hercules|mythical|legendary|divine/i,
  ],

  people: [
    /human|person|man|woman|child|boy|girl|baby|adult|people|folk/i,
    /king|queen|prince|princess|warrior|knight|soldier|hero|villain|superhero/i,
    /batman|superman|president|actor|singer|artist|scientist/i,
  ],

  entertainment: [
    /movie|film|cinema|series|show|television|tv|episode/i,
    /music|song|album|band|concert|theater|musical|book|novel|poem/i,
    /pokemon|marvel|disney|star wars|harry potter/i,
  ],

  gaming: [
    /game|gaming|video game|minecraft|roblox|fortnite|pokemon|playstation|xbox|nintendo/i,
  ],

  art: [
    /art|painting|sculpture|drawing|design|creative|creativity|dance|drawing/i,
  ],

  sports: [
    /sport|football|soccer|basketball|tennis|baseball|volleyball|olympic|athlete/i,
  ],

  objects: [
    /sword|weapon|tool|knife|axe|bow|arrow|shield|armor|helmet|boots|gloves|ring|necklace/i,
    /book|scroll|map|treasure|chest|box|bag|bottle|cup|plate|fork|spoon|dish/i,
  ],

  places: [
    /city|town|village|country|nation|kingdom|continent|world/i,
    /house|home|building|castle|tower|temple|church|school|hospital|bank|store|restaurant|cafe/i,
    /street|road|path|bridge|gate|wall|door|room|chamber|hall|court/i,
  ],

  transportation: [
    /car|truck|bike|bicycle|train|airplane|plane|boat|ship|rocket|vehicle/i,
    /bus|subway|metro|motorcycle|motorbike|transport/i,
  ],

  concepts: [
    /love|hate|fear|hope|joy|sorrow|peace|war|freedom|justice|truth|lie|good|evil/i,
    /time|dimension|reality|dream|nightmare|thought|idea|wisdom|knowledge/i,
  ],

  history: [
    /ancient|medieval|renaissance|modern|historic|historical|past|future/i,
    /empire|civilization|revolution|battle|war|history|culture/i,
  ],

  events: [
    /birthday|wedding|festival|holiday|christmas|halloween|easter|ceremony|ritual/i,
    /party|event|celebration|new year/i,
  ],

  internet: [
    /internet|meme|viral|youtube|tiktok|instagram|facebook|twitter|reddit|emoji/i,
  ],

  unknown: [],
}

export class Categorizer {
  static categorize(
    element: CraftVaultElement
  ): ElementCategory {
    const name = element.name.trim().toLowerCase()

    const priorityCategories: ElementCategory[] = [
      'colors',
      'numbers',
      'letters',
      'symbols',
      'mythology',
      'magic',
      'animals',
      'food',
      'people',
      'gaming',
      'entertainment',
      'sports',
      'transportation',
      'space',
      'science',
      'elements',
      'nature',
      'art',
      'objects',
      'places',
      'concepts',
      'history',
      'events',
      'internet',
    ]

    for (const category of priorityCategories) {
      for (const pattern of categoryPatterns[category]) {
        if (pattern.test(name)) {
          return category
        }
      }
    }

    return 'unknown'
  }

  static categorizeAll(
    elements: CraftVaultElement[]
  ): Map<
    ElementCategory,
    CraftVaultElement[]
  > {
    const result = new Map<
      ElementCategory,
      CraftVaultElement[]
    >()

    for (const category of Object.keys(
      CATEGORY_INFO
    ) as ElementCategory[]) {
      result.set(category, [])
    }

    for (const element of elements) {
      const category = this.categorize(element)

      const items =
        result.get(category) ?? []

      items.push(element)

      result.set(category, items)
    }

    return result
  }

  static getCategoryLabel(
    category: ElementCategory
  ): string {
    return CATEGORY_INFO[category].label
  }

  static getCategoryIcon(
    category: ElementCategory
  ): string {
    return CATEGORY_INFO[category].icon
  }

  static getCategories(): CategoryInfo[] {
    return Object.values(CATEGORY_INFO)
  }
}
