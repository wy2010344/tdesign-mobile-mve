import { fdom } from 'mve-dom';
import { createSignal } from 'wy-helper';
import { Collapse, CollapsePanel } from '..';
import { TdEdit, TdDelete } from 'mve-icons/td';
import { TSvg } from '../../../svg';

/**
 * 带操作的折叠面板示例
 */
export function ActionCollapseDemo() {
  const handleEdit = (index: number) => {
    console.log(`编辑面板 ${index}`);
  };

  const handleDelete = (index: number) => {
    console.log(`删除面板 ${index}`);
  };

  return fdom.div({
    children() {
      Collapse({
        children() {
          // 渲染3个带操作的面板
          for (let i = 1; i <= 3; i++) {
            CollapsePanel({
              header: `可操作面板 ${i}`,
              headerRightContent() {
                fdom.div({
                  s_display: 'flex',
                  s_gap: '8px',
                  s_alignItems: 'center',
                  children() {
                    // 编辑按钮
                    fdom.div({
                      s_padding: '4px',
                      s_cursor: 'pointer',
                      s_borderRadius: '4px',
                      s_display: 'flex',
                      s_alignItems: 'center',
                      s_justifyContent: 'center',
                      onClick: (e) => {
                        e.stopPropagation();
                        handleEdit(i);
                      },
                      children() {
                        TdEdit(TSvg, { size: '16px', color: '#0052d9' });
                      },
                    });

                    // 删除按钮
                    fdom.div({
                      s_padding: '4px',
                      s_cursor: 'pointer',
                      s_borderRadius: '4px',
                      s_display: 'flex',
                      s_alignItems: 'center',
                      s_justifyContent: 'center',
                      onClick: (e) => {
                        e.stopPropagation();
                        handleDelete(i);
                      },
                      children() {
                        TdDelete(TSvg, { size: '16px', color: '#e34d59' });
                      },
                    });
                  },
                });
              },
              children() {
                fdom.div({
                  className: 'content',
                  s_padding: '16px',
                  s_lineHeight: '1.5',
                  children: `这是面板 ${i} 的内容。你可以点击右侧的编辑或删除按钮来执行相应的操作。这些操作不会触发面板的展开/收起。`,
                });
              },
            });
          }
        },
      });
    },
  });
}
