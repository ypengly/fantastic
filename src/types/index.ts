export type Level = 1 | 2 | 3;

export type ColorId =
  | 'pink'
  | 'blue'
  | 'mint'
  | 'lavender'
  | 'lemon'
  | 'cherry'
  | 'midnight'
  | 'rainbow';

export type FaceId = 'happy' | 'cool' | 'cute' | 'mischievous' | 'sleepy' | 'crazy';

export type ThemeId = 'love' | 'cute' | 'sparkles' | 'nature' | 'funny' | 'chaos';

/** Everything the user can change (and that we persist). */
export interface Settings {
  on: boolean;
  level: Level;
  color: ColorId;
  face: FaceId;
  theme: ThemeId;
  /** null = follow the operating-system preference */
  reducedMotion: boolean | null;
}

export interface ColorOption {
  id: ColorId;
  name: string;
  /** CSS background used for the swatch button */
  swatch: string;
  body: string;
  dark: string;
  accent: string;
}

export interface FaceOption {
  id: FaceId;
  name: string;
  emoji: string;
  /** Shown instead of `emoji` while the fan is in MAXIMUM CHAOS */
  excited: string;
}

export interface ThemeOption {
  id: ThemeId;
  name: string;
  emoji: string;
  particles: readonly string[];
}

export interface LevelInfo {
  level: Level;
  emoji: string;
  name: string;
  message: string;
  /** blade rotation speed in degrees per second */
  spin: number;
  /** slower rotation used when reduced motion is on */
  calmSpin: number;
  /** opacity of the motion-blur disc behind the blades */
  blur: number;
}

export type SoundEffect = 'soundOn' | 'toggleOn' | 'toggleOff' | 'turbo' | 'poke' | 'surprise';

export type MessageTone = 'off' | 'level1' | 'level2' | 'level3' | 'flash';

export interface FlashMessage {
  id: number;
  text: string;
}

export interface Celebration {
  id: number;
  kind: 'turbo' | 'surprise';
}
