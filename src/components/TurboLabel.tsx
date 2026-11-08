import { motion } from 'framer-motion';

/** The big "TURBO MODE!!!" banner shown above the fan at Level 3. */
export default function TurboLabel() {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -14, opacity: 0 }}
      animate={{ scale: 1, rotate: -3, opacity: 1 }}
      exit={{ scale: 0, rotate: 10, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 14 }}
    >
      <span className="turbo-label whitespace-nowrap font-display text-4xl font-extrabold sm:text-5xl">
        TURBO MODE!!!
      </span>
    </motion.div>
  );
}
