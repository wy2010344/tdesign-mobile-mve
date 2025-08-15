import { fdom } from 'mve-dom';
import { createSignal } from 'wy-helper';
import { Input } from '../index';
import { css } from 'wy-dom-helper';

export default function StatusDemo() {
  const text1 = createSignal('已输入文字');
  const text2 = createSignal('不可编辑文字');

  fdom.div({
    className: s,
    children() {
      Input({
        value: () => text1.get(),
        label: '标签文字',
        placeholder: '请输入文字',
        status: 'error',
        tips: '辅助说明',
        onChange: (value) => text1.set(value as string),
      });

      Input({
        value: () => text2.get(),
        label: '不可编辑',
        disabled: true,
        onChange: (value) => text2.set(value as string),
      });
    },
  });
}

const s = css`
  .t-input + .t-input {
    margin-top: 16px;
  }
`;
