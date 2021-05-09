import "antd/es/button/style";
import _Button from "antd/es/button";
import "antd/es/input/style";
import _Input from "antd/es/input";
import "antd/es/avatar/style";
import _Avatar from "antd/es/avatar";
import "antd/es/form/style";
import _Form from "antd/es/form";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { useIntl, enUS } from '@next-dev/provider/es';
import { Col } from 'antd/lib/grid';
var FormItem = _Form.Item;
export var defaultProps = {
  next: {
    logoWith: 40,
    alt: 'logo',
    title: 'logo',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'
  }
};

var NextLockScreen = function NextLockScreen(_ref) {
  var next = _ref.next,
      rest = _objectWithoutProperties(_ref, ["next"]);

  var _useIntl = useIntl(),
      getMessage = _useIntl.getMessage;

  return /*#__PURE__*/React.createElement(Col, _extends({
    className: "box_shadow"
  }, next === null || next === void 0 ? void 0 : next.colProps), /*#__PURE__*/React.createElement("div", {
    className: "gx-login-content gx-text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gx-login-header"
  }, /*#__PURE__*/React.createElement(_Avatar, {
    shape: "circle",
    className: "gx-size-120",
    src: "https://via.placeholder.com/150x150"
  })), /*#__PURE__*/React.createElement("div", {
    className: "gx-mb-4"
  }, /*#__PURE__*/React.createElement("h3", null, "John Smith"), /*#__PURE__*/React.createElement("p", null, getMessage('appModule_enterPasswordUnlock', enUS.appModule_enterPasswordUnlock))), /*#__PURE__*/React.createElement(_Form, _extends({
    className: "gx-login-form gx-form-row0"
  }, rest), /*#__PURE__*/React.createElement(FormItem, {
    name: "password",
    rules: [{
      required: true,
      message: 'Please input your Password!'
    }]
  }, /*#__PURE__*/React.createElement(_Input, {
    type: "password",
    placeholder: "Password"
  })), /*#__PURE__*/React.createElement(FormItem, null, /*#__PURE__*/React.createElement(_Button, {
    type: "primary",
    htmlType: "submit"
  }, getMessage('app_userAuth_unLock', enUS.app_userAuth_unLock))))));
};

export default NextLockScreen;