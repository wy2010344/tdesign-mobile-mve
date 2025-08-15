import { fdom } from 'mve-dom';
import { Skeleton } from '../index';

export default function GridDemo() {
  const grid = [
    [
      { width: '48px', height: '48px', borderRadius: '6px' },
      { width: '48px', height: '48px', borderRadius: '6px' },
      { width: '48px', height: '48px', borderRadius: '6px' },
      { width: '48px', height: '48px', borderRadius: '6px' },
      { width: '48px', height: '48px', borderRadius: '6px' },
    ],
    [
      { width: '48px', height: '16px', borderRadius: '3px' },
      { width: '48px', height: '16px', borderRadius: '3px' },
      { width: '48px', height: '16px', borderRadius: '3px' },
      { width: '48px', height: '16px', borderRadius: '3px' },
      { width: '48px', height: '16px', borderRadius: '3px' },
    ],
  ];

  fdom.div({
    children() {
      Skeleton({
        rowCol: grid,
        loading: true,
      });
    },
  });
}
