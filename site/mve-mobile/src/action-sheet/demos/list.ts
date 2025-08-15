import { fdom } from 'mve-dom';
import { Button } from '../../button';
import { ActionSheet } from '../index';
import { TdApp } from 'mve-icons/td';
import { TSvg } from '../../../svg';
import { createSignal } from 'wy-helper';
import { css } from 'wy-dom-helper';

const AppIcon = () => TdApp(TSvg, { size: '24px' });

export default function ListDemo() {
  const visible = createSignal(false);
  const descVisible = createSignal(false);
  const iconVisible = createSignal(false);
  const badgeVisible = createSignal(false);

  const baseData = {
    items: ['选项一', '选项二', '选项三', '选项四'],
  };

  const descData = {
    description: '动作面板描述文字',
    items: ['选项一', '选项二', '选项三', '选项四'],
  };

  const iconData = {
    description: '动作面板描述文字',
    items: [
      {
        label: '选项一',
        icon: AppIcon,
      },
      {
        label: '选项二',
        icon: AppIcon,
      },
      {
        label: '选项三',
        icon: AppIcon,
      },
      {
        label: '选项四',
        icon: AppIcon,
      },
    ],
  };

  const badgeData = {
    description: '动作面板描述文字',
    items: [
      {
        label: '选项一',
        badge: { count: 1 },
      },
      {
        label: '选项二',
        badge: { dot: true },
      },
      {
        label: '选项三',
        badge: { dot: true },
      },
      {
        label: '选项四',
        badge: { dot: true },
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
            children: '常规列表型',
          });

          Button({
            block: true,
            variant: 'outline',
            theme: 'primary',
            onClick: () => (descVisible.value = true),
            children: '带描述列表型',
          });

          Button({
            block: true,
            variant: 'outline',
            theme: 'primary',
            onClick: () => (iconVisible.value = true),
            children: '带图标列表型',
          });

          Button({
            block: true,
            variant: 'outline',
            theme: 'primary',
            onClick: () => (badgeVisible.value = true),
            children: '带徽标列表型',
          });
        },
      });

      // 基础列表
      ActionSheet({
        visible: visible.value,
        items: baseData.items,
        onSelected: handleSelected,
        onCancel: handleCancel,
        onClose: () => (visible.value = false),
      });

      // 带描述列表
      ActionSheet({
        visible: descVisible.value,
        description: descData.description,
        items: descData.items,
        onSelected: handleSelected,
        onCancel: handleCancel,
        onClose: () => (descVisible.value = false),
      });

      // 带图标列表
      ActionSheet({
        visible: iconVisible.value,
        items: iconData.items,
        onSelected: handleSelected,
        onCancel: handleCancel,
        onClose: () => (iconVisible.value = false),
      });

      // 带徽标列表
      ActionSheet({
        visible: badgeVisible.value,
        description: badgeData.description,
        items: badgeData.items,
        onSelected: handleSelected,
        onCancel: handleCancel,
        onClose: () => (badgeVisible.value = false),
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
