import { fdom } from 'mve-dom';
import { CheckTag } from '../index';
import { css } from 'wy-dom-helper';

export default function CheckableDemo() {
  const variants = ['light', 'dark', 'outline', 'light-outline'] as const;

  fdom.div({
    children() {
      fdom.div({
        className: 'summary',
        children: '可选中的标签',
      });

      fdom.div({
        className: s,
        children() {
          fdom.div({
            children() {
              variants.forEach((variant) => {
                fdom.div({
                  className: 'tag-block check-tag-block',
                  children() {
                    fdom.div({
                      className: 'check-tag-block__title',
                      children: variant,
                    });

                    CheckTag({
                      variant: variant,
                      size: 'large',
                      children: ['已选中态', '未选中态'],
                    });

                    CheckTag({
                      variant: variant,
                      size: 'large',
                      children: ['已选中态', '未选中态'],
                    });
                  },
                });
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
    margin-bottom: 16px;
  }

  .check-tag-block {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .check-tag-block__title {
    color: var(--td-text-color-disabled, rgba(0, 0, 0, 0.4));
    font-size: 14px;
    width: 80px;
    margin-right: 16px;
  }
`;
