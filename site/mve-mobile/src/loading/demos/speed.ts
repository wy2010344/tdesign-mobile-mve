import { fdom } from 'mve-dom';
import { Loading } from '../index';

export default function SpeedDemo() {
  fdom.div({
    className: 'loading-demo--flex',
    s_display: 'flex',
    s_gap: '40px',
    s_alignItems: 'center',
    children() {
      // 慢速
      fdom.div({
        className: 'loading-demo__item',
        s_textAlign: 'center',
        children() {
          Loading({
            duration: 1500,
            text: '慢速',
          });
        },
      });

      // 正常速度
      fdom.div({
        className: 'loading-demo__item',
        s_textAlign: 'center',
        children() {
          Loading({
            duration: 800,
            text: '正常',
          });
        },
      });

      // 快速
      fdom.div({
        className: 'loading-demo__item',
        s_textAlign: 'center',
        children() {
          Loading({
            duration: 400,
            text: '快速',
          });
        },
      });
    },
  });
}
