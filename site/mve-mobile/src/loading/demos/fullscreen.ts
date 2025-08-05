import { fdom } from 'mve-dom';
import { Loading } from '../index';
import { Switch } from '../../switch';
import { css } from 'wy-dom-helper';
import { signal, effect } from 'mve-signal';

export default function FullscreenDemo() {
  const loading = signal(false);

  effect(() => {
    if (!loading.value) return;
    const timer = setTimeout(() => {
      loading.value = false;
      clearTimeout(timer);
    }, 1000);
  });

  fdom.div({
    className: s,
    children() {
      fdom.div({
        className: 'loading-demo',
        children() {
          Loading({
            loading: loading,
            text: '加载中...',
            fullscreen: true,
          });
          fdom.div({
            children() {
              fdom.text('全局加载开关（开启加载1秒后自动归位）：');
              Switch({
                value: loading,
                size: 'small',
              });
            },
          });
        },
      });
    },
  });
}

const s = css`
  .loading-demo {
    padding: 0 16px;
  }
`;
