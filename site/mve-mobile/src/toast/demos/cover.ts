import { fdom } from 'mve-dom';
import { Button } from '../../button';
import { Toast } from '../index';

export default function CoverDemo() {
  const showPreventScrollThrough = () => {
    Toast({
      message: '禁止滑动和点击',
      direction: 'column',
      placement: 'bottom',
      duration: 5000,
      preventScrollThrough: true,
      showOverlay: true,
      icon() {
        fdom.span({
          innerHTML: '⚡',
          s_fontSize: '24px',
        });
      },
    });
  };

  fdom.div({
    children() {
      Button({
        block: true,
        size: 'large',
        theme: 'primary',
        variant: 'outline',
        children: '禁止滑动和点击',
        onClick: showPreventScrollThrough,
      });
    },
  });
}
