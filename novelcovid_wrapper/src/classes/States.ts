import { State } from "../Classes.ts";

export class States {
    public data: Array<State>;
    constructor(data: any) {
        const states = new Array();
        data.forEach((state: any) => {
            states.push(new State(state));
        });
        this.data = states;
    }
}