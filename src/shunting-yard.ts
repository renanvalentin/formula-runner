import { Opaque } from "./types";

type ReversePolishNotation = Opaque<string[], "ReversePolishNotation">;

type ConvertToReversePolishNotation = (
  expression: string,
  debug?: (...args: any) => void
) => ReversePolishNotation;

export const convertToReversePolishNotation: ConvertToReversePolishNotation = (
  expression,
  debug = () => void 0
) => {
  const tokens = expression.split(/([()+\-*/^,])|\s+/).filter(Boolean);

  const outputQueue: string[] = [];
  const operatorStack: string[] = [];
  const argsCounterStack: number[] = [];

  while (tokens.length > 0) {
    const token = tokens.shift();

    if (token === undefined) {
      throw new Error("token is undefined");
    }

    if (isNumber(token)) {
      outputQueue.push(token);
      debug("adding number to output queue", token, outputQueue, operatorStack);
    }

    if (isFunction(token)) {
      operatorStack.push(token);
      argsCounterStack.push(1);
      debug(
        "adding function to operator stack",
        token,
        outputQueue,
        operatorStack,
        argsCounterStack
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
        debug(
          "adding operator O2 to output queue",
          op,
          outputQueue,
          operatorStack
        );
      }

      operatorStack.push(token);
      debug(
        "adding operator O1 to operatorStack queue",
        token,
        outputQueue,
        operatorStack
      );
    }

    if (isArgumentsSeparator(token)) {
      if (argsCounterStack.length === 0) {
        throw new Error("mismatched arguments");
      }

      const argsCounter = argsCounterStack.pop()!;
      argsCounterStack.push(argsCounter + 1);

      debug(
        "isArgumentsSeparator",
        token,
        outputQueue,
        operatorStack,
        argsCounterStack,
        isLeftParenthesis(operatorStack[operatorStack.length - 1])
      );

      while (
        isLeftParenthesis(operatorStack[operatorStack.length - 1]) === false
      ) {
        const op = operatorStack.pop()!;

        outputQueue.push(op);
        debug("*************", op, outputQueue, operatorStack);
      }
    }

    if (isLeftParenthesis(token)) {
      operatorStack.push(token);
      debug(
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
        debug(
          "adding operator to output queue",
          op,
          outputQueue,
          operatorStack
        );
      }

      if (isLeftParenthesis(operatorStack[operatorStack.length - 1])) {
        debug(
          "removing left parenthesis from operator stack",
          outputQueue,
          operatorStack
        );
        operatorStack.pop();
      }

      if (isFunction(operatorStack[operatorStack.length - 1])) {
        const argsCounter = argsCounterStack.pop()!;
        outputQueue.push(argsCounter.toString());

        const op = operatorStack.pop()!;
        outputQueue.push(op);
        debug(
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

    debug("adding operator to output queue ==", op, outputQueue, operatorStack);
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

    if (isFunction(token)) {
      const argsCounter = Number(stack.pop()!);
      const args: number[] = [];

      for (let i = 0; i < argsCounter; i++) {
        args.push(stack.pop()!);
      }

      switch (token) {
        case "max":
          stack.push(Math.max(...args));
          break;
        case "sin":
          stack.push(Math.sin(args[0]));
          break;
        default:
          throw new Error("unknown function");
      }
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

  return stack.pop()!;
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
