import { fdom } from 'mve-dom';
import { Button } from '../index';
import { TdSearch, TdUser } from 'mve-icons/td';
import { TSvg } from '../../../svg';

export default function ShapeDemo() {
  fdom.div({
    className: 'demo-section',
    children() {
      fdom.div({
        className: 'demo-row',
        s_alignItems: 'center',
        children() {
          Button({
            theme: 'primary',
            size: 'large',
            shape: 'rectangle',
            children: '长方形',
          });

          Button({
            theme: 'primary',
            size: 'large',
            shape: 'square',
            icon() {
              TdSearch(TSvg, {
                className: 't-icon',
              });
            },
          });

          Button({
            theme: 'primary',
            size: 'large',
            shape: 'round',
            children: '圆角长方形',
          });

          Button({
            theme: 'primary',
            size: 'large',
            shape: 'circle',
            icon() {
              TdSearch(TSvg, {
                className: 't-icon',
              });
            },
          });
        },
      });
      Button({
        theme: 'primary',
        size: 'large',
        block: true,
        children: '填充按钮',
      });
    },
  });
}
