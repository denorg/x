export class CountryInfo {
    public _id: number;
    public iso2: string;
    public iso3: string;
    public lat: number;
    public long: number;
    public flag: string;
    
    constructor(data: any) {
        this._id = data._id;
        this.iso2 = data.iso2;
        this.iso3 = data.iso3;
        this.lat = data.lat;
        this.long = data.long;
        this.flag = data.flag;
    }
}