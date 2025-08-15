import { fdom } from 'mve-dom';
import BaseDemo from './base';
import LabelDemo from './label';
import StatusDemo from './status';
import MaxLengthDemo from './maxLength';
import PrefixDemo from './prefix';
import SuffixDemo from './suffix';
import AlignDemo from './align';
import LayoutDemo from './layout';
import SpecialDemo from './special';

export default function MobileDemo() {
  fdom.div({
    children() {
      fdom.div({
        s_marginBottom: '32px',
        children: BaseDemo,
      });

      fdom.div({
        s_marginBottom: '32px',
        children: LabelDemo,
      });

      fdom.div({
        s_marginBottom: '32px',
        children: StatusDemo,
      });

      fdom.div({
        s_marginBottom: '32px',
        children: MaxLengthDemo,
      });

      fdom.div({
        s_marginBottom: '32px',
        children: PrefixDemo,
      });

      fdom.div({
        s_marginBottom: '32px',
        children: SuffixDemo,
      });

      fdom.div({
        s_marginBottom: '32px',
        children: AlignDemo,
      });

      fdom.div({
        s_marginBottom: '32px',
        children: LayoutDemo,
      });

      fdom.div({
        s_marginBottom: '32px',
        children: SpecialDemo,
      });
    },
  });
}
