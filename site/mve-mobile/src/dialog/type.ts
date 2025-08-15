/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */
import { FDomAttributes, FPDomAttributes } from 'mve-dom';
import { ValueOrGet } from 'wy-helper';
import { TNode } from '../common';
import { ButtonProps } from '../button';
import { OverlayProps } from '../overlay';
import { PopupProps } from '../popup';

export type DialogProps = {
  /**
   * 多按钮排列方式
   * @default horizontal
   */
  buttonLayout?: ValueOrGet<'horizontal' | 'vertical'>;
  /**
   * 多按钮排列方式。可选项：true/false
   * @default false
   */
  dialogCloseBtn?: ValueOrGet<boolean>;
  /**
   * 确认按钮。值为 null 则不显示确认按钮。值类型为字符串，则表示自定义按钮文本，值类型为 Object 则表示透传 Button 组件属性。使用 TNode 自定义按钮时，需自行控制确认事件
   */
  confirmBtn?: ButtonProps;
  /**
   * 中间自定义内容
   */
  middle?: TNode;
  /**
   * 标题
   */
  title?: string | TNode;
  /**
   * 顶部自定义内容
   */
  top?: TNode;
  /**
   * 控制对话框是否显示
   */
  visible?: ValueOrGet<boolean>;
  /**
   * 对话框宽度，示例：320, '500px', '80%'
   */
  width?: ValueOrGet<string | number>;

  renderActions?(callback: (props: ButtonProps) => void): void;

  /**按钮是否是文本的 */
  textButton?: ValueOrGet<boolean>;
  footerFull?: ValueOrGet<boolean>;
  /**弹出层的参数 */
  popUpProps?: PopupProps;
  onCloseBtnClick?(): void;
  children?: TNode;
  contentProps?: FPDomAttributes<'div'>;
} & PopupProps;

export interface DialogOptions extends Omit<DialogProps, 'attach'> {
  /**
   * 弹框类名，示例：'t-class-dialog-first t-class-dialog-second'
   * @default ''
   */
  className?: string;
  /**
   * 弹框 style 属性，输入 [CSSStyleDeclaration.cssText](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/cssText)
   */
  style?: string | Record<string, string>;
}

export interface DialogInstance {
  /**
   * 销毁弹框
   */
  destroy: () => void;
  /**
   * 隐藏弹框
   */
  hide: () => void;
  /**
   * 显示弹框
   */
  show: () => void;
  /**
   * 更新弹框内容
   */
  update: (props: DialogOptions) => void;
}

export type DialogEventSource = 'cancel' | 'overlay' | 'close-btn';

export interface DialogCloseContext {
  trigger: DialogEventSource;
  e: MouseEvent;
}

export type DialogMethod = (options?: DialogOptions) => DialogInstance;

export type DialogConfirmMethod = (options?: DialogOptions) => DialogInstance;

export type DialogAlertMethod = (options?: Omit<DialogOptions, 'cancelBtn'>) => DialogInstance;
