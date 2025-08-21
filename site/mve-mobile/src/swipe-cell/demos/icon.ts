import { TdDelete, TdEdit } from 'mve-icons/td';
import demoBlock from '../../../demo-block';
import { TSvg } from '../../../svg';
import { Cell } from '../../cell';
import { SwipeCell } from '../index';
import { measurePart, SwiperButton } from '../swipe-cell';

export default function () {
  demoBlock({
    summary: '带图标的滑动操作',
    children() {
      SwipeCell({
        left: measurePart(function () {
          SwiperButton({
            text: '编辑',
            className: 'btn edit-btn',
            icon(className) {
              TdEdit(TSvg, {
                className,
                size: '16px',
              });
            },
          });
          SwiperButton({
            text: '删除',
            className: 'btn delete-btn',
            icon(className) {
              TdDelete(TSvg, {
                className,
                size: '16px',
              });
            },
          });
        }),
        children() {
          Cell({
            title: '图标加文字横排',
            note: '辅助信息',
          });
        },
      });
    },
  });
}
