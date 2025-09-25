import { fdom } from 'mve-dom';
import { createSignal } from 'wy-helper';
import { Collapse, CollapsePanel } from '..';

/**
 * 手风琴模式示例
 */
export function AccordionCollapseDemo() {
  const active = createSignal<number | undefined>(undefined);
  fdom.div({
    children() {
      Collapse({
        children() {
          // 渲染4个面板
          for (let i = 1; i <= 4; i++) {
            CollapsePanel({
              header: '折叠面板标题',
              headerRightContent: '单元测试',
              disabled: i === 4,
              open() {
                return active.get() == i;
              },
              onHeaderClick(e) {
                active.set(active.get() == i ? undefined : i);
              },
              children() {
                fdom.div({
                  className: 'content',
                  s_padding: '16px',
                  s_lineHeight: '1.5',
                  children: `面板 ${i} 的内容：此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容可自定义内容`,
                });
              },
            });
          }
        },
      });
    },
  });
}
