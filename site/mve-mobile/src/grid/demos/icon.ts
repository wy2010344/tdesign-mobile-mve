import { fdom } from 'mve-dom';
import { Grid, GridItem } from '../index';
import { TdShare, TdStar, TdDownload, TdEdit1 } from 'mve-icons/td';
import { TSvg } from '../../../svg';
import { css } from 'wy-dom-helper';

export default function IconDemo() {
  fdom.div({
    className: s,
    children() {
      Grid({
        column: 4,
        className: 'grid-demo',
        children() {
          GridItem({
            text: '分享',
            children() {
              fdom.div({
                className: 'icon-wrapper',
                children() {
                  TdShare(TSvg, { size: '24px' });
                },
              });
            },
          });

          GridItem({
            text: '收藏',
            children: () => TdStar(TSvg, { size: '24px' }),
          });

          GridItem({
            text: '保存',
            children: () => TdDownload(TSvg, { size: '24px' }),
          });

          GridItem({
            text: '编辑',
            children: () => TdEdit1(TSvg, { size: '24px' }),
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

  .icon-wrapper {
    background: #eee;
    border-radius: 6px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
