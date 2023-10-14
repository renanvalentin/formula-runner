import { evaluate } from "./formula-runner";
import { Matrix } from "./matrix";

const matrix: Matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

test("basic", () => {
  const input = "(SUM(A1:B2) / C1) * 5";
  const result = evaluate(input, matrix);

  expect(result).toBe(20);
});
