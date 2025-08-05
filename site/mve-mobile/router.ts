import THeader from './header';
import siteConfig from '../docs.config';
import { fdom } from 'mve-dom';

const { docs } = siteConfig;

export const pages: Record<string, () => Promise<any>> = {};
pages['index.ts'] = () => import('./home');
doDocs(docs);
function doDocs(docs: any[]) {
  docs.forEach((doc) => {
    if (doc.children) {
      doDocs(doc.children);
    } else {
      pages[`${doc.name}/index.ts`] = () => {
        return import(`./src/${doc.name}/demos/index.ts`).then((out) => {
          return {
            default() {
              fdom.div({
                className: 'tdesign-demo-page',
                onTouchStart(e) {
                  e.stopPropagation();
                },
                children() {
                  THeader({
                    title: doc.name,
                  });
                  fdom.div({
                    className: 'tdesign-demo-main',
                    children: out.default,
                  });
                },
              });
            },
          };
        });
      };
    }
  });
}
