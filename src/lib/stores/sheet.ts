import { writable, type Writable } from 'svelte/store';

interface Info {
	characterName: string;
	class: string;
	race: string;
	background: string;
	alignment: string;
	playerName: string;
}

interface AbilityScores {
	strength: number;
	dexterity: number;
	constitution: number;
	intelligence: number;
	wisdom: number;
	charisma: number;
}

interface Sheet {
	info: Info;
	abilityScores: AbilityScores;
}

export type AbilityScoresKeys = keyof AbilityScores;

export const sheet: Writable<Sheet> = writable({} as Sheet);
