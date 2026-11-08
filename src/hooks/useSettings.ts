import { useCallback, useEffect, useState } from 'react';
import type { Settings } from '../types';
import { DEFAULT_SETTINGS } from '../utils/constants';
import { loadSettings, saveSettings } from '../utils/storage';

/** Settings that persist to localStorage. (Sound is deliberately NOT persisted.) */
export function useSettings() {
  const [settings, setSettings] = useState<Settings>(loadSettings);

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  const update = useCallback((patch: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...patch }));
  }, []);

  const reset = useCallback(() => setSettings(DEFAULT_SETTINGS), []);

  return { settings, update, reset };
}
