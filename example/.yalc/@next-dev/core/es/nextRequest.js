function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import axios from 'axios';
import { getToken, setToken } from './authority';
import { newGuid } from './utils';
import { encrypt, decrypt, encryptKey } from './crypto';
import { CryptoType } from './core';
var instance = axios.create({
  headers: {
    'Content-Type': 'application/json'
  },
  timeoutErrorMessage: 'Request timed out, please try again!'
});
export var configInstance = function configInstance(config) {
  instance = axios.create(config);
};
var globalHeaders;
export var configGlobalHeader = function configGlobalHeader(func) {
  globalHeaders = func;
};

var refreshToken = function refreshToken() {
  return Promise.reject(new Error('refreshToken has not been initialized'));
};

export var configRefreshToken = function configRefreshToken(func) {
  refreshToken = func;
};
var commonRequestInterceptor = [function (option) {
  var config = option;
  var tokenStore = getToken();

  if (tokenStore && tokenStore.token) {
    config.headers = _objectSpread(_objectSpread({}, config.headers), {}, {
      Authorization: "Bearer ".concat(tokenStore.token)
    });
  }

  if (config.crypto) {
    config['cryptoKey'] = newGuid();

    if (config.crypto === CryptoType.In || config.crypto === CryptoType.Both) {
      config.data = encrypt(config.data, config['cryptoKey']);
    }

    config.headers = _objectSpread(_objectSpread({}, config.headers), {}, {
      Triple_DES_Key: encryptKey(config['cryptoKey'])
    });
  }

  if (globalHeaders) {
    var otherHeaders = globalHeaders();

    if (otherHeaders) {
      config.headers = _objectSpread(_objectSpread({}, config.headers), otherHeaders);
    }
  }

  return config;
}];
var commonResponseInterceptor = [function (response) {
  var _ref = response || {},
      data = _ref.data,
      config = _ref.config;

  var requestConfig = config;

  if (requestConfig.responseType && requestConfig.responseType.toLowerCase() === 'arraybuffer') {
    return Promise.resolve(data);
  }

  if (requestConfig.crypto === CryptoType.Out || requestConfig.crypto === CryptoType.Both) {
    if (typeof data === 'string') {
      var decryptData = decrypt(data, config['cryptoKey']);
      return Promise.resolve(JSON.parse(decryptData));
    }
  }

  return Promise.resolve(data);
}, function (_ref2) {
  var response = _ref2.response;
  return Promise.reject(response);
}];
var isRefreshing = false;
var requests = [];
var commonResponseWithRefreshTokenInterceptor = [function (response) {
  var data = response.data,
      config = response.config;
  console.log('ffs', data);
  var requestConfig = config;

  if (requestConfig.responseType && requestConfig.responseType.toLowerCase() === 'arraybuffer') {
    return Promise.resolve(data);
  }

  if (requestConfig.crypto === CryptoType.Out || requestConfig.crypto === CryptoType.Both) {
    if (typeof data === 'string') {
      var decryptData = decrypt(data, config['cryptoKey']);
      return Promise.resolve(JSON.parse(decryptData));
    }
  }

  if (data === null || data === void 0 ? void 0 : data.errors) {
    var statusCode = data === null || data === void 0 ? void 0 : data.errors[0].statusCode;

    if (!response || statusCode !== 401) {
      return Promise.reject(response);
    }

    var token = getToken();

    if (!token) {
      return Promise.reject(response);
    }

    if (!isRefreshing) {
      isRefreshing = true;
      return refreshToken().then(function (result) {
        console.log('result', result);

        if (!(result === null || result === void 0 ? void 0 : result.apiKey)) {
          throw new Error(' refreshToken failed, no new refreshToken was obtained');
        }

        setToken(_objectSpread(_objectSpread({}, getToken()), {}, {
          refreshToken: result === null || result === void 0 ? void 0 : result.apiKey
        }));
        requests.forEach(function (cb) {
          return cb();
        });
        requests = [];
        return request(config);
      }).finally(function () {
        isRefreshing = false;
      });
    }

    return new Promise(function (resolve) {
      requests.push(function () {
        resolve(request(config));
      });
    });
  }

  return Promise.resolve(data);
}, function (_ref3) {
  var response = _ref3.response;
  console.log('response', response);

  if (!response || response.status !== 401) {
    return Promise.reject(response);
  }

  var token = getToken();

  if (!token) {
    return Promise.reject(response);
  }

  var config = response.config;

  if (!isRefreshing) {
    isRefreshing = true;
    return refreshToken().then(function (result) {
      if (!result || !result.token) {
        throw new Error('Refresh token failed, no new token was obtained');
      }

      console.log('result', result);
      setToken({
        token: result === null || result === void 0 ? void 0 : result.token,
        refreshToken: (result === null || result === void 0 ? void 0 : result.apiKey) || (result === null || result === void 0 ? void 0 : result.refreshToken)
      });
      requests.forEach(function (cb) {
        return cb();
      });
      requests = [];
      return request(config);
    }).finally(function () {
      isRefreshing = false;
    });
  }

  return new Promise(function (resolve) {
    requests.push(function () {
      resolve(request(config));
    });
  });
}];
export function request(_x) {
  return _request.apply(this, arguments);
}

function _request() {
  _request = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(opt) {
    var result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return instance.request(opt);

          case 2:
            result = _context.sent;
            return _context.abrupt("return", result);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _request.apply(this, arguments);
}

function addRequestInterceptor(onFulfilled, onRejected) {
  return instance.interceptors.request.use(onFulfilled, onRejected);
}

function ejectRequestInterceptor(interceptorId) {
  return instance.interceptors.request.eject(interceptorId);
}

function addResponseInterceptor(onFulfilled, onRejected) {
  return instance.interceptors.response.use(onFulfilled, onRejected);
}

function ejectResponseInterceptor(interceptorId) {
  return instance.interceptors.response.eject(interceptorId);
}

export { axios, instance, globalHeaders, commonRequestInterceptor, commonResponseInterceptor, commonResponseWithRefreshTokenInterceptor, addRequestInterceptor, ejectRequestInterceptor, addResponseInterceptor, ejectResponseInterceptor };