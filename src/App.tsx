import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import type { Celebration, FlashMessage, Level, MessageTone, Settings } from './types';
import ActionButtons from './components/ActionButtons';
import Background from './components/Background';
import ColorPicker from './components/ColorPicker';
import Confetti from './components/Confetti';
import EmojiPicker from './components/EmojiPicker';
import FacePicker from './components/FacePicker';
import FanIllustration from './components/FanIllustration';
import Footer from './components/Footer';
import FunnyMessage from './components/FunnyMessage';
import Header from './components/Header';
import PowerButton from './components/PowerButton';
import SpeedSelector from './components/SpeedSelector';
import StatusPill from './components/StatusPill';
import TurboLabel from './components/TurboLabel';
import WindParticles from './components/WindParticles';
import { useFanSound } from './hooks/useFanSound';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import { useSettings } from './hooks/useSettings';
import { useTimedValue } from './hooks/useTimedValue';
import {
  COLORS,
  FACES,
  LEVELS,
  LEVEL_LIST,
  NAP_POKE_MESSAGES,
  OFF_MESSAGE,
  POKE_MESSAGES,
  REACTION_FACES_OFF,
  REACTION_FACES_ON,
  THEMES,
  TURBO_MESSAGES,
} from './utils/constants';
import { pick, pickDifferent } from './utils/random';

