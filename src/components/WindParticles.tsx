import { memo, useMemo } from 'react';
import type { Level } from '../types';
import { buildParticles, buildStreaks } from '../utils/particles';

interface Props {
  level: Level;
  /** emojis of the selected theme */
  theme: readonly string[];
  calm: boolean;
}

/**
 * Floating emojis + wind streaks. Everything is pure CSS animation on a small,
 * capped number of elements (max ~37). Only mounted while the fan is ON.
 */
function WindParticles({ level, theme, calm }: Props) {
  const particles = useMemo(() => buildParticles(level, theme, calm), [level, theme, calm]);
  const streaks = useMemo(() => buildStreaks(level, calm), [level, calm]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[5]">
      {streaks.map((s) => (
        <span key={s.id} className="streak" style={s.style} />
      ))}
      {particles.map((p) => (
        <span key={p.id} className={`particle particle--${p.kind}`} style={p.style}>
          {p.char}
        </span>
      ))}
    </div>
  );
}

export default memo(WindParticles);
