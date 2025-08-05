import { fdom, FPSvgAttributes } from 'mve-dom';

import './style/home.less';
import { TdApp, TdInternet, TdViewModule, TdBulletpoint, TdImage, TdChat } from 'mve-icons/td';
import { TSvg } from './svg';
import { EmptyFun } from 'wy-helper';
const LOCAL_STORAGE_KEY = 'tdesign-mobile-react-home-expand';

const iconDefault = {
  'Global Config'() {
    TdInternet(TSvg);
  },
  Base() {
    TdApp(TSvg);
  },
  Navigation() {
    TdViewModule(TSvg);
  },
  Form() {
    TdBulletpoint(TSvg);
  },
  'Data Display'() {
    TdImage(TSvg);
  },
  FeedBack() {
    TdChat(TSvg);
  },
};

export default function () {
  fdom.div({
    className: 'tdesign-mobile-home',
    children() {
      fdom.div({
        className: 'tdesign-mobile-logo',
        children() {
          fdom.img({
            src: 'https://tdesign.gtimg.com/site/TDesign.png',
            alt: 'logo',
          });
          fdom.p({
            childrenType: 'text',
            children: 'TDesign 适配 React 的移动端组件库',
          });
        },
      });
    },
  });
}
