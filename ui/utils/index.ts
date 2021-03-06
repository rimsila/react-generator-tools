/*
 * @File Description:

 * @Date: 2020-05-11 17:20:18

 * @LastEditTime: 2020-05-14 11:17:27
 */
import { Store } from 'antd/lib/form/interface';
import { FormItemProps } from '../../interfaces/common';
import { ScreenConfig, ScreenConfigPayload, LayoutType } from '../../interfaces/screen';

/**
 * Split an array into N two-dimensional arrays according to the specified column
 * @param formItems
 * @param cols
 */
export function transformFormItemLines(formItems: FormItemProps[], cols = 3) {
  let lineNum =
    formItems.length % cols === 0
      ? formItems.length / cols
      : Math.floor(formItems.length / cols + 1);
  let res = [];
  for (let i = 0; i < lineNum; i++) {
    let temp = formItems.slice(i * cols, i * cols + cols);
    res.push(temp);
  }
  return res;
}

/**
 * Filter out empty data
 * @param values
 */
export function filterEmpty(values: Store) {
  const filteredValues = {};

  Object.entries(values).forEach(([key, value]) => {
    if (value !== '' && value !== undefined && value !== null) {
      filteredValues[key] = value;
    }
  });
  return filteredValues;
}

/**
 * Convert the large screen configuration parameters into the data structure required by the backend
 * @param screenConfig
 */
type ScreenConfigPayloadPart = Omit<ScreenConfigPayload, 'title' | 'titleStyle' | 'gutter'>;
export function transformConfig(screenConfig: ScreenConfig): ScreenConfigPayloadPart {
  const payload: ScreenConfigPayloadPart = {
    layout: [],
  };

  function generateConfig(type: LayoutType, config: ScreenConfig) {
    const layout = config[type];
    const { rows, ...restProps } = layout;
    return {
      ...restProps,
      name: type.charAt(0).toUpperCase() + type.substr(1, type.length),
      rows: rows.map((row, rowIndex) => ({
        name: `Row${rowIndex}`,
        height: row.height,
        cols: row.cols.map((col, colIndex) => ({
          name: `Row${rowIndex}Col${colIndex}`,
          ...col,
        })),
      })),
    };
  }

  const leftConfig = generateConfig('left', screenConfig);
  const centerConfig = generateConfig('center', screenConfig);
  const rightConfig = generateConfig('right', screenConfig);

  payload.layout.push(leftConfig);
  payload.layout.push(centerConfig);
  payload.layout.push(rightConfig);

  return payload;
}
