import { fdom } from 'mve-dom';

import { usePrefixClass } from '../hooks/useClass';

export function DropdownMenu() {
  const dropdownMenuClass = usePrefixClass('dropdown-menu');
  fdom.div({
    className: dropdownMenuClass,
  });
}
