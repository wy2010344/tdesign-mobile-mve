import { fdom } from 'mve-dom';
import { Avatar } from '../index';
import { TdUser } from 'mve-icons/td';
import { TSvg } from '../../../svg';
import { css } from 'wy-dom-helper';

const UserIcon = () => TdUser(TSvg, { size: '24px' });

export default function IconAvatarDemo() {
  fdom.div({
    className: s,
    children() {
      fdom.div({
        className: 'avatar-demo',
        children() {
          Avatar({
            className: 'avatar-example',
            icon: UserIcon,
          });
          Avatar({
            className: 'avatar-example',
            shape: 'round',
            icon: UserIcon,
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
  }
`;
