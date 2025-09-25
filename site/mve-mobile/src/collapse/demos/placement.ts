import { fdom } from 'mve-dom';
import { createSignal } from 'wy-helper';
import { Collapse, CollapsePanel } from '..';

/**
 * 图标位置示例
 */
export function PlacementCollapseDemo() {
  return fdom.div({
    children() {
      // 图标在顶部
      fdom.div({
        s_marginBottom: '24px',
        children() {
          fdom.h3({
            s_margin: '0 0 16px 0',
            s_fontSize: '16px',
            s_fontWeight: '500',
            children: '图标在顶部',
          });

          Collapse({
            children() {
              CollapsePanel({
                header: '折叠面板标题',
                placement: 'top',
                children() {
                  fdom.div({
                    className: 'content',
                    s_padding: '16px',
                    s_lineHeight: '1.5',
                    children: '当 placement 为 top 时，展开图标会显示在面板顶部，适合用于从上往下展开的场景。',
                  });
                },
              });
            },
          });
        },
      });

      // 图标在底部（默认）
      fdom.div({
        children() {
          fdom.h3({
            s_margin: '0 0 16px 0',
            s_fontSize: '16px',
            s_fontWeight: '500',
            children: '图标在底部（默认）',
          });

          Collapse({
            children() {
              CollapsePanel({
                header: '折叠面板标题',
                placement: 'bottom',
                children() {
                  fdom.div({
                    className: 'content',
                    s_padding: '16px',
                    s_lineHeight: '1.5',
                    children: '当 placement 为 bottom 时，展开图标会显示在面板底部，这是默认的展示方式。',
                  });
                },
              });
            },
          });
        },
      });
    },
  });
}
