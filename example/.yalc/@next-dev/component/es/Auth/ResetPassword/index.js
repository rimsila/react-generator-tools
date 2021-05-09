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

import React from 'react';
import { useIntl } from '@next-dev/provider/es';
import { LAYOUT_COL_AUTH } from '@next-dev/core/es/constants';
import classNames from 'classnames';
import { LockOutlined } from '@ant-design/icons';
var FormItem = _Form.Item;

var ResetPassword = function ResetPassword(_ref) {
  var next = _ref.next,
      rest = _objectWithoutProperties(_ref, ["next"]);

  var _useIntl = useIntl(),
      getMessage = _useIntl.getMessage;

  var _next$logo = next.logo,
      logo = _next$logo === void 0 ? 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg' : _next$logo,
      _next$logoWidth = next.logoWidth,
      logoWidth = _next$logoWidth === void 0 ? 40 : _next$logoWidth,
      _next$type = next.type,
      type = _next$type === void 0 ? 'reset' : _next$type,
      verifyCodeField = next.verifyCodeField;
  return /*#__PURE__*/React.createElement(_Col, _extends({
    className: "box_shadow"
  }, LAYOUT_COL_AUTH, next === null || next === void 0 ? void 0 : next.colProps), /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: classNames((next === null || next === void 0 ? void 0 : next.titleAlign) || 'text-center')
  }, /*#__PURE__*/React.createElement("img", {
    src: (next === null || next === void 0 ? void 0 : next.logo) || logo,
    width: (next === null || next === void 0 ? void 0 : next.logoWidth) || logoWidth,
    alt: "logo",
    title: "logo"
  })), /*#__PURE__*/React.createElement("div", null, type === 'reset' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h2", null, "Reset Password"), /*#__PURE__*/React.createElement("p", null, " ", getMessage('appModule_enterPasswordReset', ''))), type === 'verify' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h2", null, "Verify Account"), /*#__PURE__*/React.createElement("p", null, " ", getMessage('app_userAuth_verify', '')))), /*#__PURE__*/React.createElement(_Form, rest, verifyCodeField && /*#__PURE__*/React.createElement(FormItem, {
    rules: [{
      required: true
    }],
    name: "verifyCode"
  }, /*#__PURE__*/React.createElement(_Input, {
    prefix: /*#__PURE__*/React.createElement(LockOutlined, null),
    type: "text",
    placeholder: "Verify Code"
  })), (next === null || next === void 0 ? void 0 : next.passwordFiled) && /*#__PURE__*/React.createElement(FormItem, {
    name: "password",
    rules: [{
      required: true
    }]
  }, /*#__PURE__*/React.createElement(_Input, {
    prefix: /*#__PURE__*/React.createElement(LockOutlined, null),
    type: "password",
    placeholder: "Password"
  })), (next === null || next === void 0 ? void 0 : next.confirmPasswordFiled) && /*#__PURE__*/React.createElement(FormItem, {
    dependencies: ['password'],
    hasFeedback: true,
    name: "confirm-password",
    rules: [{
      required: true
    }, function (_ref2) {
      var getFieldValue = _ref2.getFieldValue;
      return {
        validator: function validator(_, value) {
          if (!value || getFieldValue('password') === value) {
            return Promise.resolve();
          }

          return Promise.reject('The two passwords that you entered do not match!');
        }
      };
    }]
  }, /*#__PURE__*/React.createElement(_Input, {
    prefix: /*#__PURE__*/React.createElement(LockOutlined, null),
    type: "password",
    placeholder: "Confirm Password"
  })), /*#__PURE__*/React.createElement(FormItem, null, /*#__PURE__*/React.createElement(_Button, {
    type: "primary",
    htmlType: "submit",
    block: true
  }, type === 'verify' && getMessage('app_userAuth_btn_verify', ''), type === 'reset' && getMessage('app_userAuth_reset', ''))))));
};

export default ResetPassword;