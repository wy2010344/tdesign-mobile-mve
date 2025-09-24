import { fdom } from 'mve-dom';
import { createSignal, valueOrGetToGet, addEffect } from 'wy-helper';
import { PickerProps, PickerValue, PickerColumn, PickerColumnItem } from './type';
import { PickerItem } from './picker-item';
import { getPickerColumns, getValueByKeys } from './utils';
import { usePrefixClass } from '../hooks/useClass';
import { renderTNode } from '../_util/parseTNode';
import { preventTextSelectionStyles } from '../_util/preventTextSelection';
import { cns } from 'mve-dom-helper';

/**
 * Picker 选择器组件
 */
export function Picker({ footer, header, confirm, cancel, title = '', renderColumns, ...args }: PickerProps) {
  const pickerClass = usePrefixClass('picker');
  fdom.div({
    ...args,
    className: cns(args.className, pickerClass),
    // 防止文字选择
    ...preventTextSelectionStyles,
    children() {
      // 工具栏
      fdom.div({
        className: `${pickerClass}__toolbar`,
        children() {
          // 取消按钮
          if (cancel) {
            fdom.div({
              ...cancel,
              className: `${pickerClass}__cancel`,
              children: cancel.text ?? '取消',
            });
          }
          // 标题
          fdom.div({
            className: `${pickerClass}__title`,
            children: title,
          });

          // 确认按钮
          if (confirm) {
            fdom.div({
              ...confirm,
              className: `${pickerClass}__confirm`,
              children: confirm.text ?? '确认',
            });
          }
        },
      });

      // 头部内容

      renderTNode(header);

      // 主要内容区域
      fdom.div({
        className: `${pickerClass}__main`,
        children() {
          renderColumns();

          // 遮罩层
          fdom.div({
            className: `${pickerClass}__mask ${pickerClass}__mask--top`,
          });

          fdom.div({
            className: `${pickerClass}__mask ${pickerClass}__mask--bottom`,
          });

          // 指示器
          fdom.div({
            className: `${pickerClass}__indicator`,
          });
        },
      });

      // 底部内容
      renderTNode(footer);
    },
  });
}
