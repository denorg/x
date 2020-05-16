export class Continent {
    public updated: number;
    public cases: number;
    public todayCases: number;
    public deaths: number;
    public todayDeaths: number;
    public recovered: number;
    public active: number;
    public critical: number;
    public continent: string;
    public countries: Array<string>;

    constructor(data: any) {
        this.updated = data.updated;
        this.cases = data.cases;
        this.todayCases = data.todayCases;
        this.deaths = data.deaths;
        this.todayDeaths = data.todayDeaths;
        this.recovered = data.recovered;
        this.active = data.active;
        this.critical = data.critical;
        this.continent = data.continent;
        this.countries = data.countries;
    }
}