export default function App() {
  const { settings, update, reset } = useSettings();
  const { on, level } = settings;
  const osReduced = usePrefersReducedMotion();
  const calm = settings.reducedMotion ?? osReduced;

  const [soundOn, setSoundOn] = useState(false);
  const play = useFanSound(soundOn, on, level);

  const [flash, showFlash, clearFlash] = useTimedValue<FlashMessage | null>(null);
  const [reaction, showReaction] = useTimedValue<string | null>(null);
  const [shaking, shake] = useTimedValue<boolean>(false);
  const [celebration, setCelebration] = useTimedValue<Celebration | null>(null);
  const counter = useRef(0);
  const lastSaid = useRef('');

  const say = useCallback(
    (text: string, ms = 3200) => {
      lastSaid.current = text;
      showFlash({ id: ++counter.current, text }, ms);
    },
    [showFlash],
  );
  const say2 = useCallback(
    (pool: readonly string[], ms?: number) => say(pickDifferent(pool, lastSaid.current), ms),
    [say],
  );
  const celebrate = useCallback(
    (kind: Celebration['kind']) => setCelebration({ id: ++counter.current, kind }, 1800),
    [setCelebration],
  );
  const jolt = useCallback(() => shake(true, 520), [shake]);

  const togglePower = useCallback(() => {
    const next = !on;
    play(next ? 'toggleOn' : 'toggleOff');
    update({ on: next });
    clearFlash();
    if (next && level === 3) jolt();
  }, [on, level, play, update, clearFlash, jolt]);

  const selectLevel = useCallback(
    (next: Level) => {
      update({ level: next });
      clearFlash();
      if (on && next === 3 && level !== 3) jolt();
    },
    [on, level, update, clearFlash, jolt],
  );

  const turbo = useCallback(() => {
    update({ on: true, level: 3 });
    play('turbo');
    say2(TURBO_MESSAGES, 3000);
    celebrate('turbo');
    jolt();
  }, [update, play, say2, celebrate, jolt]);

  const surprise = useCallback(() => {
    const roll = (): Pick<Settings, 'color' | 'face' | 'theme' | 'level'> => ({
      color: pick(COLORS).id,
      face: pick(FACES).id,
      theme: pick(THEMES).id,
      level: pick(LEVEL_LIST),
    });
    const same = (a: ReturnType<typeof roll>) =>
      a.color === settings.color && a.face === settings.face && a.theme === settings.theme && a.level === settings.level;
    let next = roll();
    for (let i = 0; i < 8 && same(next); i++) next = roll();

    update({ ...next, on: true });
    play('surprise');
    celebrate('surprise');
    const c = COLORS.find((x) => x.id === next.color);
    const f = FACES.find((x) => x.id === next.face);
    const t = THEMES.find((x) => x.id === next.theme);
    say(`SURPRISE! ${c?.name} ${f?.emoji} ${t?.emoji} ${LEVELS[next.level].emoji} ${LEVELS[next.level].name} 🎲`, 3800);
    if (next.level === 3) jolt();
  }, [settings, update, play, celebrate, say, jolt]);

  const poke = useCallback(() => {
    play('poke');
    showReaction(pick(on ? REACTION_FACES_ON : REACTION_FACES_OFF), 1200);
    say2(on ? POKE_MESSAGES : NAP_POKE_MESSAGES, 2800);
  }, [on, play, showReaction, say2]);

  const handleReset = useCallback(() => {
    reset();
    setSoundOn(false);
    say('Fresh start! Everything is back to normal ✨');
  }, [reset, say]);

  const toggleSound = useCallback(() => setSoundOn((s) => !s), []);
  const toggleCalm = useCallback(() => update({ reducedMotion: !calm }), [update, calm]);

  // Keyboard shortcuts (listener is removed on cleanup)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.repeat) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      switch (e.key.toLowerCase()) {
        case 'p':
          togglePower();
          break;
        case '1':
        case '2':
        case '3':
          selectLevel(Number(e.key) as Level);
          break;
        case 't':
          turbo();
          break;
        case 's':
          surprise();
          break;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [togglePower, selectLevel, turbo, surprise]);

  const colorOption = COLORS.find((c) => c.id === settings.color) ?? COLORS[0];
  const faceOption = FACES.find((f) => f.id === settings.face) ?? FACES[0];
  const themeOption = THEMES.find((t) => t.id === settings.theme) ?? THEMES[0];
  const info = LEVELS[level];

  const displayFace = reaction ?? (!on ? '😴' : level === 3 ? faceOption.excited : faceOption.emoji);
  const turboActive = on && level === 3;

  const text = flash ? flash.text : on ? info.message : OFF_MESSAGE;
  const messageKey = flash ? `flash-${flash.id}` : on ? `level-${level}` : 'off';
  const tone: MessageTone = flash ? 'flash' : on ? (`level${level}` as MessageTone) : 'off';

  return (
    <MotionConfig reducedMotion={calm ? 'always' : 'never'}>
      <div
        data-calm={calm}
        className={`relative min-h-[100dvh] overflow-x-clip font-sans text-fan-ink ${shaking && !calm ? 'shake' : ''}`}
      >
        <Background on={on} level={level} />
        <Header soundOn={soundOn} calm={calm} onToggleSound={toggleSound} onToggleCalm={toggleCalm} />

        <main className="relative z-10 mx-auto grid w-full max-w-6xl gap-6 px-4 pb-8 pt-2 sm:px-8 lg:grid-cols-[minmax(0,1fr)_460px] lg:gap-10 lg:pt-6">
          <section aria-label="The fan" className="flex flex-col items-center lg:sticky lg:top-6 lg:self-start">
            <div className="flex h-12 items-end justify-center sm:h-16">
              <AnimatePresence mode="wait" initial={false}>
                {turboActive ? (
                  <TurboLabel key="turbo" />
                ) : (
                  <motion.p
                    key="hint"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="pb-2 text-sm font-bold text-fan-ink/60"
                  >
                    psst… try poking the fan 👇
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="relative w-[min(72vw,300px)] sm:w-[min(60vw,360px)] lg:w-[min(34vw,420px)]">
              <FanIllustration
                on={on}
                level={level}
                color={colorOption}
                face={displayFace}
                spinSpeed={calm ? info.calmSpin : info.spin}
                blur={calm ? 0 : info.blur}
                calm={calm}
                onPoke={poke}
              />
              {on && <WindParticles level={level} theme={themeOption.particles} calm={calm} />}
              {celebration && <Confetti key={celebration.id} kind={celebration.kind} calm={calm} />}
            </div>

            <div className="mt-3">
              <StatusPill on={on} level={level} />
            </div>
            <FunnyMessage text={text} messageKey={messageKey} tone={tone} />
          </section>

          <div className="relative z-10 flex flex-col gap-4">
            <section
              aria-label="Fan controls"
              className="flex flex-col items-center gap-4 rounded-[1.75rem] bg-white/80 p-4 shadow-[0_6px_24px_rgba(120,80,160,0.12)]"
            >
              <PowerButton on={on} onToggle={togglePower} />
              <SpeedSelector level={level} onSelect={selectLevel} />
              <ActionButtons turboActive={turboActive} onTurbo={turbo} onSurprise={surprise} />
            </section>
            <ColorPicker value={settings.color} onChange={(color) => update({ color })} />
            <FacePicker value={settings.face} onChange={(face) => update({ face })} />
            <EmojiPicker value={settings.theme} onChange={(theme) => update({ theme })} />
          </div>
        </main>

        <Footer onReset={handleReset} />
      </div>
    </MotionConfig>
  );
}
