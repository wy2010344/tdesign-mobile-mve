import { ValueOrGet } from 'wy-helper';
import { TNode } from '../common';
import { FPDomAttributes } from 'mve-dom';

export type SwitchProps = {
  /** 是否禁用组件 */
  disabled?: ValueOrGet<boolean>;
  /** 开关的图标；[打开时的图标，关闭时的图标] */
  icon?: [TNode, TNode] | ((value: boolean) => void);
  /** 开关内容，[开启时内容，关闭时内容] */
  label?: [TNode, TNode] | ((value: boolean) => void);
  /** 是否处于加载中状态 */
  loading?: ValueOrGet<boolean>;
  /** 开关尺寸 */
  size?: ValueOrGet<'small' | 'medium' | 'large'>;
  /** 开关值 */
  value?: ValueOrGet<boolean>;
  /** 数据发生变化时触发 */
  onChange?: (value: boolean) => void;
} & FPDomAttributes<'div'>;
