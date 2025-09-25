import { GetValue, StoreRef, ValueOrGet } from 'wy-helper';
import { TNode } from '../common';
import { FDomAttributes, FPDomAttributes } from 'mve-dom';

export type CollapseProps = {
  /** 是否禁用面板展开/收起操作 */
  disabled?: ValueOrGet<boolean>;
  /** 折叠面板风格 */
  theme?: ValueOrGet<'default' | 'card'>;
  /** 渲染面板内容的函数 */
  children: TNode;
} & FPDomAttributes<'div'>;

export type CollapsePanelProps = {
  /** 当前面板处理折叠状态时，是否销毁面板内容 */
  destroyOnCollapse?: boolean;
  /** 禁止当前面板展开，优先级大于 Collapse 的同名属性 */
  disabled?: ValueOrGet<boolean>;
  /** 当前折叠面板展开图标，优先级大于 Collapse 的同名属性 */
  expandIcon?: boolean | TNode;
  /** 面板头内容 */
  header?: TNode;
  /** 面板头左侧图标 */
  headerLeftIcon?: TNode;
  /** 面板头的右侧区域，一般用于呈现面板操作 */
  headerRightContent?: TNode;
  /** 选项卡内容的位置 */
  placement?: ValueOrGet<'bottom' | 'top'>;
  /** 当前面板唯一标识，如果值为空则取当前面下标兜底作为唯一标识 */
  open?: GetValue<any>;
  onHeaderClick?(e: MouseEvent): void;
  /** 渲染内容的函数 */
  children: TNode;
} & FPDomAttributes<'div'>;

export interface CollapseContext {
  disabled: GetValue<boolean>;
}
