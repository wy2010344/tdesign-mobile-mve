import { fdom } from 'mve-dom';
import BaseDemo from './base';
import ThemeDemo from './theme';
import SizeDemo from './size';
import ShapeDemo from './shape';
import StatusDemo from './status';
import IconDemo from './icon';
import BlockDemo from './block';
import GhostDemo from './ghost';
import ext from './ext';
import './style.css';
export default function ButtonDemos() {
  fdom.div({
    className: 'tdesign-mobile-demo',
    children() {
      // 页面标题
      fdom.div({
        className: 'demo-header',
        children() {
          fdom.h1({
            className: 'demo-title',
            childrenType: 'text',
            children: 'Button 按钮',
          });

          fdom.p({
            className: 'demo-summary',
            childrenType: 'text',
            children: '按钮用于开启一个闭环的操作任务，如"删除"对象、"购买"商品等。',
          });
        },
      });

      // 组件类型
      fdom.div({
        className: 'demo-block',
        children() {
          fdom.h2({
            className: 'demo-block-title',
            childrenType: 'text',
            children: '01 组件类型',
          });

          fdom.div({
            className: 'demo-block-content',
            children() {
              fdom.h3({
                className: 'demo-block-subtitle',
                childrenType: 'text',
                children: '基础按钮',
              });
              BaseDemo();

              fdom.h3({
                className: 'demo-block-subtitle',
                childrenType: 'text',
                children: '图标按钮',
              });
              IconDemo();

              fdom.h3({
                className: 'demo-block-subtitle',
                childrenType: 'text',
                children: '幽灵按钮',
              });
              GhostDemo();

              fdom.h3({
                className: 'demo-block-subtitle',
                childrenType: 'text',
                children: '通栏按钮',
              });
              BlockDemo();
            },
          });
        },
      });

      // 组件状态
      fdom.div({
        className: 'demo-block',
        children() {
          fdom.h2({
            className: 'demo-block-title',
            childrenType: 'text',
            children: '02 组件状态',
          });

          fdom.div({
            className: 'demo-block-content',
            children() {
              fdom.h3({
                className: 'demo-block-subtitle',
                childrenType: 'text',
                children: '按钮禁用态',
              });
              StatusDemo();
            },
          });
        },
      });

      // 组件样式
      fdom.div({
        className: 'demo-block',
        children() {
          fdom.h2({
            className: 'demo-block-title',
            childrenType: 'text',
            children: '03 组件样式',
          });

          fdom.div({
            className: 'demo-block-content',
            children() {
              fdom.h3({
                className: 'demo-block-subtitle',
                childrenType: 'text',
                children: '按钮尺寸',
              });
              SizeDemo();

              fdom.h3({
                className: 'demo-block-subtitle',
                childrenType: 'text',
                children: '按钮形状',
              });
              ShapeDemo();

              fdom.h3({
                className: 'demo-block-subtitle',
                childrenType: 'text',
                children: '按钮主题',
              });
              ThemeDemo();
            },
          });
        },
      });

      // 组件样式
      fdom.div({
        className: 'demo-block',
        children() {
          fdom.h2({
            className: 'demo-block-title',
            childrenType: 'text',
            children: 'ext',
          });

          fdom.div({
            className: 'demo-block-content',
            children() {
              ext();
            },
          });
        },
      });
    },
  });
}
