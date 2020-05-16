//deno run https://deno.land/x/crone/test.ts

import { Cron } from "https://deno.land/x/crone/cron.ts";

// logs text with current date
let log = (txt: string) => {
  var d: any = new Date();
  let h: any = d.getHours();
  let m: any = d.getMinutes();
  let s: any = d.getSeconds();
  let dd: any = d.getDate();
  let mm: any = d.getMonth() + 1;
  let yyyy: any = d.getFullYear();

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;
  dd = dd < 10 ? "0" + dd : dd;
  mm = mm < 10 ? "0" + mm : mm;
  yyyy = yyyy < 10 ? "0" + yyyy : yyyy;

  console.log(`
    ${txt} => ${h}:${m}:${s} ${dd}/${mm}/${yyyy}`);
};

let cron = new Cron();
cron.start();

//job 1
cron.add("* * * * *", () => {
  log("every minute");
});

//job 2
cron.add("2 * * * *", () => {
  log("at minute 2");
});

//job 3
cron.add("20 * * * *", () => {
  log("at minute 20");
});

console.table(cron.cronJobs);
