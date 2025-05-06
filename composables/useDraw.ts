// /composables/useOracle.ts
import { ref } from "vue";
import cards from "~/server/data/cards-v1.json";

type Orientation = "upright" | "reversed";

export function useDraw(drawAmount = 1) {
	const fullCardList = ref(
		Object.entries(cards).map(([name, meanings]) => ({
			name,
			...meanings,
		}))
	);

	const cardList = ref(
		fullCardList.value
			.sort(() => Math.random() - 0.5)
			.slice(0, drawAmount)
			.map((card) => {
				const isUpright = Math.random() > 0.49;
				return {
					name: card.name,
					...(isUpright ? card.upright : card.reversed),
					isUpright,
				};
			})
	);

	return cardList.value;
}
