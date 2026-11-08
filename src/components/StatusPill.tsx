import type { Level } from '../types';

interface Props {
  on: boolean;
  level: Level;
}

export default function StatusPill({ on, level }: Props) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-1.5 text-sm font-extrabold shadow-sm">
      <span
        aria-hidden="true"
        className={`h-3 w-3 rounded-full transition-colors duration-300 ${
          on ? 'bg-emerald-500 shadow-[0_0_8px_#22c55e]' : 'bg-rose-400'
        }`}
      />
      {on ? `ON · Level ${level}` : `OFF · Level ${level} ready`}
    </p>
  );
}
