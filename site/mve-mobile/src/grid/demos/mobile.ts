import { fdom } from 'mve-dom';
import BaseDemo from './base';
import IconDemo from './icon';
import BadgeDemo from './badge';
import DescDemo from './desc';
import BorderedDemo from './bordered';
import CardDemo from './card';
import ScrollDemo from './scroll';

export default function MobileDemo() {
  fdom.div({
    children() {
      fdom.div({
        s_marginBottom: '32px',
        children: BaseDemo,
      });

      fdom.div({
        s_marginBottom: '32px',
        children: IconDemo,
      });

      fdom.div({
        s_marginBottom: '32px',
        children: BadgeDemo,
      });

      fdom.div({
        s_marginBottom: '32px',
        children: DescDemo,
      });

      fdom.div({
        s_marginBottom: '32px',
        children: BorderedDemo,
      });

      fdom.div({
        s_marginBottom: '32px',
        children: CardDemo,
      });

      fdom.div({
        s_marginBottom: '32px',
        children: ScrollDemo,
      });
    },
  });
}
