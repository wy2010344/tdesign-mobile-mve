import { fdom, renderTextContent } from 'mve-dom';
import { createSignal } from 'wy-helper';
import { Picker, PickerItem } from '..';
import { Cell } from '../../cell';
import { Popup } from '../../popup';
import { PickerValue } from '../type';
import { toGetText } from 'wy-dom-helper';
import { PickerItemRange, PickerItemRangeCell } from '../picker-item';

/**
 * 基础选择器示例
 */
export function BasePickerDemo() {
  // 城市选择状态
  const cityShow = createSignal(false);
  const cityValue = createSignal<number>(0);

  // 季节选择状态
  const seasonShow = createSignal(false);
  const yearValue = createSignal(new Date().getFullYear());
  const seasonValue = createSignal<number>(0);

  // 城市选项
  const cityOptions = [
    { label: '北京市', value: '北京市' },
    { label: '上海市', value: '上海市', disabled: true },
    { label: '广州市', value: '广州市' },
    { label: '深圳市', value: '深圳市' },
    { label: '杭州市', value: '杭州市' },
    { label: '成都市', value: '成都市' },
    { label: '长沙市', value: '长沙市' },
  ];

  // 年份和季节选项
  const currentYear = createSignal(new Date().getFullYear());
  const seasonOptions = [
    { label: '春', value: '春' },
    { label: '夏', value: '夏' },
    { label: '秋', value: '秋' },
    { label: '冬', value: '冬' },
  ];

  return fdom.div({
    children() {
      // 城市选择触发器
      Cell({
        arrow: true,
        title: '选择地区',
        note: toGetText(() => {
          return cityOptions[cityValue.get()].label;
        }),
        onClick: () => cityShow.set(true),
      });

      // 季节选择触发器
      Cell({
        arrow: true,
        title: '选择时间',
        note: toGetText(() => {
          return yearValue.get() + ' ' + seasonOptions[seasonValue.get()].label;
        }),
        onClick: () => seasonShow.set(true),
      });

      // 城市选择弹窗
      Popup({
        visible: cityShow.get,
        placement: 'bottom',
        onClose: () => cityShow.set(false),
        destroyOnClose: true,
        children() {
          const value = createSignal(cityValue.get());
          Picker({
            confirm: {
              onClick() {
                cityValue.set(value.get());
                cityShow.set(false);
              },
            },
            cancel: {
              onClick() {
                cityShow.set(false);
              },
            },
            renderColumns() {
              PickerItemRange({
                value,
                size: cityOptions.length,
                rangePickerProps: {
                  disabled(i) {
                    return cityOptions[i].disabled;
                  },
                },
                children(activeIndex) {
                  cityOptions.forEach((city, i) => {
                    PickerItemRangeCell({
                      children: city.label,
                      disabled: city.disabled,
                      active() {
                        return i == activeIndex();
                      },
                    });
                  });
                },
              });
              // PickerItem({
              //   value,
              //   renderCell(i) {
              //     const city = cityOptions[i];
              //     renderTextContent(city.label);
              //   },

              //   centerPickerProps: {
              //     disabled(i) {
              //       return cityOptions[i].disabled;
              //     },
              //     circle: {
              //       count: cityOptions.length,
              //       baseIndex: 0,
              //     },
              //   },
              // });
            },
          });
        },
      });

      // 季节选择弹窗
      Popup({
        visible: seasonShow.get,
        placement: 'bottom',
        onClose: () => seasonShow.set(false),
        destroyOnClose: true,
        children() {
          const year = createSignal(currentYear.get());
          const season = createSignal(seasonValue.get());
          Picker({
            confirm: {
              onClick() {
                currentYear.set(year.get());
                seasonValue.set(season.get());
                seasonShow.set(false);
              },
            },
            cancel: {
              onClick() {
                seasonShow.set(false);
              },
            },
            renderColumns() {
              PickerItem({
                value: year,
                renderCell(i) {
                  renderTextContent(i);
                },
              });
              PickerItemRange({
                value: season,
                size: 4,
                children() {
                  seasonOptions.forEach((season) => {
                    PickerItemRangeCell({
                      children: season.label,
                    });
                  });
                },
              });
            },
          });
        },
      });
    },
  });
}
