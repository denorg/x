export class RequestHelper {
    private baseUrl: string = 'https://disease.sh';

    public async request(url: string) {
        const response = await fetch(this.baseUrl + url, {
            method: 'GET',
        });

        return response.json();
    }
}
