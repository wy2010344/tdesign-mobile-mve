import { fdom } from 'mve-dom';
import { Grid, GridItem } from '../index';
import { css } from 'wy-dom-helper';

import { Image } from '../../image';
export default function ScrollDemo() {
  const imgUrl = 'https://tdesign.gtimg.com/mobile/demos/example1.png';

  fdom.div({
    className: s,
    children() {
      Grid({
        column: 0, // 自动大小
        className: 'grid-demo',
        children() {
          // 生成10个网格项
          for (let i = 0; i < 10; i++) {
            GridItem({
              text: '标题文字',
              children() {
                Image({
                  src: imgUrl,
                });
              },
            });
          }
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
