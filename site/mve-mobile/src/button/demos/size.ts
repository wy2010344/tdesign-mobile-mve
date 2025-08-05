import { fdom } from 'mve-dom';
import { Button } from '../index';

export default function SizeDemo() {
  fdom.div({
    className: 'demo-section demo-section-size',
    children() {
      fdom.div({
        className: 'demo-row',
        s_alignItems: 'center',
        children() {
          Button({
            size: 'large',
            theme: 'primary',
            children: '按钮 48',
          });

          Button({
            size: 'medium',
            theme: 'primary',
            children: '按钮 40',
          });

          Button({
            size: 'small',
            theme: 'primary',
            children: '按钮 32',
          });

          Button({
            size: 'extra-small',
            theme: 'primary',
            children: '按钮 28',
          });
        },
      });
    },
  });
}
