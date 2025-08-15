import { fdom } from 'mve-dom';
import { Empty } from '../index';
import { Button } from '../../button';
import { TdInfoCircleFilled } from 'mve-icons/td';
import { TSvg } from '../../../svg';

export default function ButtonEmptyDemo() {
  fdom.div({
    children() {
      Empty({
        icon: () =>
          TdInfoCircleFilled(TSvg, {
            size: '48px',
          }),
        description: '描述文字',
        action() {
          Button({
            theme: 'primary',
            size: 'large',
            children: '操作按钮',
          });
        },
      });
    },
  });
}
