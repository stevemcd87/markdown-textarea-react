import React, {useState, useEffect} from "react";
import DesignateInlineTag from "./DesignateInlineTag";
import INLINEREGEXPATTERNS from "./variables/INLINEREGEXPATTERNS.js"

const InlineTag = ({s}) => {
  let inlineRegexPatterns = createInlinePattern(INLINEREGEXPATTERNS),
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
    // Creates a string that will be use for 'new Reg Exp'
    return Object.values(patterns).reduce((t, v, i) => {
      // Adds the "or" symbol if not the first item
      let prepend = i !== 0 ? "|" : "";
      return v.regExPattern ? (t += prepend + v.regExPattern) : t;
    }, "");
  }
}

export default InlineTag;
