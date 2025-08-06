import { fdom } from 'mve-dom';
import { Avatar, AvatarGroup } from '../index';
import { TdUserAdd } from 'mve-icons/td';
import { TSvg } from '../../../svg';
import { css } from 'wy-dom-helper';

const UserAddIcon = () => TdUserAdd(TSvg, { size: '24px' });

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

export default function ActionDemo() {
  fdom.div({
    className: s,
    children() {
      fdom.div({
        className: 'avatar-group-demo',
        children() {
          AvatarGroup({
            max: 5,
            collapseAvatar: () => UserAddIcon(),
            count: imageList.length,
            getKeyAt(i) {
              return i;
            },
            renderChildOf(getIndex, key) {
              Avatar({
                shape: 'circle',
                image() {
                  return imageList[getIndex()];
                },
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
