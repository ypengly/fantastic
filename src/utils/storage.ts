import type { ColorId, FaceId, Level, Settings, ThemeId } from '../types';
import { COLORS, DEFAULT_SETTINGS, FACES, LEVEL_LIST, STORAGE_KEY, THEMES } from './constants';

function oneOf<T extends string | number>(value: unknown, allowed: readonly T[], fallback: T): T {
  return allowed.includes(value as T) ? (value as T) : fallback;
}

/** Turn whatever is in storage into a valid Settings object. */
function sanitize(raw: unknown): Settings {
  if (typeof raw !== 'object' || raw === null) return DEFAULT_SETTINGS;
  const r = raw as Record<string, unknown>;
  return {
    on: typeof r.on === 'boolean' ? r.on : DEFAULT_SETTINGS.on,
    level: oneOf<Level>(r.level, LEVEL_LIST, DEFAULT_SETTINGS.level),
    color: oneOf<ColorId>(r.color, COLORS.map((c) => c.id), DEFAULT_SETTINGS.color),
    face: oneOf<FaceId>(r.face, FACES.map((f) => f.id), DEFAULT_SETTINGS.face),
    theme: oneOf<ThemeId>(r.theme, THEMES.map((t) => t.id), DEFAULT_SETTINGS.theme),
    reducedMotion: typeof r.reducedMotion === 'boolean' ? r.reducedMotion : null,
  };
}

export function loadSettings(): Settings {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? sanitize(JSON.parse(raw)) : DEFAULT_SETTINGS;
  } catch {
    // Storage blocked or corrupted JSON - just use the defaults.
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: Settings): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Private mode / quota exceeded: preferences simply won't persist.
  }
}
