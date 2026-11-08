import { useCallback, useEffect, useRef } from 'react';
import type { Level, SoundEffect } from '../types';
import { createAudioEngine, type AudioEngine } from '../utils/audio';

/**
 * Connects the fan state to the Web Audio engine.
 * Nothing is created or played until `enabled` becomes true (a user action),
 * and switching it off disposes the engine, which silences everything at once.
 */
export function useFanSound(enabled: boolean, running: boolean, level: Level) {
  const engine = useRef<AudioEngine | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const e = createAudioEngine();
    engine.current = e;
    e?.play('soundOn');
    return () => {
      e?.dispose();
      engine.current = null;
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    engine.current?.setLoop(running ? level : null);
  }, [enabled, running, level]);

  return useCallback((effect: SoundEffect) => engine.current?.play(effect), []);
}
