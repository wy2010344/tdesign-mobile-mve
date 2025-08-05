import { fdom } from 'mve-dom';
import { Avatar } from '../index';
import { css } from 'wy-dom-helper';

export default function CharacterAvatarDemo() {
  fdom.div({
    className: s,
    children() {
      fdom.div({
        className: 'avatar-demo',
        children() {
          Avatar({
            className: 'avatar-example external-class-content',
            'aria-label': '字符头像',
            children: 'A',
          });
          Avatar({
            className: 'avatar-example external-class-content',
            shape: 'round',
            children: 'A',
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
      margin-right: 32px;
    }

    .external-class-content {
      .t-avatar {
        color: #fff;
        background-color: #0052d9;
        font-weight: 400;
      }
    }
  }
`;
