const username = Deno.args[0];
const seconds = Deno.args.slice(2);
if (!seconds.length) {
  seconds[0] = "1";
}
(async () => {
  let i = 0;
  let s;
  while (seconds.length) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    i++;
    s = +seconds[0];
    if (s === i) {
      console.log(username);
      seconds.shift();
    }
    if (i > 10) {
      throw new Error("Did not match: " + seconds[0]);
    }
  }
})();
