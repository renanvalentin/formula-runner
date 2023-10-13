declare const tag: unique symbol;

export type TagContainer<Token> = {
  readonly [tag]: Token;
};

export type Opaque<Type, Token = unknown> = Type & TagContainer<Token>;
