import { fdom, zdom } from 'mve-dom';
import { cns } from 'wy-dom-helper';

export default function ({ pause, duration, reverse }: { pause(): boolean; duration(): number; reverse(): boolean }) {
  const classPrefix = 't';

  zdom.span({
    attrs(m) {
      m.className = `${classPrefix}-loading__spinner`;
      if (!pause()) {
        m.s_animation = `t-rotate ${duration() / 1000}s infinite linear`;
        m.s_animationTimingFunction = 'steps(12)';
        m.s_animationDirection = `${reverse() ? 'reverse' : 'normal'}`;
      }
    },
    children() {
      for (let i = 0; i < 12; i++) {
        fdom.i({
          className: cns(`${classPrefix}-loading__spinner--line`, `${classPrefix}-loading__spinner--line-${i + 1}`),
        });
      }
    },
  });
}
