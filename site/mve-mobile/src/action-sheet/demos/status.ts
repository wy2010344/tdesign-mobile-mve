import { fdom } from 'mve-dom';
import { Button } from '../../button';
import { ActionSheet } from '../index';
import { TdApp } from 'mve-icons/td';
import { TSvg } from '../../../svg';
import { createSignal } from 'wy-helper';
import { css } from 'wy-dom-helper';

const AppIcon = () => TdApp(TSvg, { size: '24px' });

export default function StatusDemo() {
  const visible = createSignal(false);

  const iconData = {
    description: '列表型选项状态',
    items: [
      {
        label: '选项一',
        icon: AppIcon,
      },
      {
        label: '选项二',
        icon: AppIcon,
        color: '#0052D9',
      },
      {
        label: '选项三',
        icon: AppIcon,
        disabled: true,
      },
      {
        label: '选项四',
        icon: AppIcon,
        color: '#E34D59',
      },
    ],
  };

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
            onClick: () => (visible.value = true),
            children: '列表型选项状态',
          });
        },
      });

      ActionSheet({
        visible: visible.value,
        items: iconData.items,
        onSelected: handleSelected,
        onCancel: handleCancel,
        onClose: () => (visible.value = false),
      });
    },
  });
}

const s = css`
  .action-sheet-demo {
    margin-bottom: 16px;
  }
`;
