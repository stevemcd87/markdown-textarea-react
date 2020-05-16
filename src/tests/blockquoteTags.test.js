import React from "react";
import { render, fireEvent } from "@testing-library/react";
import MarkdownTextarea from "../components/MarkdownTextarea/MarkdownTextarea";



it("should display a blockquote tag", () => {
  const { container } = render(<MarkdownTextarea />);
  fireEvent.change(container.querySelector(".mtr-textarea"), {
    target: {
      value: "> hey"
    }
  });
  expect(container.querySelector("blockquote").innerHTML).toMatch("hey");
});
