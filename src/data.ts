import pokemonsRaw from "./data/pokemons.json";
import ownedRaw from "./data/owned.json";

import type { Generation, Pokemon, OwnedList } from "./types";

const pokemons = pokemonsRaw as Pokemon[];
const owned = ownedRaw as OwnedList;
const ownedSet = new Set<number>(owned);

export function getMissingByGeneration(): Record<Generation, Pokemon[]> {
	const missing = pokemons.filter(pokemon => !ownedSet.has(pokemon.id));
	const result: Record<Generation, Pokemon[]> = { 1: [], 2: [], 3: []};

	for(const pokemon of missing) {
		result[pokemon.generation].push(pokemon);
	}

	return result;
}