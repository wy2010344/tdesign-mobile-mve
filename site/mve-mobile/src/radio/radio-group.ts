import { createContext } from 'mve-core';
import { fdom, FPDomAttributes } from 'mve-dom';
import { createSignal, StoreRef, ValueOrGet, valueOrGetToGet } from 'wy-helper';
import { usePrefixClass } from '../hooks/useClass';
import { cns } from 'mve-dom-helper';
import { RadioPlacement } from './radio';

export function RadioGroup({
  model = createSignal(undefined),
  name,
  children,
  disabled = false,
  readonly = false,
  borderless = false,
  allowUncheck = false,
  placement = 'left',
  ...args
}: {
  model?: StoreRef<string | undefined>;
  borderless?: boolean;
  name: string;
  disabled?: ValueOrGet<boolean>;
  readonly?: ValueOrGet<boolean>;
  children(): void;
  allowUncheck?: boolean;
  placement?: RadioPlacement;
} & FPDomAttributes<'div'>) {
  const radioGroupClass = usePrefixClass('radio-group');

  RadioGroupContext.provide({
    model,
    name,
    disabled,
    readonly: valueOrGetToGet(readonly),
    placement,
    borderless,
    allowUncheck,
  });

  fdom.div({
    role: 'radiogroup',
    children,
    className: cns(radioGroupClass, args.className),
    ...args,
  });
}

export const RadioGroupContext = createContext<
  | {
      model: StoreRef<string | undefined>;
      disabled?: ValueOrGet<boolean>;
      readonly(): boolean;
      placement?: RadioPlacement;
      borderless: boolean;
      allowUncheck: boolean;
      name: string;
    }
  | undefined
>(undefined);
