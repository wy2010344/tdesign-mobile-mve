import { fdom } from 'mve-dom';
import { Loading } from '../index';
// import { Slider } from '../../slider';
import { css } from 'wy-dom-helper';
import { createSignal } from 'wy-helper';

export default function SpeedDemo() {
  const loadingDuration = createSignal(5);

  fdom.div({
    className: s,
    children() {
      fdom.div({
        className: 'loading-demo',
        children() {
          Loading({
            duration: () => (1 / loadingDuration.get()) * 3000,
            text: '加载中...',
          });
        },
      });

      fdom.div({
        className: 'slider-wrap',
        children() {
          //   Slider({
          //     value: loadingDuration,
          //     min: 0,
          //     max: 10,
          //     label: false,
          //   });
        },
      });
    },
  });
}

const s = css`
  .loading-demo {
    padding: 0 16px;
  }

  .slider-wrap {
    width: 100%;
    margin-top: 16px;
    padding: 20px 0;
  }
`;
