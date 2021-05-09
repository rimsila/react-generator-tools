import "antd/es/col/style";
import _Col from "antd/es/col";
import "antd/es/checkbox/style";
import _Checkbox from "antd/es/checkbox";
import "antd/es/input/style";
import _Input from "antd/es/input";
import "antd/es/form/style";
import _Form from "antd/es/form";
import "antd/es/select/style";
import _Select from "antd/es/select";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { Link } from 'react-router-dom';
import Icon, { GoogleOutlined, LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { LAYOUT_COL_AUTH } from '@next-dev/core/es/constants';
import { NextButton } from '../../NextButton';
import classNames from 'classnames';
import countryCode from '@next-dev/core/es/data/countryCode.json';
import { Regex } from '@next-dev/core/es/regexp';
var Option = _Select.Option;
var FormItem = _Form.Item;

var NextSignUp = function NextSignUp(_ref) {
  var next = _ref.next,
      rest = _objectWithoutProperties(_ref, ["next"]);

  var defaultProps = {
    next: {
      logoWith: 40,
      alt: 'logo',
      title: 'Sign Up',
      logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
      titleAlign: 'text-center'
    }
  };
  var _defaultProps$next = defaultProps.next,
      title = _defaultProps$next.title,
      logo = _defaultProps$next.logo,
      titleAlign = _defaultProps$next.titleAlign;

  var _Form$useForm = _Form.useForm(),
      _Form$useForm2 = _slicedToArray(_Form$useForm, 1),
      form = _Form$useForm2[0];

  return /*#__PURE__*/React.createElement(_Col, _extends({
    className: "box_shadow"
  }, LAYOUT_COL_AUTH, next === null || next === void 0 ? void 0 : next.colProps), !(next === null || next === void 0 ? void 0 : next.showLogo) && /*#__PURE__*/React.createElement("div", {
    className: classNames((next === null || next === void 0 ? void 0 : next.titleAlign) || titleAlign)
  }, /*#__PURE__*/React.createElement("img", {
    src: (next === null || next === void 0 ? void 0 : next.logo) || logo,
    alt: "logo",
    title: "logo",
    width: 50
  }), /*#__PURE__*/React.createElement("h1", null, (next === null || next === void 0 ? void 0 : next.title) || title)), /*#__PURE__*/React.createElement(_Form, _extends({
    scrollToFirstError: true,
    name: "register",
    form: form
  }, rest), (next === null || next === void 0 ? void 0 : next.firstNameField) && /*#__PURE__*/React.createElement(FormItem, {
    name: "firstName",
    rules: [{
      required: true
    }]
  }, /*#__PURE__*/React.createElement(_Input, {
    prefix: /*#__PURE__*/React.createElement(UserOutlined, null),
    placeholder: "First Name"
  })), (next === null || next === void 0 ? void 0 : next.lastNameField) && /*#__PURE__*/React.createElement(FormItem, {
    name: "lastName",
    rules: [{
      required: true
    }]
  }, /*#__PURE__*/React.createElement(_Input, {
    prefix: /*#__PURE__*/React.createElement(UserOutlined, null),
    placeholder: "Last Name"
  })), (next === null || next === void 0 ? void 0 : next.userNameField) && /*#__PURE__*/React.createElement(FormItem, {
    name: "userName",
    rules: [{
      required: true
    }]
  }, /*#__PURE__*/React.createElement(_Input, {
    prefix: /*#__PURE__*/React.createElement(UserOutlined, null),
    placeholder: "User Name"
  })), (next === null || next === void 0 ? void 0 : next.emailFiled) && /*#__PURE__*/React.createElement(FormItem, {
    name: "email",
    rules: [{
      required: true,
      type: (next === null || next === void 0 ? void 0 : next.emailFiledType) || 'email'
    }]
  }, /*#__PURE__*/React.createElement(_Input, {
    prefix: /*#__PURE__*/React.createElement(MailOutlined, null),
    placeholder: "Email address"
  })), (next === null || next === void 0 ? void 0 : next.genderField) && /*#__PURE__*/React.createElement(FormItem, {
    name: "gender",
    rules: [{
      required: true
    }]
  }, /*#__PURE__*/React.createElement(_Select, {
    showSearch: true,
    placeholder: "Gender"
  }, /*#__PURE__*/React.createElement(Option, {
    value: "male"
  }, "Male"), /*#__PURE__*/React.createElement(Option, {
    value: "female"
  }, "Female"))), (next === null || next === void 0 ? void 0 : next.phoneCodeFiled) && /*#__PURE__*/React.createElement(_Form.Item, {
    name: "phoneCode",
    rules: [{
      required: true,
      pattern: Regex.number,
      message: 'please input number'
    }]
  }, /*#__PURE__*/React.createElement(_Input, {
    addonBefore: /*#__PURE__*/React.createElement(_Form.Item, {
      name: "countryCode",
      noStyle: true
    }, /*#__PURE__*/React.createElement(_Select, {
      style: {
        width: 90
      },
      showSearch: true
    }, countryCode === null || countryCode === void 0 ? void 0 : countryCode.map(function (v) {
      return /*#__PURE__*/React.createElement(Option, {
        key: v === null || v === void 0 ? void 0 : v.dial_code,
        value: v === null || v === void 0 ? void 0 : v.dial_code
      }, v === null || v === void 0 ? void 0 : v.dial_code);
    }))),
    placeholder: "Phone Number"
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
  })), (next === null || next === void 0 ? void 0 : next.rememberField) && /*#__PURE__*/React.createElement(FormItem, {
    name: "remember",
    initialValue: true,
    valuePropName: "checked"
  }, /*#__PURE__*/React.createElement(_Checkbox, null, "Remember me"), /*#__PURE__*/React.createElement(Link, {
    className: "gx-login-form-forgot",
    to: "/forgot-password"
  }, "Forgot password")), (next === null || next === void 0 ? void 0 : next.loginLink) && /*#__PURE__*/React.createElement(FormItem, null, /*#__PURE__*/React.createElement(Link, {
    to: (next === null || next === void 0 ? void 0 : next.loginLink) || '/login'
  }, "Login Here")), /*#__PURE__*/React.createElement(FormItem, null, /*#__PURE__*/React.createElement(NextButton, _extends({
    block: true,
    type: "primary",
    htmlType: "submit"
  }, next === null || next === void 0 ? void 0 : next.signUpBtnProps), "Sign Up"))), (next === null || next === void 0 ? void 0 : next.isHasSocial) && /*#__PURE__*/React.createElement("div", {
    className: "gx-flex-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "gx-mb-2 gx-mr-3"
  }, "or Sign up using: "), /*#__PURE__*/React.createElement("ul", {
    className: "gx-social-link"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(GoogleOutlined, null)), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    type: "facebook"
  })), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    type: "github"
  })), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    type: "twitter"
  })))));
};

export default NextSignUp;