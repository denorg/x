import uniq from "../uniq.ts";

const array = [1,2,3,4];
let count = 10
const ids = array.map(e => uniq(e+count));
console.log(ids);
