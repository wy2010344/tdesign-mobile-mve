import { fdom } from 'mve-dom';
import { Input } from '../index';
import { css } from 'wy-dom-helper';

export default function MaxLengthDemo() {
  fdom.div({
    className: s,
    children() {
      Input({
        label: '标签文字',
        placeholder: '请输入文字',
        maxlength: 10,
        tips: '最大输入10个字符',
      });

      Input({
        label: '标签文字',
        placeholder: '请输入文字',
        maxcharacter: 10,
        tips: '最大输入10个字符，汉字算两个',
      });
    },
  });
}

const s = css`
  .t-input + .t-input {
    margin-top: 16px;
  }
`;
