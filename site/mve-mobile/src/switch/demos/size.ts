import { fdom } from 'mve-dom';
import { Cell } from '../../cell';
import { Switch } from '../index';
import { css } from 'wy-dom-helper';

export default function SizeDemo() {
  fdom.div({
    className: s,
    children() {
      Cell({
        title: '大尺寸 32',
        rightIcon: () =>
          Switch({
            size: 'large',
            defaultValue: true,
          }),
      });

      Cell({
        title: '中尺寸 28',
        rightIcon: () =>
          Switch({
            defaultValue: true,
          }),
      });

      Cell({
        title: '小尺寸 24',
        rightIcon: () =>
          Switch({
            defaultValue: true,
            size: 'small',
          }),
      });
    },
  });
}

const s = css`
  .t-cell + .t-cell {
    margin-top: 16px;
  }
`;
