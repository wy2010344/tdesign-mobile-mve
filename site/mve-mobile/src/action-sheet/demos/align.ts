import { fdom } from 'mve-dom';
import { Button } from '../../button';
import { ActionSheet } from '../index';
import { createSignal } from 'wy-helper';
import { css } from 'wy-dom-helper';

export default function AlignDemo() {
  const centerVisible = createSignal(false);
  const leftVisible = createSignal(false);

  const items = [{ label: '选项1' }, { label: '选项2' }, { label: '选项3' }, { label: '选项4' }];

  const handleSelected = (selected: any, selectedIndex: number) => {
    console.log(selected, selectedIndex);
  };

  const handleCancel = () => {
    console.log('cancel');
  };

  fdom.div({
    className: s,
    children() {
      fdom.div({
        className: 'action-sheet-demo',
        children() {
          Button({
            block: true,
            variant: 'outline',
            theme: 'primary',
            onClick: () => (centerVisible.value = true),
            children: '居中列表型',
          });

          Button({
            block: true,
            variant: 'outline',
            theme: 'primary',
            onClick: () => (leftVisible.value = true),
            children: '左对齐列表型',
          });
        },
      });

      // 居中对齐
      ActionSheet({
        visible: centerVisible.value,
        items: items,
        description: '动作面板描述文字',
        onSelected: handleSelected,
        onCancel: handleCancel,
        onClose: () => (centerVisible.value = false),
      });

      // 左对齐
      ActionSheet({
        visible: leftVisible.value,
        align: 'left',
        items: items,
        description: '动作面板描述文字',
        onSelected: handleSelected,
        onCancel: handleCancel,
        onClose: () => (leftVisible.value = false),
      });
    },
  });
}

const s = css`
  .action-sheet-demo {
    margin-bottom: 16px;

    .t-button + .t-button {
      margin-top: 16px;
    }
  }
`;
