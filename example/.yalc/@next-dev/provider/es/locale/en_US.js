function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { defaultMsg } from './en_US/default';
export default _objectSpread(_objectSpread({}, defaultMsg), {}, {
  moneySymbol: '$',
  tableForm: {
    search: 'Query',
    reset: 'Reset',
    submit: 'Submit',
    collapsed: 'Expand',
    expand: 'Collapse',
    inputPlaceholder: 'Please enter',
    selectPlaceholder: 'Please select'
  },
  alert: {
    clear: 'Clear',
    selected: 'Selected',
    item: 'Item'
  },
  pagination: {
    total: {
      range: ' ',
      total: 'of',
      item: 'items'
    }
  },
  tableToolBar: {
    leftPin: 'Pin to left',
    rightPin: 'Pin to right',
    noPin: 'Unpinned',
    leftFixedTitle: 'Fixed the left',
    rightFixedTitle: 'Fixed the right',
    noFixedTitle: 'Not Fixed',
    reset: 'Reset',
    columnDisplay: 'Column Display',
    columnSetting: 'Settings',
    fullScreen: 'Full Screen',
    exitFullScreen: 'Exit Full Screen',
    reload: 'Refresh',
    density: 'Density',
    densityDefault: 'Default',
    densityLarger: 'Larger',
    densityMiddle: 'Middle',
    densitySmall: 'Compact'
  }
});