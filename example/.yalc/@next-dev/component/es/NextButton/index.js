import "antd/es/button/style";
import _Button from "antd/es/button";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { memo } from 'react';
import classnames from 'classnames';
export var NextButton = function NextButton(_ref) {
  var nextTheme = _ref.nextTheme,
      _ref$btnDisplay = _ref.btnDisplay,
      btnDisplay = _ref$btnDisplay === void 0 ? 'flex' : _ref$btnDisplay,
      _ref$btnJustify = _ref.btnJustify,
      btnJustify = _ref$btnJustify === void 0 ? 'center' : _ref$btnJustify,
      btnContainerCls = _ref.btnContainerCls,
      children = _ref.children,
      disabled = _ref.disabled,
      btnContainerProps = _ref.btnContainerProps,
      _ref$mt = _ref.mt,
      mt = _ref$mt === void 0 ? 0 : _ref$mt,
      _ref$mb = _ref.mb,
      mb = _ref$mb === void 0 ? 0 : _ref$mb,
      _ref$ml = _ref.ml,
      ml = _ref$ml === void 0 ? 0 : _ref$ml,
      _ref$mr = _ref.mr,
      mr = _ref$mr === void 0 ? 0 : _ref$mr,
      _ref$my = _ref.my,
      my = _ref$my === void 0 ? 0 : _ref$my,
      _ref$mx = _ref.mx,
      mx = _ref$mx === void 0 ? 0 : _ref$mx,
      rest = _objectWithoutProperties(_ref, ["nextTheme", "btnDisplay", "btnJustify", "btnContainerCls", "children", "disabled", "btnContainerProps", "mt", "mb", "ml", "mr", "my", "mx"]);

  var mSpacing = my && "".concat(my, "px 0 ").concat(my, "px 0") || my && "0 ".concat(mx, "px 0 ").concat(mx, "px") || "".concat(mt, "px ").concat(mr, "px ").concat(mb, "px ").concat(ml, "px");
  return /*#__PURE__*/React.createElement("div", _objectSpread(_objectSpread({
    className: classnames(!disabled && nextTheme, btnContainerCls)
  }, btnContainerProps), {}, {
    style: _objectSpread({
      display: btnDisplay,
      justifyContent: btnJustify,
      margin: mSpacing
    }, btnContainerProps === null || btnContainerProps === void 0 ? void 0 : btnContainerProps.style)
  }), /*#__PURE__*/React.createElement(_Button, _objectSpread({
    disabled: Boolean(rest.loading)
  }, rest), children));
};
export default /*#__PURE__*/memo(NextButton);