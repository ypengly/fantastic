import type { ThemeId } from '../types';
import { THEMES } from '../utils/constants';
import OptionButton from './OptionButton';
import PickerCard from './PickerCard';

interface Props {
  value: ThemeId;
  onChange: (id: ThemeId) => void;
}

export default function EmojiPicker({ value, onChange }: Props) {
  return (
    <PickerCard title="Wind emojis">
      <div role="group" aria-label="Wind emoji theme" className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {THEMES.map((t) => (
          <OptionButton key={t.id} emoji={t.emoji} label={t.name} selected={t.id === value} onClick={() => onChange(t.id)} />
        ))}
      </div>
    </PickerCard>
  );
}
