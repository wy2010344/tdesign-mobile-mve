import { fdom } from 'mve-dom';
import { Cell, CellGroup } from '../index';
import { TdApp, TdService, TdInternet } from 'mve-icons/td';
import { TSvg } from '../../../svg';

const AppIcon = () => TdApp(TSvg, { size: '24px' });
const ServiceIcon = () => TdService(TSvg, { size: '24px' });
const InternetIcon = () => TdInternet(TSvg, { size: '24px' });

export default function GroupDemo() {
  fdom.div({
    children() {
      CellGroup({
        theme: 'card',
        children() {
          Cell({
            leftIcon: AppIcon,
            title: '单行标题',
            arrow: true,
          });

          Cell({
            leftIcon: ServiceIcon,
            title: '单行标题',
            arrow: true,
          });

          Cell({
            leftIcon: InternetIcon,
            title: '单行标题',
            arrow: true,
          });
        },
      });
    },
  });
}
