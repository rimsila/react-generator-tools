import "antd/es/col/style";
import _Col from "antd/es/col";
import "antd/es/button/style";
import _Button from "antd/es/button";
import "antd/es/input/style";
import _Input from "antd/es/input";
import "antd/es/form/style";
import _Form from "antd/es/form";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { LockOutlined } from '@ant-design/icons';
import React, { memo } from 'react';
import { enUS, useIntl } from '@next-dev/provider/es';
import { LAYOUT_COL_AUTH } from '@next-dev/core/es/constants';
import classnames from 'classnames';
import { NextButton } from '../../NextButton';
var FormItem = _Form.Item;
export var defaultProps = {
  next: {
    logoWith: 40,
    alt: 'logo',
    title: 'logo',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'
  }
};

var ForgotPassword = function ForgotPassword(_ref) {
  var next = _ref.next,
      rest = _objectWithoutProperties(_ref, ["next"]);

  var _defaultProps$next = defaultProps.next,
      logo = _defaultProps$next.logo,
      alt = _defaultProps$next.alt,
      logoWith = _defaultProps$next.logoWith,
      title = _defaultProps$next.title;

  var _useIntl = useIntl(),
      getMessage = _useIntl.getMessage;

  return /*#__PURE__*/React.createElement(_Col, _extends({
    className: "box_shadow"
  }, LAYOUT_COL_AUTH, next === null || next === void 0 ? void 0 : next.colProps), /*#__PURE__*/React.createElement("img", {
    src: (next === null || next === void 0 ? void 0 : next.logo) || logo,
    alt: (next === null || next === void 0 ? void 0 : next.alt) || alt,
    width: (next === null || next === void 0 ? void 0 : next.logoWith) || logoWith,
    title: (next === null || next === void 0 ? void 0 : next.title) || title,
    className: classnames(next === null || next === void 0 ? void 0 : next.logoAlign, 'mb-1')
  }), /*#__PURE__*/React.createElement("div", {
    className: "mb-1"
  }, /*#__PURE__*/React.createElement("h2", null, getMessage('auth.Forgot_Your_Password', enUS.auth.Forgot_Your_Password)), /*#__PURE__*/React.createElement("p", null, getMessage('auth.userAuth_forgot', enUS.auth.userAuth_forgot))), /*#__PURE__*/React.createElement(_Form, _extends({
    layout: "vertical"
  }, rest), !(next === null || next === void 0 ? void 0 : next.isHideEmail) && /*#__PURE__*/React.createElement(FormItem, _extends({
    name: "email",
    rules: [{
      type: 'email',
      required: true
    }]
  }, next === null || next === void 0 ? void 0 : next.emailItemProps), /*#__PURE__*/React.createElement(_Input, _extends({
    type: "email",
    placeholder: "Email Address",
    size: "large"
  }, next === null || next === void 0 ? void 0 : next.emailInputProps))), (next === null || next === void 0 ? void 0 : next.customField) && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FormItem, _extends({
    name: "email",
    rules: [{
      type: 'email',
      required: true
    }]
  }, next === null || next === void 0 ? void 0 : next.emailItemProps), /*#__PURE__*/React.createElement(_Input, _extends({
    type: "email",
    placeholder: "Email Address",
    size: "large"
  }, next === null || next === void 0 ? void 0 : next.emailInputProps)))), (next === null || next === void 0 ? void 0 : next.isHasPasswordField) && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FormItem, {
    name: "password",
    rules: [{
      required: true,
      message: 'Please input your Password!'
    }]
  }, /*#__PURE__*/React.createElement(_Input, {
    prefix: /*#__PURE__*/React.createElement(LockOutlined, null),
    type: "password",
    placeholder: "Password"
  })), /*#__PURE__*/React.createElement(FormItem, {
    name: "confirm-password",
    rules: [{
      required: true,
      message: 'Please input your Password!'
    }]
  }, /*#__PURE__*/React.createElement(_Input, {
    prefix: /*#__PURE__*/React.createElement(LockOutlined, null),
    type: "password",
    placeholder: "Confirm Password"
  }))), (next === null || next === void 0 ? void 0 : next.customField) && (next === null || next === void 0 ? void 0 : next.customField), /*#__PURE__*/React.createElement(FormItem, null, (next === null || next === void 0 ? void 0 : next.isHasGoBackBtn) && /*#__PURE__*/React.createElement(_Button, _extends({
    type: "link"
  }, next === null || next === void 0 ? void 0 : next.goBackProps), "Go Back"), !(next === null || next === void 0 ? void 0 : next.isHideSubmitBtn) && /*#__PURE__*/React.createElement(NextButton, _extends({
    type: "primary",
    htmlType: "submit"
  }, next === null || next === void 0 ? void 0 : next.submitBtnProps), getMessage('auth.userAuth_send', enUS.auth.userAuth_send))), (next === null || next === void 0 ? void 0 : next.customFooter) && (next === null || next === void 0 ? void 0 : next.customFooter)));
};

export default /*#__PURE__*/memo(ForgotPassword);