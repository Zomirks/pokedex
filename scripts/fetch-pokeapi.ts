import { writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { POKEMON_TYPES } from "../src/types.ts";
import type { Generation, Pokemon, PokemonType } from "../src/types.ts";

const POKEMON_TYPE_SET: Set<string> = new Set(POKEMON_TYPES);

type ApiPokemonResponse = {
	id: number;
	name: string;
	types: {slot: number; type: {name: string; url: string}}[];
}

type ApiSpeciesResponse = {
	names: {language: {name: string}; name: string}[];
}

async function fetchJson<T>(url: string): Promise<T> {
	const response = await fetch(url);
	if(!response.ok) throw new Error(`HTTP ${response.status} on ${url}`);
	return response.json() as Promise<T>;
}

function generationFromId(id: number): Generation {
	if(id < 1 || 386 < id) throw new Error('Pokemon number is out of searching list');

	if(1 <= id && id <= 151) return 1;
	if(152 <= id && id <= 251) return 2;
	return 3;
}

function pickFrenchName(species: ApiSpeciesResponse): string {
	const french = species.names.find(entry => entry.language.name === 'fr');
	if(french) return french.name;
	const english = species.names.find(entry => entry.language.name === "en");
	if (english) return english.name;
	throw new Error("No name found at all");
}

function pickTypes(pokemon: ApiPokemonResponse): PokemonType[] {
	return pokemon.types
		.map(t => t.type.name)
		.filter(isPokemonType);
}

function isPokemonType(s: string): s is PokemonType {
	return POKEMON_TYPE_SET.has(s);
}

async function fetchPokemon(id: number): Promise<Pokemon> {
	const [pokemon, species] = await Promise.all([
		fetchJson<ApiPokemonResponse>(`https://pokeapi.co/api/v2/pokemon/${id}`),
		fetchJson<ApiSpeciesResponse>(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
	]);

	return {
		id: id,
		nameFr: pickFrenchName(species),
		types: pickTypes(pokemon),
		generation: generationFromId(id)
	}
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const OUTPUT_PATH = "src/data/pokemons.json";
const TOTAL = 386;
const DELAY_MS = 50;

async function main(): Promise<void> {
	const pokemons: Pokemon[] = [];

	for(let id = 1; id <= TOTAL; id++) {
		console.log(`Fetching ${id}/${TOTAL}`);
		pokemons.push(await fetchPokemon(id));
		await sleep(DELAY_MS);
	}

	await mkdir(dirname(OUTPUT_PATH), { recursive: true});
	await writeFile(OUTPUT_PATH, JSON.stringify(pokemons, null, 2));

	console.log(`Done! Wrote ${TOTAL} pokemons to ${OUTPUT_PATH}`)
}

main();