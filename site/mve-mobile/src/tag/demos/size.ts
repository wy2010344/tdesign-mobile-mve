import { fdom } from 'mve-dom';
import { Tag } from '../index';
import { css } from 'wy-dom-helper';

export default function SizeDemo() {
  fdom.div({
    className: s,
    children() {
      fdom.div({
        className: 'tag-block',
        children() {
          Tag({ size: 'extra-large', variant: 'light', children: '加大尺寸' });
          Tag({ size: 'large', variant: 'light', children: '大尺寸' });
          Tag({ size: 'medium', variant: 'light', children: '中尺寸' });
          Tag({ size: 'small', variant: 'light', children: '小尺寸' });
        },
      });

      fdom.div({
        className: 'tag-block tag-block1',
        children() {
          Tag({ size: 'extra-large', variant: 'light', closable: true, children: '加大尺寸' });
          Tag({ size: 'large', variant: 'light', closable: true, children: '大尺寸' });
          Tag({ size: 'medium', variant: 'light', closable: true, children: '中尺寸' });
          Tag({ size: 'small', variant: 'light', closable: true, children: '小尺寸' });
        },
      });
    },
  });
}

const s = css`
  width: 100%;

  .tag-block {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
  }

  .tag-block1 {
    display: flex;
    justify-content: space-between;
  }

  .tag-block1 > span {
    margin: 0;
  }
`;
