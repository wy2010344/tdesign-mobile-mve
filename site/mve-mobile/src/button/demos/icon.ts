import { fdom } from 'mve-dom';
import { Button } from '../index';
import { TdUser, TdAdd, TdSearch } from 'mve-icons/td';
import { TSvg } from '../../../svg';

export default function IconDemo() {
  fdom.div({
    className: 'demo-section',
    children() {
      fdom.div({
        className: 'demo-row',
        children() {
          Button({
            theme: 'primary',
            icon() {
              TdUser(TSvg, {
                className: 't-icon',
              });
            },
            children: '带图标',
          });

          Button({
            theme: 'primary',
            variant: 'outline',
            icon() {
              TdAdd(TSvg, {
                className: 't-icon',
              });
            },
            children: '添加',
          });

          Button({
            theme: 'primary',
            shape: 'circle',
            icon() {
              TdSearch(TSvg, {
                className: 't-icon',
              });
            },
          });

          Button({
            theme: 'primary',
            children: '后缀图标',
            suffix() {
              TdUser(TSvg, {
                className: 't-icon',
              });
            },
          });
        },
      });
    },
  });
}
