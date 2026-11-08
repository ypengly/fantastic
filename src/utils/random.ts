import type { CSSProperties } from 'react';

export function rand(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

export function pick<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

/** Pick a random item, trying not to repeat `previous`. */
export function pickDifferent<T>(items: readonly T[], previous?: T): T {
  if (items.length < 2) return items[0];
  let next = pick(items);
  for (let i = 0; i < 6 && next === previous; i++) next = pick(items);
  return next;
}

/** Typed helper for setting CSS custom properties in a style prop. */
export function cssVars(vars: Record<string, string | number>): CSSProperties {
  return vars as CSSProperties;
}
