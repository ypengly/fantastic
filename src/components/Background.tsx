import { memo } from 'react';
import type { Level } from '../types';
import { cssVars } from '../utils/random';

interface Props {
  on: boolean;
  level: Level;
}

const DECOR = [
  { x: '6%', y: '14%', size: 90, color: '#FF8FB1', dur: 7 },
  { x: '88%', y: '10%', size: 70, color: '#7DD3FC', dur: 9 },
  { x: '78%', y: '62%', size: 110, color: '#C4B5FD', dur: 8 },
  { x: '4%', y: '70%', size: 80, color: '#86EFAC', dur: 10 },
  { x: '45%', y: '90%', size: 60, color: '#FDE68A', dur: 6 },
  { x: '60%', y: '4%', size: 50, color: '#FDE68A', dur: 11 },
];

/** Pastel gradient + floating blobs; gets more energetic with the fan level. */
function Background({ on, level }: Props) {
  const wind = on && level >= 2;
  const chaos = on && level === 3;
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-pastel">
      {DECOR.map((d, i) => (
        <span
          key={i}
          className="decor absolute rounded-full opacity-40"
          style={cssVars({ left: d.x, top: d.y, width: d.size, height: d.size, background: d.color, '--dur': `${d.dur}s` })}
        />
      ))}
      <div className="wash absolute inset-0 transition-opacity duration-700" style={{ opacity: wind ? 1 : 0 }} />
      <div className="chaos absolute inset-0 transition-opacity duration-500" style={{ opacity: chaos ? 1 : 0 }} />
      <div className="rays transition-opacity duration-500" style={{ opacity: chaos ? 0.55 : 0 }} />
    </div>
  );
}

export default memo(Background);
