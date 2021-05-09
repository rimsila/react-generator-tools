import "antd/es/row/style";
import _Row from "antd/es/row";
import React, { memo } from 'react';
import css from './styles.less';
import '../style/index.less';
import classnames from 'classnames';
export var NextRow = function NextRow(_ref) {
  var bgColor = _ref.bgColor,
      children = _ref.children,
      _ref$gut = _ref.gut1,
      gut1 = _ref$gut === void 0 ? 10 : _ref$gut,
      _ref$gut2 = _ref.gut2,
      gut2 = _ref$gut2 === void 0 ? 10 : _ref$gut2,
      cls = _ref.cls;
  return /*#__PURE__*/React.createElement(_Row, {
    className: (classnames(css.layout, bgColor), cls),
    gutter: [gut1, gut2]
  }, children);
};
export default /*#__PURE__*/memo(NextRow);