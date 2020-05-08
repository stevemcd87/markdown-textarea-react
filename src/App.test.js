import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";

it("should display h1 - h6 tags", () => {
  const { container } = render(<App />);
  let val = {
    h1WithEm: "# *hey1*\n",
    h2WithStrong: "## **hey2**\n",
    h3WithStrongEm: "### ***hey3***\n",
    h4WithATag: "#### [hey4](https://google.com)\n",
    h5WithSupNSub: "##### hey<sup>1</sup> hey<sub>2</sub>\n",
    h6: "###### hey6\n"
  };
  fireEvent.change(container.querySelector(".mtr-textarea"), {
    target: {
      value: Object.values(val).join("")
    }
  });
  expect(container.querySelector(".mtr-h1 .mtr-em").innerHTML).toBe("hey1");
  expect(container.querySelector(".mtr-h2 .mtr-strong").innerHTML).toBe("hey2");
  expect(container.querySelector(".mtr-h3 .mtr-strong .mtr-em").innerHTML).toBe(
    "hey3"
  );
  expect(container.querySelector(".mtr-h4 .mtr-a").href).toBe(
    "https://google.com/"
  );
  expect(container.querySelector(".mtr-h4 .mtr-a").innerHTML).toBe("hey4");
  expect(container.querySelector(".mtr-h5 .mtr-sup").innerHTML).toBe("1");
  expect(container.querySelector(".mtr-h5 .mtr-sub").innerHTML).toBe("2");
  expect(container.querySelector(".mtr-h6").innerHTML).toBe("hey6");
});

it("should display a blockquote tag", () => {
  const { container } = render(<App />);
  fireEvent.change(container.querySelector(".mtr-textarea"), {
    target: {
      value: "> hey"
    }
  });
  expect(container.querySelector("blockquote").innerHTML).toBe("hey");
});

it("should display li tags", () => {
  const { container } = render(<App />);
  fireEvent.change(container.querySelector(".mtr-textarea"), {
    target: {
      value: "- hey1\n- hey2\n  - hey21\n- hey3\n"
    }
  });
  let containersList = [
    ...container.querySelector("ul").querySelectorAll("li")
  ];
  expect(containersList.length).toBe(4);
  expect(containersList[0].innerHTML).toBe("hey1\n");
  expect(containersList[1].innerHTML).toBe("hey2\n");
  expect(containersList[2].innerHTML).toBe("hey21\n");
  expect(containersList[3].innerHTML).toBe("hey3\n");
});

it("should display a code tag", () => {
  const { container } = render(<App />);
  fireEvent.change(container.querySelector(".mtr-textarea"), {
    target: { value: "```\nvar a = [];\nvar b = 2;\n```\n" }
  });
  // expect([...container.querySelectorAll("code")].length).toBe(2);
  expect(container.querySelector("code").innerHTML).toBe(
    "<span>var a = [];<br></span><span>var b = 2;<br></span>"
  );
});

it("should display a strong and/or em tag", () => {
  const { container } = render(<App />);
  fireEvent.change(container.querySelector(".mtr-textarea"), {
    target: {
      value: " `hey * hey-em* hey **hey-strong** hey ***hey-st-em*** `"
    }
  });
  expect(container.querySelector("em").innerHTML).toBe(" hey-em");
  expect(container.querySelector("strong").innerHTML).toBe("hey-strong");
  expect(container.querySelector("strong em").innerHTML).toBe("hey-st-em");
});

it("should display a link", () => {
  const { container } = render(<App />);
  fireEvent.change(container.querySelector(".mtr-textarea"), {
    target: {
      value: "[hey](https://www.google.com)"
    }
  });
  expect(container.querySelector("a").href).toBe("https://www.google.com/");
});

it("should display a sup tag", () => {
  const { container } = render(<App />);
  fireEvent.change(container.querySelector(".mtr-textarea"), {
    target: {
      value: "5<sup>5</sup>"
    }
  });
  expect(container.querySelector("sup").innerHTML).toBe("5");
});

it("should display a sub tag", () => {
  const { container } = render(<App />);
  fireEvent.change(container.querySelector(".mtr-textarea"), {
    target: {
      value: "5<sub>6</sub>"
    }
  });
  expect(container.querySelector(".mtr-sub").innerHTML).toBe("6");
});

