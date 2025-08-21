import { fdom } from 'mve-dom';
import { createSignal } from 'wy-helper';
import { NoticeBar } from '../index';
import { TdArrowRight, TdChevronRight, TdClose, TdSound } from 'mve-icons/td';
import { TSvg } from '../../../svg';
import { Toast } from '../../toast';
import demoBlock from '../../../demo-block';
import { Link } from '../../link';
import { css } from 'wy-dom-helper';
import theme from './theme';

export default function () {
  demoBlock({
    title: '01 组件类型',
    summary: '纯文字的公告栏',
    children() {
      NoticeBar({
        showPrefixIcon: false,
        children: '这是一条普通的通知信息',
      });
    },
  });

  demoBlock({
    summary: '带图标的公告栏',
    children() {
      NoticeBar({
        children: '提示文字描述提示文字描述提示文字描述',
      });
    },
  });

  demoBlock({
    summary: '带关闭的公告栏',
    children() {
      NoticeBar({
        children: '这是一条普通的通知信息',
        suffixIcon() {
          TdClose(TSvg);
        },
      });
    },
  });

  demoBlock({
    summary: '带入口的公告栏',
    children() {
      NoticeBar({
        children: '这是一条普通的通知信息',
        suffixIcon() {
          TdArrowRight(TSvg);
        },
        operation() {
          Link({
            s_marginLeft: '5px',
            theme: 'primary',
            children: '详情',
          });
        },
        onAreaClick(event) {
          Toast(`click:${event}`);
        },
      });
    },
  });
  demoBlock({
    summary: '自定样式的公告栏',
    children() {
      NoticeBar({
        className: cusCs,
        prefixIcon() {
          TdSound(TSvg);
        },
        children: '提示文字描述提示文字描述提示文字描述',
        suffixIcon() {
          TdChevronRight(TSvg);
        },
      });
    },
  });

  demoBlock({
    summary: '自定义内容的公告栏',
    children() {
      NoticeBar({
        operation() {
          Link({
            s_marginLeft: '5px',
            theme: 'primary',
            children: '详情',
          });
        },
        children: '提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述',
        suffixIcon() {
          TdClose(TSvg);
        },
      });
    },
  });
}

const cusCs = css`
  .t-icon {
    color: var(--td-text-color-primary, rgba(0, 0, 0, 0.9)) !important;
  }
  .t-notice-bar__text {
    color: var(--bg-color-demo, #fff) !important;
  }
  background-color: var(--bg-color-demo, #fff);
`;
