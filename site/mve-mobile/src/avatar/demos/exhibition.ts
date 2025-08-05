import { fdom } from 'mve-dom';
import { Avatar, AvatarGroup } from '../index';
import { css } from 'wy-dom-helper';

const imageList = [
  'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
  'https://tdesign.gtimg.com/mobile/demos/avatar2.png',
  'https://tdesign.gtimg.com/mobile/demos/avatar3.png',
  'https://tdesign.gtimg.com/mobile/demos/avatar4.png',
  'https://tdesign.gtimg.com/mobile/demos/avatar5.png',
  'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
  'https://tdesign.gtimg.com/mobile/demos/avatar2.png',
  'https://tdesign.gtimg.com/mobile/demos/avatar3.png',
  'https://tdesign.gtimg.com/mobile/demos/avatar4.png',
  'https://tdesign.gtimg.com/mobile/demos/avatar5.png',
];

export default function ExhibitionDemo() {
  fdom.div({
    className: s,
    children() {
      fdom.div({
        className: 'avatar-group-demo',
        children() {
          AvatarGroup({
            cascading: 'left-up',
            max: 5,
            children() {
              imageList.forEach((url, index) => {
                Avatar({
                  key: index,
                  shape: 'circle',
                  image: url,
                });
              });
            },
          });
        },
      });
    },
  });
}

const s = css`
  .avatar-group-demo {
    margin-left: 16px;
    margin-bottom: 16px;
  }
`;
