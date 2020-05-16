const REGEXPATTERNS = {
  code: {
    regExPattern: ["^(```.+?```$)", "gms"],
    htmlTag: "code"
  },
  h6: {
    regExPattern: ["^#{6}"],
    htmlTag: "h6"
  },
  h5: {
    regExPattern: ["^#{5}"],
    htmlTag: "h5"
  },
  h4: {
    regExPattern: ["^#{4}"],
    htmlTag: "h4"
  },
  h3: {
    regExPattern: ["^#{3}"],
    htmlTag: "h3"
  },
  h2: {
    regExPattern: ["^#{2}"],
    htmlTag: "h2"
  },
  h1: {
    regExPattern: ["^#"],
    htmlTag: "h1"
  },
  blockquote: {
    regExPattern: ["^>"],
    htmlTag: "blockquote"
  },
  ul: {
    regExPattern: ["(^\\-\\s.+\\n+((?:^\\-\\s.+\\n)?(^\\s{2}\\-\\s.+\\s)+)?)+", "gm"],
    htmlTag: "ul"
  },
  table: {
    regExPattern: ["(^\\|.+\\|\\n)+", "gm"],
    htmlTag: "table"
  }
};
export default REGEXPATTERNS;