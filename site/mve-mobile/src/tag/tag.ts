import { fdom } from 'mve-dom';
import { valueOrGetToGet } from 'wy-helper';
import { TagProps } from './type';
import { renderTNode } from '../_util/parseTNode';
import { usePrefixClass } from '../hooks/useClass';
import { TdClose } from 'mve-icons/td';
import { TSvg } from '../../svg';
import { renderIf, renderIfP } from 'mve-helper';

/**
 * Tag 标签组件
 * 用于表示主要信息和状态信息
 *
 * 这是按照MVE思维模式的实现，更接近Vue的响应式模式
 */
export function Tag({
  closable: _closable = false,
  disabled: _disabled = false,
  icon,
  shape: _shape = 'square',
  size: _size = 'medium',
  theme: _theme = 'default',
  variant: _variant = 'dark',
  onClick,
  onClose,
  children,
  ...args
}: TagProps) {
  const tagClass = usePrefixClass('tag');

  // 转换为响应式getter函数
  const closable = valueOrGetToGet(_closable);
  const disabled = valueOrGetToGet(_disabled);
  const shape = valueOrGetToGet(_shape);
  const size = valueOrGetToGet(_size);
  const theme = valueOrGetToGet(_theme);
  const variant = valueOrGetToGet(_variant);

  const handleClose = (e: MouseEvent): void => {
    e.stopPropagation();
    if (!disabled()) {
      onClose?.({ e });
    }
  };

  const handleClick = (e: MouseEvent): void => {
    if (!disabled()) {
      onClick?.({ e });
    }
  };

  return fdom.span({
    ...args,
    className() {
      const classes = [
        tagClass,
        `${tagClass}--${theme()}`,
        `${tagClass}--${shape()}`,
        `${tagClass}--${variant()}`,
        `${tagClass}--${size()}`,
      ];

      if (closable()) classes.push(`${tagClass}--closable`);
      if (disabled()) classes.push(`${tagClass}--disabled`);

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
        children,
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
