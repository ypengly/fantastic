import { AnimatePresence, motion } from 'framer-motion';
import { Power } from 'lucide-react';

interface Props {
  on: boolean;
  onToggle: () => void;
}

export default function PowerButton({ on, onToggle }: Props) {
  const label = on ? 'TURN OFF 🔴' : 'TURN ON 💚';
  const colors = on
    ? 'bg-rose-600 shadow-[0_8px_0_#9f1239] active:shadow-[0_2px_0_#9f1239]'
    : 'bg-emerald-600 shadow-[0_8px_0_#065f46] active:shadow-[0_2px_0_#065f46]';

  return (
    <div className="relative w-full">
      {!on && <span aria-hidden="true" className="pulse-ring absolute inset-0 rounded-full bg-emerald-400" />}
      <button
        type="button"
        onClick={onToggle}
        className={`relative flex min-h-[68px] w-full items-center justify-center gap-3 rounded-full px-8 py-4 font-display text-2xl font-extrabold text-white transition-[background-color,box-shadow,transform] duration-300 active:translate-y-[6px] sm:text-3xl ${colors}`}
      >
        <motion.span
          key={on ? 'on' : 'off'}
          initial={{ rotate: -180, scale: 0.4 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 14 }}
          className="flex"
        >
          <Power aria-hidden="true" size={30} strokeWidth={3} />
        </motion.span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={label}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.14 }}
          >
            {label}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
}
