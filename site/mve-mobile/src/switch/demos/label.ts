import { fdom } from 'mve-dom';
import { Cell } from '../../cell';
import { Switch } from '../index';
import { TdCheck, TdClose } from 'mve-icons/td';
import { TSvg } from '../../../svg';

const CheckIcon = () => TdCheck(TSvg, { size: '20px' });
const CloseIcon = () => TdClose(TSvg, { size: '20px' });

export default function LabelDemo() {
  fdom.div({
    children() {
      Cell({
        title: '带文字开关',
        rightIcon: () =>
          Switch({
            value: true,
            label: ['开', '关'],
          }),
      });

      fdom.div({
        className: 'box',
        s_height: '16px',
      });

      Cell({
        title: '带图标开关',
        rightIcon: () =>
          Switch({
            value: true,
            icon: [CheckIcon, CloseIcon],
          }),
      });
    },
  });
}
