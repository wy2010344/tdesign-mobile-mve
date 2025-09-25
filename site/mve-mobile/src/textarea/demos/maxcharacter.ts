import { fdom } from 'mve-dom';
import { createSignal } from 'wy-helper';
import { Textarea } from '../index';

export default function MaxcharacterDemo() {
  const value = createSignal('');

  fdom.div({
    children() {
      Textarea({
        model: value,
        attrs(m) {
          m.name = '标签文字';
          m.placeholder = '请输入文字';
        },
        label: '标签文字',
        max: 500,
        indicator: true,
      });
    },
  });
}
