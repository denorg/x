export const validate = ( cardNum: string ): boolean => {
  const checksum: number = +cardNum.slice(-1);
  const numRevArray: string[] = [...cardNum.slice(0, -1)].reverse();
  let total = 0;
  for (let i = 0; i < numRevArray.length; i++) {
    let num = numRevArray[i]
    let s: number
    let val: number
    let rem: number;
    if (i % 2 == 0) {
      val = +num * 2;
      rem = val % 10;
      s = val / 10 >= 1 ? 1 + rem : rem;
    } else {
      s = +num;
    }
    total += s;
  }
  total += checksum;
  return total % 10 === 0;
};