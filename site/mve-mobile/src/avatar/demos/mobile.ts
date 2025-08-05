import { fdom } from 'mve-dom';
import ImageAvatarDemo from './image-avatar';
import CharacterAvatarDemo from './character-avatar';
import IconAvatarDemo from './icon-avatar';
import BadgeAvatarDemo from './badge-avatar';
import ExhibitionDemo from './exhibition';
import ActionDemo from './action';
import SizeDemo from './size';
import demoBlock from '../../../demo-block';
import { css } from 'wy-dom-helper';

export default function AvatarDemos() {
  fdom.div({
    className: s,
    children() {
      fdom.h1({
        className: 'title',
        children: 'Avatar 头像',
      });
      fdom.p({
        className: 'summary',
        children: '用于展示用户头像信息，除了纯展示也可点击进入个人详情等操作。',
      });

      demoBlock({
        title: '01 组件类型',
        summary: '图片头像',
        children() {
          ImageAvatarDemo();
        },
      });

      demoBlock({
        summary: '字符头像',
        children() {
          CharacterAvatarDemo();
        },
      });

      demoBlock({
        summary: '图标头像',
        children() {
          IconAvatarDemo();
        },
      });

      demoBlock({
        summary: '徽标头像',
        children() {
          BadgeAvatarDemo();
        },
      });

      demoBlock({
        title: '02 特殊类型',
        summary: '纯展示的头像组',
        children() {
          ExhibitionDemo();
        },
      });

      demoBlock({
        summary: '带操作的头像组',
        children() {
          ActionDemo();
        },
      });

      demoBlock({
        title: '03 组件尺寸',
        summary: '组件尺寸',
        children() {
          SizeDemo();
        },
      });
    },
  });
}

const s = css`
  background-color: var(--bg-color-demo, #fff);
`;
