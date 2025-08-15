import './style';
export * from './type';
import { Dialog as TDialog } from './dialog';
import { DialogProps } from './type';
import { createPop } from 'mve-dom-helper';
import { createSignal, EmptyFun } from 'wy-helper';

export function Dialog(args: DialogProps) {
  const visible = createSignal(true);
  const closeIt = function () {
    visible.set(false);
  };
  const distroy = createPop(function (close) {
    return TDialog({
      onClose: closeIt,
      ...args,
      visible: visible.get,
      onClosed() {
        args.onClosed?.();
        distroy();
      },
    });
  }) as EmptyFun;

  return closeIt;
}
