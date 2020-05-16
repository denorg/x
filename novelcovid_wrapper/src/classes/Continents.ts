import { Continent } from "../Classes.ts";

export class Continents {
    public data: Array<Continent>;
    constructor(data: any) {
        const continents = new Array();
        data.forEach((continent: any) => {
            continents.push(new Continent(continent));
        });
        this.data = continents;
    }
}