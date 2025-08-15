import { TNode } from 'mve-dom-helper';
import { BadgeProps } from '../badge';
import { PopupProps } from '../popup';

export interface ActionSheetItem {
  label: string;
  color?: string;
  disabled?: boolean;
  icon?: TNode;
  badge?: BadgeProps;
}

export type ActionSheetTriggerSource = 'overlay' | 'command' | 'select';

export type ActionSheetProps = {
  /** 水平对齐方式 */
  align?: 'center' | 'left';
  /** 设置取消按钮的文本 */
  cancelText?: string;
  /** 设置每页展示菜单的数量，仅当 theme=grid 时有效 */
  count?: number;
  /** 动作面板描述文字 */
  description?: TNode;
  /** 菜单项 */
  items?: Array<string | ActionSheetItem>;
  /** 是否显示取消按钮 */
  showCancel?: boolean;
  /** 展示类型，列表和表格形式展示 */
  theme?: 'list' | 'grid';
  /** 点击取消按钮时触发 */
  onCancel?: (context: { e: MouseEvent }) => void;
  /** 选择菜单项时触发 */
  onSelected?: (selected: ActionSheetItem | string, index: number) => void;
} & PopupProps;
