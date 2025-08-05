import { TdChevronLeft } from 'mve-icons/td';
import { fdom, fsvg, renderTextContent } from 'mve-dom';
import { routerConsume, routerProvide } from 'mve-dom-helper/history';
import { renderIf } from 'mve-helper';
import { TSvg } from './svg';

const THeader = ({ title }: { title: string }) => {
  const { router, getHistoryState } = routerConsume();
  if (title) {
    fdom.div({
      className: 'tdesign-demo-topnav',
      children() {
        fdom.div({
          className: 'tdesign-demo-topnav-title',
          children() {
            renderTextContent(title);
          },
        });
        renderIf(
          () => getHistoryState().search.get('showNavBack'),
          function () {
            TdChevronLeft(TSvg, {
              className: 'tdesign-demo-topnav__back',
              onClick() {
                router.back();
              },
            });
          },
        );
      },
    });
  }
};

export default THeader;
