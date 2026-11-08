import { Check } from 'lucide-react';
import type { ColorId } from '../types';
import { COLORS } from '../utils/constants';
import PickerCard from './PickerCard';

interface Props {
  value: ColorId;
  onChange: (id: ColorId) => void;
}

export default function ColorPicker({ value, onChange }: Props) {
  const current = COLORS.find((c) => c.id === value);
  return (
    <PickerCard title="Fan color" current={current?.name}>
      <div role="group" aria-label="Fan color" className="grid grid-cols-4 justify-items-center gap-3 sm:grid-cols-8 lg:grid-cols-8">
        {COLORS.map((c) => {
          const selected = c.id === value;
          return (
            <button
              key={c.id}
              type="button"
              aria-label={c.name}
              aria-pressed={selected}
              title={c.name}
              onClick={() => onChange(c.id)}
              style={{ background: c.swatch }}
              className={`flex h-11 w-11 items-center justify-center rounded-full border-2 border-white shadow-md transition-transform duration-150 active:scale-90 ${
                selected ? 'scale-110 ring-4 ring-violet-500 ring-offset-2' : 'hover:scale-110'
              }`}
            >
              {selected && <Check aria-hidden="true" size={20} strokeWidth={4} className="text-fan-ink drop-shadow-[0_0_2px_#fff]" />}
            </button>
          );
        })}
      </div>
    </PickerCard>
  );
}
