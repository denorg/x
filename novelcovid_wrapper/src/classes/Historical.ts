export class Historical {
    public country: string;
    public province: Array<string> | string;
    public timeline: timeline;

    constructor (data: any) {
        this.country = data.country;
        this.province = data.province;
        this.timeline = data.timeline;
    }
}

interface timeline {
    cases: Object,
    deaths: Object,
    recovered: Object
}