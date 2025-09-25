import { fdom } from 'mve-dom';
import { Cell, CellGroup } from '../index';
import { Badge } from '../../badge';
import { Switch } from '../../switch';
import { Avatar } from '../../avatar';
import { TdApp, TdChevronRight } from 'mve-icons/td';
import { TSvg } from '../../../svg';

const AppIcon = () => TdApp(TSvg, { size: '24px' });
const ChevronRightIcon = () => TdChevronRight(TSvg, { size: '24px' });

const avatarUrl = 'https://tdesign.gtimg.com/mobile/demos/avatar1.png';
const imgUrl = 'https://tdesign.gtimg.com/mobile/demos/example4.png';

export default function MultipleDemo() {
  fdom.div({
    children() {
      CellGroup({
        children() {
          Cell({
            title: '单行标题',
            description: '一段很长很长的内容文字',
            arrow: true,
          });

          Cell({
            title: '单行标题',
            description: '一段很长很长的内容文字',
            arrow: true,
            required: true,
          });

          Cell({
            title: '单行标题',
            description: '一段很长很长的内容文字',
            arrow: true,
            children: () => Badge({ count: 16 }),
          });

          Cell({
            title: '单行标题',
            description: '一段很长很长的内容文字',
            children: () => Switch({ value: true }),
          });

          Cell({
            title: '单行标题',
            description: '一段很长很长的内容文字',
            children: '辅助信息',
            arrow: true,
          });

          Cell({
            title: '单行标题',
            description: '一段很长很长的内容文字',
            arrow: true,
            leftIcon: AppIcon,
          });

          Cell({
            title: '单行标题',
            description: '一段很长很长的内容文字，长文本自动换行，该选项的描述是一段很长的内容',
          });

          Cell({
            title: '多行高度不定，长文本自动换行，该选项的描述是一段很长的内容',
            description: '一段很长很长的内容文字，长文本自动换行，该选项的描述是一段很长的内容',
          });

          Cell({
            title: '单行标题',
            description: '一段很长很长的内容文字',
            rightIcon: ChevronRightIcon,
            leftIcon: () =>
              Avatar({
                shape: 'circle',
                image: avatarUrl,
              }),
          });

          Cell({
            title: '单行标题',
            description: '一段很长很长的内容文字',
            image: imgUrl,
          });
        },
      });
    },
  });
}
