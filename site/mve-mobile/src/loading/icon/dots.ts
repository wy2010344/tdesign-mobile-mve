import { fdom, zdom } from 'mve-dom';

export default function ({ pause, duration, reverse }: { pause(): boolean; duration(): number; reverse(): boolean }) {
  const loadingClass = 't-loading';
  zdom.div({
    attrs(m) {
      m.className = `${loadingClass}__dots`;
      if (pause()) {
        m.s_animationPlayState = 'paused';
      }
      if (reverse()) {
        m.s_animationDirection = 'reverse';
      }
      m.s_animationDuration = `${duration()}ms`;
      m.s_width = '1em';
      m.s_height = '1em';
    },
    children() {
      for (let i = 0; i < 3; i++) {
        zdom.div({
          attrs(m) {
            m.className = `${loadingClass}__dot`;
            m.s_animationDuration = `${duration() / 1000}s`;
            m.s_animationDelay = `${(duration() * i) / 3000}s`;
          },
        });
      }
    },
  });
}
