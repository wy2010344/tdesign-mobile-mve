import demoBlock from '../../../demo-block';
import { NoticeBar } from '../notice-bar';

export default function () {
  demoBlock({
    title: '02 组件状态',
    summary: `公告栏类型有普通（info）、警示（warning）、成功（success）、错误（error）`,
    children() {
      NoticeBar({
        children: '默认状态公告栏默认状态公告栏',
      });
      NoticeBar({
        theme: 'success',
        children: '默认状态公告栏默认状态公告栏',
      });
      NoticeBar({
        theme: 'warning',
        children: '默认状态公告栏默认状态公告栏',
      });
      NoticeBar({
        theme: 'error',
        children: '默认状态公告栏默认状态公告栏',
      });
    },
  });
}
