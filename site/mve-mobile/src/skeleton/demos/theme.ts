import { fdom } from 'mve-dom';
import { Skeleton } from '../index';
import { css } from 'wy-dom-helper';

export default function ThemeDemo() {
  const themeList = [
    {
      title: '头像骨架屏',
      value: 'avatar' as const,
      loading: true,
    },
    {
      title: '图片骨架屏',
      value: 'image' as const,
      loading: true,
    },
    {
      title: '文本骨架屏',
      value: 'text' as const,
      loading: true,
    },
    {
      title: '段落骨架屏',
      value: 'paragraph' as const,
      loading: true,
    },
  ];

  fdom.div({
    className: s,
    children() {
      themeList.forEach((themeItem) => {
        fdom.div({
          children() {
            fdom.div({
              className: 'demo-section__desc',
              children: themeItem.title,
            });

            fdom.div({
              className: 'demo-section__content',
              children() {
                Skeleton({
                  theme: themeItem.value,
                  loading: themeItem.loading,
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
