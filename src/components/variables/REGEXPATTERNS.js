const REGEXPATTERNS = [
  {
    regExPattern: ["^(```.+?```$)", "gms"],
    htmlTag: "code"
  },
  {
    regExPattern: ["^#{6}"],
    htmlTag: "h6"
  },
  {
    regExPattern: ["^#{5}"],
    htmlTag: "h5"
  },
  {
    regExPattern: ["^#{4}"],
    htmlTag: "h4"
  },
  {
    regExPattern: ["^#{3}"],
    htmlTag: "h3"
  },
  {
    regExPattern: ["^#{2}"],
    htmlTag: "h2"
  },
  {
    regExPattern: ["^#"],
    htmlTag: "h1"
  },
  {
    regExPattern: ["^>"],
    htmlTag: "blockquote"
  },
  {
    regExPattern: [
      "(^\\-\\s.+\\n+((?:^\\-\\s.+\\n)?(^\\s{2}\\-\\s.+\\s)+)?)+",
      "gm"
    ],
    htmlTag: "ul"
  },
  {
    regExPattern: [
      "(^\\|.+\\|\\n)+",
      "gm"
    ],
    htmlTag: "table"
  }
];

export default REGEXPATTERNS;
