import { fdom } from 'mve-dom';
import { Button } from '../index';

export default function BlockDemo() {
  fdom.div({
    className: 'demo-section',
    children() {
      fdom.div({
        className: 'demo-column',
        children() {
          Button({
            theme: 'primary',
            block: true,
            children: '通栏按钮',
          });

          fdom.div({
            s_height: '12px',
          });

          Button({
            theme: 'primary',
            variant: 'outline',
            block: true,
            children: '通栏描边按钮',
          });

          fdom.div({
            s_height: '12px',
          });

          Button({
            theme: 'danger',
            block: true,
            children: '通栏危险按钮',
          });
        },
      });
    },
  });
}
