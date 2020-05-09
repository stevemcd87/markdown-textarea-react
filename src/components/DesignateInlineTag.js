import React from "react";
import INLINEHTMLTAGS from "./variables/INLINEHTMLTAGS.js"
import INLINEREGEXPATTERNS from "./variables/INLINEREGEXPATTERNS.js"

export default function DesignateInlineTag(props) {
  let { inlineTag } = props,
    testPatterns = createTestPatterns(INLINEREGEXPATTERNS),
    selectedPattern = findPattern(testPatterns);
  if (selectedPattern) {
    return INLINEHTMLTAGS[selectedPattern.htmlTag(inlineTag)](inlineTag);
  }
  return <>{inlineTag ? inlineTag : ""}</>;
  function createTestPatterns(patterns) {
    return Object.values(patterns);
  }
  function findPattern(patterns) {
    return patterns.find(p => new RegExp(p.testPattern).test(inlineTag));
  }
}
