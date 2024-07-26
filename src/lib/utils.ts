import { type ClassValue, clsx } from 'clsx';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style: Record<string, number | string | undefined>): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, '');
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};

export const getModifier = (abilityScore: number) => Math.floor((abilityScore - 10) / 2);

export const getSignedModifier = (mod: number) => (mod >= 0 ? `+${mod}` : mod);

// Round down up to 1 decimal place
export const convertFeetToMeters = (num: number) => Math.floor(num * 0.3048 * 10) / 10;

// Given a string like that CONTAINS a distance notation in feet
// replace the distance in feet with the distance in meters
export const replaceFootToMeter = (str: string) => {
	// regex to match a number followed by a space and words "foot" or "feet" or a number followed by "-foot" or "-feet"
	const regex = /(\d+)(\s|-)(foot|feet)/;
	const match = str.match(regex);

	if (match) {
		const feet = parseInt(match[1]);
		const meters = convertFeetToMeters(feet);

		console.log(`Conversions made: ${feet}ft to ${meters}m (raw: ${feet * 0.3048})`);

		return str.replace(regex, `${meters}m`);
	}

	return str;
};
