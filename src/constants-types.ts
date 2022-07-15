// eslint-disable-next-line import/prefer-default-export
export function checkEnumExhausted(e: never): never {
  throw new Error(`Value ${e} not contemplated`);
}
