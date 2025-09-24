import { fdom } from 'mve-dom';
import { BasePickerDemo } from './base';
import { WithTitlePickerDemo } from './with-title';
import { AreaPickerDemo } from './area';
import demoBlock from '../../../demo-block';
/**
 * Picker 组件移动端演示页面
 */
export default function PickerMobileDemo() {
  return fdom.div({
    className: 'tdesign-mobile-demo',
    children() {
      fdom.h1({
        children: 'Picker 选择器',
      });
      fdom.p({
        children: '提供多个选项集合供用户选择其中一个，通常与弹出层组件配合使用。',
      });
      demoBlock({
        title: '基础用法',
        summary: '基础选择器',
        children() {
          BasePickerDemo();
          AreaPickerDemo();
        },
      });

      return;
      demoBlock({
        title: '02 组件样式',
        children() {
          WithTitlePickerDemo();
        },
      });
    },
  });
}
