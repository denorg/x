export namespace types {
   export type token = string;
   export type snowflake = string;
};


/**
 * BotsOptions interface
 * @interface BotsOptions
 * @member [limit] - the limit to fetch
 * @member [offset] - the offset of bots to skip
 * @member [fields] - the fields to show in the response
 * @member [search] - a search string
 * @member [sortString] - a sort string
 */
export interface BotsOptions {
   limit?: number
   offset?: number
   fields?: string
   search?: string
   sortString?: string
}