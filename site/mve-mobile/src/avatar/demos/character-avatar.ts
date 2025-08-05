import { fdom } from 'mve-dom';
import { Avatar } from '../avatar';

export default function CharacterAvatarDemo() {
  fdom.div({
    className: 'avatar-demo',
    s_display: 'flex',
    s_gap: '16px',
    s_alignItems: 'center',
    children() {
      // 圆形字符头像
      Avatar({
        className: 'avatar-example external-class-content',
        children: 'A',
      });

      // 圆角字符头像
      Avatar({
        className: 'avatar-example external-class-content',
        shape: 'round',
        children: 'A',
      });

      // 中文字符头像
      Avatar({
        className: 'avatar-example external-class-content',
        children: '张',
      });

      // 多字符头像
      Avatar({
        className: 'avatar-example external-class-content',
        shape: 'round',
        children: 'AB',
      });
    },
  });
}
