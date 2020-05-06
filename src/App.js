import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  let [htmlElements, setHtmlElements] = useState([]);
  return (
    <div className="App">
      <textarea className="mtr-textarea" onChange={updatePreview} />
      <Preview {...{ htmlElements }} />
    </div>
  );

  function updatePreview(e) {
    // TODO:
    let textValue = e.target.value,
      // An array of all code markdown found
      codeBlocks = findCodeBlocks(textValue),
      // Split textarea's value by linebreaks
      lineBreaks = removeCodeBlocks(textValue).split(/\n/g);
    if (codeBlocks) lineBreaks = returnCodeBlocks(codeBlocks, lineBreaks);
    // Wrap each line break with a designated element
    const markdownRows = lineBreaks.map(designateElement);

    setHtmlElements(markdownRows);
  }

  function findCodeBlocks(textValue) {
    let codePattern = new RegExp(...REGEXPATTERNS.code.regExPattern);
    return textValue.match(codePattern);
  }
  function removeCodeBlocks(textValue) {
    let codePattern = new RegExp(...REGEXPATTERNS.code.regExPattern);
    // Removes code blocks and replaces with <MTR-code-MTR> for placement
    return textValue.replace(codePattern, "\n<MTR-code-MTR>\n");
  }
  function returnCodeBlocks(codeBlocks, lineBreaks) {
    let lb = lineBreaks.slice();
    codeBlocks.forEach(cb => {
      lb[lb.findIndex(v => v === "<MTR-code-MTR>")] = cb;
    });
    return lb;
  }

  function designateElement(text) {
    // HTML Element will have a default of the p tag
    let htmlTag = "p",
      // The text to be put into the htmlTag
      elementText = text.slice(),
      // Searches text for a markdown pattern
      matchedPattern = searchForMatch(text);
    // updates htmlTag & elementText if matchedPattern was found
    if (matchedPattern) {
      htmlTag = matchedPattern.htmlTag(text);
      if (htmlTag !== "code")
        elementText = text.replace(
          text.match(new RegExp(...matchedPattern.regExPattern))[0],
          ""
        );
    }
    return { htmlTag, elementText };
  }

  function searchForMatch(text) {
    // Searches text for any Markdown pattern('##', '>', etc...)
    return Object.values(REGEXPATTERNS).find(pattObject => {
      return text.match(new RegExp(...pattObject.regExPattern));
    });
  }
}

function Preview(props) {
  let { htmlElements } = props;
  return (
    <div className="mtr-preview">
      {htmlElements.map((element, ind) => {
        return (
          <React.Fragment key={"" + Date.now() + ind}>
            {HTMLTAGS[element.htmlTag](element.elementText)}
          </React.Fragment>
        );
      })}
    </div>
  );
}

const REGEXPATTERNS = {
  heading: {
    regExPattern: ["^#{1,6}\\s"],
    htmlTag: s => `h${s.match(/^#{1,6}\s/)[0].length - 1}`
  },
  blockquote: {
    regExPattern: ["^>\\s"],
    htmlTag: s => "blockquote"
  },
  list: {
    regExPattern: ["^(-|\\*|\\+)\\s"],
    htmlTag: s => "li"
  },
  code: {
    regExPattern: ["```\\s*.*\\s*```\\n", "g"],
    htmlTag: s => "code"
  }
};

const HTMLTAGS = {
  p: s => (
    <p className="mtr-p">
      <InlineTag {...{ s }} />
    </p>
  ),
  h1: s => <h1 className="mtr-h1">{s}</h1>,
  h2: s => <h2 className="mtr-h2">{s}</h2>,
  h3: s => <h3 className="mtr-h3">{s}</h3>,
  h4: s => <h4 className="mtr-h4">{s}</h4>,
  h5: s => <h5 className="mtr-h5">{s}</h5>,
  h6: s => <h6 className="mtr-h6">{s}</h6>,
  li: s => <li className="mtr-li">{s}</li>,
  code: code => <CodeTag {...{ code }} />,
  blockquote: s => <blockquote className="mtr-blockquote">{s}</blockquote>
};

function InlineTag(props) {
  let { s } = props,
    inlineRegexPatterns = createInlinePattern(INLINEREGEXPATTERNS),
    [inlineTags, setInlineTags] = useState([]);
  useEffect(() => {
    setInlineTags(s.split(new RegExp(inlineRegexPatterns)));
  }, [s]);
  // useEffect(()=>{
  //   console.log('inlineTags');
  //   console.log(inlineTags);
  // },[inlineTags])
  return (
    <>
      {inlineTags.map((inlineTag, ind) => {
        return <DesignateTag key={"" + Date.now + ind} {...{ inlineTag }} />;
      })}
    </>
  );
}

const INLINEREGEXPATTERNS = {
  // For Inline HTML elements (span,strong,em,etc...)
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
  }
};

const INLINEHTMLTAGS = {
  strongEm: s => (
    <strong className="mtr-strong">
      <em className="mtr-em">{updateTagString("strongEm", s)}</em>
    </strong>
  ),
  strong: s => (
    <strong className="mtr-strong">{updateTagString("strong", s)}</strong>
  ),
  em: s => <em className="mtr-em">{updateTagString("em", s)}</em>,
  a: s => (
    <a className="mtr-a" href={updateATag("a", "href", s)} target="_blank">
      {updateATag("a", "text", s)}
    </a>
  ),
  sup: s => <sup className="mtr-sup">{updateTagString("sup", s)}</sup>,
  sub: s => <sub className="mtr-sub">{updateTagString("sub", s)}</sub>
};

function updateATag(key, attr, string) {
  if (attr === "href")
    return string.replace(
      new RegExp(...INLINEREGEXPATTERNS[key].replacePatternHREF),
      ""
    );
  else
    return string.replace(
      new RegExp(...INLINEREGEXPATTERNS[key].replacePatternText),
      ""
    );
}

function updateTagString(key, string) {
  return string.replace(
    new RegExp(...INLINEREGEXPATTERNS[key].replacePattern),
    ""
  );
}

function createInlinePattern(patterns) {
  return Object.values(patterns).reduce((t, v, i) => {
    // Adds the "or" symbol if not the first item
    let prepend = i !== 0 ? "|" : "";
    return v.regExPattern ? (t += prepend + v.regExPattern) : t;
  }, "");
}

function DesignateTag(props) {
  let { inlineTag } = props,
    testPatterns = createTestPatterns(INLINEREGEXPATTERNS),
    selectedPattern = findPattern(testPatterns);
  if (selectedPattern) {
    return INLINEHTMLTAGS[selectedPattern.htmlTag(inlineTag)](inlineTag);
  }
  return <span>{inlineTag ? inlineTag : ""}</span>;
  function createTestPatterns(patterns) {
    return Object.values(patterns);
  }
  function findPattern(patterns) {
    return patterns.find(p => new RegExp(p.testPattern).test(inlineTag));
  }
}

function CodeTag(props) {
  let { code } = props,
    displayedCode = code.replace(/```/g, "");
  return (
    <div className="mtr-code-component">
      <code className="mtr-code">{displayedCode}</code>
    </div>
  );
}

export default App;
