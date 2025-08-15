import { fdom } from 'mve-dom';
import { Empty } from '../index';
import { TdInfoCircleFilled } from 'mve-icons/td';
import { TSvg } from '../../../svg';

export default function BaseDemo() {
  fdom.div({
    children() {
      Empty({
        icon: () =>
          TdInfoCircleFilled(TSvg, {
            size: '48px',
          }),
        description: '描述文字',
      });
    },
  });
}
