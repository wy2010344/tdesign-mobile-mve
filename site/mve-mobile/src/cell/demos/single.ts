import { fdom } from 'mve-dom';
import { Cell, CellGroup } from '../index';
import { Badge } from '../../badge';
import { Switch } from '../../switch';
import { TdApp } from 'mve-icons/td';
import { TSvg } from '../../../svg';

const AppIcon = () => TdApp(TSvg, { size: '24px' });

export default function SingleDemo() {
  fdom.div({
    children() {
      CellGroup({
        bordered: true,
        children() {
          Cell({
            title: '单行标题',
            arrow: true,
            allowHover: true,
          });

          Cell({
            title: '单行标题',
            arrow: true,
            allowHover: true,
            required: true,
          });

          Cell({
            title: '单行标题',
            arrow: true,
            allowHover: true,
            children: () => Badge({ count: 16 }),
          });

          Cell({
            title: '单行标题',
            allowHover: true,
            children: () => Switch({ value: true }),
          });

          Cell({
            title: '单行标题',
            children: '辅助信息',
            arrow: true,
            allowHover: true,
          });

          Cell({
            title: '单行标题',
            leftIcon: AppIcon,
            arrow: true,
            allowHover: true,
          });
        },
      });
    },
  });
}
