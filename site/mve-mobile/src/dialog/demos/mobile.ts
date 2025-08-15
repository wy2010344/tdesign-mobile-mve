import { fdom } from 'mve-dom';
import ConfirmDemo from './confirm';
import FeedbackDemo from './feedback';

export default function MobileDemo() {
  fdom.div({
    children() {
      fdom.div({
        s_marginBottom: '32px',
        children: ConfirmDemo,
      });

      fdom.div({
        s_marginBottom: '32px',
        children: FeedbackDemo,
      });
    },
  });
}
