import type { FaceId } from '../types';
import { FACES } from '../utils/constants';
import OptionButton from './OptionButton';
import PickerCard from './PickerCard';

interface Props {
  value: FaceId;
  onChange: (id: FaceId) => void;
}

export default function FacePicker({ value, onChange }: Props) {
  return (
    <PickerCard title="Fan face">
      <div role="group" aria-label="Fan face" className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {FACES.map((f) => (
          <OptionButton key={f.id} emoji={f.emoji} label={f.name} selected={f.id === value} onClick={() => onChange(f.id)} />
        ))}
      </div>
    </PickerCard>
  );
}
