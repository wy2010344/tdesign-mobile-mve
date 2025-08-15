import { fdom } from 'mve-dom';
import ThemeDemo from './theme';
import AnimationDemo from './animation';
import GridDemo from './grid';
import CellGroupDemo from './cell-group';
import ImageGroupDemo from './image-group';

export default function MobileDemo() {
  fdom.div({
    className: 'tdesign-mobile-demo',
    s_backgroundColor: 'white',
    children() {
      fdom.div({
        s_marginBottom: '32px',
        children: ThemeDemo,
      });

      fdom.div({
        s_marginBottom: '32px',
        children: AnimationDemo,
      });

      fdom.div({
        s_marginBottom: '32px',
        children: GridDemo,
      });

      fdom.div({
        s_marginBottom: '32px',
        children: CellGroupDemo,
      });

      fdom.div({
        s_marginBottom: '32px',
        children: ImageGroupDemo,
      });
    },
  });
}
