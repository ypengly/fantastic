interface Props {
  emoji: string;
  label: string;
  selected: boolean;
  onClick: () => void;
}

/** Emoji + name chip used by the face and emoji-theme pickers. */
export default function OptionButton({ emoji, label, selected, onClick }: Props) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`flex min-h-[52px] items-center gap-2 rounded-2xl border-2 px-2.5 py-2 text-left transition-all duration-150 active:scale-95 ${
        selected
          ? 'scale-[1.03] border-violet-500 bg-violet-100 shadow-sm'
          : 'border-transparent bg-white/70 hover:bg-white'
      }`}
    >
      <span aria-hidden="true" className="text-2xl leading-none">
        {emoji}
      </span>
      <span className="text-[13px] font-bold leading-tight">{label}</span>
    </button>
  );
}
