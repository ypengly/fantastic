import { motion } from 'framer-motion';

interface Props {
  /** fan is ON at Level 3 */
  turboActive: boolean;
  onTurbo: () => void;
  onSurprise: () => void;
}

export default function ActionButtons({ turboActive, onTurbo, onSurprise }: Props) {
  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
      <motion.button
        type="button"
        onClick={onTurbo}
        whileTap={{ scale: 0.92 }}
        className={`min-h-[60px] rounded-full px-5 py-3 font-display text-lg font-extrabold text-white shadow-[0_6px_0_#9a1d4b] transition-shadow active:shadow-[0_1px_0_#9a1d4b] ${
          turboActive ? 'turbo-fire' : 'bg-gradient-to-r from-orange-600 via-rose-600 to-fuchsia-600'
        }`}
      >
        🚀 ACTIVATE TURBO
      </motion.button>
      <motion.button
        type="button"
        onClick={onSurprise}
        whileTap={{ scale: 0.92 }}
        className="min-h-[60px] rounded-full border-2 border-violet-300 bg-white px-5 py-3 font-display text-lg font-extrabold text-violet-800 shadow-[0_6px_0_#c4b5fd] transition-shadow active:shadow-[0_1px_0_#c4b5fd]"
      >
        SURPRISE ME 🎲
      </motion.button>
    </div>
  );
}
