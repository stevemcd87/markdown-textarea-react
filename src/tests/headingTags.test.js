import React from "react";
import { render, fireEvent } from "@testing-library/react";
import MarkdownTextarea from "../components/MarkdownTextarea/MarkdownTextarea";

it("should display h1 - h6 tags", () => {
  const { container } = render(<MarkdownTextarea />);
  let val = {
    h1WithEm: "#*hey1*\n",
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
  expect(container.querySelector(".mtr-h6").innerHTML).toMatch(/hey6/);
});
