export const Nothing = Symbol('nothing');
export type Nothing = typeof Nothing;
export type Maybe<T> = T | Nothing;