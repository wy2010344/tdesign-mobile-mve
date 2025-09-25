import { fdom, FPSvgAttributes } from 'mve-dom';

import { TdApp, TdInternet, TdViewModule, TdBulletpoint, TdImage, TdChat } from 'mve-icons/td';
import { TSvg } from './svg';
import { createSignal, EmptyFun } from 'wy-helper';
const LOCAL_STORAGE_KEY = 'tdesign-mobile-react-home-expand';
import { Collapse, CollapsePanel } from './src/collapse';
import { docs } from '../docs.config';
import { Cell, CellGroup } from './src/cell';
import { css } from 'wy-dom-helper';

import { routerConsume } from 'mve-dom-helper/history';
const iconDefault = {
  'Global Config'() {
    TdInternet(TSvg);
  },
  Base() {
    TdApp(TSvg);
  },
  Navigation() {
    TdViewModule(TSvg);
  },
  Form() {
    TdBulletpoint(TSvg);
  },
  'Data Display'() {
    TdImage(TSvg);
  },
  Feedback() {
    TdChat(TSvg);
  },
};

export default function () {
  const { router } = routerConsume();
  fdom.div({
    className: 'tdesign-mobile-home',
    children() {
      fdom.div({
        className: 'tdesign-mobile-logo',
        children() {
          fdom.img({
            src: 'https://tdesign.gtimg.com/site/TDesign.png',
            alt: 'logo',
          });
          fdom.p({
            childrenType: 'text',
            children: 'TDesign 适配 React 的移动端组件库',
          });
        },
      });
      const open = createSignal<number | undefined>(undefined);

      docs.forEach((doc, i) => {
        if (doc.type != 'component') {
          return;
        }
        Collapse({
          children() {
            CollapsePanel({
              header: doc.title,
              open() {
                return open.get() == i;
              },
              onHeaderClick(e) {
                open.set(open.get() == i ? undefined : i);
              },
              expandIcon() {
                iconDefault[doc.titleEn as 'Base']();
              },
              children() {
                CellGroup({
                  className: cls,
                  children() {
                    doc.children.forEach((comItem) => {
                      if (comItem.name == 'icon') {
                        console.log('c', comItem);
                        return;
                      }
                      Cell({
                        s_height: '56px',
                        arrow: true,
                        title: comItem.title,
                        onClick() {
                          router.push(comItem.name);
                        },
                      });
                    });
                  },
                });
              },
            });
          },
        });
      });
    },
  });
}

const cls = css`
  --td-cell-horizontal-padding: 0;
  --td-cell-right-icon-font-size: 16px;
`;
