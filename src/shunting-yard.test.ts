import {
  convertToReversePolishNotation,
  evaluateReversePolishNotation,
} from "./shunting-yard";

import { tokenize } from "./tokenizer";

test("basic", () => {
  const tokens = tokenize("3 + 4 * 2 / ( 1 - 5 ) ^ 2 ^ 3");

  const reversePolishNotation = convertToReversePolishNotation(tokens);

  expect(reversePolishNotation).toEqual([
    { type: "NUMBER", value: "3" },
    { type: "NUMBER", value: "4" },
    { type: "NUMBER", value: "2" },
    { type: "*", value: "*" },
    { type: "NUMBER", value: "1" },
    { type: "NUMBER", value: "5" },
    { type: "-", value: "-" },
    { type: "NUMBER", value: "2" },
    { type: "NUMBER", value: "3" },
    { type: "^", value: "^" },
    { type: "^", value: "^" },
    { type: "/", value: "/" },
    { type: "+", value: "+" },
  ]);

  const result = evaluateReversePolishNotation(reversePolishNotation);
  expect(result).toBe(3.0001220703125);
});

test("with functions", () => {
  const tokens = tokenize("max( 2, 3 ) / 3 * 9");

  const reversePolishNotation = convertToReversePolishNotation(tokens);

  expect(reversePolishNotation).toEqual([
    { type: "NUMBER", value: "2" },
    { type: "NUMBER", value: "3" },
    { type: "NUMBER", value: "2" },
    { type: "FUNCTION", value: "MAX" },
    { type: "NUMBER", value: "3" },
    { type: "/", value: "/" },
    { type: "NUMBER", value: "9" },
    { type: "*", value: "*" },
  ]);

  const result = evaluateReversePolishNotation(reversePolishNotation);
  expect(result).toBe(9);
});

test("with N arguments", () => {
  const tokens = tokenize("max ( 2, 3 )");

  const reversePolishNotation = convertToReversePolishNotation(tokens);
  expect(reversePolishNotation).toEqual([
    { type: "NUMBER", value: "2" },
    { type: "NUMBER", value: "3" },
    { type: "NUMBER", value: "2" },
    { type: "FUNCTION", value: "MAX" },
  ]);

  const result = evaluateReversePolishNotation(reversePolishNotation);
  expect(result).toBe(3);
});

test("function composition", () => {
  const tokens = tokenize("9 + max ( 1, 2, 3, 4, max ( 1, 2 ) )");

  const reversePolishNotation = convertToReversePolishNotation(tokens);

  expect(reversePolishNotation).toEqual([
    { type: "NUMBER", value: "9" },
    { type: "NUMBER", value: "1" },
    { type: "NUMBER", value: "2" },
    { type: "NUMBER", value: "3" },
    { type: "NUMBER", value: "4" },
    { type: "NUMBER", value: "1" },
    { type: "NUMBER", value: "2" },
    { type: "NUMBER", value: "2" },
    { type: "FUNCTION", value: "MAX" },
    { type: "NUMBER", value: "5" },
    { type: "FUNCTION", value: "MAX" },
    { type: "+", value: "+" },
  ]);

  const result = evaluateReversePolishNotation(reversePolishNotation);
  expect(result).toBe(13);
});
