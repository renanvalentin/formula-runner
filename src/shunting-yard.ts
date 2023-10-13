import { Opaque } from "./types";

type ReversePolishNotation = Opaque<string[], "ReversePolishNotation">;

type ConvertToReversePolishNotation = (
  expression: string
) => ReversePolishNotation;

export const convertToReversePolishNotation: ConvertToReversePolishNotation = (
  expression
) => {
  const tokens = expression.split(/([()+\-*/^,])|\s+/).filter(Boolean);

  const outputQueue: string[] = [];
  const operatorStack: string[] = [];

  while (tokens.length > 0) {
    const token = tokens.shift();

    if (token === undefined) {
      throw new Error("token is undefined");
    }

    if (isNumber(token)) {
      outputQueue.push(token);
      console.log(
        "adding number to output queue",
        token,
        outputQueue,
        operatorStack
      );
    }

    if (isFunction(token)) {
      operatorStack.push(token);
      console.log(
        "adding function to operator stack",
        token,
        outputQueue,
        operatorStack
      );
    }

    if (isOperator(token)) {
      while (
        operatorStack.length > 0 &&
        isOperator(operatorStack[operatorStack.length - 1]) &&
        (precedence(token) <
          precedence(operatorStack[operatorStack.length - 1]) ||
          (precedence(token) ===
            precedence(operatorStack[operatorStack.length - 1]) &&
            isLeftAssociative(token)))
      ) {
        const op = operatorStack.pop()!;

        outputQueue.push(op);
        console.log(
          "adding operator O2 to output queue",
          op,
          outputQueue,
          operatorStack
        );
      }

      operatorStack.push(token);
      console.log(
        "adding operator O1 to operatorStack queue",
        token,
        outputQueue,
        operatorStack
      );
    }

    if (isArgumentsSeparator(token)) {
      while (
        isLeftParenthesis(operatorStack[operatorStack.length - 1]) === false
      ) {
        const op = operatorStack.pop()!;

        outputQueue.push(op);
        console.log(
          "adding operator frp, arguements to output queue",
          op,
          outputQueue,
          operatorStack
        );
      }
    }

    if (isLeftParenthesis(token)) {
      operatorStack.push(token);
      console.log(
        "adding left parenthesis to operator stack",
        token,
        outputQueue,
        operatorStack
      );
    }

    if (isRightParenthesis(token)) {
      while (
        isLeftParenthesis(operatorStack[operatorStack.length - 1]) === false
      ) {
        if (operatorStack.length === 0) {
          throw new Error("mismatched parentheses");
        }

        const op = operatorStack.pop()!;

        outputQueue.push(op);
        console.log(
          "adding operator to output queue",
          op,
          outputQueue,
          operatorStack
        );
      }

      if (isLeftParenthesis(operatorStack[operatorStack.length - 1])) {
        console.log(
          "removing left parenthesis from operator stack",
          outputQueue,
          operatorStack
        );
        operatorStack.pop();
      }

      if (isFunction(operatorStack[operatorStack.length - 1])) {
        const op = operatorStack.pop()!;
        outputQueue.push(op);
        console.log(
          "adding function to output queue",
          op,
          outputQueue,
          operatorStack
        );
      }
    }
  }

  while (operatorStack.length > 0) {
    if (isLeftParenthesis(operatorStack[operatorStack.length - 1])) {
      throw new Error("mismatched parentheses");
    }

    const op = operatorStack.pop()!;

    outputQueue.push(op);

    console.log(
      "adding operator to output queue ==",
      op,
      outputQueue,
      operatorStack
    );
  }

  return outputQueue as ReversePolishNotation;
};

type EvaluateReversePolishNotation = (
  expression: ReversePolishNotation
) => number;

export const evaluateReversePolishNotation: EvaluateReversePolishNotation = (
  expression
) => {
  const stack: number[] = [];

  while (expression.length > 0) {
    const token = expression.shift();

    if (token === undefined) {
      throw new Error("token is undefined");
    }

    if (isNumber(token)) {
      stack.push(Number(token));
    }

    if (isOperator(token)) {
      const b = stack.pop()!;
      const a = stack.pop()!;

      switch (token) {
        case "+":
          stack.push(a + b);
          break;
        case "-":
          stack.push(a - b);
          break;
        case "*":
          stack.push(a * b);
          break;
        case "/":
          stack.push(a / b);
          break;
        case "^":
          stack.push(Math.pow(a, b));
          break;
        default:
          throw new Error("unknown operator");
      }
    }
  }

  return 1;
};

const isNumber = (token: string) => {
  return !isNaN(Number(token));
};

const isFunction = (token: string) => {
  return token === "max" || token === "sin";
};

const isOperator = (token: string) => {
  return (
    token === "+" ||
    token === "-" ||
    token === "*" ||
    token === "/" ||
    token === "^"
  );
};

const precedence = (token: string) => {
  if (token === "+" || token === "-") {
    return 1;
  }
  if (token === "*" || token === "/") {
    return 2;
  }
  if (token === "^") {
    return 3;
  }
  return 0;
};

const isArgumentsSeparator = (token: string) => {
  return token === ",";
};

const isLeftParenthesis = (token: string) => {
  return token === "(";
};

const isRightParenthesis = (token: string) => {
  return token === ")";
};

const isLeftAssociative = (token: string) => {
  return token !== "^";
};
