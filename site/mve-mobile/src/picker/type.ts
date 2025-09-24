import { FPDomAttributes } from 'mve-dom';
import { TNode } from '../common';

export type PickerValue = string | number;

export interface PickerColumnItem {
  label: string;
  value: PickerValue;
  disabled?: boolean;
}

export type PickerColumn = PickerColumnItem[];

export interface PickerContext {
  column: number;
  index: number;
}

export interface KeysType {
  value?: string;
  label?: string;
  disabled?: string;
}

type ButtonWithText = {
  text?: string;
} & FPDomAttributes<'div'>;

export type PickerProps = {
  renderColumns(): void;
  confirm?: ButtonWithText;
  cancel?: ButtonWithText;
  /** 底部内容 */
  footer?: TNode;
  /** 自定义头部内容 */
  header?: TNode;
  title?: TNode;
} & FPDomAttributes<'div'>;
