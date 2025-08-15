import { fdom } from 'mve-dom';
import { valueOrGetToGet, createSignal } from 'wy-helper';
import { CheckTagProps } from './type';
import { renderTNode } from '../_util/parseTNode';
import { usePrefixClass } from '../hooks/useClass';
import { TdClose } from 'mve-icons/td';
import { TSvg } from '../../svg';
import { renderIfP } from 'mve-helper';
import { toGetText } from 'wy-dom-helper';

/**
 * CheckTag 可选中标签组件
 * 用于多项信息的选择
 *
 * 这是按照MVE思维模式的实现，更接近Vue的响应式模式
 */
export function CheckTag({
  checked = createSignal(false),
  closable: _closable = false,
  disabled: _disabled = false,
  icon,
  shape: _shape = 'square',
  size: _size = 'medium',
  variant: _variant = 'dark',
  onClick,
  onClose,
  children,
  ...args
}: CheckTagProps) {
  const tagClass = usePrefixClass('tag');

  // 转换为响应式getter函数
  const closable = valueOrGetToGet(_closable);
  const disabled = valueOrGetToGet(_disabled);
  const shape = valueOrGetToGet(_shape);
  const size = valueOrGetToGet(_size);
  const variant = valueOrGetToGet(_variant);

  const handleClick = (e: MouseEvent) => {
    if (!disabled()) {
      onClick?.({ e });
      checked.set(!checked.get());
    }
  };

  const handleClose = (e: MouseEvent): void => {
    e.stopPropagation();
    if (!disabled()) {
      onClose?.({ e });
    }
  };

  return fdom.span({
    ...args,
    className() {
      const currentChecked = checked.get();
      const classes = [
        tagClass,
        `${tagClass}--checkable`,
        `${tagClass}--${shape()}`,
        `${tagClass}--${currentChecked ? 'primary' : 'default'}`,
        `${tagClass}--${size()}`,
        `${tagClass}--${variant()}`,
      ];

      if (closable()) classes.push(`${tagClass}--closable`);
      if (disabled()) classes.push(`${tagClass}--disabled`);
      if (!disabled() && currentChecked) classes.push(`${tagClass}--checked`);

      return classes.join(' ');
    },
    aria_disabled: disabled,
    role: 'button',
    onClick: handleClick,
    children() {
      // 渲染图标
      if (typeof icon != 'undefined') {
        fdom.span({
          className: `${tagClass}__icon`,
          children: icon,
        });
      }

      // 渲染标签内容
      fdom.span({
        className: `${tagClass}__text`,
        children: Array.isArray(children)
          ? toGetText(function () {
              return checked.get() ? children[0] : children[1];
            })
          : children,
      });

      // 渲染关闭按钮
      renderIfP(_closable, function () {
        fdom.span({
          className: `${tagClass}__icon-close`,
          onClick: handleClose,
          children() {
            TdClose(TSvg, {
              size: '16px',
            });
          },
        });
      });
    },
  });
}
