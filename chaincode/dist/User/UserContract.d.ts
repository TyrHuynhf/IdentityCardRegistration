import { Contract, Context } from "fabric-contract-api";
export declare class UserContract extends Contract {
    constructor();
    createUser(ctx: Context, userAsString: string): Promise<void>;
    updateUser(ctx: Context, userID: string, userAsString: string): Promise<string>;
    changePassword(ctx: Context, userID: string, newPW: string): Promise<string>;
    verifyUser(ctx: Context, userID: string): Promise<string>;
    readUserByUID(ctx: Context, userID: string): Promise<string>;
    queryUserByPhoneNumber(ctx: Context, phoneNumber: string): Promise<string>;
    queryResultByQueryString(ctx: Context, queryString: string): Promise<string>;
    getQueryResultForQueryString(ctx: Context, queryString: string): Promise<string>;
    queryRecordResult(ctx: Context, queryString: string): Promise<any[]>;
    getAllResults(iterator: any, isHistory: any): Promise<any[]>;
    getAllRecordResults(iterator: any, isHistory: any): Promise<any[]>;
    private getUserId;
    initLedger(ctx: Context): Promise<void>;
}
