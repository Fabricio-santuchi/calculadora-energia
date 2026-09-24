import { render, screen } from "@testing-library/react";

test("renderiza um elemento na tela", () => {
  render(<p>oi</p>);
  expect(screen.getByText("oi")).toBeInTheDocument();
});
