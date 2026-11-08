import type { Level, SoundEffect } from '../types';

/**
 * A tiny Web Audio synth - no audio files needed.
 * An engine is only ever created after the user explicitly switches sound on,
 * and `dispose()` silences everything immediately.
 */
export interface AudioEngine {
  /** Start the looping fan whoosh for a level, or stop it with null. */
  setLoop(level: Level | null): void;
  play(effect: SoundEffect): void;
  dispose(): void;
}

type AudioCtor = typeof AudioContext;

interface LoopRecipe {
  filter: BiquadFilterType;
  freq: number;
  q: number;
  gain: number;
  lfoHz: number;
  lfoDepth: number;
  /** extra wobbling "motor" tone (Level 3 only) */
  motor?: { hz: number; wobbleHz: number; wobbleDepth: number; gain: number };
}

const LOOPS: Record<Level, LoopRecipe> = {
  // soft breeze
  1: { filter: 'lowpass', freq: 600, q: 0.7, gain: 0.07, lfoHz: 0.3, lfoDepth: 0.03 },
  // stronger whoosh
  2: { filter: 'bandpass', freq: 1000, q: 0.9, gain: 0.13, lfoHz: 1.4, lfoDepth: 0.05 },
  // funny turbo: whoosh + wobbling motor
  3: {
    filter: 'bandpass',
    freq: 1600,
    q: 0.6,
    gain: 0.14,
    lfoHz: 7,
    lfoDepth: 0.06,
    motor: { hz: 120, wobbleHz: 5, wobbleDepth: 45, gain: 0.035 },
  },
};

export function createAudioEngine(): AudioEngine | null {
  const w = window as unknown as { AudioContext?: AudioCtor; webkitAudioContext?: AudioCtor };
  const Ctor = w.AudioContext ?? w.webkitAudioContext;
  if (!Ctor) return null;

  let ctx: AudioContext;
  try {
    ctx = new Ctor();
  } catch {
    return null;
  }
  ctx.resume().catch(() => undefined);

  const master = ctx.createGain();
  master.gain.value = 0.7;
  master.connect(ctx.destination);

  // Two seconds of white noise, reused by every loop.
  const noise = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
  const data = noise.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

  let disposed = false;
  let activeLevel: Level | null = null;
  let stopLoop: (() => void) | null = null;

  const startLoop = (level: Level): (() => void) => {
    const recipe = LOOPS[level];
    const sources: AudioScheduledSourceNode[] = [];
    const out = ctx.createGain();
    out.gain.value = 0;
    out.connect(master);
    out.gain.setTargetAtTime(1, ctx.currentTime, 0.08); // gentle fade-in

    const src = ctx.createBufferSource();
    src.buffer = noise;
    src.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = recipe.filter;
    filter.frequency.value = recipe.freq;
    filter.Q.value = recipe.q;
    const gain = ctx.createGain();
    gain.gain.value = recipe.gain;
    src.connect(filter).connect(gain).connect(out);

    const lfo = ctx.createOscillator();
    lfo.frequency.value = recipe.lfoHz;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = recipe.lfoDepth;
    lfo.connect(lfoGain).connect(gain.gain);
    sources.push(src, lfo);

    if (recipe.motor) {
      const motor = ctx.createOscillator();
      motor.type = 'square';
      motor.frequency.value = recipe.motor.hz;
      const wobble = ctx.createOscillator();
      wobble.frequency.value = recipe.motor.wobbleHz;
      const wobbleGain = ctx.createGain();
      wobbleGain.gain.value = recipe.motor.wobbleDepth;
      wobble.connect(wobbleGain).connect(motor.frequency);
      const motorGain = ctx.createGain();
      motorGain.gain.value = recipe.motor.gain;
      motor.connect(motorGain).connect(out);
      sources.push(motor, wobble);
    }

    sources.forEach((s) => s.start());

    return () => {
      out.gain.cancelScheduledValues(ctx.currentTime);
      out.gain.setTargetAtTime(0, ctx.currentTime, 0.02);
      window.setTimeout(() => {
        sources.forEach((s) => {
          try {
            s.stop();
          } catch {
            /* already stopped */
          }
        });
        out.disconnect();
      }, 120);
    };
  };

  const tone = (
    type: OscillatorType,
    from: number,
    to: number,
    duration: number,
    volume: number,
    delay = 0,
  ) => {
    const t = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(from, t);
    osc.frequency.exponentialRampToValueAtTime(to, t + duration);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(volume, t + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    osc.connect(g).connect(master);
    osc.start(t);
    osc.stop(t + duration + 0.05);
  };

  return {
    setLoop(level) {
      if (disposed || level === activeLevel) return;
      stopLoop?.();
      stopLoop = null;
      activeLevel = level;
      if (level) stopLoop = startLoop(level);
    },

    play(effect) {
      if (disposed) return;
      switch (effect) {
        case 'soundOn':
          tone('sine', 660, 990, 0.12, 0.2);
          break;
        case 'toggleOn':
          tone('triangle', 330, 660, 0.14, 0.25);
          tone('triangle', 660, 880, 0.1, 0.15, 0.1);
          break;
        case 'toggleOff':
          tone('triangle', 520, 220, 0.18, 0.25);
          break;
        case 'turbo':
          tone('sawtooth', 180, 1400, 0.5, 0.16);
          tone('square', 90, 700, 0.5, 0.08);
          tone('triangle', 1400, 1900, 0.15, 0.18, 0.5);
          break;
        case 'poke':
          tone('sine', 620, 260, 0.16, 0.3);
          break;
        case 'surprise':
          [523, 659, 784, 1047].forEach((f, i) => tone('triangle', f, f * 1.01, 0.12, 0.2, i * 0.07));
          break;
      }
    },

    dispose() {
      if (disposed) return;
      disposed = true;
      // Mute instantly, then tear everything down.
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.value = 0;
      stopLoop?.();
      stopLoop = null;
      ctx.close().catch(() => undefined);
    },
  };
}
