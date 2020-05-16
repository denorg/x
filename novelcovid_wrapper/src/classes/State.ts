export class State {
    public state: string;
    public updated: number;
    public cases: number;
    public todayCases: number;
    public deaths: number;
    public todayDeaths: number;
    public active: number;
    public tests: number;
    public testsPerOneMillion: number;

    constructor(data: any) {
        this.state = data.state;
        this.updated = data.updated;
        this.cases = data.cases;
        this.todayCases = data.todayCases;
        this.deaths = data.deaths;
        this.todayDeaths = data.todayDeaths;
        this.active = data.active;
        this.tests = data.tests;
        this.testsPerOneMillion = data.testsPerOneMillion;
    }
}
