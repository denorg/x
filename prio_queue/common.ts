export const defaultComparisson = <T>(first: T, second: T) =>
  ((first as unknown) as number) - ((second as unknown) as number);

export const identity = <T, U>(value: T) => (value as unknown) as U;
