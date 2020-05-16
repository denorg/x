import { types, BotsOptions } from './types/types.ts';
import * as config from './config.ts';
import { parseQuery } from './queryparams/queryparams.ts';

interface ops {
    disableWarnings?: boolean | undefined;
    clientId?: types.snowflake | null;
};

class DBL {
    private dblkey: types.token;
    private clientId: types.snowflake | null | undefined;
    private disableWarnings: boolean | undefined;

    constructor(dblkey: types.token = 'none', extra: ops = {clientId: null, disableWarnings: false}) {
        this.clientId = extra.clientId;
        this.disableWarnings = extra.disableWarnings;
        this.dblkey = `Bearer ${dblkey}`;
    };

    private async request(method: string, path: string, data?: object) {
        let options = new Headers();
        options.append("Authorization", this.dblkey);
        options.append('Content-Type', 'application/json');
        let rbody: RequestInit = { 
            method: method,
            headers: options,
            body: JSON.stringify(data)
        }

        let res = await fetch(`${config.apiUrl}${path}`, rbody);
        return res.json();
    };

    /**
     * @typedef {string} snowflake
     */
    /**
     * gets an user from top.gg
     * @param {snowflake} id - the id of the user to fetch
     */
    public async getUser(id: types.snowflake) {
        return await this.request('GET', `/users/${id}`);
    };

    /**
     * gets a bot from top.gg
     * @param {snowflake} id - the id of the bot to fetch
     */
    public async getBot(id?: types.snowflake | undefined | null) {
        if (!id) {
            id = this.clientId;
        }
        return await this.request('GET', `/bots/${id}`);
    };

    /**
     * @typedef {BotsOptions} BotsOptions
     */

    /**
     * get bots directly from the api
     * @param {BotsOptions} botsData - data to pass to the request
     */
    public async getBots(botsData: BotsOptions) {
        return await this.request('GET', '/bots' + parseQuery([
            ['limit', botsData.limit || 10],
            ['offset', botsData.offset || 0], 
            ['search', botsData.search || ""], 
            ['sort_string', botsData.sortString || ""], 
            ['fields', botsData.fields || ""]
        ]));
    }

    /**
     * get the total votes of a bot
     * @param {snowflake} id - the if of the bot to fetch votes from
     */
    public async getVotes(id?: types.snowflake | undefined | null) {
        if (!id) {
            id = this.clientId;
        }
        return await this.request('GET', `/bots/${id}/votes`);
    };

    /**
     * check your bot's total votes
     * @param {snowflake} id
     */
    public async checkVotes(userId: types.snowflake) {
        if (this.clientId === null && !this.disableWarnings) {
            throw new Error("Method checkVotes requires a clientId to be passed in the constructor");
        }
        return await this.request('GET', `/bots/${this.clientId}/check` + parseQuery([['userId', userId]]));
    };

    /**
     * fetch stats for a bot or the current one
     * @param {snowflake} id - the id of the bot to fetch
     */
    public async getStats(id?: types.snowflake | undefined | null) {
        if (!id) {
            id = this.clientId;
        }
        return await this.request('GET', `/bots/${id}/stats`);
    };

    /**
     * postServerCount
     * @param {number|number[]} serverCount - the amount of servers or shards array to show on the website
     */
    public async postServerCount(serverCount: number | number[]) {
        return await this.request('POST', `/bots/${this.clientId}/stats`, { server_count: serverCount })
    }
};

export default DBL;