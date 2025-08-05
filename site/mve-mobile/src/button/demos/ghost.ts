import { fdom } from 'mve-dom';
import { Button } from '../index';

export default function GhostDemo() {
  fdom.div({
    className: 'demo-section demo-ghost-section',
    s_backgroundColor: '#0052d9',
    s_padding: '20px',
    s_borderRadius: '8px',
    children() {
      fdom.div({
        className: 'demo-row',
        children() {
          Button({
            ghost: true,
            children: '幽灵按钮',
          });

          Button({
            ghost: true,
            theme: 'primary',
            children: '幽灵按钮',
          });

          Button({
            ghost: true,
            theme: 'danger',
            children: '幽灵按钮',
          });
        },
      });

      fdom.div({
        className: 'demo-row',
        children() {
          Button({
            ghost: true,
            variant: 'outline',
            children: '幽灵描边',
          });

          Button({
            ghost: true,
            variant: 'dashed',
            theme: 'primary',
            children: '幽灵虚框',
          });

          Button({
            ghost: true,
            variant: 'text',
            theme: 'danger',
            children: '幽灵文字',
          });
        },
      });
    },
  });
}
