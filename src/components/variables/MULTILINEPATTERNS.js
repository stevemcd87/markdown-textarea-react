const MULTILINEPATTERNS = {
  code: {
    regExPattern: ["^(```.*?```$)", "gms"],
    replaceTag: "<MTR-code-MTR>"
  },
  ul: {
    regExPattern: [
      "(((^\\-\\s.+\\n)+((?:^\\-\\s.+\\n)?(^\\s{2}\\-\\s.+\\s)*)?)+)",
      "gm"
    ],
    replaceTag: "<MTR-ul-MTR>"
  },
  table: {
    regExPattern: ["(^\\|.+\\|\\n)+", "gm"],
    replaceTag: "<MTR-table-MTR>"
  }
};

export default MULTILINEPATTERNS;
