import { fdom, FDomAttributes, FPDomAttributes } from 'mve-dom';
import { EmptyFun, eventGetPageY, GetValue, StoreRef, ValueOrGet, valueOrGetToGet } from 'wy-helper';
import { PickerColumnItem, PickerValue, KeysType } from './type';
import { usePrefixClass } from '../hooks/useClass';
import { baseCenterPicker, centerPicker, CenterPickerProps, cns, rangePicker, RangePickerProps } from 'mve-dom-helper';
import { preventTouchDefaultStyles } from '../_util/preventTextSelection';
import { FDomAttribute, MoveEnd, pointerMove, touchMove } from 'wy-dom-helper';

export interface PickerItemProps {
  options?: PickerColumnItem[];
  value?: PickerValue;
  keys?: KeysType;
  renderLabel?: (item: PickerColumnItem, index: number) => string;
  option?: (option: PickerColumnItem, index: number) => string | Record<string, string | boolean>;
  onPick?: (context: { value: PickerValue; index: number }) => void;
  swipeDuration?: string | number;
}

export function PickerItemRangeCell(
  props: FDomAttributes<'li'> & {
    disabled?: ValueOrGet<boolean>;
    active?: ValueOrGet<boolean>;
  },
) {
  const pickerItemClass = usePrefixClass('picker-item');
  const className = valueOrGetToGet(props.className);
  const disabled = valueOrGetToGet(props.disabled);
  const active = valueOrGetToGet(props.active);
  return fdom.li({
    ...props,
    className() {
      const classes = [`${pickerItemClass}__item`];
      if (disabled()) {
        classes.push(`${pickerItemClass}__item--disabled`);
      }
      const n = className();
      if (active()) {
        classes.push(`${pickerItemClass}__item--active`);
      }
      if (n) {
        classes.push(n);
      }
      return classes.join(' ');
    },
  });
}
export function PickerItemRange({
  value,
  size,
  rangePickerProps,
  children,
  ...args
}: {
  value: StoreRef<number>;
  size: ValueOrGet<number>;
  rangePickerProps?: RangePickerProps;
  children: (index: GetValue<number>) => void;
} & FPDomAttributes<'div'>) {
  const pickerItemClass = usePrefixClass('picker-item');
  const { scroll, beginMove } = rangePicker(40, size, value, rangePickerProps);
  const div = fdom.div({
    ...args,
    className: cns(args.className, `${pickerItemClass}__group`),
    // 防止文字选择和触摸默认行为
    ...preventTouchDefaultStyles,
    s_display: 'flex',
    s_alignItems: 'center',
    children() {
      fdom.div({
        s_height: '40px',
        s_width: '100%',
        children() {
          fdom.ul({
            className: pickerItemClass,
            s_transform() {
              return `translateY(${-scroll()}px)`;
            },
            children() {
              children(() => Math.round(scroll() / 40));
            },
          });
        },
      });
    },
  });
  div.addEventListener('pointerdown', (e) => {
    pointerMove(beginMove(e, eventGetPageY));
  });
  return div;
}
/**
 * PickerItem 组件 - 单列选择器
 */
export function PickerItem({
  value,
  centerPickerProps,
  renderCell,
  ...args
}: {
  value: StoreRef<number>;
  centerPickerProps?: CenterPickerProps;
  renderCell(i: number): void;
} & FPDomAttributes<'div'>) {
  const pickerItemClass = usePrefixClass('picker-item');
  const { beginMove, scroll, renderList, realTimeValue } = baseCenterPicker(40, value, centerPickerProps);
  const div = fdom.div({
    ...args,
    className: cns(args.className, `${pickerItemClass}__group`),
    // 防止文字选择和触摸默认行为
    ...preventTouchDefaultStyles,
    children() {
      fdom.ul({
        className: pickerItemClass,
        s_transform() {
          return `translateY(${-scroll()}px)`;
        },
        children() {
          renderList(200, function (i, disabled) {
            fdom.li({
              data_i: i,
              className() {
                const classes = [`${pickerItemClass}__item`];
                if (disabled) {
                  classes.push(`${pickerItemClass}__item--disabled`);
                }
                if (realTimeValue() == i) {
                  classes.push(`${pickerItemClass}__item--active`);
                }
                return classes.join(' ');
              },
              children() {
                renderCell(i);
              },
            });
          });
        },
      });
    },
  });
  // div.addEventListener(
  //   'touchstart',
  //   (e) => {
  //     e.preventDefault();
  //     const op: Omit<MoveEnd<TouchEvent>, 'leave'> = beginMove(e, getTouchY, {
  //       whenMove(e, inMove) {
  //         e.preventDefault();
  //       },
  //     });
  //     op.cancel = true;
  //     touchMove(op, {
  //       element: div,
  //       option: false,
  //     });
  //   },
  //   false,
  // );
  //pointer-event配合touch-none比touch更灵敏
  div.addEventListener('pointerdown', (e) => {
    pointerMove(beginMove(e, eventGetPageY));
  });
  return div;
}

// function getTouchY(e: TouchEvent) {
//   return e.changedTouches[0].pageY;
// }
