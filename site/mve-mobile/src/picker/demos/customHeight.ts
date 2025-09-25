import { fdom, renderTextContent } from 'mve-dom';
import { createSignal } from 'wy-helper';
import { Picker } from '../picker';
import { Cell } from '../../cell';
import { Popup } from '../../popup';
import { PickerValue, PickerColumn } from '../type';
import { PickerItem } from '../picker-item';
import { renderArray, renderOne } from 'mve-helper';
import { css, toGetText } from 'wy-dom-helper';

/**
 * 地区联动选择器示例
 */
export function CustomHeight() {
  const visible = createSignal(false);
  const area = createSignal<
    | {
        city: string;
        subCity: string;
      }
    | undefined
  >(undefined);

  // 模拟地区数据
  const areaData = {
    北京市: ['东城区', '西城区', '朝阳区', '丰台区', '石景山区'],
    上海市: ['黄浦区', '徐汇区', '长宁区', '静安区', '普陀区'],
    广东省: ['广州市', '深圳市', '珠海市', '汕头市', '佛山市'],
    浙江省: ['杭州市', '宁波市', '温州市', '嘉兴市', '湖州市'],
  };

  return fdom.div({
    children() {
      // 地区选择触发器
      Cell({
        arrow: true,
        title: '选择地区',
        note: toGetText(function () {
          const value = area.get();
          if (value) {
            return `${value.city} ${value.subCity}`;
          }
          return '请选择省市';
        }),
        onClick: () => visible.set(true),
      });

      // 地区选择弹窗
      Popup({
        visible: visible.get,
        placement: 'bottom',
        onClose: () => visible.set(false),
        children() {
          const citys = Object.keys(areaData);
          function subCities() {
            return areaData[citys[city.get()] as '北京市'];
          }
          const n = area.get();
          const city = createSignal(n ? citys.indexOf(n.city) : 0);
          const subCity = createSignal(n ? subCities().indexOf(n.subCity) : 0);
          Picker({
            className: cls,
            confirm: {
              onClick() {
                area.set({
                  city: citys[city.get()],
                  subCity: subCities()[subCity.get()],
                });
                visible.set(false);
              },
            },
            cancel: {
              onClick() {
                visible.set(false);
              },
            },
            title: '选择地区',
            renderColumns() {
              PickerItem({
                value: {
                  get: city.get,
                  set(n) {
                    (city.set(n), subCity.set(0));
                    return n;
                  },
                },
                renderCell(i) {
                  renderTextContent(citys[i]);
                },
                itemsCount: citys.length,
              });
              PickerItem({
                value: subCity,
                itemsCount() {
                  return subCities().length;
                },
                renderCell(i) {
                  renderTextContent(() => subCities()[i]);
                },
              });
            },
          });
        },
      });
    },
  });
}

const cls = css`
  --td-picker-item-height: 80px;
  --td-picker-group-height: 400px;
`;
