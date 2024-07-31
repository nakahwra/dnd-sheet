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
	ac: {
		base: number;
		firstAbility?: AbilityScoresKeys;
		secondAbility?: AbilityScoresKeys;
		bonus: number;
	};
	initiative: {
		bonus: number;
	};
	speed: {
		base: number;
		bonus: number;
	};
	hp: {
		max: number;
		current: number;
		temp: number;
	};
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
	prepared?: boolean;
};

export type SpellList = {
	[key: number]: {
		slots: {
			max: number;
			used: number;
		};
		spells: Spell[];
	};
};

interface Sheet {
	info: Info;
	abilityScores: AbilityScores;
	stats: Stats;
	attacks: AttackType[];
}

export type AbilityScoresKeys = keyof AbilityScores;
export type SpellListKeys = keyof SpellList;

interface SpellcastingInfo {
	spellAbility: AbilityScoresKeys;
	spellList: SpellList;
}

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
		'sleight of hand': { ...defaultSkill },
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
		'animal handling': { ...defaultSkill },
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
	ac: {
		base: 10,
		firstAbility: undefined,
		secondAbility: undefined,
		bonus: 0
	},
	initiative: {
		bonus: 0
	},
	speed: {
		base: 10,
		bonus: 0
	},
	hp: {
		max: 0,
		current: 0,
		temp: 0
	}
});

export const attacks: Writable<AttackType[]> = writable([]);

const defaultSpellLevel = {
	slots: {
		max: 0,
		used: 0
	},
	spells: []
};

export const spellList: SpellList = {
	0: { ...defaultSpellLevel, slots: { max: 0, used: 0 } },
	1: { ...defaultSpellLevel, slots: { max: 0, used: 0 } },
	2: { ...defaultSpellLevel, slots: { max: 0, used: 0 } },
	3: { ...defaultSpellLevel, slots: { max: 0, used: 0 } },
	4: { ...defaultSpellLevel, slots: { max: 0, used: 0 } },
	5: { ...defaultSpellLevel, slots: { max: 0, used: 0 } },
	6: { ...defaultSpellLevel, slots: { max: 0, used: 0 } },
	7: { ...defaultSpellLevel, slots: { max: 0, used: 0 } },
	8: { ...defaultSpellLevel, slots: { max: 0, used: 0 } },
	9: { ...defaultSpellLevel, slots: { max: 0, used: 0 } }
};

export const spellcastingInfo: Writable<SpellcastingInfo> = writable({
	spellAbility: 'intelligence',
	spellList: { ...spellList }
});
