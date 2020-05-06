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
      uls = findUL(textValue),
      // Split textarea's value by linebreaks
      lineBreaks = removeUL(removeCodeBlocks(textValue)).split(/\n/g);
    if (codeBlocks) lineBreaks = returnCodeBlocks(codeBlocks, lineBreaks);
    if (uls) lineBreaks = returnUL(uls, lineBreaks);
    // if (uls.length) lineBreaks = returnUL(uls, lineBreaks);
    // Wrap each line break with a designated element
    const markdownRows = lineBreaks.map(designateElement);

    setHtmlElements(markdownRows);
  }

  function findUL(textValue) {
    let ulPattern = new RegExp(...REGEXPATTERNS.ul.regExPattern);
    return textValue.match(ulPattern);
  }
  function removeUL(textValue) {
    let ulPattern = new RegExp(...REGEXPATTERNS.ul.regExPattern);
    // Removes code blocks and replaces with <MTR-code-MTR> for placement
    return textValue.replace(ulPattern, "\n<MTR-ul-MTR>\n");
  }
  function returnUL(uls, lineBreaks) {
    let lb = lineBreaks.slice();
    uls.forEach(ul => {
      let index = lb.findIndex(v => v && v === "<MTR-ul-MTR>");
      if (index) lb[index] = ul;
    });
    return lb;
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
      if (htmlTag !== "code" && htmlTag !== "ul")
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
  // (((^\-\s.+\n)*((?<=^\-\s.+\n)(^\s{2}\-\s.+\s)*)?)*)
  // list: {
  //   regExPattern: ["^(-|\\*|\\+)\\s", "m"],
  //   htmlTag: s => "li"
  // },
  code: {
    regExPattern: ["^```\\n(.|\\n)*\\n```", "g"],
    htmlTag: s => "code"
  },
  ul: {
    regExPattern: [
      "(((^\\-\\s.+\\n)+((?<=^\\-\\s.+\\n)(^\\s{2}\\-\\s.+\\s)*)?)+)",
      "gm"
    ],
    htmlTag: s => "ul"
  }
};

const HTMLTAGS = {
  p: s => (
    <p className="mtr-p">
      <InlineTag {...{ s }} />
    </p>
  ),
  h1: s => (
    <h1 className="mtr-h1">
      <InlineTag {...{ s }} />
    </h1>
  ),
  h2: s => (
    <h2 className="mtr-h2">
      <InlineTag {...{ s }} />
    </h2>
  ),
  h3: s => (
    <h3 className="mtr-h3">
      <InlineTag {...{ s }} />
    </h3>
  ),
  h4: s => (
    <h4 className="mtr-h4">
      <InlineTag {...{ s }} />
    </h4>
  ),
  h5: s => (
    <h5 className="mtr-h5">
      <InlineTag {...{ s }} />
    </h5>
  ),
  h6: s => (
    <h6 className="mtr-h6">
      <InlineTag {...{ s }} />
    </h6>
  ),
  // li: s => (
  //   <li className="mtr-li">
  //     <InlineTag {...{ s }} />
  //   </li>
  // ),
  ul: ul => <UlTag {...{ ul }} />,
  code: code => <CodeTag {...{ code }} />,
  blockquote: s => (
    <blockquote className="mtr-blockquote">
      <InlineTag {...{ s }} />
    </blockquote>
  )
};

function UlTag(props) {
  let { ul } = props,
    [liTags, setLiTags] = useState([]);
  useEffect(() => {
    // console.log("ul");
    // console.log(ul);
    setLiTags(createLiTags(ul));
  }, [ul]);
  useEffect(() => {
    console.log("iTags");
    console.log(liTags);
    // setLiTags(createLiTags(ul));
  }, [liTags]);
  return (
    <ul className="mtr-ul">
      {liTags.map((li, ind) => (
        <LiTag key={"" + Date.now() + ind} {...{ li }} />
      ))}
    </ul>
  );
  function createLiTags(list) {
    let nested = /^\s{2}\-\s/.test(list),
      regex = nested
        ? "(^\\s{2}\\-s.*)+"
        : "(^\\-\\s.+\\n)|(^\\-\\s.+\\n)(?<=^\\-\\s.+\\n)(^\\s{2}\\-\\s.+\\s)+?";
    return list.split(new RegExp(regex, "gm"));
  }
}

function LiTag(props) {
  let { li } = props,
    [nestedPortion, setNestedPortion] = useState("");
  useEffect(() => {
    if (li) setNestedPortion(li.match(/(^\s{2}\-\s)+/gm));
  }, []);
  if (!li) return "";
  if (nestedPortion) return <UlTag ul={li.replace(/(^\s{2})+/gm, "")} />;
  return (
    <li className="mtr-li">
      {li.replace(/^\-\s/, "").replace(/(^\s{2}\-\s.+)+/gm,"")}
    </li>
  );
}
// {nestedPortion ? <UlTag ul={nestedPortion} /> : ""}

function InlineTag(props) {
  let { s } = props,
    inlineRegexPatterns = createInlinePattern(INLINEREGEXPATTERNS),
    [inlineTags, setInlineTags] = useState([]);
  useEffect(() => {
    setInlineTags(s.split(new RegExp(inlineRegexPatterns)));
  }, [s]);
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
  return <>{inlineTag ? inlineTag : ""}</>;
  function createTestPatterns(patterns) {
    return Object.values(patterns);
  }
  function findPattern(patterns) {
    return patterns.find(p => new RegExp(p.testPattern).test(inlineTag));
  }
}

function CodeTag(props) {
  let { code } = props,
    displayedCode = code
      .replace(/```/g, "")
      .split(/\n/g)
      .filter(v => v);
  return (
    <div className="mtr-code-component">
      <code className="mtr-code">
        {displayedCode.map((codeLine, ind) => {
          return (
            <span key={"" + Date.now() + ind}>
              {codeLine}
              <br />
            </span>
          );
        })}
      </code>
    </div>
  );
  function displayCode() {
    return;
  }
}

export default App;
