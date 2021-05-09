function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { noteOnce } from 'rc-util/lib/warning';
import { createFromIconfontCN } from '@ant-design/icons';

var IconFont = function IconFont() {
  return null;
};

export function configIconUrl(scriptUrl) {
  IconFont = createFromIconfontCN({
    scriptUrl: scriptUrl
  });
}
export default (function (props) {
  noteOnce(!!IconFont, 'IconFont is not init');
  return IconFont ? /*#__PURE__*/React.createElement(IconFont, _extends({
    style: {
      fontSize: 24
    }
  }, props)) : null;
});