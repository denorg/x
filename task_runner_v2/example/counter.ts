const name = Deno.args[1] || "";
let i = 0;
const interval = setInterval(() => {
  console.log(Deno.args[0], ++i);
  if (i >= 5) {
    clearInterval(interval);
  }
}, 600);
