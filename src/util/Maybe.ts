export const Nothing = Symbol("nothing");
export type Nothing = typeof Nothing;
export type Maybe<T> = T | Nothing;

export function toMaybe<T>(arg: T | undefined): Maybe<T> {
  if (arg === undefined || arg === null) {
    return Nothing;
  }

  return arg;
}
