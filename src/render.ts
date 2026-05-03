import { POKEMON_TYPE_LABELS_FR, type Generation, type Pokemon, type PokemonType } from "./types.ts";

function renderTypeBadge(type: PokemonType): HTMLElement {
	const span = document.createElement('span');
	span.className = `type-badge type-${type}`;
	span.textContent = POKEMON_TYPE_LABELS_FR[type];

	return span;
}

function renderPokemonCard(pokemon: Pokemon): HTMLElement {
	const card = document.createElement('article');
	card.className = "card";

	const img = document.createElement('img');
	img.alt = pokemon.nameFr;	
	img.loading = "lazy";	
	img.src = `/pokemons/${String(pokemon.id).padStart(3, "0")}.png`;

	const number = document.createElement('div');
	number.className = "number";
	number.textContent = '#' + String(pokemon.id).padStart(3, "0");

	const name = document.createElement('div');
	name.className = "name";
	name.textContent = pokemon.nameFr;

	const types = document.createElement('div');
	types.className = "types";

	pokemon.types.forEach(type => {
		types.appendChild(renderTypeBadge(type));
	});

	const cardText = document.createElement('div');
	cardText.className = "card-text";

	cardText.append(number, name, types);

	card.append(img, cardText);
	return card;
}

function renderGenerationSection(gen: Generation, pokemons: Pokemon[]): HTMLElement {
	const section = document.createElement('section');
	section.className = "generation";

	const title = document.createElement('h2');
	title.textContent = `Génération n°${gen} — ${pokemons.length} manquants`;

	const grid = document.createElement('div');
	grid.className = 'grid';

	pokemons.forEach(pokemon => {
		grid.appendChild(renderPokemonCard(pokemon));
	})

	section.append(title, grid);
	return section;
}

export function renderApp(root: HTMLElement, missingByGen: Record<Generation, Pokemon[]>): void {
	root.replaceChildren();

	const generations: Generation[] = [1, 2, 3];
	for(const gen of generations) {
		root.appendChild(renderGenerationSection(gen, missingByGen[gen]));
	}
}