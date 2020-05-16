# Deno timezones

## Set and sync timezone

### Example use:

```ts
import { Timezone } from "https://raw.githubusercontent.com/wrzonki/deno-timezone/master/timezone.ts";

const myTime = new Timezone(); //offset = 0 will have Greenwich time
myTime.offset = -120; //2 hours behind Greenwich
console.log(myTime.now()); //returns timestamp ex.1589566262407
console.log(new Date(myTime.now()))
