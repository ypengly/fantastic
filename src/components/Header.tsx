import { Feather, Volume2, VolumeX } from 'lucide-react';
import type { ReactNode } from 'react';

interface ToggleProps {
  pressed: boolean;
  label: string;
  onClick: () => void;
  icon: ReactNode;
}

function IconToggle({ pressed, label, onClick, icon }: ToggleProps) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`flex h-11 items-center gap-2 rounded-full px-3.5 text-sm font-bold shadow-sm transition-colors active:scale-95 ${
        pressed ? 'bg-violet-200 text-violet-900' : 'bg-white/80 text-fan-ink hover:bg-white'
      }`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
      <span className="sr-only sm:hidden">{label}</span>
    </button>
  );
}

interface Props {
  soundOn: boolean;
  calm: boolean;
  onToggleSound: () => void;
  onToggleCalm: () => void;
}

export default function Header({ soundOn, calm, onToggleSound, onToggleCalm }: Props) {
  return (
    <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 pt-5 sm:px-8 sm:pt-7">
      <div>
        <h1 className="font-display text-4xl font-extrabold leading-none sm:text-5xl">
          <span className="bg-gradient-to-r from-[#e8457c] via-[#8b5cf6] to-[#0ea5e9] bg-clip-text text-transparent">
            FanTastic
          </span>{' '}
          <span aria-hidden="true">💨</span>
        </h1>
        <p className="mt-1 text-sm font-bold text-fan-ink/70 sm:text-base">A little fan. A lot of drama.</p>
      </div>
      <div className="flex gap-2">
        <IconToggle
          pressed={soundOn}
          label={soundOn ? 'Sound on' : 'Sound off'}
          onClick={onToggleSound}
          icon={soundOn ? <Volume2 aria-hidden="true" size={20} /> : <VolumeX aria-hidden="true" size={20} />}
        />
        <IconToggle
          pressed={calm}
          label="Calm motion"
          onClick={onToggleCalm}
          icon={<Feather aria-hidden="true" size={20} />}
        />
      </div>
    </header>
  );
}
