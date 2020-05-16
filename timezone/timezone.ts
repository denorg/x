export class Timezone {
  offset: number;
  constructor() {
    this.offset = 0;
  }
  now = (): number => {
    let date = new Date();
    return date.getTime() + (date.getTimezoneOffset() * 1000) +
      (this.offset * 1000);
  };
}

