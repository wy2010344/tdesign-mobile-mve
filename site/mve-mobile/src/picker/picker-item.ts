import { fdom, FPDomAttributes } from 'mve-dom';
import {
  alawaysFalse,
  DeltaXSignalAnimationConfig,
  eventGetPageY,
  memo,
  ScrollHelper,
  StoreRef,
  ValueOrGet,
  valueOrGetToGet,
} from 'wy-helper';
import { PickerColumnItem, PickerValue, KeysType } from './type';
import { usePrefixClass } from '../hooks/useClass';
import { baseCenterPicker, cns, hookMeasureSize, rangePicker } from 'mve-dom-helper';
import { preventTouchDefaultStyles } from '../_util/preventTextSelection';
import { pointerMove } from 'wy-dom-helper';
import { renderForEach } from 'mve-core';

export interface PickerItemProps {
  options?: PickerColumnItem[];
  value?: PickerValue;
  keys?: KeysType;
  renderLabel?: (item: PickerColumnItem, index: number) => string;
  option?: (option: PickerColumnItem, index: number) => string | Record<string, string | boolean>;
  onPick?: (context: { value: PickerValue; index: number }) => void;
  swipeDuration?: string | number;
}

const CELLHEIGHT = 40;
const BODYHEIGHT = 200;

/**
 * PickerItem 组件 - 单列选择器
 */
export function PickerItem({
  value,
  disabled = alawaysFalse,
  renderCell,
  animationConfig,
  config,
  itemsCount: count,
  ...args
}: {
  value: StoreRef<number>;
  itemsCount?: ValueOrGet<number>;
  disabled?(v: number): any;
  animationConfig?: DeltaXSignalAnimationConfig;
  config?:
    | {
        type: 'range';
        getFrictional?(v: number): ScrollHelper;
      }
    | {
        type: 'infinity';
        getDistanceFromVelocity?(velocity: number): number;
        realTimeValue?: StoreRef<number>;
        /**
         * 和0的距离,比如如果是从1开始,就是1
         * 在循环状态下有效
         */
        baseIndex?: ValueOrGet<number>;
      };
  renderCell(i: number): void;
} & FPDomAttributes<'div'>) {
  const pickerItemClass = usePrefixClass('picker-item');
  if (config?.type == 'infinity' || !count) {
    const { beginMove, scroll, renderList, realTimeValue } = baseCenterPicker(
      () => {
        return div.querySelector('li')?.offsetHeight ?? CELLHEIGHT;
      },
      value,
      {
        ...config,
        count,
        disabled,
        animationConfig,
      },
    );
    const div = fdom.div({
      ...args,
      className: cns(args.className, `${pickerItemClass}__group`),
      // 防止文字选择和触摸默认行为
      ...preventTouchDefaultStyles,
      children(div: HTMLElement) {
        const size = hookMeasureSize();
        size.plugin(div);
        fdom.ul({
          className: pickerItemClass,
          s_transform() {
            return `translateY(${-scroll()}px)`;
          },
          children() {
            renderList(size.height, function (i, disabled) {
              fdom.li({
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
  } else {
    const size = valueOrGetToGet(count);
    let content: HTMLElement;
    const { scroll, beginMove } = rangePicker(() => content.offsetHeight, size, value, {
      disabled,
      getFrictional: config?.getFrictional,
      animationConfig,
    });
    const div = fdom.div({
      ...args,
      className: cns(args.className, `${pickerItemClass}__group`),
      // 防止文字选择和触摸默认行为
      ...preventTouchDefaultStyles,
      s_display: 'flex',
      s_alignItems: 'center',
      children() {
        const activeIndex = memo(() => Math.round(scroll() / content.offsetHeight));
        content = fdom.div({
          s_height: `var(--td-picker-item-height, 40px)`,
          s_width: '100%',
          children() {
            fdom.ul({
              className: pickerItemClass,
              s_transform() {
                return `translateY(${-scroll()}px)`;
              },
              children() {
                renderForEach<number, number>(
                  function (callback) {
                    const s = size();
                    for (let i = 0; i < s; i++) {
                      callback(i, i);
                    }
                  },
                  function (i) {
                    fdom.li({
                      className() {
                        const classes = [`${pickerItemClass}__item`];
                        if (disabled(i)) {
                          classes.push(`${pickerItemClass}__item--disabled`);
                        }
                        if (activeIndex() == i) {
                          classes.push(`${pickerItemClass}__item--active`);
                        }
                        return classes.join(' ');
                      },
                      children() {
                        renderCell(i);
                      },
                    });
                  },
                );
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
}
