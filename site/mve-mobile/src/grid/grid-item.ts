import { fdom } from 'mve-dom';
import { createSignal, mergeSet, valueOrGetToGet } from 'wy-helper';
import { GridItemProps } from './type';
import { renderTNode } from '../_util/parseTNode';
import { usePrefixClass } from '../hooks/useClass';
import { Image } from '../image';
import { Badge } from '../badge';
import { gridContext } from './grid';
import { cns } from 'mve-dom-helper';
import pluginTouchHover from '../hooks/useHover';

/**
 * GridItem 宫格项组件
 * 宫格中的单个项目
 *
 * 这是按照MVE思维模式的实现，更接近Vue的响应式模式
 */
export function GridItem({ badge, description, layout: _layout = 'vertical', text, children, ...args }: GridItemProps) {
  const gridItemClass = usePrefixClass('grid-item');

  // 转换为响应式getter函数
  const layout = valueOrGetToGet(_layout);

  const { column, border, align, gutter, allowHover } = gridContext.consume();

  const hover = createSignal(false);
  // 计算尺寸
  const getSize = () => {
    const col = column() || 4;
    if (col > 4 || !col) return 'small';
    return col < 4 ? 'large' : 'middle';
  };

  return fdom.div({
    ...args,
    className: cns(args.className, function () {
      const classes = [gridItemClass, `${gridItemClass}--${layout()}`];

      if (border()) classes.push(`${gridItemClass}--bordered`);
      if (border() && gutter()) classes.push(`${gridItemClass}--surround`);

      if (allowHover() && hover.get()) {
        classes.push(`${gridItemClass}--hover`);
      }
      return classes.join(' ');
    }),
    s_textAlign: () => {
      const alignValue = align() || 'center';
      return ['center', 'left'].includes(alignValue) ? alignValue : 'center';
    },
    s_flexBasis: () => {
      const col = column?.() || 4;
      return col > 0 ? `${100 / col}%` : undefined;
    },
    plugin: mergeSet(args.plugin, pluginTouchHover(hover)),
    children() {
      // 渲染图片/图标区域
      fdom.div({
        className() {
          return `${gridItemClass}__image ${gridItemClass}__image--${getSize()}`;
        },
        children() {
          // 如果有徽标，用Badge包装
          if (badge) {
            Badge({
              ...badge,
              children,
            });
          } else {
            renderTNode(children);
          }
        },
      });

      // 渲染内容区域
      fdom.div({
        className() {
          return `${gridItemClass}__content ${gridItemClass}__content--${layout()}`;
        },
        children() {
          // 渲染标题
          if (typeof text !== 'undefined') {
            fdom.div({
              className() {
                return `${gridItemClass}__title ${gridItemClass}__title--${getSize()}`;
              },
              children: text,
            });
          }

          // 渲染描述
          if (typeof description !== 'undefined') {
            fdom.div({
              className() {
                return `${gridItemClass}__description ${gridItemClass}__description--${layout()}`;
              },
              children: description,
            });
          }
        },
      });
    },
  });
}
