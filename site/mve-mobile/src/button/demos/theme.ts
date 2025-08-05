import { fdom } from 'mve-dom';
import { Button } from '../index';

export default function ThemeDemo() {
  fdom.div({
    className: 'demo-section demo-section-theme',
    children() {
      // Default 主题
      fdom.div({
        className: 'demo-row',
        children() {
          Button({
            size: 'large',
            children: '填充按钮',
          });

          Button({
            size: 'large',
            variant: 'outline',
            children: '描边按钮',
          });

          Button({
            size: 'large',
            variant: 'dashed',
            children: '虚框按钮',
          });

          Button({
            size: 'large',
            variant: 'text',
            children: '文字按钮',
          });
        },
      });

      // Primary 主题
      fdom.div({
        className: 'demo-row',
        children() {
          Button({
            size: 'large',
            theme: 'primary',
            children: '填充按钮',
          });

          Button({
            size: 'large',
            theme: 'primary',
            variant: 'outline',
            children: '描边按钮',
          });

          Button({
            size: 'large',
            theme: 'primary',
            variant: 'dashed',
            children: '虚框按钮',
          });

          Button({
            size: 'large',
            theme: 'primary',
            variant: 'text',
            children: '文字按钮',
          });
        },
      });

      // Danger 主题
      fdom.div({
        className: 'demo-row',
        children() {
          Button({
            size: 'large',
            theme: 'danger',
            children: '填充按钮',
          });

          Button({
            size: 'large',
            theme: 'danger',
            variant: 'outline',
            children: '描边按钮',
          });

          Button({
            size: 'large',
            theme: 'danger',
            variant: 'dashed',
            children: '虚框按钮',
          });

          Button({
            size: 'large',
            theme: 'danger',
            variant: 'text',
            children: '文字按钮',
          });
        },
      });

      // Light 主题
      fdom.div({
        className: 'demo-row',
        children() {
          Button({
            size: 'large',
            theme: 'light',
            children: '填充按钮',
          });

          Button({
            size: 'large',
            theme: 'light',
            variant: 'outline',
            children: '描边按钮',
          });

          Button({
            size: 'large',
            theme: 'light',
            variant: 'dashed',
            children: '虚框按钮',
          });

          Button({
            size: 'large',
            theme: 'light',
            variant: 'text',
            children: '文字按钮',
          });
        },
      });
    },
  });
}
