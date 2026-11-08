import { AnimatePresence, motion } from 'framer-motion';
import type { MessageTone } from '../types';

interface Props {
  text: string;
  /** changes whenever the bubble should re-pop */
  messageKey: string;
  tone: MessageTone;
}

const TONES: Record<MessageTone, string> = {
  off: 'bg-fan-purple/50 border-violet-300',
  level1: 'bg-fan-mint/70 border-emerald-400',
  level2: 'bg-fan-blue/70 border-sky-400',
  level3: 'bg-fan-pink/80 border-rose-500 uppercase tracking-wide',
  flash: 'bg-fan-yellow border-amber-400',
};

export default function FunnyMessage({ text, messageKey, tone }: Props) {
  return (
    <div role="status" aria-live="polite" className="flex min-h-[5.5rem] w-full max-w-md items-center justify-center px-2">
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={messageKey}
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 380, damping: 22 }}
          className={`relative rounded-3xl border-2 px-5 py-3 text-center font-display text-xl font-bold leading-snug shadow-md sm:text-2xl ${TONES[tone]}`}
        >
          {text}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
