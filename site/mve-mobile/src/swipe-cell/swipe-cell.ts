import { fdom, FPDomAttributes } from 'mve-dom';
import { valueOrGetToGet, createSignal, ScrollFromPage, eventGetPageX, addEffect, EmptyFun } from 'wy-helper';
import { SwipeCellProps, SwipeActionItem, SwipeSource, SwipeState } from './type';
import { usePrefixClass } from '../hooks/useClass';
import { renderTNode } from '../_util/parseTNode';
import { animateSignal, pointerMoveDir, preventDefault } from 'wy-dom-helper';
import { hookDestroy, hookTrackSignal } from 'mve-helper';
import { cns, TNode } from 'mve-dom-helper';
import { hookCurrentParent } from 'mve-core';

function max0() {
  return 0;
}

export function SwiperButton({
  icon,
  text,
  ...args
}: FPDomAttributes<'div'> & {
  icon?(className: string): void;
  text?: TNode;
}) {
  const swipeCellClass = usePrefixClass('swipe-cell');
  fdom.div({
    s_height: '100%',
    ...args,
    className: cns(`${swipeCellClass}__content`, args.className),
    children() {
      icon?.(`${swipeCellClass}__icon`);
      if (typeof text != 'undefined') {
        fdom.span({
          className: `${swipeCellClass}__text`,
          children: text,
        });
      }
    },
  });
}

export function measurePart(render: EmptyFun) {
  const width = createSignal(0);
  return {
    width: width.get,
    children() {
      const node = hookCurrentParent() as HTMLElement;
      const ob = new ResizeObserver(() => {
        width.set(node.offsetWidth);
      });
      ob.observe(node);
      hookDestroy(() => ob.disconnect());
      render();
    },
  };
}
/**
 * SwipeCell 滑动单元格组件
 * 用于承载列表中的更多操作，通过左右滑动来展示操作按钮
 *
 * 这是按照MVE思维模式的实现，简化版本
 */
export function SwipeCell({
  state = createSignal(undefined),
  offset = animateSignal(0),
  disabled: _disabled = false,
  left,
  right,
  onClick,
  children,
  ...args
}: SwipeCellProps) {
  const swipeCellClass = usePrefixClass('swipe-cell');
  // 转换为响应式getter函数
  const disabled = valueOrGetToGet(_disabled);
  const maxLeftWidth = left ? valueOrGetToGet(left.width) : max0;
  const maxRightWidth = right ? valueOrGetToGet(right.width) : max0;
  function setState(n: SwipeState) {
    if (n == 'left') {
      offset.animateTo(-maxLeftWidth());
    } else if (n == 'right') {
      offset.animateTo(maxRightWidth());
    } else {
      offset.animateTo(0);
    }
  }
  hookTrackSignal(
    () => {
      const s = state.get();
      if (s == 'left') {
        return -maxLeftWidth();
      }
      if (s == 'right') {
        return maxRightWidth();
      }
      return 0;
    },
    function (align) {
      addEffect(() => {
        if (offset.onAnimation()) {
          offset.silentChangeTo(align);
        } else {
          offset.animateTo(align);
        }
      });
    },
  );
  return fdom.div({
    ...args,
    className: swipeCellClass,
    onTouchMove(e) {
      e.preventDefault();
    },
    onPointerDown(e) {
      if (disabled()) {
        return;
      }
      pointerMoveDir(e, {
        onMove(e, dir) {
          if (dir == 'x') {
            return ScrollFromPage.from(e, {
              getPage: eventGetPageX,
              scrollDelta(delta, velocity, inMove) {
                const next = offset.get() + delta;
                offset.set(next);
                if (inMove) {
                  return;
                }
                const mrw = maxRightWidth();
                const mlw = maxLeftWidth();
                const of = offset.get();
                if (of > mrw / 2) {
                  setState('right');
                } else if (of < -mlw / 2) {
                  setState('left');
                } else {
                  setState(undefined);
                }
              },
            });
          }
        },
      });
    },
    children() {
      fdom.div({
        className: `${swipeCellClass}__wrapper`,
        s_transform: () => {
          const of = offset.get();
          const diff = of > maxRightWidth() ? maxRightWidth() : of < -maxLeftWidth() ? -maxLeftWidth() : of;
          return `translate3d(${-diff}px, 0, 0)`;
        },
        children() {
          // 渲染内容区域
          if (left) {
            //render-right
            fdom.div({
              className: `${swipeCellClass}__left`,
              children: left.children,
            });
          }
          renderTNode(children);
          if (right) {
            //render-right
            fdom.div({
              className: `${swipeCellClass}__right`,
              children: right.children,
            });
          }
        },
      });
    },
  });
}
