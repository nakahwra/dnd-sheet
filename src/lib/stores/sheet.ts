import { writable, type Writable } from 'svelte/store';

interface Info {
	characterName: string;
	class: string;
	race: string;
	background: string;
	alignment: string;
	playerName: string;
}

interface Sheet {
	info: Info;
}

export const sheet: Writable<Sheet> = writable({} as Sheet);
