const REGEXPATTERNS = {
  heading: {
    regExPattern: ["^#{1,6}\\s"],
    htmlTag: s => `h${s.match(/^#{1,6}\s/)[0].length - 1}`
  },
  blockquote: {
    regExPattern: ["^>\\s"],
    htmlTag: s => "blockquote"
  },
  code: {
    regExPattern: ["^(```.*?```$)", "gms"],
    htmlTag: s => "code"
  },
  ul: {
    regExPattern: [
      "(^\\-\\s.+\\n+((?<=^\\-\\s.+\\n)(^\\s{2}\\-\\s.+\\s)+)?)+",
      "gm"
    ],
    htmlTag: s => "ul"
  }
};

export default REGEXPATTERNS;
