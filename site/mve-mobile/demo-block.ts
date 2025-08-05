import { fdom } from 'mve-dom';
import { cns } from 'wy-dom-helper';
import { EmptyFun } from 'wy-helper';

export default function ({
  title,
  summary,
  padding,
  children,
}: {
  title?: string;
  summary?: string;
  padding?: boolean;
  children: EmptyFun;
}) {
  fdom.div({
    className: cns('tdesign-mobile-demo-block', !title && 'tdesign-mobile-demo-block_notitle'),
    children() {
      if (title || summary) {
        fdom.div({
          className: 'tdesign-mobile-demo-block__header',
          children() {
            if (title) {
              fdom.h2({
                className: 'tdesign-mobile-demo-block__title',
                children: title,
              });
            }
            if (summary) {
              fdom.p({
                className: cns('tdesign-mobile-demo-block__summary', !title && 'tdesign-mobile-demo-block_subtitle'),
                children: summary,
              });
            }
          },
        });
      }
      fdom.div({
        className: cns('tdesign-mobile-demo-block__slot', padding && 'with-padding'),
        children,
      });
    },
  });
}
