import type { ReactNode } from 'react';

interface Props {
  title: string;
  /** currently selected option's name, shown on the right */
  current?: string;
  children: ReactNode;
}

/** Shared rounded card used by the colour / face / emoji pickers. */
export default function PickerCard({ title, current, children }: Props) {
  return (
    <section className="rounded-[1.75rem] bg-white/80 p-4 shadow-[0_6px_24px_rgba(120,80,160,0.12)]">
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <h2 className="font-display text-lg font-bold">{title}</h2>
        {current && <span className="truncate text-sm font-semibold text-fan-ink/70">{current}</span>}
      </div>
      {children}
    </section>
  );
}
