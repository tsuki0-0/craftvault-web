// Tradução dos nomes de elementos do Infinite Craft
export const elementTranslations: Record<string, Record<string, string>> = {
  'pt-BR': {
    'Fire': 'Fogo',
    'Water': 'Água',
    'Earth': 'Terra',
    'Air': 'Ar',
    'Robot': 'Robô',
    'Android': 'Android',
    'Cyborg': 'Ciborgue',
    'Aquaman': 'Homem-Aquático',
    'Poseidon': 'Poseidon',
    'Tsunami': 'Tsunami',
    'Hot Air': 'Ar Quente',
    'Carrot': 'Cenoura',
    'Pluto': 'Plutão',
    'Lego Man': 'Homem LEGO',
    'Hacked': 'Hackeado',
    'Dust': 'Poeira',
    'Island': 'Ilha',
    'Lighthouse': 'Farol',
    'Rain': 'Chuva',
    'Flood': 'Inundação',
    'Home': 'Casa',
    'Terminator': 'Terminator',
  },
  'en-US': {
    // Em inglês, retorna o próprio nome
  },
}

export function translateElementName(name: string, language: string): string {
  if (language === 'pt-BR') {
    return elementTranslations['pt-BR'][name] || name
  }
  return name
}
