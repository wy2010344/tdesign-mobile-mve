import { fdom } from 'mve-dom';
import BaseDemo from './base';
import ThemeDemo from './theme';
import CoverDemo from './cover';

export default function MobileDemo() {
  fdom.div({
    children() {
      fdom.div({
        s_marginBottom: '32px',
        children: BaseDemo,
      });

      fdom.div({
        s_marginBottom: '32px',
        children: ThemeDemo,
      });

      fdom.div({
        s_marginBottom: '32px',
        children: CoverDemo,
      });
    },
  });
}
