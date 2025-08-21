/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */
import { FPDomAttributes } from 'mve-dom';
import { AnimateSignal, GetValue, StoreRef, ValueOrGet } from 'wy-helper';
import { TNode } from '../common';

export type SwipeState = 'left' | 'right' | undefined;
export type SwipeCellProps = {
  state?: StoreRef<SwipeState>;
  /**
   * 是否禁用滑动
   */
  disabled?: ValueOrGet<boolean>;
  /**
   * 左侧滑动操作项。所有行为同 `right`
   */
  left?: {
    width: ValueOrGet<number>;
    children: TNode;
  };
  /**
   * 右侧滑动操作项。有两种定义方式，一种是使用数组，二种是使用插槽。`right.text` 表示操作文本，`right.className` 表示操作项类名，`right.style` 表示操作项样式，`right.onClick` 表示点击操作项后执行的回调函数。示例：`[{ text: '删除', style: 'background-color: red', onClick: () => {} }]`
   */
  right?: {
    width: ValueOrGet<number>;
    children: TNode;
  };
  offset?: AnimateSignal;
  children?: TNode;
} & FPDomAttributes<'div'>;

export interface SwipeActionItem {
  text: string;
  className?: string;
  style?: string;
  sure?: string | TNode;
  onClick?: () => void;
  [key: string]: any;
}

export type SwipeSource = 'left' | 'right';
