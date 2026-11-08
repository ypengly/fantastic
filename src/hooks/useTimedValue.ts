import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * A value that snaps back to `idle` after a delay (reaction faces, flash
 * messages, screen shake, confetti...). The pending timer is always cleaned up.
 */
export function useTimedValue<T>(idle: T) {
  const [value, setValue] = useState<T>(idle);
  const timer = useRef<number | undefined>(undefined);

  const clear = useCallback(() => {
    window.clearTimeout(timer.current);
    setValue(idle);
  }, [idle]);

  const trigger = useCallback(
    (next: T, ms: number) => {
      window.clearTimeout(timer.current);
      setValue(next);
      timer.current = window.setTimeout(() => setValue(idle), ms);
    },
    [idle],
  );

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return [value, trigger, clear] as const;
}
