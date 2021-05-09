function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import reduce from 'lodash/reduce';
import { parse } from 'querystring';
import moment from 'moment';
export function sleep(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
}
var reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export function urlToList(url) {
  if (!url || url === '/') {
    return ['/'];
  }

  var urlList = url.split('/').filter(function (i) {
    return i;
  });
  return urlList.map(function (_, index) {
    return "/".concat(urlList.slice(0, index + 1).join('/'));
  });
}
export function isPromise(obj) {
  return !!obj && (_typeof(obj) === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}
export var isUrl = function isUrl(path) {
  return reg.test(path);
};
export function listToFlat(items) {
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'value';
  var text = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'label';
  return reduce(items, function (redu, item) {
    var reduKey = item[key];
    redu[reduKey] = item[text];
    return redu;
  }, {});
}
export var isBrowser = function isBrowser() {
  return typeof window !== 'undefined';
};
export var getPageQuery = function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
};
export function getDateString(_ref) {
  var date = _ref.date,
      _ref$format = _ref.format,
      format = _ref$format === void 0 ? 'Y-MM-DD' : _ref$format;

  if (!date) {
    return '';
  }

  var tempDate;

  if (typeof date === 'string') {
    tempDate = moment(date);
  } else {
    tempDate = date;
  }

  if (tempDate) {
    return tempDate.format(format);
  }

  return '';
}
export function fixedZero(val) {
  return val * 1 < 10 ? "0".concat(val) : "".concat(val);
}
export function newGuid(withSplit) {
  var tmp = withSplit ? 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx' : 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx';
  return tmp.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    var v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}
export function formatSecuredInfo(text, type, filterNA) {
  if (!text) {
    return '';
  }

  if (text.toUpperCase() === 'NA' && filterNA) {
    return text;
  }

  var result = '';

  switch (type) {
    case 'mobile':
      result = text.replace(/(\d{1,3})(\d{5})(\d+)/g, '$1*****$3');
      break;

    case 'phone':
      result = text.replace(/(\d+)(\d{4})/g, '$1*****');
      break;

    case 'fax':
      result = text.replace(/(\d+)(\d{4})/g, '$1*****');
      break;

    case 'mail':
      if (text.indexOf('@') < 5) {
        result = text.substring(1, text.lastIndexOf('@') - 1);
      } else {
        result = text.substring(2, text.lastIndexOf('@') - 2);
      }

      result = text.replace(result, '***');
      break;

    case 'card':
      result = text.replace(/(.+)(.{4})$/gi, function (_, m1, m2) {
        return "".concat(m1.replace(/./gi, '*')).concat(m2);
      });
      break;

    case 'identity':
      result = text.replace(/(\d{4}).*(\w{3})/gi, '$1***********$2');
      break;

    case 'name':
      result = text.replace(/./gi, function (_, index, match) {
        if (index === 0) {
          return '*';
        }

        return match;
      });
      result = text.replace(/./gi, '$1*****');
      break;

    default:
      break;
  }

  return result;
}
export function mergeCells(list, key) {
  var mergeObj = {};
  var startIndex = 0;
  list === null || list === void 0 ? void 0 : list.forEach(function (item, index, arr) {
    var curValue;
    var preValue;

    if (typeof key === 'string') {
      curValue = item[key];
      preValue = arr[startIndex][key];
    } else {
      curValue = key(item);
      preValue = key(arr[startIndex]);
    }

    mergeObj[index] = 0;

    if (curValue === preValue) {
      mergeObj[startIndex] += 1;
    } else {
      mergeObj[index] = 1;
      startIndex = index;
    }
  });
  return mergeObj;
}