import { fdom } from 'mve-dom';
import { Textarea } from '../index';
import { css } from 'wy-dom-helper';

export default function BaseDemo() {
  fdom.div({
    children() {
      Textarea({
        className: s,
        attrs(m) {
          m.placeholder = '请输入文字';
        },
      });
    },
  });
}

const s = css`
  height: 128px;
`;
