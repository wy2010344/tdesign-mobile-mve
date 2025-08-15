import { fdom } from 'mve-dom';
import { Textarea } from '../index';
import { css } from 'wy-dom-helper';

export default function DisabledDemo() {
  fdom.div({
    children() {
      Textarea({
        className: s,
        label: '标签文字',
        placeholder: '',
        textAreaProps: {
          attrs(m) {
            m.placeholder = '请输入文字';
            m.value = '不可编辑文字';
          },
        },
        disabled: true,
      });
    },
  });
}

const s = css`
  height: 128px;
`;
