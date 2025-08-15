import { fdom } from 'mve-dom';
import { valueOrGetToGet, createSignal } from 'wy-helper';
import { SkeletonProps, SkeletonRowCol, SkeletonRowColObj } from './type';
import { renderTNode } from '../_util/parseTNode';
import { usePrefixClass } from '../hooks/useClass';
import { renderIf, renderIfP, renderOne, renderOneP } from 'mve-helper';

/**
 * Skeleton 骨架屏组件
 * 在内容加载过程中展示一组占位图形
 *
 * 这是按照MVE思维模式的实现，更接近Vue的响应式模式
 */
export function Skeleton({
  animation: _animation = 'none',
  loading = true,
  rowCol,
  theme: _theme = 'text',
  children,
  ...args
}: SkeletonProps) {
  const skeletonClass = usePrefixClass('skeleton');

  // 转换为响应式getter函数
  const animation = valueOrGetToGet(_animation);
  const theme = valueOrGetToGet(_theme);

  // 主题映射
  const ThemeMap: Record<string, SkeletonRowCol> = {
    avatar: [{ type: 'circle', size: '48px' }],
    image: [{ type: 'rect', size: '72px' }],
    text: [
      [
        { width: '24%', height: '16px', marginRight: '16px' },
        { width: '76%', height: '16px' },
      ],
      1,
    ],
    paragraph: [1, 1, 1, { width: '55%' }],
  };

  // 监听loading变化

  // 获取列项样式
  const getColItemStyle = (obj: SkeletonRowColObj): Record<string, string> => {
    const styleName = [
      'width',
      'height',
      'marginRight',
      'marginLeft',
      'margin',
      'size',
      'background',
      'backgroundColor',
      'borderRadius',
    ];
    const style: Record<string, string> = {};

    styleName.forEach((name) => {
      if (name in obj) {
        const value = obj[name as keyof SkeletonRowColObj];
        const px = typeof value === 'number' ? `${value}px` : value;
        if (name === 'size') {
          style.s_width = px as string;
          style.s_height = px as string;
        } else {
          style[`s_${name}`] = px as string;
        }
      }
    });

    return style;
  };

  // 获取列项类名
  const getColItemClass = (obj: SkeletonRowColObj): string => {
    const classes = [`${skeletonClass}__col`, `${skeletonClass}--type-${obj.type || 'text'}`];

    const currentAnimation = animation();
    if (currentAnimation !== 'none') {
      classes.push(`${skeletonClass}--animation-${currentAnimation}`);
    }

    return classes.join(' ');
  };

  // 渲染列
  const renderCols = (_cols: Number | SkeletonRowColObj | Array<SkeletonRowColObj>) => {
    let cols: Array<SkeletonRowColObj> = [];

    if (Array.isArray(_cols)) {
      cols = _cols;
    } else if (typeof _cols === 'number') {
      cols = new Array(_cols).fill({ type: 'text' });
    } else {
      cols = [_cols as SkeletonRowColObj];
    }

    cols.forEach((obj) => {
      fdom.div({
        className: getColItemClass(obj),
        ...getColItemStyle(obj),
        children: obj.content,
      });
    });
  };

  // 渲染行列
  const renderRowCol = (_rowCol?: SkeletonRowCol) => {
    const currentRowCol: SkeletonRowCol = _rowCol || rowCol || ThemeMap[theme()] || ThemeMap.text;

    currentRowCol.forEach((item) => {
      fdom.div({
        className: `${skeletonClass}__row`,
        children() {
          renderCols(item);
        },
      });
    });
  };

  // 如果有子内容，直接渲染子内容
  if (typeof children !== 'undefined') {
    fdom.div({
      children,
    });
    return;
  }

  // 如果不显示骨架屏，则不渲染任何内容
  renderIfP(loading, function () {
    // 渲染骨架屏
    fdom.div({
      ...args,
      className: skeletonClass,
      children() {
        // 保持优先级： rowCol > theme，增加默认值兜底
        if (rowCol) {
          renderRowCol(rowCol);
        } else if (_theme) {
          renderOneP(_theme, function (theme) {
            renderRowCol(ThemeMap[theme]);
          });
        } else {
          // 什么都不传时，传入默认 rowCol
          renderRowCol([
            [
              { width: '24%', height: '16px', marginRight: '16px' },
              { width: '76%', height: '16px' },
            ],
            1,
          ]);
        }
      },
    });
  });
}
