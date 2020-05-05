import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";

it("should display h1 - h6 tags", () => {
  const { container } = render(<App />);
  fireEvent.change(container.querySelector(".mtr-textarea"), {
    target: {
      value: "# hey1\n## hey2\n### hey3\n#### hey4\n##### hey5\n###### hey6"
    }
  });
  expect(container.querySelector("h1").innerHTML).toBe("hey1");
  expect(container.querySelector("h2").innerHTML).toBe("hey2");
  expect(container.querySelector("h3").innerHTML).toBe("hey3");
  expect(container.querySelector("h4").innerHTML).toBe("hey4");
  expect(container.querySelector("h5").innerHTML).toBe("hey5");
  expect(container.querySelector("h6").innerHTML).toBe("hey6");
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
      value: "- hey1\n* hey2\n+ hey3"
    }
  });
  const containersList = [...container.querySelectorAll("li")];
  expect(containersList.length).toBe(3);
  expect(containersList[0].innerHTML).toBe("hey1");
  expect(containersList[1].innerHTML).toBe("hey2");
  expect(containersList[2].innerHTML).toBe("hey3");
});

it("should display a code tag", () => {
  const { container } = render(<App />);
  fireEvent.change(container.querySelector(".mtr-textarea"), {
    target: { value: "```var a = [];```\n```b```\n" }
  });
  expect([...container.querySelectorAll("code")].length).toBe(2);
  expect(container.querySelector("code.mtr-code:first-of-type").innerHTML).toBe(
    "var a = [];\n"
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

it ("should display a link",()=>{
  const {container} = render(<App />);
  fireEvent.change(container.querySelector(".mtr-textarea"), {
    target: {
      value: "[hey](https://www.google.com)"
    }
  });
console.log(container.querySelector('a').href);
  expect(container.querySelector('a').href).toBe("https://www.google.com/")

})
