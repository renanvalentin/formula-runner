import { tokenize, TokenTypes } from "./tokenizer";

test("basic", () => {
  const tokens = tokenize("3 + 4 * (2 - 1)");
  expect(tokens).toEqual([
    { type: TokenTypes.NUMBER, value: "3" },
    { type: TokenTypes.ADDITION, value: "+" },
    { type: TokenTypes.NUMBER, value: "4" },
    { type: TokenTypes.MULTIPLICATION, value: "*" },
    { type: TokenTypes.PARENTHESIS_LEFT, value: "(" },
    { type: TokenTypes.NUMBER, value: "2" },
    { type: TokenTypes.SUBTRACTION, value: "-" },
    { type: TokenTypes.NUMBER, value: "1" },
    { type: TokenTypes.PARENTHESIS_RIGHT, value: ")" },
  ]);
});

test("matrix", () => {
  const tokens = tokenize("3 + (A1:B2, C1)");
  expect(tokens).toEqual([
    { type: TokenTypes.NUMBER, value: "3" },
    { type: TokenTypes.ADDITION, value: "+" },
    { type: TokenTypes.PARENTHESIS_LEFT, value: "(" },
    { type: TokenTypes.MATRIX_RANGE, value: "A1:B2" },
    { type: TokenTypes.COMMA, value: "," },
    { type: TokenTypes.MATRIX_CELL, value: "C1" },
    { type: TokenTypes.PARENTHESIS_RIGHT, value: ")" },
  ]);
});

test("composition", () => {
  const tokens = tokenize("max(1, max(2, max(3, 4)))");
  expect(tokens).toEqual([
    { type: TokenTypes.FUNCTION, value: "MAX" },
    { type: TokenTypes.PARENTHESIS_LEFT, value: "(" },
    { type: TokenTypes.NUMBER, value: "1" },
    { type: TokenTypes.COMMA, value: "," },
    { type: TokenTypes.FUNCTION, value: "MAX" },
    { type: TokenTypes.PARENTHESIS_LEFT, value: "(" },
    { type: TokenTypes.NUMBER, value: "2" },
    { type: TokenTypes.COMMA, value: "," },
    { type: TokenTypes.FUNCTION, value: "MAX" },
    { type: TokenTypes.PARENTHESIS_LEFT, value: "(" },
    { type: TokenTypes.NUMBER, value: "3" },
    { type: TokenTypes.COMMA, value: "," },
    { type: TokenTypes.NUMBER, value: "4" },
    { type: TokenTypes.PARENTHESIS_RIGHT, value: ")" },
    { type: TokenTypes.PARENTHESIS_RIGHT, value: ")" },
    { type: TokenTypes.PARENTHESIS_RIGHT, value: ")" },
  ]);
});
