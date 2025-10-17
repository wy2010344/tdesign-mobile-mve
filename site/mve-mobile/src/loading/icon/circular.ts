import { fdom, fsvg, zsvg, svg } from 'mve-dom';
import { cns } from 'wy-dom-helper';
import { addEffect } from 'wy-helper';
import circleAdapter from '../../_common/js/loading/circle-adapter'; // @ts-ignore

export default function ({ pause, duration, reverse }: { pause(): boolean; duration(): number; reverse(): boolean }) {
  const classPrefix = 't';
  zsvg.svg({
    attrs(m) {
      m.viewBox = '0 0 14 14';
      m.width = '1em';
      m.height = '1em';
      m.className = cns(`${classPrefix}-loading__gradient`, `t-icon-loading`);
      if (!pause()) {
        m.s_animation = `t-spin ${duration() / 1000}s linear infinite`;
        m.s_animationDirection = `${reverse() ? 'reverse' : 'normal'}`;
      }
    },
    children() {
      fsvg.foreignObject({
        x: 1,
        y: 1,
        width: 12,
        height: 12,
        children() {
          const circle = fdom.div({
            className: `${classPrefix}-loading__gradient-conic`,
          });
          addEffect(() => {
            circleAdapter(circle);
          });
        },
      });
    },
  });
}
