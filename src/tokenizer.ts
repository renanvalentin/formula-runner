type Tokenizer = (
  expression: string,
  debug?: (...args: any) => void
) => Token[];

export enum TokenTypes {
  NUMBER = "NUMBER",
  ADDITION = "+",
  SUBTRACTION = "-",
  MULTIPLICATION = "*",
  DIVISION = "/",
  EXPONENTIATION = "^",
  PARENTHESIS_LEFT = "(",
  PARENTHESIS_RIGHT = ")",
  MATRIX_RANGE = "RANGE",
  MATRIX_CELL = "CELL",
  COMMA = ",",
  FUNCTION = "FUNCTION",
}

const TokenSpec = [
  [/^\s+/, null],
  [/^\d+/, TokenTypes.NUMBER],
  [/^\+/, TokenTypes.ADDITION],
  [/^\-/, TokenTypes.SUBTRACTION],
  [/^\*/, TokenTypes.MULTIPLICATION],
  [/^\//, TokenTypes.DIVISION],
  [/^\^/, TokenTypes.EXPONENTIATION],
  [/^\(/, TokenTypes.PARENTHESIS_LEFT],
  [/^\)/, TokenTypes.PARENTHESIS_RIGHT],
  [/^\,/, TokenTypes.COMMA],
  [/^SUM|MAX|MIN/, TokenTypes.FUNCTION],
  [/^[A-Z]+\d*:[A-Z]+\d*/, TokenTypes.MATRIX_RANGE],
  [/^[A-Z]+\d*/, TokenTypes.MATRIX_CELL],
];

export type Token = {
  type: TokenTypes;
  value: string;
};

export const tokenize: Tokenizer = (input, debug) => {
  const tokens: Token[] = [];
  let remainingInput = input.trim();

  while (remainingInput.length > 0) {
    let matched = false;

    for (const [pattern, tokenType] of TokenSpec) {
      const regex = new RegExp(pattern!);

      debug?.(`Testing ${remainingInput} against ${regex}`);

      const match = remainingInput.toUpperCase().match(regex);

      if (match && match[0]) {
        const matchedValue = match[0];

        if (tokenType !== null) {
          tokens.push({ type: tokenType as TokenTypes, value: matchedValue });
        }

        remainingInput = remainingInput.slice(matchedValue.length);
        matched = true;
        break;
      }
    }

    if (!matched) {
      throw new Error(`Unable to tokenize input: ${remainingInput}`);
    }
  }

  return tokens;
};
