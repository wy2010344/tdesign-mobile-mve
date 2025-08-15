import { fdom } from 'mve-dom';
import { Cell } from '../../cell';
import { Switch } from '../index';
import { createSignal } from 'wy-helper';

export default function BaseDemo() {
  const checked = createSignal(true);

  fdom.div({
    children() {
      Cell({
        title: '基础开关',
        rightIcon: () =>
          Switch({
            value: checked.get,
            onChange: checked.set,
          }),
      });
    },
  });
}
