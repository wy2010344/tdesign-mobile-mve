/* eslint-disable import/order */
import { Navbar } from '../index';
import demoBlock from '../../../demo-block';
import { TdChevronLeft, TdClose, TdEllipsis } from 'mve-icons/td';
import { TSvg } from '../../../svg';
import { fdom } from 'mve-dom';
import { Divider } from '../../divider';

export default function () {
  demoBlock({
    title: '01 组件类型',
    summary: '基础导航栏',
    children() {
      Navbar({
        children: '标题文字',
        leftArrow: true,
        fixed: false,
        onLeftClick() {},
      });
      Navbar({
        children: '标题文字',
        leftArrow: true,
        fixed: false,
        left() {
          TdClose(TSvg, {
            size: '24px',
          });
        },
        right() {
          TdEllipsis(TSvg, {
            size: '24px',
          });
        },
        onLeftClick() {},
      });

      Navbar({
        children: '标题文字超出',
        fixed: false,
        capsule() {
          fdom.div({
            s_width: '100%',
            s_display: 'flex',
            s_alignItems: 'center',
            s_justifyContent: 'center',
            children() {
              TdChevronLeft(TSvg, {
                size: '20px',
              });
              Divider({
                layout: 'vertical',
              });
              TdClose(TSvg, {
                size: '24px',
              });
            },
          });
        },
        right() {
          TdEllipsis(TSvg, {
            size: '24px',
          });
        },
        onLeftClick() {},
      });
    },
  });

  demoBlock({
    summary: '带搜索导航栏',
    children() {
      Navbar({
        children: '标题文字',
        leftArrow: true,
        fixed: false,
        left() {},
        onLeftClick() {},
      });
    },
  });
}
