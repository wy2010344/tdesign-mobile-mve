import { fdom } from 'mve-dom';
import { createSignal } from 'wy-helper';
import { Textarea } from '../index';

export default function MaxlengthDemo() {
  const value = createSignal('');

  fdom.div({
    children() {
      Textarea({
        model: value,
        textAreaProps: {
          attrs(m) {
            m.name = '标签文字';
            m.placeholder = '请输入文字';
          },
        },
        maxAsLength: true,
        label: '标签文字',
        max: 500,
        indicator: true,
      });
    },
  });
}
