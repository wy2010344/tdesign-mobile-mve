import { fdom } from 'mve-dom';
import { Grid, GridItem } from '../index';
import { css } from 'wy-dom-helper';

import { Image } from '../../image';
export default function DescDemo() {
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
      // 3列网格，带描述
      Grid({
        column: 3,
        className: 'grid-demo',
        children() {
          GridItem({ text: '标题文字', children, description: '描述文字' });
          GridItem({ text: '标题文字', children, description: '描述文字' });
          GridItem({ text: '标题最多六字', children, description: '描述最多六字' });
        },
      });

      // 2列网格，水平布局，带描述
      Grid({
        column: 2,
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
