// /composables/useOracle.ts
import { ref } from "vue";
import cardsJson from "~/server/data/cards-v1.json";

import type { CardDraw, CardMeaning, CardFace, Orientation } from "./useOracle";

const cards = cardsJson as Record<string, CardMeaning>;

export function useDraw() {
	const drawnCards = ref<CardDraw[]>([]);

	function draw(count: number) {
		const keys = Object.keys(cards);
		drawnCards.value = Array.from({ length: count }).map(() => {
			const name = keys[Math.floor(Math.random() * keys.length)];
			const orientation: Orientation =
				Math.random() < 0.5 ? "upright" : "reversed";
			return { name, orientation, effect: cards[name][orientation] };
		});
	}

	return { drawnCards, draw };
}
