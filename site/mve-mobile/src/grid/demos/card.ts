import { fdom } from 'mve-dom';
import { Grid, GridItem } from '../index';
import { css } from 'wy-dom-helper';

import { Image } from '../../image';
export default function CardDemo() {
  const imgUrl = 'https://tdesign.gtimg.com/mobile/demos/example1.png';
  const children = function () {
    Image({
      shape: 'round',
      src: imgUrl,
    });
  };

  fdom.div({
    className: s,
    children() {
      // 4列卡片主题网格
      Grid({
        column: 4,
        theme: 'card',
        className: 'grid-demo',
        children() {
          GridItem({ text: '标题文字', children, description: '描述文字' });
          GridItem({ text: '标题文字', children, description: '描述文字' });
          GridItem({ text: '标题文字', children, description: '描述文字' });
          GridItem({ text: '最多五个字', children, description: '描述最多六字' });
        },
      });

      // 2列卡片主题网格，水平布局
      Grid({
        column: 2,
        theme: 'card',
        className: 'grid-demo',
        children() {
          GridItem({
            text: '标题文字',
            layout: 'horizontal',
            children,
            description: '描述文字',
          });
          GridItem({
            text: '标题文字',
            layout: 'horizontal',
            children,
            description: '描述文字',
          });
        },
      });
    },
  });
}

const s = css`
  .grid-demo {
    margin-bottom: 16px;
  }
`;
