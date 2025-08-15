import { fdom } from 'mve-dom';
import { createSignal } from 'wy-helper';
import { Skeleton } from '../index';
import { css } from 'wy-dom-helper';

export default function ImageGroupDemo() {
  const loading = createSignal(true);
  const rowCols = [{ size: '163.5px', borderRadius: '12px' }, 1, { width: '61%' }];

  fdom.div({
    className: s,
    children() {
      fdom.div({
        className: 'group',
        children() {
          Skeleton({
            rowCol: rowCols,
            loading: () => loading.get(),
          });

          Skeleton({
            rowCol: rowCols,
            loading: () => loading.get(),
          });
        },
      });
    },
  });
}

const s = css`
  .group {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
  }
`;
