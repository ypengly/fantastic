import { useEffect, useRef, type RefObject } from 'react';

/**
 * Spins an SVG <g> by writing its transform directly inside requestAnimationFrame
 * (no React re-renders). The loop only exists while `running` is true, so when the
 * fan is OFF the blades stop on the spot and nothing is animating.
 * Speed eases toward `target` so changing levels feels like real acceleration.
 */
export function useSpin(ref: RefObject<SVGGElement>, target: number, running: boolean) {
  const angle = useRef(0);
  const targetRef = useRef(target);

  useEffect(() => {
    targetRef.current = target;
  }, [target]);

  useEffect(() => {
    if (!running) return;
    let speed = 0;
    let last = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const dt = Math.min(now - last, 50) / 1000; // clamp after tab switches
      last = now;
      speed += (targetRef.current - speed) * (1 - Math.exp(-dt * 7));
      angle.current = (angle.current + speed * dt) % 360;
      ref.current?.setAttribute('transform', `rotate(${angle.current.toFixed(2)})`);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running, ref]);
}
