import { fdom, FDomAttributes, FPDomAttributes } from 'mve-dom';

import { usePrefixClass } from '../hooks/useClass';
import { EmptyFun, GetValue, ValueOrGet, valueOrGetToGet } from 'wy-helper';
import { hookDestroy, renderIfP } from 'mve-helper';
import { cns, createSimpleMovePage } from 'mve-dom-helper';
import { TNode } from 'mve-dom-helper';
import { cns as cns1 } from 'wy-dom-helper';
import { createContext } from 'mve-core';

export function hookInterval(callback: EmptyFun, timeout: number) {
  let inv = setInterval(callback, timeout);
  function stop() {
    clearInterval(inv);
  }
  hookDestroy(stop);
  return {
    stop,
    restart() {
      inv = setInterval(callback, timeout);
    },
  };
}

export function SwiperItem({
  getIndex,
  ...args
}: {
  getIndex(): number;
} & FDomAttributes<'div'>) {
  const swiperItemClass = usePrefixClass('swiper-item');
  const { direction } = SwiperContext.consume();
  return fdom.div({
    ...args,
    s_position() {
      return getIndex() ? 'absolute' : 'static';
    },
    s_transform() {
      if (direction() == 'horizontal') {
        return `translateX(${getIndex() * 100}%)`;
      }
      return `translateY(${getIndex() * 100}%)`;
    },
    className: cns(swiperItemClass, args.className),
  });
}

export function NavigationItem({ active: _active = false }: { active?: ValueOrGet<boolean> }) {
  const swiperNavClass = usePrefixClass('swiper-nav');
  const active = valueOrGetToGet(_active);
  const { direction, navigationType } = SwiperContext.consume();
  fdom.span({
    className() {
      return cns1(
        `${swiperNavClass}__${navigationType()}-item`,
        active() && `${swiperNavClass}__${navigationType()}-item--active`,
        `${swiperNavClass}__${navigationType()}-item--${direction()}`,
      );
    },
  });
}

type Direction = 'vertical' | 'horizontal';
type NavigationType = 'dots' | 'dots-bar' | 'fraction';
const SwiperContext = createContext<{
  direction: GetValue<Direction>;
  navigationType: GetValue<NavigationType>;
}>(undefined!);
export function Swiper({
  moveDiff: _moveDiff = 0,
  addDiff,
  type: _type = 'default',
  navigation,
  navigationType: _navigationType = 'dots',
  navigationPlacement: _navigationPlacement = 'inside',
  navigationPosition: _navigationPosition = 'end',
  direction: _direction = 'horizontal',
  children,
  ...args
}: {
  moveDiff?: ValueOrGet<number>;
  direction?: ValueOrGet<Direction>;
  navigationType?: ValueOrGet<NavigationType>;
  type?: ValueOrGet<'default' | 'card'>;
  addDiff?(n: number): void;
  navigation?(): void;
  navigationPlacement?: ValueOrGet<'inside' | 'outside'>;
  navigationPosition?: ValueOrGet<'start-start' | 'start' | 'start-end' | 'end-start' | 'end' | 'end-end'>;
  children?: TNode;
} & FPDomAttributes<'div'>) {
  const moveDiff = valueOrGetToGet(_moveDiff);
  const swiperClass = usePrefixClass('swiper');
  const swiperNavClass = usePrefixClass('swiper-nav');
  const type = valueOrGetToGet(_type);
  const navigationPlacement = valueOrGetToGet(_navigationPlacement);
  const direction = valueOrGetToGet(_direction);

  const navigationType = valueOrGetToGet(_navigationType);
  SwiperContext.provide({
    direction,
    navigationType,
  });
  const navigationPosition = valueOrGetToGet(_navigationPosition);
  function isBottomPagination() {
    return direction() == 'horizontal' && navigationPosition().startsWith('end');
  }
  const className = valueOrGetToGet(args.className);
  return fdom.div({
    ...args,
    className() {
      const cs = [swiperClass, `${swiperClass}--${type()}`];
      //如果是outside,有一个padding
      if (isBottomPagination()) {
        cs.push(`${swiperClass}--${navigationPlacement()}`);
      }
      cs.push(className() || '');
      return cs.join(' ');
    },
    children() {
      fdom.div({
        className: `${swiperClass}__container`,
        s_flexDirection() {
          return direction() == 'vertical' ? 'column' : 'row';
        },
        s_transform() {
          if (direction() == 'horizontal') {
            return `translateX(${-moveDiff()}px)`;
          }
          return `translateY(${-moveDiff()}px)`;
        },
        children,
      });
      if (addDiff) {
        fdom.span({
          className: `${swiperNavClass}__btn`,
          s_display() {
            return direction() == 'horizontal' ? '' : 'none';
          },
          children() {
            fdom.span({
              className: `${swiperNavClass}__btn--prev`,
              onClick() {
                addDiff(-1);
              },
            });
            fdom.span({
              className: `${swiperNavClass}__btn--next`,
              onClick() {
                addDiff(1);
              },
            });
          },
        });
      }
      if (navigation) {
        fdom.span({
          className() {
            const p = navigationPosition();
            const [a, b] = p.split('-');
            const d = direction();
            const vs: string[] = [];
            if (d == 'horizontal') {
              vs.push(horizontal[a]);
              if (b) {
                vs.push(vertical[b]);
              }
            } else {
              if (b) {
                vs.push(horizontal[b]);
              }
              vs.push(vertical[a]);
            }
            return cns1(
              `${swiperNavClass}--${direction()}`,
              `${swiperNavClass}__${navigationType()}`,
              `${swiperNavClass}--${vs.join('-')}`,
              isBottomPagination() && `${swiperNavClass}--${navigationPlacement()}`,
            );
          },
          children: navigation,
        });
      }
    },
  });
}

const horizontal = {
  start: 'top',
  end: 'bottom',
};
const vertical = {
  start: 'left',
  end: 'right',
};
