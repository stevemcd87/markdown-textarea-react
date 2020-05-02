import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
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
      value: "- hey1\n* hey2"
    }
  });
  const containersList = [...container.querySelectorAll("li")];
  expect(containersList.length).toBe(2);
  expect(containersList[0].innerHTML).toBe("hey1");
  expect(containersList[1].innerHTML).toBe("hey2");
});
