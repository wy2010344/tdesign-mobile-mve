import { fdom } from 'mve-dom';
import { Button } from '../index';
import { createSignal } from 'wy-helper';

export default function StatusDemo() {
  const loading = createSignal(false);

  fdom.div({
    className: 'demo-section',
    children() {
      fdom.div({
        className: 'demo-row',
        children() {
          Button({
            theme: 'primary',
            disabled: true,
            children: '禁用按钮',
          });

          Button({
            theme: 'primary',
            variant: 'outline',
            disabled: true,
            children: '禁用按钮',
          });

          Button({
            theme: 'primary',
            loading() {
              return loading.get();
            },
            onClick() {
              loading.set(true);
              setTimeout(() => {
                loading.set(false);
              }, 2000);
            },
            children() {
              return loading.get() ? '加载中...' : '点击加载';
            },
          });
        },
      });
    },
  });
}
