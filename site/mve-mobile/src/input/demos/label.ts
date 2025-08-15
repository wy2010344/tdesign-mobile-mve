import { fdom } from 'mve-dom';
import { Input } from '../index';

export default function LabelDemo() {
  fdom.div({
    children() {
      Input({
        label: '标签超长时最多十个字',
        placeholder: '请输入文字',
      });
    },
  });
}
