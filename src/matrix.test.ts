import { Matrix, getMatrixCell, getMatrixValues } from "./matrix";

const matrix: Matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

test("returns the matrix values given a valid range", () => {
  const values = getMatrixValues("A1:B2", matrix);
  expect(values).toEqual([1, 2, 4, 5]);
});

test("get the value of a matrix cell", () => {
  const value = getMatrixCell("C2", matrix);
  expect(value).toBe(6);
});
