import { fdom } from 'mve-dom';
import { Input } from '../index';
import { css } from 'wy-dom-helper';

export default function PrefixDemo() {
  fdom.div({
    className: s,
    children() {
      Input({
        label: '标签文字',
        placeholder: '请输入文字',
        prefixIcon() {
          fdom.span({
            innerHTML: '📱',
            s_fontSize: '16px',
          });
        },
      });

      Input({
        placeholder: '请输入文字',
        prefixIcon() {
          fdom.span({
            innerHTML: '🔍',
            s_fontSize: '16px',
          });
        },
      });
    },
  });
}

const s = css`
  .t-input + .t-input {
    margin-top: 16px;
  }
`;
