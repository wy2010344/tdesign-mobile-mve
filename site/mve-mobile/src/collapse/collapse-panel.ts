import { fdom } from 'mve-dom';
import { valueOrGetToGet, run, createSignal, GetValue } from 'wy-helper';
import { CollapsePanelProps } from './type';
import { usePrefixClass } from '../hooks/useClass';
import { Cell } from '../cell';
import { renderTNode } from '../_util/parseTNode';
import { TdChevronDown, TdChevronUp } from 'mve-icons/td';
import { TSvg } from '../../svg';
import { cns } from 'wy-dom-helper';
import { renderIf, renderOne } from 'mve-helper';
import { collapseContext } from './context';

const ChevronDownIcon = () => TdChevronDown(TSvg, { size: '24px' });
const ChevronUpIcon = () => TdChevronUp(TSvg, { size: '24px' });

/**
 * CollapsePanel 折叠面板项组件
 */
export function CollapsePanel({
  destroyOnCollapse = false,
  disabled: _disabled,
  expandIcon,
  header,
  headerLeftIcon,
  headerRightContent,
  placement: _placement = 'bottom',
  children,
  open: _open,
  onHeaderClick,
  ...args
}: CollapsePanelProps) {
  const collapsePanelClass = usePrefixClass('collapse-panel');

  let open: GetValue<any>;
  if (typeof _open == 'undefined' && !onHeaderClick) {
    const m = createSignal(false);
    open = m.get;
    onHeaderClick = () => m.set(!m.get());
  } else {
    open = valueOrGetToGet(_open);
  }
  // 状态计算
  const disabled = valueOrGetToGet(_disabled);
  const placement = valueOrGetToGet(_placement);
  const className = valueOrGetToGet(args.className);
  const ctx = collapseContext.consume();
  const isDisabled = () => disabled() || ctx?.disabled();
  return fdom.div({
    ...args,
    className() {
      const classes = [collapsePanelClass, `${collapsePanelClass}--${placement()}`];

      if (open()) {
        classes.push(`${collapsePanelClass}--active`);
      }

      if (isDisabled()) {
        classes.push(`${collapsePanelClass}--disabled`);
      }

      const customClass = className();
      if (customClass) classes.push(customClass);

      return classes.join(' ');
    },
    children() {
      // 面板头部
      fdom.div({
        className: `${collapsePanelClass}__title`,
        onClick(e) {
          e.stopPropagation();
          if (isDisabled()) {
            return;
          }
          onHeaderClick?.(e);
        },
        children() {
          Cell({
            className() {
              return cns(
                `${collapsePanelClass}__header`,
                `${collapsePanelClass}__header--${placement()}`,
                open() ? `${collapsePanelClass}__header--expanded` : '',
              );
            },
            leftIcon: headerLeftIcon,
            title: header,
            children: headerRightContent,
            rightIcon() {
              if (expandIcon === false) {
                return;
              }
              fdom.div({
                className: `${collapsePanelClass}__header-icon`,
                children() {
                  if (typeof expandIcon == 'undefined' || expandIcon === true) {
                    renderOne(() => {
                      if (placement() === 'bottom') {
                        return open() ? ChevronUpIcon : ChevronDownIcon;
                      }
                      return open() ? ChevronDownIcon : ChevronUpIcon;
                    }, run);
                  } else {
                    renderTNode(expandIcon);
                  }
                },
              });
            },
          });
        },
      });

      // 面板主体
      fdom.div({
        className: `${collapsePanelClass}__body`,
        s_gridTemplateRows() {
          return open() ? '1fr' : '0fr';
        },
        children() {
          fdom.div({
            className: `${collapsePanelClass}__inner`,
            children() {
              renderIf(
                () => !(destroyOnCollapse && !open()),
                function () {
                  fdom.div({
                    className: `${collapsePanelClass}__content`,
                    children,
                  });
                },
              );
            },
          });
        },
      });
    },
  });
}
