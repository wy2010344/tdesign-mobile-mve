import { fdom } from 'mve-dom';
import { Grid, GridItem } from '../index';
import { css } from 'wy-dom-helper';

import { Image } from '../../image';
export default function BaseDemo() {
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
      // 5列网格
      Grid({
        column: 5,
        className: 'grid-demo',
        children() {
          GridItem({ text: '标题文字', children });
          GridItem({ text: '标题文字', children });
          GridItem({ text: '标题文字', children });
          GridItem({ text: '标题文字', children });
          GridItem({ text: '最多四字', children });
        },
      });

      // 4列网格（默认）
      Grid({
        className: 'grid-demo',
        children() {
          GridItem({ text: '标题文字', children });
          GridItem({ text: '标题文字', children });
          GridItem({ text: '标题文字', children });
          GridItem({ text: '最多五个字', children });
        },
      });

      // 3列网格，带hover效果
      Grid({
        column: 3,
        className: 'grid-demo',
        allowHover: true,
        children() {
          GridItem({ text: '标题文字', children });
          GridItem({ text: '标题文字', children });
          GridItem({ text: '最多六个文字', children });
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
