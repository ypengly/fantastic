import type { Level } from '../types';
import { LEVELS, LEVEL_LIST } from '../utils/constants';

interface Props {
  level: Level;
  onSelect: (level: Level) => void;
}

const SELECTED: Record<Level, string> = {
  1: 'border-emerald-500 bg-fan-mint',
  2: 'border-sky-500 bg-fan-blue',
  3: 'border-rose-600 bg-gradient-to-br from-fan-pink to-fan-yellow',
};

export default function SpeedSelector({ level, onSelect }: Props) {
  return (
    <div role="group" aria-label="Fan speed" className="grid w-full grid-cols-3 gap-2 sm:gap-3">
      {LEVEL_LIST.map((l) => {
        const info = LEVELS[l];
        const selected = l === level;
        return (
          <button
            key={l}
            type="button"
            aria-pressed={selected}
            onClick={() => onSelect(l)}
            className={`flex min-h-[88px] flex-col items-center justify-center gap-0.5 rounded-3xl border-2 px-1.5 py-2 text-center transition-all duration-200 active:scale-95 ${
              selected ? `${SELECTED[l]} scale-[1.03] shadow-md` : 'border-transparent bg-white/70 hover:bg-white'
            }`}
          >
            <span aria-hidden="true" className="text-2xl leading-none">
              {info.emoji}
            </span>
            <span className="font-display text-[13px] font-bold leading-tight sm:text-sm">{info.name}</span>
            <span aria-hidden="true" className="mt-0.5 flex gap-1">
              {LEVEL_LIST.map((d) => (
                <span key={d} className={`h-1.5 w-1.5 rounded-full ${d <= l ? 'bg-fan-ink' : 'bg-fan-ink/20'}`} />
              ))}
            </span>
            <span className="sr-only">Level {l}</span>
          </button>
        );
      })}
    </div>
  );
}
