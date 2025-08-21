import { fdom, renderText, renderTextContent } from 'mve-dom';
import demoBlock from '../../../demo-block';
import { hookInterval, NavigationItem, Swiper, SwiperItem } from '../index';
import { createSimpleMovePage } from 'mve-dom-helper';
import { circleFindNearst, circleFormat, createSignal } from 'wy-helper';
import { renderForEach } from 'mve-core';
import { hookDestroy } from 'mve-helper';
export default function () {
  demoBlock({
    title: '01 组件类型',
    summary: '点状（dots）',
    children() {
      const imageCdn = 'https://tdesign.gtimg.com/mobile/demos';
      const swiperList = [
        `${imageCdn}/swiper1.png`,
        `${imageCdn}/swiper2.png`,
        `${imageCdn}/swiper1.png`,
        `${imageCdn}/swiper2.png`,
        `${imageCdn}/swiper1.png`,
      ];
      const index = createSignal(0);
      function addDiff(n: number) {
        index.set(circleFormat(index.get() + n, swiperList.length));
      }
      const { plugin, get } = createSimpleMovePage({
        getValue: index.get,
        direction: 'y',
        compare(a, b) {
          return circleFindNearst(a - b, swiperList.length);
        },
        callback: addDiff,
      });
      const inv = hookInterval(() => {
        addDiff(1);
      }, 3000);
      fdom.div({
        s_padding: '0 16px',
        children() {
          Swiper({
            plugin(e) {
              plugin(e, {
                onDragChange(v) {
                  if (v) {
                    inv.stop();
                  } else {
                    inv.restart();
                  }
                },
              });
            },
            onTouchMove(e) {
              e.preventDefault();
            },
            direction: 'vertical',
            moveDiff: get,
            navigationPlacement: 'outside',
            addDiff,
            children() {
              renderForEach<number, number>(
                function (callback) {
                  const i = index.get();
                  callback(circleFormat(i - 1, swiperList.length), -1);
                  callback(i, 0);
                  callback(circleFormat(i + 1, swiperList.length), 1);
                },
                function (key, et) {
                  SwiperItem({
                    data_i: key,
                    getIndex() {
                      return et.getValue();
                    },
                    children() {
                      fdom.img({
                        src: swiperList[key],
                        s_display: 'block',
                        s_width: '100%',
                        s_height: '192px',
                      });
                    },
                  });
                },
              );
            },
            navigationPosition: 'start-end',
            navigationType: 'dots-bar', //'fraction', //
            navigation() {
              // return renderTextContent(function () {
              //   return `${index.get() + 1}/${swiperList.length}`;
              // });
              swiperList.forEach(function (v, i) {
                NavigationItem({
                  active() {
                    return i == index.get();
                  },
                });
              });
            },
          });
        },
      });
    },
  });
}
