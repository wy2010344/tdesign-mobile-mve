import { fdom, FPDomAttributes } from 'mve-dom';
import { addEffect, createSignal, GetValue, ValueOrGet, valueOrGetToGet } from 'wy-helper';
import { hookTransition, renderTNode, TNode } from 'mve-dom-helper';
import { hookDestroy, hookTrackSignal, renderIf } from 'mve-helper';
import { createPopper, Placement } from '@popperjs/core';
import { usePrefixClass } from '../hooks/useClass';

export type PopoverTheme = 'dark' | 'light' | 'brand' | 'success' | 'warning' | 'error';
export type PopoverPlacement =
  | 'top'
  | 'left'
  | 'right'
  | 'bottom'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'left-top'
  | 'left-bottom'
  | 'right-top'
  | 'right-bottom';
export function Popover({
  placement: _placement = 'top',
  visible: _visible,
  theme: _theme = 'dark',
  content,
  showArrow = true,
  ...args
}: {
  /**
   * 浮层出现位置
   * @default top
   */
  placement?: ValueOrGet<PopoverPlacement>;
  theme?: ValueOrGet<PopoverTheme>;
  visible?: ValueOrGet<any>;
  children?: TNode;
  content?: TNode;
  showArrow?: boolean;
} & FPDomAttributes<'div'>) {
  const popoverClass = usePrefixClass('popover');
  let visible: GetValue<any>;
  const reference = fdom.div({
    className: `${popoverClass}__wrapper`,
    ...args,
  });
  if (typeof _visible === 'undefined') {
    const v = createSignal(false);
    visible = v.get;
    reference.addEventListener('click', (e) => {
      v.set(!v.get());
    });
  } else {
    visible = valueOrGetToGet(_visible);
  }

  const placement = valueOrGetToGet(_placement);
  const getPopperPlacement = (placement: PopoverPlacement): Placement => {
    return placement?.replace(/-(left|top)$/, '-start').replace(/-(right|bottom)$/, '-end') as Placement;
  };
  const getPopoverOptions = () => ({
    placement: getPopperPlacement(placement()),
    modifiers: [
      {
        name: 'arrow',
        options: {
          padding: placementPadding,
        },
      },
    ],
  });
  const placementPadding = ({
    popper,
    reference,
    placement,
  }: {
    popper: {
      width: number;
      height: number;
      x: number;
      y: number;
    };
    reference: {
      width: number;
      height: number;
      x: number;
      y: number;
    };
    placement: String;
  }) => {
    const horizontal = ['top', 'bottom'];
    const vertical = ['left', 'right'];
    const isBase = [...horizontal, ...vertical].find((item) => item === placement);
    if (isBase) {
      return 0;
    }

    const { width, x } = reference;
    const { width: popperWidth, height: popperHeight } = popper;
    const { width: windowWidth } = window.screen;

    const isHorizontal = horizontal.find((item) => placement.includes(item));
    const isEnd = placement.includes('end');
    const small = (a: number, b: number) => {
      return a < b ? a : b;
    };

    if (isHorizontal) {
      const padding = isEnd ? small(width + x, popperWidth) : small(windowWidth - x, popperWidth);
      return {
        // border-radius: 6, arrow width: 16;
        [isEnd ? 'left' : 'right']: padding - 22,
      };
    }

    const isVertical = vertical.find((item) => placement.includes(item));
    if (isVertical) {
      return {
        // border-radius: 6, arrow height: 16;
        [isEnd ? 'top' : 'bottom']: popperHeight - 22,
      };
    }
  };

  const map = hookTransition(visible, (after, show) => {
    setTimeout(after, 300);
  });
  hookTrackSignal(
    (last) => {
      const s = Boolean(map.didShow());
      const p = placement();
      if (last) {
        if (s === last[0] && p === last[1]) {
          return last;
        }
      }
      return [s, p];
    },
    () => {
      /** popperjs instance */
      let popper: ReturnType<typeof createPopper>;
      addEffect(() => {
        if (visible() && reference && popover) {
          popper = createPopper(reference, popover, getPopoverOptions());
        }
      });
      return function () {
        if (popper) {
          popper?.destroy();
          // @ts-ignore
          popper = null;
        }
      };
    },
  );
  let popover: HTMLElement | undefined;
  const theme = valueOrGetToGet(_theme);
  renderIf(map.didShow, function () {
    hookDestroy(() => {
      popover = undefined;
    });
    popover = fdom.div({
      className: popoverClass,
      children() {
        fdom.div({
          data_popoverPlacement: true,
          className() {
            return [
              map.className(`${popoverClass}--animation`),
              `${popoverClass}__content`,
              `${popoverClass}--${theme()}`,
            ].join(' ');
          },
          children() {
            renderTNode(content);
            if (showArrow) {
              fdom.div({
                className: `${popoverClass}__arrow`,
                data_popperArrow: true,
              });
            }
          },
        });
      },
    });
  });
}
