import { fdom } from 'mve-dom';
import { Avatar } from '../index';
import { TdUser } from 'mve-icons/td';
import { TSvg } from '../../../svg';
import { css } from 'wy-dom-helper';

const UserIcon = () => TdUser(TSvg, { size: '24px' });

export default function SizeDemo() {
  fdom.div({
    className: s,
    children() {
      fdom.div({
        className: 'tdesign-demo-avatar',
        children() {
          fdom.div({
            className: 'avatar-demo',
            children() {
              Avatar({
                className: 'avatar-example--large',
                shape: 'circle',
                size: 'large',
                image: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
                alt: '示例图片',
              });
              Avatar({
                className: 'avatar-example--large external-class-content',
                shape: 'circle',
                size: 'large',
                children: 'A',
              });
              Avatar({
                className: 'avatar-example--large',
                shape: 'circle',
                size: 'large',
                icon: UserIcon,
              });
            },
          });

          fdom.div({
            className: 'avatar-demo',
            children() {
              Avatar({
                className: 'avatar-example--medium',
                shape: 'circle',
                size: 'medium',
                image: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
                alt: '示例图片',
              });
              Avatar({
                className: 'avatar-example--medium external-class-content',
                shape: 'circle',
                size: 'medium',
                children: 'A',
              });
              Avatar({
                className: 'avatar-example--medium',
                shape: 'circle',
                size: 'medium',
                icon: UserIcon,
              });
            },
          });

          fdom.div({
            className: 'avatar-demo',
            children() {
              Avatar({
                className: 'avatar-example--small',
                shape: 'circle',
                size: 'small',
                image: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
                alt: '示例图片',
              });
              Avatar({
                className: 'avatar-example--small external-class-content',
                shape: 'circle',
                size: 'small',
                children: 'A',
              });
              Avatar({
                className: 'avatar-example--small',
                shape: 'circle',
                size: 'small',
                icon: UserIcon,
              });
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

    .avatar-example--small:not(:last-child) {
      margin-right: 56px;
    }

    .avatar-example--medium:not(:last-child) {
      margin-right: 48px;
    }

    .avatar-example--large:not(:last-child) {
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
