import { useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import type { ColorOption, Level } from '../types';
import { useSpin } from '../hooks/useSpin';
import { cssVars } from '../utils/random';

interface Props {
  on: boolean;
  level: Level;
  color: ColorOption;
  /** emoji shown on the hub */
  face: string;
  spinSpeed: number;
  blur: number;
  calm: boolean;
  onPoke: () => void;
}

const CX = 200;
const CY = 190;
const NECK_Y = 346;

const BLADE_ANGLES = [0, 90, 180, 270];
const BLADE_PATH = 'M0 -8 C34 -22 60 -74 30 -114 C20 -128 -20 -128 -30 -114 C-60 -74 -34 -22 0 -8Z';

// guard wires: 8 spokes between the hub and the rim
const SPOKES = Array.from({ length: 8 }, (_, i) => {
  const a = ((i * 45 + 22.5) * Math.PI) / 180;
  const p = (r: number) => `${(CX + Math.cos(a) * r).toFixed(1)} ${(CY + Math.sin(a) * r).toFixed(1)}`;
  return `M${p(50)}L${p(140)}`;
}).join('');

// little accent gems around the rim
const GEMS = Array.from({ length: 8 }, (_, i) => {
  const a = (i * 45 * Math.PI) / 180;
  return { x: CX + Math.cos(a) * 149, y: CY + Math.sin(a) * 149 };
});

export default function FanIllustration({ on, level, color, face, spinSpeed, blur, calm, onPoke }: Props) {
  const spinRef = useRef<SVGGElement>(null);
  const controls = useAnimationControls();
  useSpin(spinRef, spinSpeed, on);

  const handlePoke = () => {
    void controls.start({
      rotate: [0, -7, 7, -5, 5, -2, 0],
      scale: [1, 1.06, 0.97, 1.03, 1],
      transition: { duration: 0.65, ease: 'easeInOut' },
    });
    onPoke();
  };

  const vibrate = on && !calm ? (level === 3 ? 'vibrate-hard' : level === 2 ? 'vibrate-soft' : '') : '';
  const vars = cssVars({
    '--fan-body': color.body,
    '--fan-dark': color.dark,
    '--fan-accent': color.accent,
  });

  return (
    <motion.button
      type="button"
      onClick={handlePoke}
      animate={controls}
      style={{ originY: 0.9 }}
      aria-label="Poke the fan"
      title="Poke me!"
      className="relative z-[1] block w-full cursor-pointer rounded-[2rem]"
    >
      <div className={vibrate}>
        <svg
          viewBox="0 0 400 500"
          aria-hidden="true"
          className={`fan-svg block h-auto w-full select-none ${color.id === 'rainbow' ? 'rainbow' : ''}`}
          style={vars}
        >
          {/* ground shadow + base */}
          <ellipse cx="200" cy="472" rx="124" ry="14" fill="rgba(60,30,90,0.14)" />
          <ellipse cx="200" cy="458" rx="112" ry="26" className="f-dark" />
          <ellipse cx="200" cy="450" rx="112" ry="26" className="f-body s-dark" strokeWidth="5" />
          <ellipse cx="170" cy="442" rx="40" ry="7" fill="#fff" opacity="0.4" />
          {/* power LED */}
          <circle cx="200" cy="454" r="10" fill="#fff" />
          <circle cx="200" cy="454" r="6.5" fill={on ? '#22c55e' : '#f87171'} style={{ transition: 'fill .3s' }} />

          {/* pole + neck */}
          <rect x="186" y={NECK_Y} width="28" height="96" rx="10" className="f-dark" />
          <rect x="191" y={NECK_Y} width="18" height="92" rx="8" className="f-body" />
          <circle cx={CX} cy={NECK_Y} r="24" className="f-dark" />
          <circle cx={CX} cy={NECK_Y} r="15" className="f-accent" />

          {/* head: perks up when ON, droops when OFF */}
          <g className={`fan-head ${on ? '' : 'fan-head--off'}`}>
            <g className={on ? '' : 'nap-breathe'}>
              {/* outer ring + glass */}
              <circle cx={CX} cy={CY} r="156" className="f-body s-dark" strokeWidth="6" />
              <circle cx={CX} cy={CY} r="142" fill="#fff" opacity="0.84" className="s-dark" strokeWidth="3" />
              <path d="M71 115.5A149 149 0 0 1 149 50" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" opacity="0.6" />

              {/* motion-blur disc */}
              <circle cx={CX} cy={CY} r="126" className="f-body" style={{ opacity: on ? blur : 0, transition: 'opacity .4s' }} />

              {/* blades */}
              <g transform={`translate(${CX} ${CY})`}>
                <g ref={spinRef}>
                  {BLADE_ANGLES.map((a) => (
                    <g key={a} transform={`rotate(${a})`}>
                      <path d={BLADE_PATH} className="f-body s-dark" strokeWidth="4" strokeLinejoin="round" />
                      <ellipse cx="-9" cy="-84" rx="7" ry="22" transform="rotate(8 -9 -84)" fill="#fff" opacity="0.45" />
                    </g>
                  ))}
                </g>
              </g>

              {/* guard wires */}
              <g fill="none" className="s-dark" strokeWidth="3" strokeOpacity="0.32" strokeLinecap="round">
                <circle cx={CX} cy={CY} r="72" />
                <circle cx={CX} cy={CY} r="108" />
                <path d={SPOKES} />
              </g>

              {/* accent gems */}
              {GEMS.map((g, i) => (
                <circle key={i} cx={g.x} cy={g.y} r="6.5" className="f-accent s-dark" strokeWidth="2.5" />
              ))}

              {/* hub + face */}
              <circle cx={CX} cy={CY} r="52" className="f-dark" />
              <circle cx={CX} cy={CY} r="45" fill="#fff" className="s-accent" strokeWidth="5" />
              <g key={face} className="face-pop">
                <text x={CX} y={CY} dy="0.35em" textAnchor="middle" fontSize="56">
                  {face}
                </text>
              </g>

              {/* bow */}
              <g className="s-dark" strokeWidth="3" strokeLinejoin="round">
                <path d="M200 30C172 2 148 24 164 42C176 55 192 42 200 30Z" className="f-accent" />
                <path d="M200 30C228 2 252 24 236 42C224 55 208 42 200 30Z" className="f-accent" />
                <circle cx="200" cy="32" r="8.5" className="f-accent" />
              </g>
            </g>

            {/* sleepy Zs while OFF */}
            {!on && (
              <g fontWeight="800" className="s-dark" fill="#8b6fc9" fontFamily="'Baloo 2', sans-serif">
                <text x="292" y="64" fontSize="34" className="zzz" style={{ animationDelay: '0s' }}>Z</text>
                <text x="322" y="38" fontSize="26" className="zzz" style={{ animationDelay: '0.9s' }}>z</text>
                <text x="346" y="18" fontSize="20" className="zzz" style={{ animationDelay: '1.8s' }}>z</text>
              </g>
            )}
          </g>
        </svg>
      </div>
    </motion.button>
  );
}
