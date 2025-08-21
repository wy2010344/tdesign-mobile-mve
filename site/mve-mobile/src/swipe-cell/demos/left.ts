import { fdom } from 'mve-dom';
import demoBlock from '../../../demo-block';
import { SwipeCell } from '../index';
import { Toast } from '../../toast';
import { css } from 'wy-dom-helper';
import { Cell } from '../../cell';
import { hookCurrentParent } from 'mve-core';
import { createSignal } from 'wy-helper';
import { hookDestroy } from 'mve-helper';
import { measurePart } from '../swipe-cell';
export default function () {
  fdom.div({
    className: cls,
    children() {
      demoBlock({
        title: '组件类型',
        summary: '左滑动操作',
        children() {
          SwipeCell({
            left: measurePart(function () {
              fdom.div({
                className: 'btn delete-btn',
                onClick() {
                  Toast('click');
                },
              });
            }),
            right: measurePart(function () {
              fdom.div({
                className: 'btn delete-btn',
                onClick() {
                  Toast('click');
                },
              });
            }),
            children() {
              Cell({
                title: '左滑单操作',
                note: '辅助信息',
              });
            },
          });
        },
      });
    },
  });
}

const cls = css`
  .btn-wrapper {
    height: 100%;
  }

  .btn {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 0 16px;
    color: white;
    font-size: 14px;
  }

  .delete-btn {
    background-color: #e34d59;
  }

  .edit-btn {
    background-color: #ed7b2f;
  }

  .favor-btn {
    background-color: #0052d9;
  }
`;
