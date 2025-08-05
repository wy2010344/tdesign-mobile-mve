import { fdom } from 'mve-dom';
import BaseDemo from './base';
import HorzDemo from './horz';
import VertDemo from './vert';
import PureTextDemo from './pure-text';
import SizeDemo from './size';
import SpeedDemo from './speed';
// import FullscreenDemo from './fullscreen';
// import AttachDemo from './attach';
// import ServiceDemo from './service';
import demoBlock from '../../../demo-block';
import { css } from 'wy-dom-helper';

export default function LoadingDemos() {
  fdom.div({
    className: s,
    children() {
      fdom.h1({
        className: 'title',
        children: 'Loading 加载中',
      });
      fdom.p({
        className: 'summary',
        children: '用于表示页面或操作的加载状态，给予用户反馈的同时减缓等待的焦虑感，由一个或一组反馈动效组成。',
      });

      demoBlock({
        title: '01 组件类型',
        summary: '纯图标',
        padding: true,
        children() {
          fdom.div({
            className: 'loading-demo--flex',
            children() {
              BaseDemo();
            },
          });
        },
      });

      demoBlock({
        summary: '图标加文字横向',
        padding: true,
        children() {
          fdom.div({
            className: 'loading-demo--flex',
            children() {
              HorzDemo();
            },
          });
        },
      });

      demoBlock({
        summary: '图标加文字竖向',
        padding: true,
        children() {
          fdom.div({
            className: 'loading-demo--flex',
            children() {
              VertDemo();
            },
          });
        },
      });

      demoBlock({
        summary: '纯文字',
        padding: true,
        children() {
          fdom.div({
            className: 'loading-demo--flex',
            children() {
              PureTextDemo();
            },
          });
        },
      });

      demoBlock({
        title: '02 组件尺寸',
        children() {
          SizeDemo();
        },
      });

      demoBlock({
        title: '03 加载速度',
        summary: '加载速度调整',
        children() {
          SpeedDemo();
        },
      });

      // 视觉稿待定，暂时注释
      // demoBlock({
      //   title: '04 全屏加载',
      //   summary: '全屏展示加载状态，阻止用户操作。',
      //   children() {
      //     FullscreenDemo();
      //   },
      // });

      // demoBlock({
      //   title: '05 挂载到指定元素',
      //   summary: '可通过 attach 挂载到指定元素。注：被挂载元素（loading的父元素）需设置：position: relative;',
      //   children() {
      //     AttachDemo();
      //   },
      // });

      // demoBlock({
      //   title: '06 函数方式调用',
      //   children() {
      //     ServiceDemo();
      //   },
      // });
    },
  });
}

const s = css`
  background-color: #fff;

  .loading-demo--flex {
    display: flex;
    align-items: center;
  }
`;
