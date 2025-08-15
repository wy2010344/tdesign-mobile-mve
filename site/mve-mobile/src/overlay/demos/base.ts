import { fdom } from 'mve-dom';
import { createSignal } from 'wy-helper';
import { Button } from '../../button';
import { Overlay } from '../index';

export default function BaseDemo() {
  const visible = createSignal(false);

  fdom.div({
    children() {
      Button({
        size: 'large',
        block: true,
        variant: 'outline',
        theme: 'primary',
        children: '基础用法',
        onClick: () => visible.set(true),
      });

      Overlay({
        visible: () => visible.get(),
        onClick: () => visible.set(false),
      });
    },
  });
}
