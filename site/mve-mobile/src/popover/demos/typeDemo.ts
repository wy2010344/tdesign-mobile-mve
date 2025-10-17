import { fdom } from 'mve-dom';
import { Popover } from '..';
import { Button } from '../../button';

export default function () {
  fdom.div({
    className: 'popover-example',
    children() {
      fdom.div({
        className: 'popover-example__summary mb-16',
        children: '带箭头的弹出气泡',
      });
      fdom.div({
        className: 'popover-example__content mb-24',
        children() {
          Popover({
            content: '弹出气泡内容',

            children() {
              Button({
                theme: 'primary',
                variant: 'outline',
                size: 'large',
                children: '带箭头',
              });
            },
          });
        },
      });
    },
  });
}
