import { fdom } from 'mve-dom';
import { Textarea } from '../index';
import { css } from 'wy-dom-helper';

export default function LabelDemo() {
  fdom.div({
    children() {
      Textarea({
        className: s,
        attrs(m) {
          m.name = '标签文字';
          m.placeholder = '请输入文字';
        },
        label: '标签文字',
      });
    },
  });
}

const s = css`
  height: 128px;
`;
