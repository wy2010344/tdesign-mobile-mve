import { fdom } from 'mve-dom';
import { Button } from '../index';

export default function BaseDemo() {
  fdom.div({
    className: 'demo-section',
    children() {
      fdom.div({
        className: 'demo-row',
        children() {
          Button({
            size: 'large',
            theme: 'primary',
            children: '填充按钮',
          });

          Button({
            size: 'large',
            theme: 'light',
            children: '填充按钮',
          });

          Button({
            size: 'large',
            children: '填充按钮',
          });
        },
      });

      fdom.div({
        className: 'demo-row',
        children() {
          Button({
            size: 'large',
            theme: 'primary',
            variant: 'outline',
            children: '描边按钮',
          });

          Button({
            size: 'large',
            theme: 'primary',
            variant: 'dashed',
            children: '虚框按钮',
          });

          Button({
            size: 'large',
            theme: 'primary',
            variant: 'text',
            children: '文字按钮',
          });
        },
      });
    },
  });
}
