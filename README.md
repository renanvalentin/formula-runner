# Formula Runner

Formula Runner is a TypeScript library for evaluating mathematical expressions in infix notation, similar to those used in spreadsheet. It supports basic arithmetic operations, parentheses, and exponentiation.

## Usage

To use Formula Runner, you can import the `evaluate` function from the `formula-runner` module:

```ts
import { evaluate } from "./formula-runner";

const matrix: Matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

evaluate("MAX((SUM(A1:B2) / C1) * 5, 30)", matrix); // 30
```
