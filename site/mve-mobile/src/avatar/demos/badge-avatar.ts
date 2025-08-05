import { fdom } from 'mve-dom';
import { Avatar } from '../index';
import { TdUser } from 'mve-icons/td';
import { TSvg } from '../../../svg';
import { css } from 'wy-dom-helper';

const UserIcon = () => TdUser(TSvg, { size: '24px' });

export default function BadgeAvatarDemo() {
  fdom.div({
    className: s,
    children() {
      fdom.div({
        className: 'avatar-demo',
        children() {
          Avatar({
            className: 'avatar-example',
            image: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
            badgeProps: {
              dot: true,
              offset: [4, 4],
            },
          });
          Avatar({
            className: 'avatar-example external-class-content',
            badgeProps: {
              count: 8,
              offset: [6, 6],
            },
            children: 'A',
          });
          Avatar({
            className: 'avatar-example',
            icon: UserIcon,
            badgeProps: {
              count: 12,
              offset: [6, 6],
            },
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
