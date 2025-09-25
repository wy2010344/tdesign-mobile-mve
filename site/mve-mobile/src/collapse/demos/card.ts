import { fdom } from 'mve-dom';
import { createSignal } from 'wy-helper';
import { Collapse, CollapsePanel } from '..';

/**
 * 卡片风格示例
 */
export function CardCollapseDemo() {
  const value = createSignal<number | undefined>(undefined);
  return fdom.div({
    children() {
      Collapse({
        theme: 'card',
        children() {
          // 渲染3个卡片面板
          for (let i = 1; i <= 3; i++) {
            CollapsePanel({
              header: `卡片面板 ${i}`,
              headerRightContent: i === 2 ? '重要' : undefined,
              onHeaderClick() {
                value.set(value.get() == i ? undefined : i);
              },
              open() {
                return value.get() == i;
              },
              children() {
                fdom.div({
                  className: 'content',
                  s_padding: '16px',
                  s_lineHeight: '1.5',
                  s_backgroundColor: '#f8f9fa',
                  s_borderRadius: '8px',
                  s_margin: '8px 0',
                  children: `这是卡片面板 ${i} 的内容。卡片风格的折叠面板具有更明显的视觉分层效果，适合用于展示相对独立的内容块。`,
                });
              },
            });
          }
        },
      });
    },
  });
}
