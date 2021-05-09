import "antd/es/col/style";
import _Col from "antd/es/col";
import "antd/es/checkbox/style";
import _Checkbox from "antd/es/checkbox";
import "antd/es/input/style";
import _Input from "antd/es/input";
import "antd/es/form/style";
import _Form from "antd/es/form";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { memo } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { NextButton } from '../../NextButton';
import classNames from 'classnames';
import { LAYOUT_COL_AUTH } from '@next-dev/core/es/constants';
var FormItem = _Form.Item;
var NextSignIn = /*#__PURE__*/memo(function (_ref) {
  var next = _ref.next,
      rest = _objectWithoutProperties(_ref, ["next"]);

  var defaultProps = {
    next: {
      logoWith: 40,
      alt: 'logo',
      title: 'Sign In',
      logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
      forgotPassPath: next === null || next === void 0 ? void 0 : next.forgotPassPath,
      registerPath: '/register',
      titleAlign: 'text-center',
      showRegister: next === null || next === void 0 ? void 0 : next.showRegister
    }
  };
  var _defaultProps$next = defaultProps.next,
      title = _defaultProps$next.title,
      forgotPassPath = _defaultProps$next.forgotPassPath,
      registerPath = _defaultProps$next.registerPath,
      logo = _defaultProps$next.logo,
      titleAlign = _defaultProps$next.titleAlign,
      showRegister = _defaultProps$next.showRegister;
  return /*#__PURE__*/React.createElement(_Col, _extends({
    className: "box_shadow"
  }, LAYOUT_COL_AUTH, next === null || next === void 0 ? void 0 : next.colProps), /*#__PURE__*/React.createElement("div", {
    className: classNames((next === null || next === void 0 ? void 0 : next.titleAlign) || titleAlign)
  }, /*#__PURE__*/React.createElement("img", {
    src: (next === null || next === void 0 ? void 0 : next.logo) || logo,
    alt: "logo",
    title: "logo",
    width: 50
  }), /*#__PURE__*/React.createElement("h1", null, (next === null || next === void 0 ? void 0 : next.title) || title)), /*#__PURE__*/React.createElement(_Form, rest, /*#__PURE__*/React.createElement(FormItem, _extends({
    name: "email",
    rules: [{
      type: (next === null || next === void 0 ? void 0 : next.isWithoutEmail) ? 'string' : 'email',
      required: true
    }]
  }, next === null || next === void 0 ? void 0 : next.emailItemProps), /*#__PURE__*/React.createElement(_Input, {
    prefix: /*#__PURE__*/React.createElement(UserOutlined, null),
    placeholder: (next === null || next === void 0 ? void 0 : next.isWithoutEmail) ? 'User Name' : 'Email'
  })), /*#__PURE__*/React.createElement(FormItem, _extends({
    name: "password",
    rules: [{
      required: true
    }]
  }, next === null || next === void 0 ? void 0 : next.passwordItemProps), /*#__PURE__*/React.createElement(_Input, {
    prefix: /*#__PURE__*/React.createElement(LockOutlined, null),
    type: "password",
    placeholder: "Password"
  })), ((next === null || next === void 0 ? void 0 : next.isHasRemember) || forgotPassPath) && /*#__PURE__*/React.createElement(FormItem, null, (next === null || next === void 0 ? void 0 : next.isHasRemember) && /*#__PURE__*/React.createElement(_Checkbox, null, "Remember me"), forgotPassPath && /*#__PURE__*/React.createElement(Link, {
    to: forgotPassPath
  }, "Forgot Password")), /*#__PURE__*/React.createElement(FormItem, null, showRegister && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, "Don't have account yet? "), /*#__PURE__*/React.createElement(Link, {
    to: (next === null || next === void 0 ? void 0 : next.registerPath) || registerPath
  }, " Register Here")), /*#__PURE__*/React.createElement("br", null), (next === null || next === void 0 ? void 0 : next.verifyLink) && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, "Your account not yet verify? "), /*#__PURE__*/React.createElement(Link, {
    to: (next === null || next === void 0 ? void 0 : next.verifyLink) || registerPath
  }, "Verify Here"))), !(next === null || next === void 0 ? void 0 : next.isHideSubmitBtn) && /*#__PURE__*/React.createElement(FormItem, null, /*#__PURE__*/React.createElement(NextButton, _extends({
    type: "primary",
    block: true,
    htmlType: "submit"
  }, next === null || next === void 0 ? void 0 : next.submitBtnProps), "Log In")), (next === null || next === void 0 ? void 0 : next.customFooter) && (next === null || next === void 0 ? void 0 : next.customFooter)));
});
export default NextSignIn;