import "antd/es/config-provider/style";
import _ConfigProvider from "antd/es/config-provider";
import "antd/es/divider/style";
import _Divider from "antd/es/divider";
import "antd/es/col/style";
import _Col from "antd/es/col";
import "antd/es/popover/style";
import _Popover from "antd/es/popover";
import "antd/es/typography/style";
import _Typography from "antd/es/typography";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Fragment } from 'react';
import CodeSandboxOutlined from '@ant-design/icons/CodeSandboxOutlined';
import { NextRow } from './NextRow';
import validateMessages from '@next-dev/core/es/validation';
var Paragraph = _Typography.Paragraph;
export var MapItem = function MapItem(_ref) {
  var gut1 = _ref.gut1,
      gut2 = _ref.gut2,
      _ref$isAntCol = _ref.isAntCol,
      isAntCol = _ref$isAntCol === void 0 ? true : _ref$isAntCol,
      _ref$data = _ref.data,
      data = _ref$data === void 0 ? [] : _ref$data,
      _ref$antSpan = _ref.antSpan,
      antSpan = _ref$antSpan === void 0 ? 6 : _ref$antSpan,
      isDivider = _ref.isDivider,
      cssProps = _ref.cssProps,
      cls = _ref.cls;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_ConfigProvider, {
    form: {
      validateMessages: validateMessages
    }
  }, /*#__PURE__*/React.createElement(NextRow, {
    gut1: gut1,
    gut2: gut2,
    cls: cls
  }, data.map(function (item, key) {
    return /*#__PURE__*/React.createElement(Fragment, {
      key: key
    }, isAntCol && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_Col, {
      span: antSpan
    }, item.item, /*#__PURE__*/React.createElement("span", {
      style: _objectSpread({
        display: 'flex',
        justifyContent: 'center',
        marginTop: 10
      }, cssProps)
    }, /*#__PURE__*/React.createElement(Paragraph, {
      style: {
        justifyContent: 'center',
        marginBottom: 6,
        fontSize: 18
      },
      copyable: {
        text: item === null || item === void 0 ? void 0 : item.copyCode
      }
    }), /*#__PURE__*/React.createElement(_Popover, {
      content: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Paragraph, {
        code: true,
        copyable: true,
        style: {
          color: '#c41d7f'
        }
      }, item === null || item === void 0 ? void 0 : item.copyCode))
    }, /*#__PURE__*/React.createElement(CodeSandboxOutlined, {
      style: {
        marginLeft: 4,
        position: 'relative',
        bottom: -4,
        fontSize: 18
      }
    }))))), isDivider && /*#__PURE__*/React.createElement(_Divider, null));
  }))));
};
export default MapItem;