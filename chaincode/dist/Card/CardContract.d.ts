import { Contract, Context } from 'fabric-contract-api';
export declare class CardContract extends Contract {
    constructor();
    createRegistration(ctx: Context, ...params: string[]): Promise<string>;
    createCardRegistration(ctx: Context, cardAsString: string): Promise<void>;
    updateCard(ctx: Context, cardID: string, payload: string): Promise<any>;
    getCard(ctx: Context, cardID: string): Promise<any>;
    queryAllCards(ctx: Context): Promise<any>;
    acceptRegistration(ctx: Context, cardID: string, cardNumber: string): Promise<string | false>;
    rejectRegistration(ctx: Context, cardID: string): Promise<false | {
        TxID: () => string;
    }>;
    approveRegistration(ctx: Context, cardID: string): Promise<false | {
        TxID: () => string;
    }>;
    deleteCardByID(ctx: Context, cardID: string): Promise<{
        TxID: () => string;
    }>;
    deleteCity(ctx: Context, cityID: string): Promise<void>;
    queryCardByOwnerPhoneNumber(ctx: Context, phoneNumber: string): Promise<string | false>;
    queryAllPendingRegistration(ctx: Context): Promise<any>;
    queryResult(ctx: Context, queryString: string): Promise<any[]>;
    queryRecordResult(ctx: Context, queryString: string): Promise<any[]>;
    getQueryResultForQueryString(ctx: Context, queryString: string): Promise<string>;
    getAllRecordResults(iterator: any, isHistory: any): Promise<any[]>;
    getAllResults(iterator: any, isHistory: any): Promise<any[]>;
    private getUserId;
    addCity(ctx: Context, ...cityAsString: string[]): Promise<{
        TxID: string;
    }>;
}
