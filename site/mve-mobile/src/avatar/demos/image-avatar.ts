import { fdom } from 'mve-dom';
import { Avatar } from '../index';
import { css } from 'wy-dom-helper';

export default function ImageAvatarDemo() {
  fdom.div({
    className: s,
    children() {
      fdom.div({
        className: 'avatar-demo',
        children() {
          Avatar({
            className: 'avatar-example',
            image: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
          });
          Avatar({
            className: 'avatar-example',
            image: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
            shape: 'round',
          });
        },
      });
    },
  });
}

const s = css`
  .avatar-demo {
    margin-left: 16px;
    margin-bottom: 16px;

    .avatar-example:not(:last-child) {
      margin-right: 64px;
    }

    .custom {
      .t-avatar__inner {
        background-color: #0052d9;
        color: #fff;
      }
    }
  }
`;
