import { fdom } from 'mve-dom';
import BaseDemo from './base';
import CustomCloseDemo from './custom-close';
import WithTitleDemo from './with-title';

export default function MobileDemo() {
  fdom.div({
    children() {
      fdom.div({
        s_marginBottom: '32px',
        children: BaseDemo,
      });

      fdom.div({
        s_marginBottom: '32px',
        children: CustomCloseDemo,
      });

      fdom.div({
        s_marginBottom: '32px',
        children: WithTitleDemo,
      });
    },
  });
}
