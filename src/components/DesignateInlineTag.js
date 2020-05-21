import React, {useMemo} from "react";
import INLINEHTMLTAGS from "./variables/INLINEHTMLTAGS.js";
import INLINEREGEXPATTERNS from "./variables/INLINEREGEXPATTERNS.js";

export default function DesignateInlineTag(props) {
  let { inlineTag } = props,
    selectedPattern = findPattern(Object.values(INLINEREGEXPATTERNS),inlineTag);
    // selectedPattern = useMemo(()=>findPattern(Object.values(INLINEREGEXPATTERNS),inlineTag),[inlineTag,INLINEREGEXPATTERNS]);

  if (selectedPattern) {
    return INLINEHTMLTAGS[selectedPattern.htmlTag(inlineTag)](inlineTag);
  }
  return <>{inlineTag || ""}</>;
function findPattern(patterns,tag) {
    return patterns.find(p => new RegExp(p.testPattern).test(tag));
  }
}
