export class Cron {
  logError: boolean;
  cronJobs: { schedule: string; fn: void }[];
  constructor() {
    this.logError = false;
    this.cronJobs = [];
  }
  add = (schedule: string, fn: any): void => {
    this.cronJobs.push({
      schedule: schedule,
      fn: fn,
    });
  };

  validate = (schedule: string): boolean => {
    let now = new Date();
    let minutes = String(now.getMinutes());
    let hours = String(now.getHours());
    let dayOfMonth = String(now.getDate());
    let month = String(now.getMonth() + 1);
    let dayOfWeek = String(now.getDay());

    let crontab = schedule.split(" ");
    let currTime = [minutes, hours, dayOfMonth, month, dayOfWeek];

    let a = crontab[0] === "*"
      ? true
      : crontab[0] === currTime[0]
      ? true
      : false;
    let b = crontab[1] === "*"
      ? true
      : crontab[1] === currTime[1]
      ? true
      : false;
    let c = crontab[2] === "*"
      ? true
      : crontab[2] === currTime[2]
      ? true
      : false;
    let d = crontab[3] === "*"
      ? true
      : crontab[3] === currTime[3]
      ? true
      : false;
    let e = crontab[4] === "*"
      ? true
      : crontab[4] === currTime[4]
      ? true
      : false;

    return a && b && c && d && e;
  };

  filterJobs = () => {
    let result = [];
    for (let i = 0; i < this.cronJobs.length; i++) {
      if (this.validate(this.cronJobs[i].schedule)) {
        result.push(this.cronJobs[i].fn);
      }
    }
    return result;
  };

  async start() {
    let jobs: any[] = this.filterJobs();
    for (let i = 0; i < jobs.length; i++) {
      jobs[i]();
    }
    setTimeout(() => {
      this.start();
    }, (61 - (new Date().getSeconds())) * 1000);
  }
}
