import { fdom } from 'mve-dom';
import { Skeleton } from '../index';
import { css } from 'wy-dom-helper';

export default function AnimationDemo() {
  const animationList = [
    {
      title: '渐变加载效果',
      value: 'gradient' as const,
      loading: true,
    },
    {
      title: '闪烁加载效果',
      value: 'flashed' as const,
      loading: true,
    },
  ];

  fdom.div({
    className: s,
    children() {
      animationList.forEach((animationItem) => {
        fdom.div({
          children() {
            fdom.div({
              className: 'demo-section__desc',
              children: animationItem.title,
            });

            fdom.div({
              className: 'demo-section__content',
              children() {
                Skeleton({
                  theme: 'paragraph',
                  animation: animationItem.value,
                  loading: animationItem.loading,
                });
              },
            });
          },
        });
      });
    },
  });
}

const s = css`
  .demo-section__desc {
    font-size: 14px;
    color: var(--td-text-color-disabled, rgba(0, 0, 0, 0.4));
    margin-top: 8px;
    line-height: 22px;
  }

  .demo-section__content {
    margin-top: 16px;
    margin-bottom: 24px;
  }
`;
