import { fdom } from 'mve-dom';
import BaseDemo from './base';
import ButtonEmptyDemo from './buttonEmpty';
import ImageEmptyDemo from './imageEmpty';

export default function MobileDemo() {
  fdom.div({
    children() {
      fdom.div({
        s_marginBottom: '32px',
        children: BaseDemo,
      });

      fdom.div({
        s_marginBottom: '32px',
        children: ButtonEmptyDemo,
      });

      fdom.div({
        s_marginBottom: '32px',
        children: ImageEmptyDemo,
      });
    },
  });
}
