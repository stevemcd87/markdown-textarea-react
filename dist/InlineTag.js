function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState, useEffect } from "react";
import DesignateInlineTag from "./DesignateInlineTag";
import INLINEREGEXPATTERNS from "./variables/INLINEREGEXPATTERNS.js";
export default function InlineTag(props) {
  let {
    s
  } = props,
      inlineRegexPatterns = createInlinePattern(INLINEREGEXPATTERNS),
      [inlineTags, setInlineTags] = useState([]);
  useEffect(() => {
    setInlineTags(s.split(new RegExp(inlineRegexPatterns)));
  }, [s]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, inlineTags.map((inlineTag, ind) => {
    return /*#__PURE__*/React.createElement(DesignateInlineTag, _extends({
      key: "" + Date.now + ind
    }, {
      inlineTag
    }));
  }));

  function createInlinePattern(patterns) {
    return Object.values(patterns).reduce((t, v, i) => {
      // Adds the "or" symbol if not the first item
      let prepend = i !== 0 ? "|" : "";
      return v.regExPattern ? t += prepend + v.regExPattern : t;
    }, "");
  }
}