import { useState } from 'react';
import type { Celebration } from '../types';
import { buildConfetti } from '../utils/particles';

interface Props {
  kind: Celebration['kind'];
  calm: boolean;
}

/** One-shot celebration burst from the fan's hub. Mount with a fresh `key` to replay. */
export default function Confetti({ kind, calm }: Props) {
  const [pieces] = useState(() => buildConfetti(kind, calm));
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[6]">
      {pieces.map((p) => (
        <span key={p.id} className="confetti" style={p.style}>
          {p.char}
        </span>
      ))}
    </div>
  );
}
