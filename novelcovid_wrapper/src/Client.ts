import { Country, Countries, Continent, Continents, State, States, Historical } from "./Classes.ts";
import { RequestHelper } from "./helpers/RequestHelper.ts";
import { Endpoints } from "./helpers/Endpoints.ts";

export class Client {
    private requestHelper: RequestHelper;
    public constructor() {
        this.requestHelper = new RequestHelper();
    }

    countries(opts?: Options.country): Promise<Countries> {
        return new Promise((resolve, reject) => {
            this.requestHelper.request(Endpoints.COUNTRIES(opts))
                .then((data: any) => {
                    resolve(new Countries(data));
                })
                .catch((err: any) => { reject(err); });
        })
    }

    country(country: string): Promise<Country> {
        return new Promise((resolve, reject) => {
            this.requestHelper.request(Endpoints.COUNTRY(country))
                .then((data: any) => {
                    resolve(new Country(data));
                })
                .catch((err: any) => { reject(err); });
        })
    }

    continents(opts?: Options.continents): Promise<Continents> {
        return new Promise((resolve, reject) => {
            this.requestHelper.request(Endpoints.CONTINENTS(opts))
                .then((data: any) => {
                    resolve(new Continents(data));
                })
                .catch((err: any) => { reject(err); });
        })
    }

    continent(continent: string): Promise<Continent> {
        return new Promise((resolve, reject) => {
            this.requestHelper.request(Endpoints.CONTINENT(continent))
                .then((data: any) => {
                    resolve(new Continent(data));
                })
                .catch((err: any) => { reject(err); });
        })
    }

    states(opts?: Options.states): Promise<States> {
        return new Promise((resolve, reject) => {
            this.requestHelper.request(Endpoints.STATES(opts))
                .then((data: any) => {
                    resolve(new States(data));
                })
                .catch((err: any) => { reject(err); });
        })
    }

    state(state: string): Promise<State> {
        return new Promise((resolve, reject) => {
            this.requestHelper.request(Endpoints.STATE(state))
                .then((data: any) => {
                    resolve(new State(data));
                })
                .catch((err: any) => { reject(err); });
        })
    }

    historical(opts?: Options.historical): Promise<Historical | Historical[]> {
        let endpoint: string;
        return new Promise((resolve, reject) => {
            if (!opts)
                this.requestHelper
                    .request(Endpoints.HISTORICAL())
                    .then((data: any) => {
                        const array = new Array<Historical>();
                        data.forEach((elem: any) => {
                            array.push(new Historical(elem));
                        });
                        resolve(array);
                    })
                    .catch((err: any) => reject(err));
            else if (opts.country) {
                endpoint = Endpoints.HISTORICAL_COUNTRY(opts.country, opts.days);
                if (opts.province) {
                    endpoint = Endpoints.HISTORICAL_PROVINCE(opts.country, opts.province, opts.days);
                }
                this.requestHelper
                    .request(endpoint)
                    .then((data: any) => {
                        resolve(new Historical(data));
                    })
                    .catch((err: any) => reject(err));
            }
        })
    }

    //TODO
    /**
     * NYT (Data from New York Times)
     * Apple (Mobility data from Apple)
     * Gov (Government specific data)
     * JHUCSSE (Data from Johns Hopkins University)
     * Historical all
     */
}

export namespace Options {
    export interface country {
        sort?: string,
        yesterday?: boolean
    }

    export interface continents {
        sort?: string
    }

    export interface states {
        sort?: string
    }

    export interface historical {
        days?: number,
        country?: string,
        province?: string,
    }
}