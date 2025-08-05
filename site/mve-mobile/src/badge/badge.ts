import { fdom, FPDomAttributes, mdom } from 'mve-dom';
import { valueOrGetToGet, memo } from 'wy-helper';
import { renderIf } from 'mve-helper';
import { TdBadgeProps } from './type';
// 工具函数：判断是否包含单位
function hasUnit(unit: string): boolean {
  return (
    unit.indexOf('px') > 0 ||
    unit.indexOf('rpx') > 0 ||
    unit.indexOf('em') > 0 ||
    unit.indexOf('rem') > 0 ||
    unit.indexOf('%') > 0 ||
    unit.indexOf('vh') > 0 ||
    unit.indexOf('vm') > 0
  );
}

// 工具函数：判断是否为数字
function isNumber(value: any): boolean {
  return typeof value === 'number' && !isNaN(value);
}

// 工具函数：判断是否为字符串
function isString(value: any): boolean {
  return typeof value === 'string';
}

/**
 * Badge 徽标组件
 * 用于告知用户，该区域的状态变化或者待处理任务的数量
 *
 * 按照MVE思维模式实现，更接近Vue的响应式模式
 */
export function Badge({
  color: _color = '',
  count: _count = 0,
  dot: _dot = false,
  maxCount: _maxCount = 99,
  offset: _offset,
  shape: _shape = 'circle',
  showZero: _showZero = false,
  size: _size = 'medium',
  className: _className,
  children,
  childrenType,
  ...args
}: TdBadgeProps) {
  // 设置默认值 - 直接在解构中设置，类似Vue的props默认值

  // 类名前缀
  const badgeClass = 't-badge';
  const classPrefix = 't';

  // 转换为响应式getter函数 - 这是MVE的核心
  const color = valueOrGetToGet(_color);
  const count = valueOrGetToGet<string | number>(_count);
  const dot = valueOrGetToGet(_dot);
  const maxCount = valueOrGetToGet(_maxCount);
  const offset = valueOrGetToGet(_offset);
  const shape = valueOrGetToGet(_shape);
  const showZero = valueOrGetToGet(_showZero);
  const size = valueOrGetToGet(_size);
  const className = valueOrGetToGet(_className);

  // 是否展示角标
  const isShowBadge = memo(() => {
    if (dot()) {
      return true;
    }
    const currentCount = count();
    const currentShowZero = showZero();
    if (!currentShowZero && Number(currentCount) === 0) {
      return false;
    }
    if (currentCount == null) return false;
    return true;
  });

  // 渲染的计数内容
  const renderCount = memo(() => {
    if (dot()) return '';
    const currentCount = count();
    const currentMaxCount = maxCount();
    const currentShowZero = showZero();
    if (isString(currentCount) || isNumber(currentCount)) {
      if (Number(currentCount) === 0) {
        return currentShowZero ? currentCount : '';
      }
      return Number(currentCount) > Number(currentMaxCount) ? `${currentMaxCount}+` : currentCount;
    }
    return currentCount;
  });

  // 渲染内容
  const renderContent = (node: HTMLDivElement) => {
    if (childrenType || typeof children != 'function') {
      fdom.span({
        className: `${badgeClass}__content-text`,
        childrenType: childrenType,
        children: children,
      } as any);
    } else {
      children?.(node);
    }
  };

  // 渲染徽标
  const renderBadge = () => {
    renderIf(isShowBadge, function () {
      mdom.div({
        attrs(m) {
          const currentDot = dot();
          const classes = [
            `${badgeClass}--basic`,
            `${badgeClass}--${size()}`,
            `${badgeClass}--${shape()}`,
            `${classPrefix}-has-count`,
          ];

          if (currentDot) {
            classes.push(`${badgeClass}--dot`);
          }
          if (!currentDot && count()) {
            classes.push(`${badgeClass}--count`);
          }
          m.className = classes.join(' ');

          const currentColor = color();
          const currentOffset = offset();

          if (currentColor) {
            m.s_background = currentColor;
          }
          if (currentOffset && Array.isArray(currentOffset)) {
            const [right = 0, top = 0] = currentOffset;
            m.s_right = hasUnit(right.toString()) ? right : `${right}px`;
            m.s_top = hasUnit(top.toString()) ? top : `${top}px`;
          }
        },
        childrenType: 'text',
        children: renderCount,
      });
    });
  };

  return fdom.div({
    ...args,
    className() {
      const classes = [badgeClass];
      if (shape() === 'ribbon') {
        classes.push(`${badgeClass}__ribbon-outer`);
      }
      const n = className();
      if (n) {
        classes.push(n);
      }
      return classes.join(' ');
    },
    children() {
      fdom.div({
        className: `${badgeClass}__content`,
        children: renderContent,
      });

      renderBadge();
    },
  });
}
