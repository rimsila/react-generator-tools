function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import CryptoJS from 'crypto-js';
import JSEncrypt from 'jsencrypt/bin/jsencrypt.min.js';
export function base64(content) {
  var type = _typeof(content);

  var result = content;

  if (type === 'object') {
    result = JSON.stringify(content);
  } else if (type === 'string' && content.length > 0) {
    var utf8Content = CryptoJS.enc.Utf8.parse(content);
    result = CryptoJS.enc.Base64.stringify(utf8Content);
  }

  return result;
}
export function debase64(content) {
  if (typeof content === 'string' && content.length > 0) {
    var result = CryptoJS.enc.Base64.parse(content);
    return CryptoJS.enc.Utf8.stringify(result);
  }

  return '';
}
export function encrypt(content, key) {
  if (key.length !== 32) {
    throw Error('The key length must be 32 bits');
  }

  var body = content;

  if (!body) {
    return '';
  }

  if (_typeof(body) === 'object') {
    body = JSON.stringify(body);
  }

  var keys = CryptoJS.enc.Utf8.parse(key.substr(0, 24));
  var cryptoContent = CryptoJS.TripleDES.encrypt(body, keys, {
    iv: CryptoJS.enc.Utf8.parse(key.substr(24, 8)),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return cryptoContent.toString();
}
export function decrypt(cryptoBody, key) {
  var keys = CryptoJS.enc.Utf8.parse(key);
  var decryptContent = CryptoJS.TripleDES.decrypt(cryptoBody, keys, {
    iv: CryptoJS.enc.Utf8.parse(key.substr(24, 8)),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return decryptContent.toString(CryptoJS.enc.Utf8);
}
export function encryptKey(key) {
  return rsaEncrypt(key);
}
var RSAKEY = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC5HI3rQq9BKcruxYfqgnkhyuI+9CGf1jYsyzWYpdw/3Cv9TX4u5w2GjcYoxzBY5s6ZcXbb4oGoLt9rn93g7sKT01tyUO/iQdYiOTvPsFiqcInMVHhaazBy5nH50owObGs+PRubc8bP+a+DT3vV8+l7TEd/H9pdwok/r7GlIIe5uQIDAQAB';
var B64MAP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
var B64PAD = '=';
var jsencrypt = new JSEncrypt();
jsencrypt.setPublicKey(RSAKEY);
export function configRSAKey(key) {
  RSAKEY = key;
  jsencrypt.setPublicKey(RSAKEY);
}
export function configBase64Map(map) {
  B64MAP = map;
}

function hex2b64(h) {
  var i;
  var c;
  var ret = '';

  for (i = 0; i + 3 <= h.length; i += 3) {
    c = parseInt(h.substring(i, i + 3), 16);
    ret += B64MAP.charAt(c >> 6) + B64MAP.charAt(c & 63);
  }

  if (i + 1 === h.length) {
    c = parseInt(h.substring(i, i + 1), 16);
    ret += B64MAP.charAt(c << 2);
  } else if (i + 2 === h.length) {
    c = parseInt(h.substring(i, i + 2), 16);
    ret += B64MAP.charAt(c >> 2) + B64MAP.charAt((c & 3) << 4);
  }

  while ((ret.length & 3) > 0) {
    ret += B64PAD;
  }

  return ret;
}

export function rsaEncrypt(input) {
  var result;

  do {
    result = jsencrypt.getKey().encrypt(input);
  } while (result.length !== 256);

  return hex2b64(result);
}
export function encryptSection(input) {
  var len = 117;
  var sectionLen = input.length / len;
  var rsaLength = sectionLen % 1 === 0 ? sectionLen : Math.floor(sectionLen) + 1;
  var arr = [];

  for (var i = 0; i < rsaLength; i++) {
    arr.push(rsaEncrypt(input.substring(i * len, (i + 1) * len)));
  }

  return arr.join(',');
}
export function encryptSectionWithEncode(content) {
  var result = content;

  if (_typeof(content) === 'object') {
    result = JSON.stringify(content);
  }

  return encodeURIComponent(encryptSection(result));
}
export function encryptBtoa(data) {
  var strData;

  if (Array.isArray(data) || _typeof(data) === 'object') {
    strData = JSON.stringify(data);
  } else {
    strData = data;
  }

  strData = encodeURIComponent(strData);
  return btoa(strData);
}
export function decryptAtob(data) {
  return decodeURIComponent(atob(data));
}