import { fdom } from 'mve-dom';
import { ActionSheet } from '../index';
import { Button } from '../../button';
import { TdShare, TdStar, TdDownload, TdEdit1, TdImage } from 'mve-icons/td';
import { TSvg } from '../../../svg';
import { createSignal } from 'wy-helper';
import { css } from 'wy-dom-helper';

const ShareIcon = () => TdShare(TSvg, { size: '24px' });
const StarIcon = () => TdStar(TSvg, { size: '24px' });
const DownloadIcon = () => TdDownload(TSvg, { size: '24px' });
const Edit1Icon = () => TdEdit1(TSvg, { size: '24px' });
const ImageIcon = () => TdImage(TSvg, { size: '24px' });

const items = [
  {
    label: '微信',
    icon: 'https://tdesign.gtimg.com/mobile/demos/wechat.png',
  },
  {
    label: '朋友圈',
    icon: 'https://tdesign.gtimg.com/mobile/demos/times.png',
  },
  {
    label: 'QQ',
    icon: 'https://tdesign.gtimg.com/mobile/demos/qq.png',
  },
  {
    label: '企业微信',
    icon: 'https://tdesign.gtimg.com/mobile/demos/wecom.png',
  },
  {
    label: '收藏',
    icon: ShareIcon,
  },
  {
    label: '刷新',
    icon: StarIcon,
  },
  {
    label: '下载',
    icon: DownloadIcon,
  },
  {
    label: '复制',
    icon: Edit1Icon,
  },
  {
    label: '文字',
    icon: ImageIcon,
  },
  {
    label: '文字',
    icon: ImageIcon,
  },
];

export default function GridMultipleDemo() {
  const visible = createSignal(false);
  const count = 8;

  const handleSelected = (selected: any, selectedIndex: number) => {
    console.log(selected, selectedIndex);
  };

  const handleCancel = () => {
    console.log('cancel');
  };

  fdom.div({
    className: s,
    children() {
      fdom.div({
        className: 'action-sheet-demo',
        children() {
          Button({
            block: true,
            variant: 'outline',
            theme: 'primary',
            onClick: () => (visible.value = true),
            children: '宫格型-多页',
          });
        },
      });

      ActionSheet({
        visible: visible,
        theme: 'grid',
        items: items,
        count: count,
        onSelected: handleSelected,
        onCancel: handleCancel,
      });
    },
  });
}

const s = css`
  .action-sheet-demo {
    margin-bottom: 16px;
  }
`;
