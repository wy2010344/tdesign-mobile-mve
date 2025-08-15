import { fdom } from 'mve-dom';
import ThemeDemo from './theme';
import SizeDemo from './size';
import ClosableDemo from './closable';
import CheckableDemo from './checkable';
import TypeDemo from './type';

export default function MobileDemo() {
  fdom.div({
    children() {
      fdom.div({
        s_marginBottom: '32px',
        children: TypeDemo,
      });

      fdom.div({
        s_marginBottom: '32px',
        children: ThemeDemo,
      });

      fdom.div({
        s_marginBottom: '32px',
        children: SizeDemo,
      });

      fdom.div({
        s_marginBottom: '32px',
        children: ClosableDemo,
      });

      fdom.div({
        s_marginBottom: '32px',
        children: CheckableDemo,
      });
    },
  });
}
