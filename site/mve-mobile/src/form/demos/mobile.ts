import { fdom } from 'mve-dom';
import demoBlock from '../../../demo-block';
import demo from './demo';
export default function () {
  fdom.div({
    className: 'tdesign-mobile-demo',
    children() {
      fdom.h1({
        children: 'Form 表单',
      });
      fdom.p({
        children: '用于开启一个闭环的操作任务，如“删除”对象、“购买”商品等。',
      });
      demoBlock({
        title: '01 基础类型',
        summary: '基础表单',
        children() {
          fdom.div({
            className: 'option',
            children() {},
          });
          demo();
        },
      });
    },
  });
}
