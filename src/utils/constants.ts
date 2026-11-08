import type { ColorOption, FaceOption, Level, LevelInfo, Settings, ThemeOption } from '../types';

export const STORAGE_KEY = 'fantastic:v1';

export const DEFAULT_SETTINGS: Settings = {
  on: false,
  level: 1,
  color: 'pink',
  face: 'happy',
  theme: 'love',
  reducedMotion: null,
};

export const COLORS: readonly ColorOption[] = [
  { id: 'pink', name: 'Cotton Candy Pink', swatch: '#FF8FB1', body: '#FF8FB1', dark: '#E0568A', accent: '#FDE68A' },
  { id: 'blue', name: 'Sky Blue', swatch: '#7DD3FC', body: '#7DD3FC', dark: '#2F9FD6', accent: '#FF8FB1' },
  { id: 'mint', name: 'Mint Green', swatch: '#86EFAC', body: '#86EFAC', dark: '#36B26E', accent: '#FDE68A' },
  { id: 'lavender', name: 'Lavender', swatch: '#C4B5FD', body: '#C4B5FD', dark: '#8A74DD', accent: '#FF8FB1' },
  { id: 'lemon', name: 'Lemon Yellow', swatch: '#FDE68A', body: '#FDE68A', dark: '#D9AE2B', accent: '#7DD3FC' },
  { id: 'cherry', name: 'Cherry Red', swatch: '#F43F5E', body: '#F43F5E', dark: '#B91C3C', accent: '#FDE68A' },
  { id: 'midnight', name: 'Midnight Black', swatch: '#3F3F5A', body: '#4B4B68', dark: '#1F1F33', accent: '#FF8FB1' },
  {
    id: 'rainbow',
    name: 'Rainbow Mode',
    swatch:
      'conic-gradient(from 0deg, #FF8FB1, #FDBA74, #FDE68A, #86EFAC, #7DD3FC, #C4B5FD, #FF8FB1)',
    // Starting values only - the CSS `rainbow` animation cycles them.
    body: '#FF8FB1',
    dark: '#E0568A',
    accent: '#FDE68A',
  },
];

export const FACES: readonly FaceOption[] = [
  { id: 'happy', name: 'Happy', emoji: '😊', excited: '😆' },
  { id: 'cool', name: 'Cool', emoji: '😎', excited: '🤩' },
  { id: 'cute', name: 'Cute', emoji: '🥺', excited: '😍' },
  { id: 'mischievous', name: 'Mischievous', emoji: '😈', excited: '😜' },
  { id: 'sleepy', name: 'Sleepy', emoji: '😴', excited: '🥴' },
  { id: 'crazy', name: 'Crazy', emoji: '🤯', excited: '🤪' },
];

export const THEMES: readonly ThemeOption[] = [
  { id: 'love', name: 'Love', emoji: '💖', particles: ['💖', '💗', '💕', '💘', '❤️'] },
  { id: 'cute', name: 'Cute', emoji: '🌸', particles: ['🌸', '🌷', '🌼', '🦋', '🎀'] },
  { id: 'sparkles', name: 'Sparkles', emoji: '⭐', particles: ['⭐', '✨', '🌟', '💫'] },
  { id: 'nature', name: 'Nature', emoji: '🍃', particles: ['🍃', '🌿', '🍂', '🍀', '🌱'] },
  { id: 'funny', name: 'Funny', emoji: '😂', particles: ['😂', '🤣', '😜', '🤪', '🙃', '🥴'] },
  { id: 'chaos', name: 'Chaos', emoji: '💀', particles: ['💀', '☠️', '🔥', '👻', '💥', '🌪️'] },
];

export const LEVELS: Readonly<Record<Level, LevelInfo>> = {
  1: {
    level: 1,
    emoji: '🌱',
    name: 'Gentle Breeze',
    message: 'Ahhh... nice and breezy! 🌸',
    spin: 100,
    calmSpin: 28,
    blur: 0,
  },
  2: {
    level: 2,
    emoji: '🌬️',
    name: 'Windy Mode',
    message: 'Your hair is having a moment! 😂',
    spin: 440,
    calmSpin: 55,
    blur: 0.22,
  },
  3: {
    level: 3,
    emoji: '🌪️',
    name: 'MAXIMUM CHAOS',
    message: 'BRO, YOU ARE CREATING A TORNADO 💀💨',
    spin: 1100,
    calmSpin: 85,
    blur: 0.45,
  },
};

export const LEVEL_LIST: readonly Level[] = [1, 2, 3];

export const OFF_MESSAGE = 'Fan is taking a nap 😴';

/** Little objects that get blown around at Level 2. */
export const BREEZY_OBJECTS = ['🪶', '📄', '🍃', '🎈', '✉️', '🧦'] as const;

/** Silly things that join the party at Level 3. */
export const SILLY_THINGS = ['⭐', '💖', '🍃', '🎈', '🧦', '🍕', '🦆', '🥔', '🌟'] as const;

export const POKE_MESSAGES = [
  'WHY ARE YOU TOUCHING ME 😭',
  'I AM WORKING OVERTIME 💨',
  'PLEASE, I NEED A VACATION 🏖️',
  'WHO GAVE YOU THE TURBO BUTTON 💀',
  'I WAS BORN TO SPIN.',
  'AIR DELIVERY IN PROGRESS 📦',
  "CAREFUL, I'M TICKLISH 🤭",
  'NOT THE BLADES!! 😳',
  "I'M YOUR BIGGEST FAN 💖",
  'SPINNING IS MY CARDIO 🏃',
] as const;

export const NAP_POKE_MESSAGES = [
  'zzz... five more minutes 😴',
  'WHO DARES WAKE ME?! 😤',
  'I was dreaming about air 💭',
  '...is it Monday already? 🥱',
  'PLEASE, I NEED A VACATION 🏖️',
  'WHY ARE YOU TOUCHING ME 😭',
] as const;

export const TURBO_MESSAGES = [
  'TURBO ENGAGED. NO REFUNDS. 🚀',
  'HOLD ONTO YOUR WIG!!! 💨',
  'WHO GAVE YOU THE TURBO BUTTON 💀',
  'WE ARE GOING TO MARS 🚀',
  'THIS IS NOT A DRILL (IT IS A FAN) 🌪️',
] as const;

export const REACTION_FACES_ON = ['😭', '😳', '🙃', '🤭', '😵', '🫠'] as const;
export const REACTION_FACES_OFF = ['😤', '😳', '🥱', '😵‍💫'] as const;
