import { fdom } from 'mve-dom';
import { Input } from '../index';

export default function LayoutDemo() {
  fdom.div({
    children() {
      Input({
        label: '标签文字',
        layout: 'vertical',
        placeholder: '请输入文字',
        suffixIcon() {
          fdom.span({
            innerHTML: '⚠️',
            s_fontSize: '16px',
          });
        },
      });
    },
  });
}
