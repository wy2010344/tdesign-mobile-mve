import { fdom } from 'mve-dom';
import { GetValue, valueOrGetToGet } from 'wy-helper';
import { GridProps } from './type';
import { usePrefixClass } from '../hooks/useClass';
import { createContext } from 'mve-core';
import { cns } from 'mve-dom-helper';

/**
 * Grid 宫格组件
 * 用于在水平和垂直方向，按照规律的间隔来排列子元素
 *
 * 这是按照MVE思维模式的实现，更接近Vue的响应式模式
 */
export function Grid({
  align: _align = 'center',
  border: _border = false,
  column: _column = 4,
  gutter: _gutter = 0,
  allowHover: _allowHover = false,
  theme: _theme = 'default',
  ...args
}: GridProps) {
  const gridClass = usePrefixClass('grid');

  // 转换为响应式getter函数
  const align = valueOrGetToGet(_align);
  const border = valueOrGetToGet(_border);
  const column = valueOrGetToGet(_column);
  const gutter = valueOrGetToGet(_gutter);
  const allowHover = valueOrGetToGet(_allowHover);
  const theme = valueOrGetToGet(_theme);

  gridContext.provide({
    column,
    border,
    align,
    gutter,
    allowHover,
  });
  return fdom.div({
    ...args,
    className: cns(args.className, function () {
      const classes = [gridClass];

      if (theme() === 'card') classes.push(`${gridClass}--card`);
      if (column() === 0) classes.push(`${gridClass}--auto-size`);
      if (border() && !gutter()) classes.push(`${gridClass}--bordered`);

      return classes.join(' ');
    }),
    s_display: 'grid',
    s_gridTemplateColumns: () => {
      const col = column();
      return col !== 0 ? `repeat(${col}, 1fr)` : 'auto';
    },
    s_padding: () => {
      const gut = gutter();
      return gut ? `${gut}px` : undefined;
    },
    s_gridGap() {
      const gut = gutter();
      return gut ? `${gut}px` : undefined;
    },
  });
}
export const gridContext = createContext<{
  column: GetValue<number>;
  border: GetValue<boolean>;
  align: GetValue<'left' | 'center'>;
  gutter: GetValue<number>;
  allowHover: GetValue<boolean>;
}>(undefined!);
