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

export type AbilityScoreType = {
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

interface Stats {
	ac: number;
	initiative: number;
	speed: number;
	hp: number;
}

export type AttackType = {
	id: string;
	name: string;
	ability: AbilityScoresKeys;
	proficiency: boolean;
	damage: string;
};

export type Spell = {
	name: string;
	level: number;
	school: string;
	V: boolean;
	S: boolean;
	casting_time: string;
	concentration: boolean;
	duration: string;
	range: string;
	ritual: boolean;
	description: string;
	cast_higher: boolean;
	classes: string;
	book: string;
	id: number;
};

export type SpellList = {
	[key: number]: Spell[];
};

interface Sheet {
	info: Info;
	abilityScores: AbilityScores;
	stats: Stats;
	attacks: AttackType[];
}

export type AbilityScoresKeys = keyof AbilityScores;
export type SpellListKeys = keyof SpellList;

export const sheet: Writable<Sheet> = writable({} as Sheet);

export const spells: Writable<SpellList> = writable({
	0: [],
	1: [],
	2: [],
	3: [],
	4: [],
	5: [],
	6: [],
	7: [],
	8: [],
	9: []
});
