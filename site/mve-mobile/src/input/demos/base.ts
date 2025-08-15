import { fdom } from 'mve-dom';
import { Input } from '../index';
import { css } from 'wy-dom-helper';

export default function BaseDemo() {
  fdom.div({
    className: s,
    children() {
      Input({
        label: '标签文字',
        placeholder: '请输入文字',
      });

      Input({
        label: '标签文字',
        placeholder: '请输入文字(选填)',
      });

      Input({
        placeholder: '请输入文字',
      });
    },
  });
}

const s = css`
  .t-input + .t-input {
    margin-top: 16px;
  }
`;
