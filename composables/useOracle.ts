import { ref } from "vue";
import wordbankJson from "~/server/data/wordbank-v1.json";

export type Orientation = "upright" | "reversed";
export interface CardFace {
	tone: string;
	bias: string[];
	mutation_rate: number;
	template_style: string;
	notes: string;
}
export interface CardMeaning {
	upright: CardFace;
	reversed: CardFace;
}
export interface CardDraw {
	name: string;
	orientation: Orientation;
	effect: CardFace;
}

const wordbank = wordbankJson as {
	nouns: string[];
	adjectives: string[];
	archetypes: string[];
	places: string[];
	weather: string[];
	verbs: string[];
	emotions: string[];
	elements: string[];
	time: string[];
};

interface Wordbanks {
	nouns: string[];
	adjectives: string[];
	archetypes: string[];
	places: string[];
	weather: string[];
	verbs: string[];
	emotions: string[];
	elements: string[];
	time: string[];
}

interface QueryInfo {
	length: number;
	seedWords: string[];
	mood: "question" | "neutral";
}

interface Template {
	style: string;
	text: string;
}

// 1. UTILITIES

function pick<T>(arr: T[]): T {
	return arr[Math.floor(Math.random() * arr.length)];
}

// Weighted pick from a map of item→weight
function pickWeighted<T>(items: T[], weights: number[]): T {
	const total = weights.reduce((a, b) => a + b, 0);
	let r = Math.random() * total;
	for (let i = 0; i < items.length; i++) {
		if (r < weights[i]) return items[i];
		r -= weights[i];
	}
	return items[items.length - 1];
}

// 2. AGGREGATE CARDS

interface Aggregate {
	tone: string;
	// biasCounts to weight which categories get picked more often
	biasCounts: Record<keyof Wordbanks, number>;
	mutationRate: number;
	templateStyles: Record<string, number>;
}

function aggregateInfluence(draws: CardDraw[]): Aggregate {
	const agg: Aggregate = {
		tone: draws[0]?.effect.tone ?? "neutral",
		biasCounts: {
			nouns: 0,
			adjectives: 0,
			archetypes: 0,
			places: 0,
			weather: 0,
			verbs: 0,
			emotions: 0,
			elements: 0,
			time: 0,
		},
		mutationRate: 0,
		templateStyles: {},
	};
	draws.forEach(({ effect }) => {
		// accumulate bias counts
		effect.bias.forEach((b) => {
			if (b in agg.biasCounts) agg.biasCounts[b as keyof Wordbanks] += 1;
		});
		// sum mutation rates
		agg.mutationRate += effect.mutation_rate;
		// count template styles
		agg.templateStyles[effect.template_style] =
			(agg.templateStyles[effect.template_style] || 0) + 1;
	});
	// average mutationRate
	agg.mutationRate = agg.mutationRate / draws.length;
	return agg;
}

// 3. QUERY PARSING

function processQuery(query: string): QueryInfo {
	const words = query.toLowerCase().split(/\s+/);
	return {
		length: words.length,
		seedWords: words.filter((w) => wordbank.nouns.includes(w)),
		mood: query.includes("?") ? "question" : "neutral",
	};
}

// 4. TEMPLATES (you can expand these and assign your own styles)

const templates: Template[] = [
	{
		style: "ritualistic",
		text: "At {time}, the {adjectives} {nouns} sings.",
	},
	{
		style: "dreamlike",
		text: "A {nouns} (in shadow) drifts through {places}.",
	},
	{ style: "elegiac", text: "You must {verbs} before the {nouns} fades." },
	{ style: "fragmented", text: "{seedWord}... then {verbs}, then {nouns}." },
	{
		style: "structured",
		text: "The {adjectives} {nouns} rests by {places}.",
	},
	{ style: "flowing", text: "And so, {archetypes} dreams in {weather}." },
	{ style: "geometric", text: "Lines of {elements} trace the {nouns}." },
	{
		style: "repetitive",
		text: "Repeat: {verbs}, repeat: {verbs}, repeat: {verbs}.",
	},
];

// 5. MUTATION

const BASE_MUTATION_CHANCE = 0.25;
function mutate(word: string, rate: number): string {
	const mutations = [
		(w: string) => `${w}, reflected`,
		(w: string) => `an echo of ${w}`,
		(w: string) => `${w} reversed`,
		(w: string) => `the forgotten ${w}`,
		(w: string) => `${pick(wordbank.adjectives)} ${w}`,
	];
	const chance = Math.min(0.9, BASE_MUTATION_CHANCE * rate);
	return Math.random() < chance ? pick(mutations)(word) : word;
}

// 6. TEMPLATE SELECTION

function pickTemplate(preferredStyle: string): Template {
	// 60% chance to favor the preferred style
	if (Math.random() < 0.6) {
		const pool = templates.filter((t) => t.style === preferredStyle);
		if (pool.length) return pick(pool);
	}
	// otherwise any
	return pick(templates);
}

// 7. FILLING A TEMPLATE

function fillTemplate(tpl: Template, agg: Aggregate, q: QueryInfo): string {
	return (
		tpl.text
			.replace(/\{(.*?)\}/g, (_, key) => {
				switch (key) {
					case "nouns":
						return pick(wordbank.nouns);
					case "adjectives":
						return pick(wordbank.adjectives);
					case "archetypes":
						return pick(wordbank.archetypes);
					case "places":
						return pick(wordbank.places);
					case "weather":
						return pick(wordbank.weather);
					case "verbs":
						return pick(wordbank.verbs);
					case "emotions":
						return pick(wordbank.emotions);
					case "elements":
						return pick(wordbank.elements);
					case "time":
						return pick(wordbank.time);
					case "seedWord":
						return q.seedWords[0] || pick(wordbank.nouns);
					default:
						return "…";
				}
			})
			// optionally mutate a random noun in the result
			.split(" ")
			.map((w) =>
				wordbank.nouns.includes(w) ? mutate(w, agg.mutationRate) : w
			)
			.join(" ")
	);
}

// 8. FLOWIFY

function flowify(lines: string[]): string {
	const trans = ["And so,", "Yet,", "Meanwhile,", "Thus,", "In a hush,"];
	let text = lines[0];
	for (let i = 1; i < lines.length; i++) {
		if (Math.random() < 0.3) text += " " + pick(trans);
		text += " " + lines[i];
	}
	return text;
}

// 9. MAIN GENERATOR

export function generateOracleResponse(
	query: string,
	draws: CardDraw[]
): string {
	const qInfo = processQuery(query);
	const cardCount = draws.length;
	const agg = aggregateInfluence(draws);

	// determine how many sentences
	const sentenceCount = Math.max(2, Math.floor(qInfo.length / 3) + cardCount);

	const lines: string[] = [];

	// if it's a question, start with a time tag now or at the end
	if (qInfo.mood === "question") {
		lines.push(pick(wordbank.time));
	}

	for (let i = 0; i < sentenceCount; i++) {
		const tpl = pickTemplate(
			// pick the most frequent style from agg.templateStyles
			Object.entries(agg.templateStyles).sort(
				(a, b) => b[1] - a[1]
			)[0]?.[0] as string
		);
		lines.push(fillTemplate(tpl, agg, qInfo));
	}

	return flowify(lines);
}

// 10. COMPOSABLE
export function useOracle() {
	const output = ref("");

	const read = (query: string, draws: CardDraw[]) =>
		(output.value = generateOracleResponse(query, draws));

	return {
		output,
		read,
	};
}
