function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState, useEffect } from "react";
import LiTag from "./LiTag";
export default function UlTag(props) {
  let {
    ul
  } = props,
      [liTags, setLiTags] = useState([]);
  useEffect(() => {
    setLiTags(createLiTags(ul));
  }, [ul]);
  return /*#__PURE__*/React.createElement("ul", {
    className: "mtr-ul"
  }, liTags.map((li, ind) => /*#__PURE__*/React.createElement(LiTag, _extends({
    key: "" + Date.now() + ind
  }, {
    li
  }))));

  function createLiTags(list) {
    let nested = /^\s{2}\-\s/.test(list),
        regex = nested ? "(^\\s{2}\\-s.*)+" : "(^\\-\\s.+\\n)|(^\\-\\s.+\\n)(?<=^\\-\\s.+\\n)(^\\s{2}\\-\\s.+\\s)+?";
    return list.split(new RegExp(regex, "gm"));
  }
}