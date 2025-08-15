import { fdom } from 'mve-dom';
import { Skeleton } from '../index';
import { css } from 'wy-dom-helper';

export default function CellGroupDemo() {
  const rowColsAvatar = [{ size: '48px', type: 'circle' as const }];
  const rowColsImage = [{ size: '48px', type: 'rect' as const }];
  const rowColsContent = [{ width: '50%' }, { width: '100%' }];

  fdom.div({
    className: s,
    children() {
      // 第一组：头像 + 内容
      fdom.div({
        className: 'group',
        children() {
          Skeleton({
            className: 'group-avatar',
            rowCol: rowColsAvatar,
            loading: true,
          });

          Skeleton({
            className: 'group-content',
            rowCol: rowColsContent,
            loading: true,
          });
        },
      });

      // 第二组：图片 + 内容
      fdom.div({
        className: 'group',
        children() {
          Skeleton({
            className: 'group-avatar',
            rowCol: rowColsImage,
            loading: true,
          });

          Skeleton({
            className: 'group-content',
            rowCol: rowColsContent,
            loading: true,
          });
        },
      });
    },
  });
}

const s = css`
  .group {
    display: flex;
    align-items: center;
    margin-top: 16px;
  }

  .group-avatar {
    margin-right: 12px;
  }

  .group-content {
    width: 283px;
  }
`;
