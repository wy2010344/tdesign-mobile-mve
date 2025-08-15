import { FPSvgAttributes, fsvg } from 'mve-dom';
import { cns } from 'mve-dom-helper';
import { IconInfo, SvgAttrInfo } from 'mve-icons';
import { createBodyStyleTag } from 'wy-dom-helper';
import { EmptyFun, emptyObject } from 'wy-helper';

export function TSvg(
  fun: IconInfo,
  attrs: SvgAttrInfo,
  children: EmptyFun,
  other: FPSvgAttributes<'svg'> & { size?: string } = emptyObject,
) {
  const o = {
    ...attrs,
    ...other,
    fill: 'currentColor',
    className: cns('t-icon', `t-icon-${fun.iconName}`, other.className),
    children,
  };
  if (other.size) {
    delete o.size;
    o.s_fontSize = other.size;
  }
  fsvg.svg(o);
}

const style = createBodyStyleTag();
style.innerHTML = `
@keyframes t-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.t-icon {
  display: inline-block;
  vertical-align: middle;
  width: 1em;
  height: 1em;
}
.t-icon::before {
  font-family: unset;
}
.t-icon-loading {
  animation: t-spin 1s linear infinite;
}
.t-icon {
  fill: currentColor;
}
.t-icon.t-size-s,
i.t-size-s {
  font-size: 14px;
}
.t-icon.t-size-m,
i.t-size-m {
  font-size: 16px;
}
.t-icon.t-size-l,
i.t-size-l {
  font-size: 18px;
}
  
  `;