it("should display all inline tags", () => {
  const { container } = render(<App />);
  fireEvent.change(container.querySelector(".mtr-textarea"), {
    target: {
      value:
        " * hey-em* hey **hey-strong** hey ***hey-st-em*** [hey](https://www.google.com) 5<sup> 7</sup> 5<sub>6</sub>"
    }
  });
  expect(container.querySelector("em").innerHTML).toBe(" hey-em");
  expect(container.querySelector("strong").innerHTML).toBe("hey-strong");
  expect(container.querySelector("strong em").innerHTML).toBe("hey-st-em");
  expect(container.querySelector(".mtr-a").href).toBe(
    "https://www.google.com/"
  );
  expect(container.querySelector(".mtr-a").innerHTML).toBe("hey");
  expect(container.querySelector(".mtr-sup").innerHTML).toBe(" 7");
  expect(container.querySelector(".mtr-sub").innerHTML).toBe("6");
});

it("should display h1, ul, and code tags", () => {
  const { container } = render(<App />);
  fireEvent.change(container.querySelector(".mtr-textarea"), {
    target: {
      value: "```\nvar a = [];\nvar b = 2;\n```\n# hey 1\n- list1\n"
    }
  });
  expect(container.querySelector("code").innerHTML).toBe(
    "<span>var a = [];<br></span><span>var b = 2;<br></span>"
  );
  expect(container.querySelector("h1").innerHTML).toBe("hey 1");
  expect(container.querySelector("ul li").innerHTML).toBe("list1\n");
});

it("should be able to do multiple code tags", () => {
  const { container } = render(<App />);
  fireEvent.change(container.querySelector(".mtr-textarea"), {
    target: {
      value:
        "```\nvar a = [];\nvar b = 2;\n```\n# hey 1\n- list1\n```\nvar a = [];\nvar b = 2;\n```\n"
    }
  });
  expect(container.querySelectorAll("code").length).toBe(2);
  expect(container.querySelector("code").innerHTML).toBe(
    "<span>var a = [];<br></span><span>var b = 2;<br></span>"
  );
  expect(container.querySelector("h1").innerHTML).toBe("hey 1");
  expect(container.querySelector("ul li").innerHTML).toBe("list1\n");
});

it("li should be able to display inline tags in ul", () => {
  const { container } = render(<App />);
  fireEvent.change(container.querySelector(".mtr-textarea"), {
    target: {
      value: "- *hey*\n- **hey2**\n- ***hey23***\n"
    }
  });
  let li = [...container.querySelectorAll("ul li")];
  expect(li.length).toBe(3);
  expect(li[0].querySelector(".mtr-em").innerHTML).toBe("hey");
  expect(li[1].querySelector(".mtr-strong").innerHTML).toBe("hey2");
  expect(li[2].querySelector(".mtr-strong > .mtr-em").innerHTML).toBe("hey23");
});

it("should be able to display multiple of the same inline tags", () => {
  const { container } = render(<App />);
  fireEvent.change(container.querySelector(".mtr-textarea"), {
    target: {
      value: "*hey* **hey2** ***hey23*** *hey* **hey2** ***hey23***"
    }
  });

  expect(container.querySelectorAll("em").length).toBe(4);
  expect(container.querySelectorAll("strong").length).toBe(4);
});

it("should display table with thead,th,tbody,td tags", () => {
  const { container } = render(<App />);
  fireEvent.change(container.querySelector(".mtr-textarea"), {
    target: {
      value:
        "| Syntax | Description |\n| --- | ----------- |\n| Header | Title |\n| Paragraph | Text |\n"
    }
  });
  console.log(container.querySelector("table").innerHTML);
  expect(container.querySelectorAll("thead th").length).toBe(2);
  expect(container.querySelectorAll("tbody td").length).toBe(4);
});

it("should display inline code tag", () => {
  const { container } = render(<App />);
  fireEvent.change(container.querySelector(".mtr-textarea"), {
    target: {
      value: "````` *hey* 1 `var a = []` "
    }
  });
  expect(container.querySelectorAll("code").length).toBe(2);
  expect(container.querySelector("em").innerHTML).toBe("hey");
  expect(container.querySelectorAll("code")[0].innerHTML).toBe("```");
  expect(container.querySelectorAll("code")[1].innerHTML).toBe("var a = []");
});
