import "jest";
import { addition } from "./add";

test("must return the addition of 2 + 1", () => {
  const result = addition(1, 2);
  expect(result).toBe(3);
});
