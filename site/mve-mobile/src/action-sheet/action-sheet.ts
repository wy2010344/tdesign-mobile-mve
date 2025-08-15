import { fdom } from 'mve-dom';
import { valueOrGetToGet, memo } from 'wy-helper';
import { ActionSheetProps, ActionSheetItem } from './type';
import { renderTNode } from '../_util/parseTNode';
import { usePrefixClass } from '../hooks/useClass';
import { Popup } from '../popup';
import { Button } from '../button';
import { Badge } from '../badge';
import { renderIf } from 'mve-helper';
import { cns } from 'mve-dom-helper';

/**
 * ActionSheet 动作面板组件
 * 从底部弹出的模态框，提供和当前场景相关的操作动作
 */
export function ActionSheet({
  align: _align = 'center',
  cancelText: _cancelText = '取消',
  count: _count = 8,
  description,
  items: _items = [],
  showCancel: _showCancel = true,
  showOverlay: _showOverlay = true,
  theme: _theme = 'list',
  onCancel,
  onSelected,
  ...args
}: ActionSheetProps) {
  const actionSheetClass = usePrefixClass('action-sheet');

  // 转换为响应式getter函数
  const align = valueOrGetToGet(_align);
  const cancelText = valueOrGetToGet(_cancelText);
  const count = valueOrGetToGet(_count);
  const items = valueOrGetToGet(_items);
  const showCancel = valueOrGetToGet(_showCancel);
  const theme = valueOrGetToGet(_theme);

  // 处理菜单项数据
  const actionItems = memo(() => {
    return items().map((item: string | ActionSheetItem) => {
      if (typeof item === 'string') {
        return {
          label: item,
        };
      }
      return item;
    });
  });

  // 处理取消
  const handleCancel = (e: MouseEvent) => {
    onCancel?.({ e });
  };

  // 处理选择
  const handleSelected = (index: number) => {
    const selectedItem = items()[index];
    onSelected?.(selectedItem, index);
  };

  // 渲染描述
  const renderDescription = () => {
    if (typeof description == 'undefined') {
      return;
    }
    return fdom.p({
      className() {
        const classes = [`${actionSheetClass}__description`];
        if (align() === 'left') {
          classes.push(`${actionSheetClass}__description--left`);
        }
        if (theme() === 'grid') {
          classes.push(`${actionSheetClass}__description--grid`);
        }
        return classes.join(' ');
      },
      children: description,
    });
  };

  // 渲染列表项
  const renderListItem = (item: ActionSheetItem, index: number) => {
    // 渲染徽标内容
    const renderBadgeContent = () => {
      if (item.badge) {
        return Badge({
          count: item.badge.count,
          maxCount: item.badge.maxCount || 99,
          dot: item.badge.dot,
          size: item.badge.size,
          offset: item.badge.offset || [-16, 20],
          children: () =>
            fdom.span({
              className: `${actionSheetClass}__list-item-text`,
              children: item.label,
            }),
        });
      }
      return fdom.span({
        className: `${actionSheetClass}__list-item-text`,
        children: item.label,
      });
    };

    return Button({
      variant: 'text',
      block: true,
      className() {
        const classes = [`${actionSheetClass}__list-item`];
        if (align() === 'left') {
          classes.push(`${actionSheetClass}__list-item--left`);
        }
        if (item.disabled) {
          classes.push(`${actionSheetClass}__list-item--disabled`);
        }
        return classes.join(' ');
      },
      disabled: item.disabled,
      icon: item.icon,
      s_color: item.color,
      onClick: () => handleSelected(index),
      children: renderBadgeContent,
    });
  };

  // 渲染列表
  const renderList = () => {
    if (theme() !== 'list') return;

    return fdom.div({
      className: `${actionSheetClass}__list`,
      children() {
        actionItems().forEach((item, index) => {
          renderListItem(item, index);
        });
      },
    });
  };

  // 渲染取消按钮
  const renderCancel = () => {
    if (!showCancel()) return;

    return fdom.div({
      className: `${actionSheetClass}__footer`,
      children() {
        fdom.div({
          className: `${actionSheetClass}__gap-${theme()}`,
        });
        Button({
          className: `${actionSheetClass}__cancel`,
          variant: 'text',
          block: true,
          onClick: handleCancel,
          children: cancelText(),
        });
      },
    });
  };

  return Popup({
    placement: 'bottom',
    ...args,
    className: cns(args.className, actionSheetClass),
    children() {
      fdom.div({
        className: `${actionSheetClass}__content`,
        children() {
          renderDescription();
          renderList();
          // TODO: 实现 grid 模式
          renderCancel();
        },
      });
    },
  });
}
