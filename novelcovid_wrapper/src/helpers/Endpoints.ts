import { Options } from "./../../src/Client.ts";

export const Endpoints = {
    COUNTRIES: (opts?: Options.country) => `/v2/countries?sort=${opts?.sort}&yesterday=${opts?.yesterday}`,
    COUNTRY: (country: string) => `/v2/countries/${country}`,
    CONTINENTS: (opts?: Options.continents) => `/v2/continents?sort=${opts?.sort}`,
    CONTINENT: (continent: string) => `/v2/continents/${continent}`,
    STATES: (opts?: Options.states) => `/v2/states?sort=${opts?.sort}`,
    STATE: (state: string) => `/v2/states/${state}`,
    HISTORICAL: () => `/v2/historical/`,
    HISTORICAL_COUNTRY: (country:string, days?:number) => `/v2/historical/${country}?lastdays=${days}`,
    HISTORICAL_PROVINCE: (country:string, province: string, days?:number) => `/v2/historical/${country}/${province}?lastdays=${days}`,

}