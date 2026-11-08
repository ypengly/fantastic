import { RotateCcw } from 'lucide-react';

interface Props {
  onReset: () => void;
}

export default function Footer({ onReset }: Props) {
  return (
    <footer className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-3 px-4 pb-10 pt-2 text-center sm:px-8">
      <p className="font-display text-lg font-bold">Made with 💖 and unnecessary amounts of wind.</p>
      <button
        type="button"
        onClick={onReset}
        className="flex h-11 items-center gap-2 rounded-full bg-white/80 px-4 text-sm font-bold shadow-sm transition-colors hover:bg-white active:scale-95"
      >
        <RotateCcw aria-hidden="true" size={16} />
        Reset everything
      </button>
      <p className="hidden text-xs font-semibold text-fan-ink/60 sm:block">
        Keyboard: <kbd>P</kbd> power · <kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd> speed · <kbd>T</kbd> turbo · <kbd>S</kbd> surprise
      </p>
    </footer>
  );
}
