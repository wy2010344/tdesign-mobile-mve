import { ValueOrGet } from 'wy-helper';
import { TNode } from '../common';
import { FPDomAttributes } from 'mve-dom';

export type CellProps = {
  /** 右侧内容的对齐方式，默认居中对齐 */
  align?: ValueOrGet<'top' | 'middle' | 'bottom'>;
  /** 是否显示右侧箭头 */
  arrow?: ValueOrGet<boolean>;
  /** 是否显示下边框 */
  bordered?: ValueOrGet<boolean>;
  /** 下方内容描述 */
  description?: TNode;
  /** 是否开启点击反馈 */
  allowHover?: ValueOrGet<boolean>;
  /** 主图 */
  image?: string | TNode;
  /** 左侧图标，出现在单元格标题的左侧 */
  leftIcon?: TNode;
  /** 和标题同行的说明文字 */
  note?: TNode;
  /** 是否显示表单必填星号 */
  required?: ValueOrGet<boolean>;
  /** 最右侧图标 */
  rightIcon?: TNode;
  /** 标题 */
  title?: TNode;
  /** 点击事件 */
  onClick?: (e: MouseEvent) => void;
  disabled?: ValueOrGet<boolean>;
  /** 子内容 */
  children?: TNode;
} & FPDomAttributes<'div'>;

export type CellGroupProps = {
  /** 是否显示组边框 */
  bordered?: ValueOrGet<boolean>;
  /** 单元格组风格 */
  theme?: ValueOrGet<'default' | 'card'>;
  /** 单元格组标题 */
  title?: ValueOrGet<string>;
  children?: TNode;
} & FPDomAttributes<'div'>;
