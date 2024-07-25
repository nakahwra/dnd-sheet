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
	M: string;
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

const defaultSkill: SkillType = {
	proficiency: false,
	expertise: false
};

const defaultAbilityScore: AbilityScoreType = {
	score: 10,
	skills: {}
};

const strength: AbilityScoreType = {
	...defaultAbilityScore,
	skills: {
		'saving throw': { ...defaultSkill },
		athletics: { ...defaultSkill }
	}
};

const dexterity: AbilityScoreType = {
	...defaultAbilityScore,
	skills: {
		'saving throw': { ...defaultSkill },
		acrobatics: { ...defaultSkill },
		sleightOfHand: { ...defaultSkill },
		stealth: { ...defaultSkill }
	}
};

const constitution: AbilityScoreType = {
	...defaultAbilityScore,
	skills: {
		'saving throw': { ...defaultSkill }
	}
};

const intelligence: AbilityScoreType = {
	...defaultAbilityScore,
	skills: {
		'saving throw': { ...defaultSkill },
		arcana: { ...defaultSkill },
		history: { ...defaultSkill },
		investigation: { ...defaultSkill },
		nature: { ...defaultSkill },
		religion: { ...defaultSkill }
	}
};

const wisdom: AbilityScoreType = {
	...defaultAbilityScore,
	skills: {
		'saving throw': { ...defaultSkill },
		animalHandling: { ...defaultSkill },
		insight: { ...defaultSkill },
		medicine: { ...defaultSkill },
		perception: { ...defaultSkill },
		survival: { ...defaultSkill }
	}
};

const charisma: AbilityScoreType = {
	...defaultAbilityScore,
	skills: {
		'saving throw': { ...defaultSkill },
		deception: { ...defaultSkill },
		intimidation: { ...defaultSkill },
		performance: { ...defaultSkill },
		persuasion: { ...defaultSkill }
	}
};

export const sheet: Writable<Sheet> = writable({} as Sheet);

export const info: Writable<Info> = writable({
	characterName: '',
	class: '',
	race: '',
	background: '',
	alignment: '',
	playerName: ''
});

export const abilityScores: Writable<AbilityScores> = writable({
	proficiency: 2,
	strength,
	dexterity,
	constitution,
	intelligence,
	wisdom,
	charisma
});

export const stats: Writable<Stats> = writable({
	ac: 0,
	initiative: 0,
	speed: 0,
	hp: 0
});

export const attacks: Writable<AttackType[]> = writable([]);

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
