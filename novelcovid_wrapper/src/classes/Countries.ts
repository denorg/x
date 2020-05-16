import { Country } from "../Classes.ts";

export class Countries {
    public data: Array<Country>;
    constructor(data: any) {
        const countries = new Array();
        data.forEach((country: any) => {
            countries.push(new Country(country));
        });
        this.data = countries;
    }
}