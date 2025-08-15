import { fdom } from 'mve-dom';
import { Input } from '../index';
import { css } from 'wy-dom-helper';

export default function AlignDemo() {
  fdom.div({
    className: s,
    children() {
      Input({
        label: '左对齐',
        placeholder: '请输入文字',
      });

      Input({
        label: '居中',
        placeholder: '请输入文字',
        align: 'center',
      });

      Input({
        label: '右对齐',
        placeholder: '请输入文字',
        align: 'right',
      });
    },
  });
}

const s = css`
  .t-input + .t-input {
    margin-top: 16px;
  }
`;
