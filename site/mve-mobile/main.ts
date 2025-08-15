import '@common/style/mobile/_reset.less';
import '../styles/mobile/index.less';
// import tdesign style
import 'tdesign-mobile-vue/style/index.js';
import { createRoot, fdom, svg } from 'mve-dom';
import { destroyGlobalHolder } from 'mve-core';
import { createTreeRoute, getBranchKey, renderOneKey } from 'mve-helper';
import { createHashHistory } from 'history';
import { renderPop } from 'mve-dom-helper';
import { routerProvide } from 'mve-dom-helper/history';
import { pages } from './router';
import { IconContext } from 'mve-icons';
const { renderBranch, getBranch, preLoad } = createTreeRoute({
  treeArg: {
    // number: argForceNumber
  },
  pages,
  prefix: '',
  renderError(err) {
    // @ts-ignore
    console.log('err', err);
  },
});
createRoot(document.getElementById('app')!, () => {
  IconContext.provide({
    renderItem(tag, attrs, children) {
      svg[tag as 'svg'](attrs).render(children);
    },
    renderRoot(fun, attrs, children) {
      svg
        .svg({
          ...attrs,
          fill: 'currentColor',
          stroke: 'currentColor',
          strokeWidth: '0',
        })
        .render(children);
    },
  });
  const { getHistoryState } = routerProvide(createHashHistory());
  renderOneKey(
    getBranch(() => getHistoryState().pathname),
    getBranchKey,
    function (key, branch) {
      renderBranch(branch);
    },
  );
  renderPop();
});

window.addEventListener('unload', destroyGlobalHolder);
