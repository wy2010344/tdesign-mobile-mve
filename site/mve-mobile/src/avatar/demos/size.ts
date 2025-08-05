import { fdom } from 'mve-dom';
import { Avatar } from '../avatar';
import { TdUser } from 'mve-icons/td';
import { TSvg } from '../../../svg';

export default function SizeDemo() {
  fdom.div({
    className: 'tdesign-demo-avatar',
    children() {
      // 大尺寸
      fdom.div({
        className: 'avatar-demo',
        s_display: 'flex',
        s_gap: '16px',
        s_alignItems: 'center',
        s_marginBottom: '20px',
        children() {
          fdom.div({
            s_fontSize: '14px',
            s_color: '#666',
            s_marginRight: '12px',
            s_minWidth: '40px',
            childrenType: 'text',
            children: '大尺寸:',
          });

          // 图片头像
          Avatar({
            className: 'avatar-example--large',
            shape: 'circle',
            size: 'large',
            image: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
            alt: '实例图片',
          });

          // 字符头像
          Avatar({
            className: 'avatar-example--large external-class-content',
            shape: 'circle',
            size: 'large',
            children: 'A',
          });

          // 图标头像
          Avatar({
            className: 'avatar-example--large',
            shape: 'circle',
            size: 'large',
            icon() {
              TdUser(TSvg, {
                className: 't-icon',
              });
            },
          });
        },
      });

      // 中尺寸
      fdom.div({
        className: 'avatar-demo',
        s_display: 'flex',
        s_gap: '16px',
        s_alignItems: 'center',
        s_marginBottom: '20px',
        children() {
          fdom.div({
            s_fontSize: '14px',
            s_color: '#666',
            s_marginRight: '12px',
            s_minWidth: '40px',
            childrenType: 'text',
            children: '中尺寸:',
          });

          Avatar({
            className: 'avatar-example--medium',
            shape: 'circle',
            size: 'medium',
            image: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
            alt: '实例图片',
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
            icon() {
              TdUser(TSvg, {
                className: 't-icon',
              });
            },
          });
        },
      });

      // 小尺寸
      fdom.div({
        className: 'avatar-demo',
        s_display: 'flex',
        s_gap: '16px',
        s_alignItems: 'center',
        children() {
          fdom.div({
            s_fontSize: '14px',
            s_color: '#666',
            s_marginRight: '12px',
            s_minWidth: '40px',
            childrenType: 'text',
            children: '小尺寸:',
          });

          Avatar({
            className: 'avatar-example--small',
            shape: 'circle',
            size: 'small',
            image: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
            alt: '实例图片',
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
            icon() {
              TdUser(TSvg, {
                className: 't-icon',
              });
            },
          });
        },
      });

      // 自定义尺寸
      fdom.div({
        className: 'avatar-demo',
        s_display: 'flex',
        s_gap: '16px',
        s_alignItems: 'center',
        s_marginTop: '20px',
        children() {
          fdom.div({
            s_fontSize: '14px',
            s_color: '#666',
            s_marginRight: '12px',
            s_minWidth: '40px',
            childrenType: 'text',
            children: '自定义:',
          });

          Avatar({
            size: '60px',
            image: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
            alt: '自定义尺寸',
          });

          Avatar({
            size: '60px',
            shape: 'round',
            children: 'XL',
          });

          Avatar({
            size: '60px',
            icon() {
              TdUser(TSvg, {
                className: 't-icon',
              });
            },
          });
        },
      });
    },
  });
}
