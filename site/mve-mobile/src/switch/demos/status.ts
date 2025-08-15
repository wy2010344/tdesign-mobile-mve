import { fdom } from 'mve-dom';
import { Cell } from '../../cell';
import { Switch } from '../index';
import { css } from 'wy-dom-helper';

export default function StatusDemo() {
  fdom.div({
    className: s,
    children() {
      Cell({
        title: '加载状态',
        rightIcon: () =>
          Switch({
            loading: true,
          }),
      });

      Cell({
        title: '加载状态',
        rightIcon: () =>
          Switch({
            loading: true,
            defaultValue: true,
          }),
      });

      fdom.div({
        className: 'demo__title',
        children: '禁用状态',
      });

      Cell({
        title: '禁用状态',
        rightIcon: () =>
          Switch({
            disabled: true,
          }),
      });

      Cell({
        title: '禁用状态',
        rightIcon: () =>
          Switch({
            disabled: true,
            value: true,
          }),
      });
    },
  });
}

const s = css`
  .t-cell + .t-cell {
    margin-top: 16px;
  }

  .demo__title {
    margin: 24px 16px 16px;
    color: var(--td-text-color-secondary, rgba(0, 0, 0, 0.6));
    font-size: 14px;
    line-height: 22px;
  }
`;
