export interface ClearInterval {
  clear: () => void;
}
export function randomInterval(
  c: () => void,
  max: number,
  min: number = 0
): ClearInterval {
  let i;
  const timeout = (): void => {
    i = setTimeout((): void => {
      c();
      timeout();
    }, Math.floor(Math.random() * max + min));
  };
  timeout();
  return { clear: (): void => clearTimeout(i) };
}
