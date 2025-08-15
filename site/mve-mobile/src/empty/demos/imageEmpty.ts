import { fdom } from 'mve-dom';
import { Empty } from '../index';

export default function ImageEmptyDemo() {
  fdom.div({
    children() {
      Empty({
        image: 'https://tdesign.gtimg.com/mobile/demos/empty1.png',
        description: '描述文字',
      });
    },
  });
}
