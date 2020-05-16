import { CountryInfo } from "../Classes.ts";

export class Country {
    public updated: number;
    public country: string;
    public countryInfo: CountryInfo;
    public cases: number;
    public todayCases: number;
    public deaths: number;
    public todayDeaths: number;
    public recovered: number;
    public active: number;
    public critical: number;
    public casesPerOneMillion: number;
    public deathsPerOneMillion: number;
    public tests: number;
    public testsPerOneMillion: number;
    public continent: number;
    
    constructor(data: any) {
        this.updated = data.updated;
        this.country = data.country;
        this.countryInfo = new CountryInfo(data.countryInfo);
        this.cases = data.cases;
        this.todayCases = data.todayCases;
        this.deaths = data.deaths;
        this.todayDeaths = data.todayDeaths;
        this.recovered = data.recovered;
        this.active = data.active;
        this.critical = data.critical;
        this.casesPerOneMillion = data.casesPerOneMillion;
        this.deathsPerOneMillion = data.deathsPerOneMillion;
        this.tests = data.tests;
        this.testsPerOneMillion = data.testsPerOneMillion;
        this.continent = data.continent;
    }
    
}