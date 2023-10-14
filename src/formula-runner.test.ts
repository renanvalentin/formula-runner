import { evaluate } from "./formula-runner";
import { Matrix } from "./matrix";

const matrix: Matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

[
  ["(SUM(A1:B2) / C1) * 5", 20],
  ["MAX((SUM(A1:B2) / C1) * 5, 30)", 30],
  ["SUM(A1:A3, SUM(B1:C3)) + B2 * C3 / SUM(A1, B2)", 52.5],
].forEach(([input, expected]) => {
  test(`input: ${input}, expected: ${expected}`, () => {
    const result = evaluate(input as string, matrix);
    expect(result).toBe(expected);
  });
});
