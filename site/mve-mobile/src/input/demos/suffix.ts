import { fdom } from 'mve-dom';
import { Input } from '../index';
import { Button } from '../../button';
import { css } from 'wy-dom-helper';

export default function SuffixDemo() {
  fdom.div({
    className: s,
    children() {
      Input({
        label: '标签文字',
        placeholder: '请输入文字',
        suffixIcon() {
          fdom.span({
            children: 'ℹ️',
            s_fontSize: '16px',
          });
        },
      });

      Input({
        label: '标签文字',
        type: 'tel',
        placeholder: '请输入手机号码',
        extra() {
          Button({
            theme: 'primary',
            size: 'extra-small',
            children: '操作按钮',
          });
        },
      });

      Input({
        label: '标签文字',
        placeholder: '请输入文字',
        suffixIcon() {
          fdom.span({
            children: '👤',
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
