function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import { useEffect, useState } from 'react';
var subscribers = new Set();
var info;
var responsiveConfig = {
  xs: {
    min: -Infinity,
    max: 576
  },
  sm: {
    min: 576,
    max: 768
  },
  md: {
    min: 768,
    max: 992
  },
  lg: {
    min: 992,
    max: 1200
  },
  xl: {
    min: 1200,
    max: 1600
  },
  xxl: {
    min: 1600,
    max: +Infinity
  }
};

function init() {
  if (info) return;
  info = {
    size: {
      height: 0,
      width: 0
    },
    screen: 'xs'
  };
  calculate();
  window.addEventListener('resize', function () {
    var oldInfo = info;
    calculate();
    if (oldInfo === info) return;

    var _iterator = _createForOfIteratorHelper(subscribers),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var subscriber = _step.value;
        subscriber();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  });
}

function calculate() {
  var width = window.innerWidth;
  var height = window.innerHeight;
  var newInfo = {
    size: {
      width: width,
      height: height
    }
  };
  var shouldUpdate = false;
  var curResponsive;

  for (var _i = 0, _Object$keys = Object.keys(responsiveConfig); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    curResponsive = responsiveConfig[key];

    if (width >= curResponsive.min && width < curResponsive.max) {
      newInfo.screen = key;
      shouldUpdate = true;
      break;
    }
  }

  if (shouldUpdate || newInfo.size.width !== info.size.width || newInfo.size.height !== info.size.height) {
    info = newInfo;
  }
}

export function configResponsive(config) {
  responsiveConfig = config;
  if (info) calculate();
}
export function useResponsive() {
  init();

  var _useState = useState(info),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  useEffect(function () {
    var subscriber = function subscriber() {
      setState(info);
    };

    subscribers.add(subscriber);
    return function () {
      subscribers.delete(subscriber);
    };
  }, []);
  return state;
}