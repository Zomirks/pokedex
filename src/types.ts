export type Generation = 1 | 2 | 3;

export const POKEMON_TYPES = [
	"bug", "dark", "dragon", "electric", "fairy", "fighting", "fire", "flying", "ghost", "grass", "ground", "ice", "normal", "poison", "psychic", "rock", "steel", "water"
] as const;

export type PokemonType = typeof POKEMON_TYPES[number];

export const POKEMON_TYPE_LABELS_FR: Record<PokemonType, string> = {
	bug: "Insecte",
	dark: "Ténèbres",
	dragon: "Dragon",
	electric: "Électrik",
	fairy: "Fée",
	fighting: "Combat",
	fire: "Feu",
	flying: "Vol",
	ghost: "Spectre",
	grass: "Plante",
	ground: "Sol",
	ice: "Glace",
	normal: "Normal",
	poison: "Poison",
	psychic: "Psy",
	rock: "Roche",
	steel: "Acier",
	water: "Eau",
};

export type Pokemon = {
	id: number;
	nameFr: string;
	types: PokemonType[];
	generation: Generation;
}

export type OwnedList = number[];