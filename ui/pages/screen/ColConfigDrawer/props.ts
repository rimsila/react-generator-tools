const baseProps = [
  {
    label: 'x-axis field',
    name: 'xField',
    type: 'input',
    required: true,
  },
  {
    label: 'y-axis field',
    name: 'yField',
    type: 'input',
    required: true,
  },
];

/**Ordinary histogram */
export const barProps = [...baseProps];

/**Grouped histogram */
export const groupBarProps = [
  ...baseProps,
  {
    label: 'Group field',
    name: 'groupField',
    type: 'input',
  },
];

/**Interval histogram */
export const rangeBarProps = [...baseProps];

/**Bar mixed chart */
export const barLineProps = [
  {
    label: 'Whether single axis',
    name: 'isSingleAxis',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
];

/**Grouped bar mixed chart */
export const groupBarLineProps = [
  {
    label: 'Group field',
    name: 'columnGroupField',
    type: 'input',
  },
];

/**Normal bar chart */
export const columnProps = [...baseProps];

/**Grouped bar chart */
export const groupColumnProps = [
  ...baseProps,
  {
    label: 'Group field',
    name: 'groupField',
    type: 'input',
  },
];

/**Interval bar chart */
export const rangeColumnProps = [
  {
    label: 'Chart margin',
    name: 'padding',
    type: 'input',
  },
];

/**Ordinary ring chart */
export const circleProps = [
  {
    label: 'Whether to singleton diagram',
    name: 'isSingle',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
  {
    label: 'Indicator plate title',
    name: 'titleName',
    type: 'input',
  },
  {
    label: 'Interval',
    name: 'bordered',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
  {
    label: 'Whether to highlight',
    name: 'hoverHighlight',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
];

/**Rose map */
export const roseProps = [
  {
    label: 'Radius field',
    name: 'radiusField',
    type: 'input',
  },
  {
    label: 'Color field',
    name: 'colorField',
    type: 'input',
  },
  {
    label: 'Is it a semicircle?',
    name: 'layout',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
  {
    label: 'Whether it is hollow',
    name: 'emptyInside',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
  {
    label: 'Whether to display the axis',
    name: 'hasAxis',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
  {
    label: 'Chart margin',
    name: 'padding',
    type: 'input',
  },
];

/**Ordinary line chart */
export const lineProps = [
  ...baseProps,
  {
    label: 'Group field name',
    name: 'seriesField',
    type: 'input',
  },
  {
    label: 'color',
    name: 'Color',
    type: 'textarea',
    tooltip: 'You can fill in only one value, or an array, or a function',
  },
  {
    label: 'Polyline style',
    name: 'lineStyle',
    type: 'textarea',
    tooltip: `{
      stroke: the color of the polyline,
      lineWidth: line width,
      lineDash: dotted line
      opacity: transparency
    }`,
  },
  {
    label: 'Point on the polyline',
    name: 'point',
    type: 'textarea',
    tooltip: `{
      visible: whether to display,
      shape: shape,
      size: size,
      style: style,
    }`,
  },
];

/**Water wave chart */
export const waveProps = [
  {
    label: 'Exact digits',
    name: 'fixedNumber',
    type: 'number',
  },
  {
    label: 'Suffix',
    name: 'suffix',
    type: 'input',
  },
  {
    label: 'Maximum value',
    name: 'max',
    type: 'number',
  },
  {
    label: 'Minimum value',
    name: 'min',
    type: 'number',
  },
  {
    label: 'Color',
    name: 'color',
    type: 'string',
    tooltip: 'You can fill in only one value, or an array, or a function',
  },
  {
    label: 'Style',
    name: 'liqiudStyle',
    type: 'textarea',
    tooltip: `{
      fill: fill color,
      stroke: stroke color,
      lineWidth: border width,
      lineDash: dotted line stroke,
      strokeOpacity: stroke transparency,
    }`,
  },
];

/**Radar chart */
export const radarProps = [
  {
    label: 'Category field',
    name: 'angleField',
    type: 'input',
    tooltip: 'The field corresponding to the circle angle, generally a classification field',
  },
  {
    label: 'Radius field',
    name: 'radiusField',
    type: 'input',
    tooltip:
      'Radar map is mapped to the field corresponding to the radius, generally a continuous field',
  },
  {
    label: 'Group field',
    name: 'seriesField',
    type: 'input',
    tooltip:
      'The field for grouping the radar chart, generally corresponds to a legend field. Based on the value of this field, the radar chart will be divided into multiple groups, distinguished by color, and overlap top and bottom. ',
  },
  {
    label: 'smooth',
    name: 'Curve drawing',
    type: 'radio',
    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  },
  {
    label: 'Group color',
    name: 'color',
    type: 'input',
    tooltip: 'You can fill in only one value, or an array, or a function',
  },
  {
    label: 'fill color',
    name: 'area',
    type: 'input',
    tooltip: 'Array or function',
  },
  {
    label: 'Points on the radar chart',
    name: 'point',
    type: 'textarea',
    tooltip: 'Refer to the official website for specific configuration',
  },
  {
    label: 'Polyline of Radar Chart',
    name: 'line',
    type: 'textarea',
    tooltip: 'Refer to the official website for specific configuration',
  },
];

/**Radial stacked column chart */
export const circleStackBarProps = [
  {
    label: 'Data field',
    name: 'angleField',
    type: 'input',
  },
  {
    label: 'Category field',
    name: 'colorField',
    type: 'input',
  },
];

/**Single quadrant scatter plot */
export const scatterProps = [
  ...baseProps,
  {
    label: 'Formatting function of the y-axis field',
    name: 'yNameFormatter',
    type: 'textarea',
  },
  {
    label: 'Color data field name',
    name: 'colorField',
    type: 'input',
  },
  {
    label: 'bubbleSize field name',
    name: 'sizeField',
    type: 'input',
  },
  {
    label: 'Color',
    name: 'color',
    type: 'textarea',
    tooltip: `If colorField is not configured, just specify a single value. When the colorFiled is configured, a series of color values ​​can be specified, or it can be set according to the corresponding values ​​through the callback function. `,
  },
  {
    label: 'bubble size',
    name: 'pointSize',
    type: 'input',
    tooltip: `Array, [min,max]`,
  },
  {
    label: 'Bubble style',
    name: 'pointStyle',
    type: 'textarea',
    tooltip: `{
      fill: fill color,
      stroke: stroke color,
      lineWidth: stroke width,
      lineDash: dotted line stroke,
      opacity: overall transparency,
      fillOpacity: fill transparency,
      strokeOpacity: stroke transparency,
    }`,
  },
];

/**Stacked area chart */
export const stackAreaProps = [
  ...baseProps,
  {
    label: 'Stacked field name',
    name: 'stackField',
    type: 'input',
  },
  {
    label: 'Color',
    name: 'color',
    type: 'textarea',
    tooltip: 'You can fill in only one value, or an array, or a function',
  },
  {
    label: 'Stacking style',
    name: 'areaStyle',
    type: 'textarea',
    tooltip: `{
      fill: fill color,
      stroke: stroke color,
      lineWidth: stroke width,
      lineDash: dotted line stroke,
      opacity: overall transparency,
      fillOpacity: fill transparency,
      strokeOpacity: stroke transparency,
    }`,
  },
];

/**Stacked bar chart */
export const stackBarProps = [
  ...baseProps,
  {
    label: 'Group field name',
    name: 'stackField',
    type: 'input',
  },
  {
    label: 'Color',
    name: 'color',
    type: 'textarea',
    tooltip: 'You can fill in only one value, or an array, or a function',
  },
  {
    label: 'Column width',
    name: 'columnSize',
    type: 'number',
  },
  {
    label: 'Column style',
    name: 'columnStyle',
    type: 'textarea',
    tooltip: `{
      fill: fill color,
      stroke: stroke color,
      lineWidth: stroke width,
      lineDash: dotted line stroke,
      opacity: overall transparency,
      fillOpacity: fill transparency,
      strokeOpacity: stroke transparency,
    }`,
  },
];

/**Stacked rose chart */
export const stackRoseProps = [
  {
    label: 'Fan radius field',
    name: 'radiusField',
    type: 'input',
  },
  {
    label: 'Sector category field',
    name: 'categoryField',
    type: 'input',
  },
  {
    label: 'Color field',
    name: 'colorField',
    type: 'input',
  },
  {
    label: 'Rose diagram radius',
    name: 'radius',
    type: 'input',
    tooltip: 'Configuration value range [0,1], 0 means no display, 1 means full',
  },
  {
    label: 'Color',
    name: 'color',
    type: 'textarea',
    tooltip: 'You can fill in only one value, or an array, or a function',
  },
  {
    label: 'Sector style',
    name: 'sectorStyle',
    type: 'textarea',
    tooltip: `{
      fill: fill color,
      stroke: stroke color,
      lineWidth: stroke width,
      lineDash: dotted line stroke,
      opacity: overall transparency,
      fillOpacity: fill transparency,
      strokeOpacity: stroke transparency,
    }`,
  },
];

/**Waterfall chart */
export const waterfallProps = [
  ...baseProps,
  {
    label: 'Color field',
    name: 'colorField',
    type: 'input',
  },
  {
    label: 'Color',
    name: 'color',
    type: 'textarea',
    tooltip: 'You can fill in only one value, or an array, or a function',
  },
  {
    label: 'Style',
    name: 'waterfallStyle',
    type: 'textarea',
    tooltip: `{
      fill: fill color,
      stroke: stroke color,
      lineWidth: stroke width,
      lineDash: dotted line stroke,
      opacity: overall transparency,
      fillOpacity: fill transparency,
      strokeOpacity: stroke transparency,
    }`,
  },
];

/**Map */
export const mapProps = [
  {
    label: '',
    name: '',
    type: '',
  },
];
