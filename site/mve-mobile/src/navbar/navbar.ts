import { fdom } from 'mve-dom';

import { usePrefixClass } from '../hooks/useClass';
import { cns } from 'wy-dom-helper';
import { ValueOrGet, valueOrGetToGet } from 'wy-helper';
import { renderIfP } from 'mve-helper';
import { renderTNode, TNode } from 'mve-dom-helper';
import { TdChevronLeft } from 'mve-icons/td';
import { TSvg } from '../../svg';
export function Navbar({
  animation: _animation = true,
  visible: _visible = true,
  fixed: _fixed = true,
  safeAreaInsetTop: _safeAreaInsetTop,
  onLeftClick,
  onRightClick,
  leftArrow,
  capsule,
  left,
  right,
  children,
}: {
  animation?: ValueOrGet<boolean>;
  visible?: ValueOrGet<boolean>;
  fixed?: ValueOrGet<boolean>;
  safeAreaInsetTop?: ValueOrGet<boolean>;
  onLeftClick?(): void;
  onRightClick?(): void;
  leftArrow?: ValueOrGet<boolean>;
  left?: TNode;
  capsule?: TNode;
  right?: TNode;
  children?: TNode;
}) {
  const classPrefix = usePrefixClass();
  const navbarClass = usePrefixClass('navbar');
  const fixed = valueOrGetToGet(_fixed);
  const safeAreaInsetTop = valueOrGetToGet(_safeAreaInsetTop);
  const visible = valueOrGetToGet(_visible);
  const animation = valueOrGetToGet(_animation);
  fdom.div({
    className() {
      const an = animation() ? '-animation' : '';
      return cns(
        navbarClass,
        fixed() && `${navbarClass}--fixed`,
        safeAreaInsetTop() && `${classPrefix}-safe-area-top `,
        visible() ? `${navbarClass}--visible${an}` : `${navbarClass}--hide${an}`,
      );
    },
    s_position() {
      return fixed() ? 'fixed' : 'relative';
    },
    children() {
      renderIfP(_fixed, function () {
        fdom.div({
          className: `${navbarClass}____placeholder`,
        });
      });
      fdom.div({
        className: `${navbarClass}__content`,
        children() {
          fdom.div({
            className: `${navbarClass}__left`,
            onClick: onLeftClick,
            children() {
              renderIfP(leftArrow, function () {
                TdChevronLeft(TSvg, {
                  className: `${navbarClass}__left-arrow`,
                });
              });
              renderTNode(left);
              if (typeof capsule != 'undefined') {
                fdom.div({
                  className: `${navbarClass}__capsule`,
                  children: capsule,
                });
              }
            },
          });

          fdom.div({
            className: `${navbarClass}__center`,
            children() {
              renderTNode(children, (children) => {
                fdom.span({
                  className: `${navbarClass}__center-title`,
                  children,
                });
              });
            },
          });
          if (typeof right != 'undefined') {
            fdom.div({
              className: `${navbarClass}__right`,
              onClick: onRightClick,
              children: right,
            });
          }
        },
      });
    },
  });
}
