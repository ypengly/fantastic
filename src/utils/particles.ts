import type { CSSProperties } from 'react';
import type { Level } from '../types';
import { BREEZY_OBJECTS, SILLY_THINGS } from './constants';
import { cssVars, pick, rand } from './random';

export type ParticleKind = 'float' | 'blow' | 'burst' | 'twinkle';

export interface Particle {
  id: string;
  kind: ParticleKind;
  char: string;
  style: CSSProperties;
}

export interface Streak {
  id: string;
  style: CSSProperties;
}

/** Hard caps keep the DOM small no matter what. */
const PARTICLE_COUNT: Record<Level, number> = { 1: 9, 2: 14, 3: 24 };
const STREAK_COUNT: Record<Level, number> = { 1: 3, 2: 7, 3: 13 };
const CALM_COUNT = 6;

const STREAK_COLORS = ['rgba(125,211,252,0.9)', 'rgba(196,181,253,0.9)', 'rgba(255,143,177,0.8)', 'rgba(255,255,255,0.95)'];

export function buildParticles(level: Level, theme: readonly string[], calm: boolean): Particle[] {
  const count = calm ? CALM_COUNT : PARTICLE_COUNT[level];
  const extras = level === 2 ? BREEZY_OBJECTS : SILLY_THINGS;
  const extraChance = level === 2 ? 0.25 : level === 3 ? 0.4 : 0;

  return Array.from({ length: count }, (_, i): Particle => {
    const char = !calm && Math.random() < extraChance ? pick(extras) : pick(theme);
    const id = `${level}-${i}`;
    const size = `${rand(18, 30).toFixed(0)}px`;

    if (calm) {
      const dur = rand(2.5, 4.5);
      return {
        id,
        kind: 'twinkle',
        char,
        style: cssVars({
          '--x': `${rand(0, 100).toFixed(1)}%`,
          '--y': `${rand(10, 95).toFixed(1)}%`,
          '--size': size,
          '--dur': `${dur.toFixed(2)}s`,
          '--delay': `-${rand(0, dur).toFixed(2)}s`,
        }),
      };
    }

    if (level === 1) {
      const dur = rand(6, 11);
      return {
        id,
        kind: 'float',
        char,
        style: cssVars({
          '--x': `${rand(-5, 100).toFixed(1)}%`,
          '--y': `${rand(62, 98).toFixed(1)}%`,
          '--dx': `${rand(-8, 8).toFixed(1)}vw`,
          '--dy': `${(-rand(45, 80)).toFixed(0)}vh`,
          '--rot': `${rand(-40, 40).toFixed(0)}deg`,
          '--size': size,
          '--dur': `${dur.toFixed(2)}s`,
          '--delay': `-${rand(0, dur).toFixed(2)}s`,
        }),
      };
    }

    if (level === 2) {
      const dur = rand(3.2, 5.5);
      return {
        id,
        kind: 'blow',
        char,
        style: cssVars({
          '--x': `${rand(-35, -8).toFixed(1)}%`,
          '--y': `${rand(5, 95).toFixed(1)}%`,
          '--dx': `${rand(85, 125).toFixed(0)}vw`,
          '--dy': `${rand(-12, 12).toFixed(1)}vh`,
          '--rot': `${rand(120, 420).toFixed(0)}deg`,
          '--size': size,
          '--dur': `${dur.toFixed(2)}s`,
          '--delay': `-${rand(0, dur).toFixed(2)}s`,
        }),
      };
    }

    // Level 3: burst outwards from the fan's hub in every direction.
    const angle = rand(0, Math.PI * 2);
    const dist = rand(28, 58);
    const dur = rand(1.1, 2.2);
    return {
      id,
      kind: 'burst',
      char,
      style: cssVars({
        '--x': '50%',
        '--y': '38%',
        '--dx': `${(Math.cos(angle) * dist).toFixed(1)}vmin`,
        '--dy': `${(Math.sin(angle) * dist).toFixed(1)}vmin`,
        '--rot': `${rand(-720, 720).toFixed(0)}deg`,
        '--end-scale': rand(1.2, 2).toFixed(2),
        '--size': `${rand(22, 40).toFixed(0)}px`,
        '--dur': `${dur.toFixed(2)}s`,
        '--delay': `-${rand(0, dur).toFixed(2)}s`,
      }),
    };
  });
}

export function buildStreaks(level: Level, calm: boolean): Streak[] {
  if (calm) return [];
  return Array.from({ length: STREAK_COUNT[level] }, (_, i): Streak => {
    const dur = level === 1 ? rand(5, 8) : level === 2 ? rand(1.6, 2.6) : rand(0.7, 1.2);
    return {
      id: `${level}-${i}`,
      style: cssVars({
        '--x': `${rand(-60, -20).toFixed(0)}%`,
        '--y': `${rand(5, 95).toFixed(1)}%`,
        '--w': `${(level === 1 ? rand(40, 90) : rand(60, 150)).toFixed(0)}px`,
        '--h': `${(level === 1 ? rand(2, 3) : level === 2 ? rand(3, 4) : rand(4, 6)).toFixed(1)}px`,
        '--dx': `${rand(130, 170).toFixed(0)}vw`,
        '--o': level === 1 ? 0.35 : level === 2 ? 0.6 : 0.8,
        '--c': pick(STREAK_COLORS),
        '--dur': `${dur.toFixed(2)}s`,
        '--delay': `-${rand(0, dur).toFixed(2)}s`,
      }),
    };
  });
}

export interface ConfettiPiece {
  id: number;
  char: string;
  style: CSSProperties;
}

const CONFETTI_CHARS = {
  turbo: ['🚀', '🔥', '💥', '⭐', '🎉', '💨'],
  surprise: ['🎲', '🎉', '✨', '🎊', '💖', '🌈'],
} as const;

export function buildConfetti(kind: 'turbo' | 'surprise', calm: boolean): ConfettiPiece[] {
  const count = calm ? 8 : 26;
  const reach = calm ? 0.2 : 1; // calm mode: gentle pops instead of a big burst
  return Array.from({ length: count }, (_, id): ConfettiPiece => {
    const angle = rand(0, Math.PI * 2);
    const dist = rand(110, 280) * reach;
    return {
      id,
      char: pick(CONFETTI_CHARS[kind]),
      style: cssVars({
        '--dx': `${(Math.cos(angle) * dist).toFixed(0)}px`,
        '--dy': `${(Math.sin(angle) * dist - 40 * reach).toFixed(0)}px`,
        '--rot': `${rand(-540, 540).toFixed(0)}deg`,
        '--size': `${rand(20, 36).toFixed(0)}px`,
        '--dur': `${rand(0.9, 1.5).toFixed(2)}s`,
        '--delay': `${rand(0, 0.15).toFixed(2)}s`,
      }),
    };
  });
}
