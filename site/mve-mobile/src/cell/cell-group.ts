import { fdom } from 'mve-dom';
import { valueOrGetToGet } from 'wy-helper';
import { CellGroupProps } from './type';
import { renderTNode } from '../_util/parseTNode';
import { usePrefixClass } from '../hooks/useClass';

/**
 * CellGroup 单元格组组件
 * 用于包装多个单元格，提供统一的样式和边框
 */
export function CellGroup({
  bordered: _bordered = false,
  theme: _theme = 'default',
  title: _title = '',
  children,
  ...args
}: CellGroupProps) {
  const cellGroupClass = usePrefixClass('cell-group');

  // 转换为响应式getter函数
  const bordered = valueOrGetToGet(_bordered);
  const theme = valueOrGetToGet(_theme);
  const title = valueOrGetToGet(_title);
  const className = valueOrGetToGet(args.className);

  return fdom.div({
    ...args,
    className() {
      const classes: string[] = [];
      const n = className();
      if (n) classes.push(n);
      return classes.join(' ');
    },
    children() {
      // 渲染标题
      renderTNode(title, (children) =>
        fdom.div({
          className: `${cellGroupClass}__title`,
          children,
        }),
      );

      // 渲染内容容器
      fdom.div({
        className() {
          const classes = [cellGroupClass, `${cellGroupClass}--${theme()}`];
          if (bordered()) {
            classes.push(`${cellGroupClass}--bordered`);
          }
          return classes.join(' ');
        },
        children() {
          renderTNode(children);
        },
      });
    },
  });
}
