import { fdom } from 'mve-dom';
import { Grid, GridItem } from '../index';
import { css } from 'wy-dom-helper';
import { Image } from '../../image';
export default function BadgeDemo() {
  const imgUrl = 'https://tdesign.gtimg.com/mobile/demos/example1.png';

  fdom.div({
    className: s,
    children() {
      Grid({
        className: 'grid-demo',
        children() {
          GridItem({
            text: '标题文字',

            badge: { dot: true },
            children() {
              Image({
                shape: 'round',
                src: imgUrl,
              });
            },
          });

          GridItem({
            text: '标题文字',
            badge: { count: 8 },
            children() {
              Image({
                shape: 'round',
                src: imgUrl,
              });
            },
          });

          GridItem({
            text: '标题五字内',
            badge: { count: 13 },
            children() {
              Image({
                shape: 'round',
                src: imgUrl,
              });
            },
          });

          GridItem({
            text: '标题五字内',
            badge: { count: 'NEW' },
            children() {
              Image({
                shape: 'round',
                src: imgUrl,
              });
            },
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
