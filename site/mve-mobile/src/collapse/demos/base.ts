import { fdom } from 'mve-dom';
import { Collapse, CollapsePanel } from '..';

/**
 * 基础折叠面板示例
 */
export function BaseCollapseDemo() {
  return fdom.div({
    children() {
      Collapse({
        children() {
          CollapsePanel({
            header: '折叠面板标题',
            children() {
              fdom.div({
                className: 'content',
                s_padding: '16px',
                s_lineHeight: '1.5',
                children:
                  '此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容可自定义内容',
              });
            },
          });
        },
      });
    },
  });
}
