import {
  convertToReversePolishNotation,
  evaluateReversePolishNotation,
} from "./shunting-yard";

test("basic", () => {
  const reversePolishNotation = convertToReversePolishNotation(
    "3 + 4 * 2 / ( 1 - 5 ) ^ 2 ^ 3"
  );
  expect(reversePolishNotation).toEqual([
    "3",
    "4",
    "2",
    "*",
    "1",
    "5",
    "-",
    "2",
    "3",
    "^",
    "^",
    "/",
    "+",
  ]);

  const result = evaluateReversePolishNotation(reversePolishNotation);
  expect(result).toBe(3.001953125);
});

test("with functions", () => {
  const reversePolishNotation = convertToReversePolishNotation(
    "sin ( max ( 2, 3 ) / 3 * 9 )"
  );

  expect(reversePolishNotation).toEqual([
    "2",
    "3",
    "max",
    "3",
    "/",
    "9",
    "*",
    "sin",
  ]);

  const result = evaluateReversePolishNotation(reversePolishNotation);
  expect(result).toBe(0.4121184852417566);
});

test("with N arguments", () => {
  const reversePolishNotation = convertToReversePolishNotation(
    "9 + max ( 2, 3, 4, 5 )"
  );

  expect(reversePolishNotation).toEqual(["9", "2", "3", "4", "5", "max", "+"]);

  const result = evaluateReversePolishNotation(reversePolishNotation);
  expect(result).toBe(0.4121184852417566);
});
