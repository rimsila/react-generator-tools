function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import React, { useContext } from 'react';
import { ConfigContext as AntdConfigContext } from 'antd/es/config-provider';
import zhCN from './locale/zh_CN';
import enUS from './locale/en_US';
export { zhCN, enUS };

function get(source, path, defaultValue) {
  var paths = path.replace(/\[(\d+)\]/g, '.$1').split('.');
  var result = source;
  var message = defaultValue;

  var _iterator = _createForOfIteratorHelper(paths),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var p = _step.value;
      message = Object(result)[p];
      result = Object(result)[p];

      if (message === undefined) {
        return defaultValue;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return message;
}

var createIntl = function createIntl(locale, localeMap) {
  return {
    getMessage: function getMessage(id, defaultMessage) {
      return get(localeMap, id, defaultMessage) || defaultMessage;
    },
    locale: locale
  };
};

var zhCNIntl = createIntl('zh_CN', zhCN);
var enUSIntl = createIntl('en_US', enUS);
var intlMap = {
  'zh-CN': zhCNIntl,
  'en-US': enUSIntl
};
var intlMapKeys = Object.keys(intlMap);
export { enUSIntl, zhCNIntl, intlMap, intlMapKeys };
var ConfigContext = /*#__PURE__*/React.createContext({
  intl: _objectSpread(_objectSpread({}, enUSIntl), {}, {
    locale: 'default'
  })
});
var ConfigConsumer = ConfigContext.Consumer,
    ConfigProvider = ConfigContext.Provider;

var findIntlKeyByAntdLocaleKey = function findIntlKeyByAntdLocaleKey(localeKey) {
  if (!localeKey) {
    return 'en-US';
  }

  var localeName = localeKey.toLocaleLowerCase();
  return intlMapKeys.find(function (intlKey) {
    var LowerCaseKey = intlKey.toLocaleLowerCase();
    return LowerCaseKey.includes(localeName);
  }) || 'en-US';
};

var ConfigProviderWarp = function ConfigProviderWarp(_ref) {
  var children = _ref.children;

  var _useContext = useContext(AntdConfigContext),
      locale = _useContext.locale;

  return /*#__PURE__*/React.createElement(ConfigConsumer, null, function (value) {
    var localeName = locale === null || locale === void 0 ? void 0 : locale.locale;
    var key = findIntlKeyByAntdLocaleKey(localeName);
    var intl = localeName && value.intl.locale === 'default' ? intlMap[key] : value || intlMap[key];
    return /*#__PURE__*/React.createElement(ConfigProvider, {
      value: intl || enUSIntl
    }, children);
  });
};

export { ConfigConsumer, ConfigProvider, ConfigProviderWarp, createIntl };
export function useIntl() {
  var context = useContext(ConfigContext);

  if (!context.intl) {
    return context || enUSIntl;
  }

  return context.intl || enUSIntl;
}
export default ConfigContext;