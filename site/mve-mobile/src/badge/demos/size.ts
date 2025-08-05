import { fdom } from 'mve-dom';
import { Avatar } from '../../avatar';
import { TdUser } from 'mve-icons/td';
import { TSvg } from '../../../svg';
import { css } from 'wy-dom-helper';

const UserIcon = () => TdUser(TSvg, { size: '24px' });

export default function SizeDemo() {
  fdom.div({
    className: s,
    children() {
      fdom.div({
        className: 'summary',
        children: 'Large',
      });
      fdom.div({
        className: 'block',
        children() {
          Avatar({
            icon: UserIcon,
            size: 'large',
            badgeProps: {
              count: 8,
              size: 'large',
              offset: [7, 7],
            },
          });
        },
      });

      fdom.div({
        className: 'summary',
        children: 'Middle',
      });
      fdom.div({
        className: 'block',
        children() {
          Avatar({
            icon: UserIcon,
            badgeProps: {
              count: 8,
              offset: [5, 5],
            },
          });
        },
      });
    },
  });
}

const s = css`
  .block {
    padding: 16px 16px 24px;
  }
`;
