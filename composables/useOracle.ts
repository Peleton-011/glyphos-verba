import { ref } from 'vue'
import wordbankJson from "~/server/data/wordbank-v1.json";

export type Orientation = 'upright' | 'reversed'
export interface CardFace {
  tone: string
  bias: string[]
  mutation_rate: number
  template_style: string
  notes: string
}
export interface CardMeaning {
  upright: CardFace
  reversed: CardFace
}
export interface CardDraw {
    name: string
    orientation: Orientation
    effect: CardFace
  }

const wordbank = wordbankJson as {
  nouns: string[]; adjectives: string[]; archetypes: string[];
  places: string[]; weather: string[]; verbs: string[];
  emotions: string[]; elements: string[]; time: string[]
}

interface QueryInfo {
  length: number
  seedWords: string[]
  mood: 'question' | 'neutral'
}

interface Template { style: string; text: string }

// copy in your templates array here, e.g.:
const templates: Template[] = [
  { style: 'ritualistic',  text: "At {time}, the {adjectives} {nouns} sings." },
  /* …etc… */
]

// simple pick util
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

// mutation logic
const BASE_MUT = 0.25
function mutate(word: string, rate: number): string {
  const mutations = [
    (w: string) => `${w}, reflected`,
    (w: string) => `an echo of ${w}`,
    (w: string) => `${w} reversed`,
    (w: string) => `the forgotten ${w}`,
    (w: string) => `${pick(wordbank.adjectives)} ${w}`
  ]
  return Math.random() < Math.min(0.9, BASE_MUT * rate)
    ? pick(mutations)(word)
    : word
}

// parse user query
function processQuery(query: string): QueryInfo {
  const words = query.toLowerCase().split(/\s+/)
  return {
    length: words.length,
    seedWords: words.filter(w => wordbank.nouns.includes(w)),
    mood: query.includes('?') ? 'question' : 'neutral'
  }
}

// aggregate card effects
function aggregate(draws: CardDraw[]) {
  const agg = {
    mutationRate: 0,
    templateStyles: {} as Record<string, number>
  }
  draws.forEach(d => {
    agg.mutationRate += d.effect.mutation_rate
    agg.templateStyles[d.effect.template_style] =
      (agg.templateStyles[d.effect.template_style] || 0) + 1
  })
  agg.mutationRate /= draws.length || 1
  return agg
}

// choose a template, biasing toward most-frequent style
function pickTemplate(styles: Record<string, number>): Template {
  const [fav] = Object.entries(styles)
    .sort((a,b) => b[1] - a[1])
    .map(e => e[0])
  // 60% chance to favor fav-style
  if (Math.random() < 0.6) {
    const pool = templates.filter(t => t.style === fav)
    if (pool.length) return pick(pool)
  }
  return pick(templates)
}

// fill in placeholders + mutate random nouns
function fillTemplate(tpl: Template, agg: ReturnType<typeof aggregate>, q: QueryInfo) {
  let s = tpl.text.replace(/\{(.*?)\}/g, (_, key) => {
    switch (key) {
      case 'nouns':      return pick(wordbank.nouns)
      case 'adjectives': return pick(wordbank.adjectives)
      case 'archetypes': return pick(wordbank.archetypes)
      case 'places':     return pick(wordbank.places)
      case 'weather':    return pick(wordbank.weather)
      case 'verbs':      return pick(wordbank.verbs)
      case 'emotions':   return pick(wordbank.emotions)
      case 'elements':   return pick(wordbank.elements)
      case 'time':       return pick(wordbank.time)
      case 'seedWord':   return q.seedWords[0] || pick(wordbank.nouns)
      default:           return '…'
    }
  })
  return s.split(' ').map(w =>
    wordbank.nouns.includes(w) ? mutate(w, agg.mutationRate) : w
  ).join(' ')
}

// lightly link lines
function flowify(lines: string[]) {
  const trans = ["And so,", "Yet,", "Meanwhile,", "Thus,"]
  return lines.reduce((acc, line, i) => 
    i === 0
      ? line
      : acc + (Math.random()<0.3 ? ' ' + pick(trans) : ' ') + line
  , '')
}

export function useOracle() {
  const output = ref('')
  
  function read(query: string, draws: CardDraw[]) {
    const q = processQuery(query)
    const agg = aggregate(draws)
    const count = Math.max(2, Math.floor(q.length/3) + draws.length)
    const lines: string[] = []

    if (q.mood === 'question') {
      lines.push(pick(wordbank.time))
    }

    for (let i = 0; i < count; i++) {
      const tpl = pickTemplate(agg.templateStyles)
      lines.push(fillTemplate(tpl, agg, q))
    }

    output.value = flowify(lines)
  }

  return { output, read }
}
