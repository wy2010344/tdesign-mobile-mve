import { fdom } from 'mve-dom';
import { usePrefixClass } from '../hooks/useClass';
import { Popup } from '../popup';
import { TNode } from 'mve-dom-helper';
import { Button } from '../button';
import { renderTNode } from '../_util/parseTNode';
export function DropdownItem({ footer, multi, children }: { footer?: TNode; multi?: boolean; children?: TNode }) {
  const classPrefix = usePrefixClass();
  const dropdownItemClass = usePrefixClass('dropdown-item');

  fdom.div({
    children() {
      Popup({
        children() {
          fdom.div({
            children() {
              fdom.div({
                className: `${dropdownItemClass}__body`,
                children() {
                  if (!renderTNode(children)) {
                    if (multi) {
                    } else {
                    }
                  }
                },
              });

              if (!renderTNode(footer)) {
                if (multi) {
                  fdom.div({
                    className: `${dropdownItemClass}__footer`,
                    children() {
                      Button({
                        theme: 'light',
                        className: `${dropdownItemClass}__footer-btn ${dropdownItemClass}__reset-btn`,
                      });
                      Button({
                        theme: 'primary',
                        className: `${dropdownItemClass}__footer-btn ${dropdownItemClass}__confirm-btn`,
                      });
                    },
                  });
                }
              }
            },
          });
        },
      });
    },
  });
}
