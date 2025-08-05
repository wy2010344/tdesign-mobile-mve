import { fdom } from 'mve-dom';
import { Avatar } from '../avatar';
import { TdUser } from 'mve-icons/td';
import { TSvg } from '../../../svg';

export default function IconAvatarDemo() {
  fdom.div({
    className: 'avatar-demo',
    s_display: 'flex',
    s_gap: '16px',
    s_alignItems: 'center',
    children() {
      // 圆形图标头像
      Avatar({
        className: 'avatar-example',
        icon() {
          TdUser(TSvg, {
            className: 't-icon',
          });
        },
      });

      // 圆角图标头像
      Avatar({
        className: 'avatar-example',
        shape: 'round',
        icon() {
          TdUser(TSvg, {
            className: 't-icon',
          });
        },
      });
    },
  });
}
