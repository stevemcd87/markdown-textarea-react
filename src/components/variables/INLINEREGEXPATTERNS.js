const INLINEREGEXPATTERNS = {
  // To find Inline HTML elements (span,strong,em,etc...)
  strongEm: {
    regExPattern: "(\\*{1,3}.+?\\*{1,3})",
    testPattern: ["\\*{3}.+?\\*{3}"],
    replacePattern: ["\\*{3}", "g"],
    htmlTag: s => "strongEm"
  },
  strong: {
    testPattern: ["\\*{2}.+?\\*{2}"],
    htmlTag: s => "strong",
    replacePattern: ["\\*{2}", "g"]
  },
  em: {
    testPattern: ["\\*{1}.+?\\*{1}"],
    replacePattern: ["\\*", "g"],
    htmlTag: s => "em"
  },
  a: {
    regExPattern: "(\\[.+\\]\\(.+\\))",
    testPattern: ["\\[.+\\]\\(.+\\)"],
    replacePatternHREF: ["\\[.+\\]\\(|\\)", "g"],
    replacePatternText: ["\\[|\\](.+)", "g"],
    htmlTag: s => "a"
  },
  sup: {
    regExPattern: "(<sup>.+</sup>)",
    testPattern: ["<sup>.+<\\/sup>"],
    replacePattern: ["<sup>|<\\/sup>", "g"],
    htmlTag: s => "sup"
  },
  sub: {
    regExPattern: "(<sub>.+</sub>)",
    testPattern: ["<sub>.+<\\/sub>"],
    replacePattern: ["<sub>|<\\/sub>", "g"],
    htmlTag: s => "sub"
  },
  code: {
    regExPattern: "(`.+?`)(?=\\s)",
    testPattern: ["`.+?`"],
    replacePattern: ["^`|`$", "g"],
    htmlTag: s => "code"
  }
};

export default INLINEREGEXPATTERNS;
