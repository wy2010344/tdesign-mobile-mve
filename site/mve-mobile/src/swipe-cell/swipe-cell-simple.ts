import { fdom } from 'mve-dom';
import { valueOrGetToGet, createSignal } from 'wy-helper';
import { SwipeCellProps, SwipeActionItem, SwipeSource } from './type';
import { usePrefixClass } from '../hooks/useClass';
import { renderTNode } from '../_util/parseTNode';

/**
 * SwipeCell 滑动单元格组件（简化版）
 * 用于承载列表中的更多操作，通过左右滑动来展示操作按钮
 */
export function SwipeCell({
  content: _content,
  disabled: _disabled = false,
  left: _left,
  opened: _opened = false,
  right: _right,
  onChange,
  onClick,
  children,
  ...args
}: SwipeCellProps) {
  const swipeCellClass = usePrefixClass('swipe-cell');

  // 转换为响应式getter函数
  const content = valueOrGetToGet(_content);
  const disabled = valueOrGetToGet(_disabled);
  const left = valueOrGetToGet(_left);
  const opened = valueOrGetToGet(_opened);
  const right = valueOrGetToGet(_right);

  // 内部状态
  const swipeState = createSignal({
    offset: 0,
    isMoving: false,
    hasMoved: false,
    status: 'close' as 'open' | 'close',
  });

  // 简化的触摸处理变量
  let startX = 0;
  let startY = 0;
  let isHorizontalSwipe = false;

  // 触摸开始
  const handleTouchStart = (e: TouchEvent) => {
    if (disabled()) return;

    const touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    isHorizontalSwipe = false;

    const state = swipeState.get();
    swipeState.set({
      ...state,
      isMoving: true,
      hasMoved: false,
    });
  };

  // 触摸移动
  const handleTouchMove = (e: TouchEvent) => {
    if (disabled()) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - startX;
    const deltaY = touch.clientY - startY;

    // 判断是否为水平滑动
    if (!isHorizontalSwipe && Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
      isHorizontalSwipe = true;
    }

    if (!isHorizontalSwipe) return;

    e.preventDefault();

    const state = swipeState.get();
    let newOffset = deltaX;

    // 简单的范围限制
    const maxOffset = 100; // 简化：固定最大偏移
    newOffset = Math.max(-maxOffset, Math.min(maxOffset, deltaX));

    swipeState.set({
      ...state,
      offset: newOffset,
      hasMoved: true,
    });
  };

  // 触摸结束
  const handleTouchEnd = (e: TouchEvent) => {
    if (disabled()) return;

    const state = swipeState.get();
    const threshold = 50; // 简化：固定阈值

    let finalOffset = 0;
    let newStatus: 'open' | 'close' = 'close';
    let direction = '';

    if (Math.abs(state.offset) > threshold) {
      if (state.offset > 0 && left()) {
        finalOffset = 80; // 简化：固定展开距离
        newStatus = 'open';
        direction = 'left';
      } else if (state.offset < 0 && right()) {
        finalOffset = -80;
        newStatus = 'open';
        direction = 'right';
      }
    }

    swipeState.set({
      ...state,
      offset: finalOffset,
      isMoving: false,
      status: newStatus,
    });

    // 触发变化事件
    onChange?.(newStatus === 'open' ? direction : undefined);
  };

  // 点击操作按钮
  const handleActionClick = (action: SwipeActionItem, source: SwipeSource) => {
    if (action.onClick) {
      action.onClick();
    } else {
      onClick?.(action, source);
    }

    // 点击后关闭
    const state = swipeState.get();
    swipeState.set({
      ...state,
      offset: 0,
      status: 'close',
    });
    onChange?.(undefined);
  };

  // 点击内容区域
  const handleContentClick = (e: Event) => {
    const state = swipeState.get();

    if (state.hasMoved) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    // 如果是打开状态，点击关闭
    if (state.status === 'open') {
      swipeState.set({
        ...state,
        offset: 0,
        status: 'close',
      });
      onChange?.(undefined);
    }
  };

  return fdom.div({
    ...args,
    className: swipeCellClass,
    onClick: handleContentClick,
    children() {
      fdom.div({
        className: `${swipeCellClass}__wrapper`,
        s_position: 'relative',
        s_overflow: 'hidden',
        children() {
          // 左侧操作区域
          const leftActions = left();
          if (leftActions && Array.isArray(leftActions)) {
            fdom.div({
              className: `${swipeCellClass}__left`,
              s_position: 'absolute',
              s_left: '-80px',
              s_top: '0',
              s_width: '80px',
              s_height: '100%',
              s_display: 'flex',
              children() {
                leftActions.forEach((action) => {
                  fdom.div({
                    className: `${swipeCellClass}__action`,
                    s_flex: '1',
                    s_display: 'flex',
                    s_alignItems: 'center',
                    s_justifyContent: 'center',
                    s_backgroundColor: '#0052d9',
                    s_color: 'white',
                    s_cursor: 'pointer',
                    onClick: () => handleActionClick(action, 'left'),
                    children: action.text,
                  });
                });
              },
            });
          }

          // 主内容区域
          fdom.div({
            className: `${swipeCellClass}__content`,
            s_position: 'relative',
            s_backgroundColor: 'white',
            s_transform: () => {
              const state = swipeState.get();
              return `translateX(${state.offset}px)`;
            },
            s_transition: () => {
              const state = swipeState.get();
              return state.isMoving ? 'none' : 'transform 0.3s ease';
            },
            onTouchStart: handleTouchStart,
            onTouchMove: handleTouchMove,
            onTouchEnd: handleTouchEnd,
            children() {
              // 渲染内容
              const currentContent = content();
              if (currentContent) {
                if (typeof currentContent === 'string') {
                  fdom.text(currentContent);
                } else if (typeof currentContent === 'function') {
                  currentContent();
                } else {
                  renderTNode(currentContent);
                }
              }

              // 渲染children
              if (typeof children === 'function') {
                children();
              } else if (children) {
                renderTNode(children);
              }
            },
          });

          // 右侧操作区域
          const rightActions = right();
          if (rightActions && Array.isArray(rightActions)) {
            fdom.div({
              className: `${swipeCellClass}__right`,
              s_position: 'absolute',
              s_right: '-80px',
              s_top: '0',
              s_width: '80px',
              s_height: '100%',
              s_display: 'flex',
              children() {
                rightActions.forEach((action) => {
                  fdom.div({
                    className: `${swipeCellClass}__action`,
                    s_flex: '1',
                    s_display: 'flex',
                    s_alignItems: 'center',
                    s_justifyContent: 'center',
                    s_backgroundColor: action.style?.includes('background-color') ? '' : '#e34d59',
                    s_color: 'white',
                    s_cursor: 'pointer',
                    style: action.style,
                    onClick: () => handleActionClick(action, 'right'),
                    children: action.text,
                  });
                });
              },
            });
          }
        },
      });
    },
  });
}
