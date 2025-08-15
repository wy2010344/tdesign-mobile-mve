import { fdom } from 'mve-dom';
import BaseDemo from './base';

export default function MobileDemo() {
  fdom.div({
    children() {
      fdom.div({
        s_marginBottom: '32px',
        children: BaseDemo,
      });
    },
  });
}
