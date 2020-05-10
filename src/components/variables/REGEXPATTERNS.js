const REGEXPATTERNS = {
  code: {
    regExPattern: ["^(```.+?```$)", "gms"],
    htmlTag: s => "code"
  },
  heading: {
    regExPattern: ["^#{1,6}\\s"],
    htmlTag: s => `h${s.match(/^#{1,6}\s/)[0].length - 1}`
  },
  blockquote: {
    regExPattern: ["^>\\s"],
    htmlTag: s => "blockquote"
  },
  ul: {
    regExPattern: [
      "(^\\-\\s.+\\n+((?<=^\\-\\s.+\\n)(^\\s{2}\\-\\s.+\\s)+)?)+",
      "gm"
    ],
    htmlTag: s => "ul"
  },
  table: {
    regExPattern: [
      "(^\\|.+\\|\\n)+",
      "gm"
    ],
    htmlTag: s => "table"
  }
};

export default REGEXPATTERNS;
