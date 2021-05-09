import "antd/es/space/style";
import _Space from "antd/es/space";
import IconFont from '../../IconFont/index';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import React, { memo } from 'react';
import './index.less';
var defaultData = {
  avatar: '',
  name: '',
  sub1: '',
  sub2: '',
  socialData: []
};
export var ProfileCard = /*#__PURE__*/memo(function (props) {
  var type = props.type,
      _props$data = props.data,
      data = _props$data === void 0 ? defaultData : _props$data;

  var _ref = data || {},
      avatar = _ref.avatar,
      name = _ref.name,
      sub1 = _ref.sub1,
      sub2 = _ref.sub2,
      _ref$socialData = _ref.socialData,
      socialData = _ref$socialData === void 0 ? [] : _ref$socialData;

  return /*#__PURE__*/React.createElement("div", {
    className: classNames('profile_card')
  }, /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, type === 'style1' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("img", {
    src: avatar,
    alt: "Person",
    className: "card__image"
  }), name && /*#__PURE__*/React.createElement("p", {
    className: "card__name"
  }, name), /*#__PURE__*/React.createElement("div", {
    className: "grid-container"
  }, sub1 && /*#__PURE__*/React.createElement("div", {
    className: "grid-child-posts"
  }, sub1), sub2 && /*#__PURE__*/React.createElement("div", {
    className: "grid-child-followers"
  }, sub2)), !isEmpty(socialData) && /*#__PURE__*/React.createElement("ul", {
    className: "social-icons"
  }, socialData === null || socialData === void 0 ? void 0 : socialData.map(function (v, i) {
    return /*#__PURE__*/React.createElement(_Space, {
      key: i,
      direction: "horizontal",
      size: "large"
    }, /*#__PURE__*/React.createElement(IconFont, {
      type: v === null || v === void 0 ? void 0 : v.iconType,
      className: "mr-10"
    }));
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn draw-border"
  }, "Follow"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn draw-border"
  }, "Message"))));
});