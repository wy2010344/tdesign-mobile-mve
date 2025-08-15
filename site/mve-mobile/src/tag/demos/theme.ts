import { fdom } from 'mve-dom';
import { Tag } from '../index';
import { css } from 'wy-dom-helper';

export default function ThemeDemo() {
  fdom.div({
    children() {
      fdom.div({
        className: 'summary',
        children: '展示型标签',
      });

      fdom.div({
        className: s,
        children() {
          fdom.div({
            children() {
              // light variant
              fdom.div({
                className: 'tag-block',
                children() {
                  Tag({ variant: 'light', children: '默认' });
                  Tag({ variant: 'light', theme: 'primary', children: '主要' });
                  Tag({ variant: 'light', theme: 'warning', children: '警告' });
                  Tag({ variant: 'light', theme: 'danger', children: '危险' });
                  Tag({ variant: 'light', theme: 'success', children: '成功' });
                },
              });

              // dark variant (default)
              fdom.div({
                className: 'tag-block',
                children() {
                  Tag({ theme: 'default', children: '默认' });
                  Tag({ theme: 'primary', children: '主要' });
                  Tag({ theme: 'warning', children: '警告' });
                  Tag({ theme: 'danger', children: '危险' });
                  Tag({ theme: 'success', children: '成功' });
                },
              });

              // outline variant
              fdom.div({
                className: 'tag-block',
                children() {
                  Tag({ variant: 'outline', children: '默认' });
                  Tag({ variant: 'outline', theme: 'primary', children: '主要' });
                  Tag({ variant: 'outline', theme: 'warning', children: '警告' });
                  Tag({ variant: 'outline', theme: 'danger', children: '危险' });
                  Tag({ variant: 'outline', theme: 'success', children: '成功' });
                },
              });

              // light-outline variant
              fdom.div({
                className: 'tag-block',
                children() {
                  Tag({ variant: 'light-outline', children: '默认' });
                  Tag({ variant: 'light-outline', theme: 'primary', children: '主要' });
                  Tag({ variant: 'light-outline', theme: 'warning', children: '警告' });
                  Tag({ variant: 'light-outline', theme: 'danger', children: '危险' });
                  Tag({ variant: 'light-outline', theme: 'success', children: '成功' });
                },
              });
            },
          });
        },
      });
    },
  });
}

const s = css`
  .summary {
    margin-bottom: 16px;
    font-size: 14px;
    color: #666;
  }

  .tag-block {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
  }
`;
