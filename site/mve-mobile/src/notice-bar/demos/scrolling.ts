import demoBlock from '../../../demo-block';
import { NoticeBar } from '../notice-bar';

export default function () {
  demoBlock({
    title: '03 可滚动的公告栏',
    summary: '可滚动公告栏有水平',
    children() {
      NoticeBar({
        showPrefixIcon: false,
        marquee: true,
        children: '提示文字描述提示文字描述提示文字描述提示文字描述文',
      });
    },
  });
}
