import { writable, type Writable } from 'svelte/store';

interface Info {
	characterName: string;
	class: string;
	race: string;
	background: string;
	alignment: string;
	playerName: string;
}

export type SkillType = {
	proficiency: boolean;
	expertise: boolean;
};

type AbilityScoreType = {
	score: number;
	skills: {
		[key: string]: SkillType;
	};
};
interface AbilityScores {
	proficiency: number;
	strength: AbilityScoreType;
	dexterity: AbilityScoreType;
	constitution: AbilityScoreType;
	intelligence: AbilityScoreType;
	wisdom: AbilityScoreType;
	charisma: AbilityScoreType;
}

interface Sheet {
	info: Info;
	abilityScores: AbilityScores;
}

export type AbilityScoresKeys = keyof AbilityScores;

export const sheet: Writable<Sheet> = writable({} as Sheet);
