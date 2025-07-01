export type OmitPrivate<T> = {
  [K in keyof T as K extends `_${string}` ? never : K]: T[K];
};
