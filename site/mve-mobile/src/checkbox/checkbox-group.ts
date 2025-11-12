import { createSignal, StoreRef, ValueOrGet, valueOrGetToGet } from 'wy-helper';
import { createContext } from 'mve-core';
import { cns } from 'mve-dom-helper';
import { fdom, FPDomAttributes } from 'mve-dom';
import { usePrefixClass } from '../hooks/useClass';
import { CheckboxPlacement } from './checkbox';

export type CheckboxGroupValue = Array<string | number | boolean>;

export function CheckboxGroup({
  checkedSet = createSignal(new Set()),
  name,
  children,
  disabled = false,
  readonly = false,
  borderless = false,
  placement = 'left',
  max,
  ...args
}: {
  checkedSet?: StoreRef<Set<string | number | boolean>>;
  borderless?: boolean;
  name: string;
  disabled?: ValueOrGet<boolean>;
  readonly?: ValueOrGet<boolean>;
  children(): void;
  placement?: CheckboxPlacement;
  max?: number;
} & FPDomAttributes<'div'>) {
  const checkboxGroupClass = usePrefixClass('checkbox-group');

  CheckboxGroupContext.provide({
    checkedSet,
    name,
    disabled,
    readonly: valueOrGetToGet(readonly),
    placement,
    borderless,
    max,
  });

  fdom.div({
    role: 'group',
    children,
    className: cns(checkboxGroupClass, args.className),
    ...args,
  });
}

export const CheckboxGroupContext = createContext<
  | {
      checkedSet: StoreRef<Set<string | number | boolean>>;
      disabled?: ValueOrGet<boolean>;
      readonly(): boolean;
      placement?: CheckboxPlacement;
      borderless: boolean;
      name: string;
      max?: number;
    }
  | undefined
>(undefined);
