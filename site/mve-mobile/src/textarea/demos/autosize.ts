import { fdom } from 'mve-dom';
import { Textarea } from '../index';

export default function AutosizeDemo() {
  fdom.div({
    children() {
      Textarea({
        attrs(m) {
          m.name = '标签文字';
          m.placeholder = '请输入文字1';
        },
        autosize: true,
      });
    },
  });
}
