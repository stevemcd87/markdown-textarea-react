import React, {useState, useEffect} from "react";
import DesignateInlineTag from "./DesignateInlineTag"
import INLINEHTMLTAGS from "../variables/INLINEHTMLTAGS.js"
import INLINEREGEXPATTERNS from "../variables/INLINEREGEXPATTERNS.js"

export default function InlineTag(props) {
  let { s } = props,
    inlineRegexPatterns = createInlinePattern(INLINEREGEXPATTERNS),
    [inlineTags, setInlineTags] = useState([]);
  useEffect(() => {
    setInlineTags(s.split(new RegExp(inlineRegexPatterns)));
  }, [s]);
  return (
    <>
      {inlineTags.map((inlineTag, ind) => {
        return <DesignateInlineTag key={"" + Date.now + ind} {...{ inlineTag }} />;
      })}
    </>
  );
  function createInlinePattern(patterns) {
    return Object.values(patterns).reduce((t, v, i) => {
      // Adds the "or" symbol if not the first item
      let prepend = i !== 0 ? "|" : "";
      return v.regExPattern ? (t += prepend + v.regExPattern) : t;
    }, "");
  }
}
