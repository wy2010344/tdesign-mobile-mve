import { fdom } from 'mve-dom';
import { Cell } from '../../cell';
import { Switch } from '../index';
import { css } from 'wy-dom-helper';

export default function ColorDemo() {
  fdom.div({
    className: s,
    children() {
      Cell({
        title: '自定义颜色开关',
        rightIcon: () =>
          Switch({
            value: true,
            className: 'custom-color',
          }),
      });
    },
  });
}

const s = css`
  .custom-color {
    --td-switch-checked-color: #00a870;
  }
`;
