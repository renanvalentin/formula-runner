import { Matrix, getMatrixCell, getMatrixValues } from "./matrix";
import { Token, TokenTypes, tokenize } from "./tokenizer";
import {
  convertToReversePolishNotation,
  evaluateReversePolishNotation,
} from "./shunting-yard";

type Evaluate = (input: string, matrix: Matrix) => number;

export const evaluate: Evaluate = (input, matrix) => {
  const tokens = tokenize(input);
  const shuntingYardInput: Token[] = [];

  for (const token of tokens) {
    if (token.type === "CELL") {
      const value = getMatrixCell(token.value, matrix);
      shuntingYardInput.push({
        type: TokenTypes.NUMBER,
        value: value.toString(),
      });
    } else if (token.type === "RANGE") {
      const buffer: Token[] = [];
      const values = getMatrixValues(token.value, matrix);

      while (values.length > 0) {
        const value = values.shift()!.toString();
        buffer.push({
          type: TokenTypes.NUMBER,
          value,
        });

        if (values.length > 0) {
          buffer.push({ type: TokenTypes.COMMA, value: "," });
        }
      }

      shuntingYardInput.push(...buffer);
    } else {
      shuntingYardInput.push(token);
    }
  }

  const reversePolishNotation =
    convertToReversePolishNotation(shuntingYardInput);

  const result = evaluateReversePolishNotation(reversePolishNotation);

  return result;
};
