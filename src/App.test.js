import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";

it("should display h1 - h6 tags", () => {
  const { container } = render(<App />);
  let val = {
    h1WithEm: "# *hey1*\n",
    h2WithStrong:"## **hey2**\n",
    h3WithStrongEm: "### ***hey3***\n",
    h4WithATag:"#### [hey4](https://google.com)\n",
    h5WithSupNSub: "##### hey<sup>1</sup> hey<sub>2</sub>\n",
    h6:"###### hey6\n",
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
  let containersList = [...container.querySelector("ul").querySelectorAll("li")];
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
