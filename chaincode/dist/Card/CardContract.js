"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardContract = void 0;
const fabric_contract_api_1 = require("fabric-contract-api");
const REGISTRATION_STATE = {
    PENDING: "pending",
    APPROVED: 'approved',
    REGISTERED: "registered",
    REJECTED: "rejected"
};
const MODIFY_TYPE = {
    REGISTRY: "Registry",
    APPROVE_REGISTRATION: "approve_registration",
    ACEPT_REGISTRATION: "accept_registration",
    CANCEL_REGISTRATION: "cancel_registration",
    UPDATE_CARD: "update_card"
};
class CardContract extends fabric_contract_api_1.Contract {
    constructor() {
        super('Card');
    }
    //create Registration
    async createRegistration(ctx, ...params) {
        try {
            const card = {
                id: params[0],
                fullName: params[1],
                dateOfBirth: params[2],
                gender: params[3],
                address: params[4],
                nation: params[5],
                hometown: params[6],
                registrationCity: params[7],
                owner: params[8],
                mail: params[9],
                createTime: new Date(ctx.stub.getTxTimestamp().seconds * 1000).toString(),
                modifyTime: new Date(ctx.stub.getTxTimestamp().seconds * 1000).toString(),
                modifyType: MODIFY_TYPE.REGISTRY,
                registrationTime: new Date(ctx.stub.getTxTimestamp().seconds * 1000).toString(),
                registrationState: REGISTRATION_STATE.PENDING,
                modifyUser: await this.getUserId(ctx),
                docType: "card"
            };
            await ctx.stub.putState(card.id, Buffer.from(JSON.stringify(card)));
            return JSON.stringify({
                TxID: ctx.stub.getTxID(),
                regID: card.id
            });
        }
        catch (error) {
            console.log(error);
            return JSON.stringify({ error: error });
        }
    }
    async createCardRegistration(ctx, cardAsString) {
        const card = JSON.parse(cardAsString);
        card.createTime = new Date(ctx.stub.getTxTimestamp().seconds * 1000).toString();
        card.modifyTime = new Date(ctx.stub.getTxTimestamp().seconds * 1000).toString();
        card.modifyType = MODIFY_TYPE.REGISTRY;
        card.registrationTime = new Date(ctx.stub.getTxTimestamp().seconds * 1000).toString();
        card.registrationState = REGISTRATION_STATE.PENDING;
        card.modifyUser = await this.getUserId(ctx);
        await ctx.stub.putState(card.id, Buffer.from(JSON.stringify(card)));
    }
    //update Card
    async updateCard(ctx, cardID, payload) {
        try {
            const cardAsBytes = await ctx.stub.getState(cardID);
            const payloadUpdate = JSON.parse(payload);
            const currentCard = JSON.parse(cardAsBytes.toString());
            const card = Object.assign(Object.assign({}, currentCard), payloadUpdate);
            card.modifyTime = new Date(ctx.stub.getTxTimestamp().seconds * 1000).toString();
            card.modifyUser = this.getUserId(ctx);
            card.modifyType = MODIFY_TYPE.UPDATE_CARD;
            await ctx.stub.putState(card.id, Buffer.from(JSON.stringify(card)));
            return { TxID: ctx.stub.getTxID };
        }
        catch (error) {
            return error;
        }
    }
    //getCard
    async getCard(ctx, cardID) {
        try {
            const cardAsBytes = await ctx.stub.getState(cardID);
            const card = JSON.parse(cardAsBytes.toString());
            return card[0];
        }
        catch (err) {
            return err;
        }
    }
    async queryAllCards(ctx) {
        const queryString = {};
        queryString.selector = {
            docType: "card",
        };
        const queryResult = await this.getQueryResultForQueryString(ctx, JSON.stringify(queryString));
        return JSON.parse(queryResult);
    }
    //accept Registration
    async acceptRegistration(ctx, cardID, cardNumber) {
        try {
            const cardAsBytes = await ctx.stub.getState(cardID);
            const card = JSON.parse(cardAsBytes.toString());
            card.cardNumber = cardNumber;
            card.modifyType = MODIFY_TYPE.ACEPT_REGISTRATION;
            card.modifyTime = new Date(ctx.stub.getTxTimestamp().seconds * 1000).toString();
            card.modifyUser = this.getUserId(ctx);
            card.registrationTime = new Date(ctx.stub.getTxTimestamp().seconds * 1000).toString();
            card.registrationState = REGISTRATION_STATE.REGISTERED;
            card.processPolice = this.getUserId(ctx);
            await ctx.stub.putState(card.id, Buffer.from(JSON.stringify(card)));
            return ctx.stub.getTxID();
        }
        catch (error) {
            console.log(error);
            return false;
        }
        ;
    }
    //public rejectRegistration
    async rejectRegistration(ctx, cardID) {
        try {
            const cardAsBytes = await ctx.stub.getState(cardID);
            const card = JSON.parse(cardAsBytes.toString());
            card.modifyTime = new Date(ctx.stub.getTxTimestamp().seconds * 1000).toString();
            card.modifyType = MODIFY_TYPE.CANCEL_REGISTRATION;
            card.modifyUser = this.getUserId(ctx);
            card.processPolice = this.getUserId(ctx);
            card.registrationState = REGISTRATION_STATE.REJECTED;
            await ctx.stub.putState(card.id, Buffer.from(JSON.stringify(card)));
            return { TxID: ctx.stub.getTxID };
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    async approveRegistration(ctx, cardID) {
        try {
            const cardAsBytes = await ctx.stub.getState(cardID);
            const card = JSON.parse(cardAsBytes.toString());
            card.modifyTime = new Date(ctx.stub.getTxTimestamp().seconds * 1000).toString();
            card.modifyType = MODIFY_TYPE.APPROVE_REGISTRATION;
            card.modifyUser = this.getUserId(ctx);
            card.processPolice = this.getUserId(ctx);
            card.registrationState = REGISTRATION_STATE.APPROVED;
            await ctx.stub.putState(card.id, Buffer.from(JSON.stringify(card)));
            return { TxID: ctx.stub.getTxID };
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    //deleteCardByiD
    async deleteCardByID(ctx, cardID) {
        ctx.stub.deleteState(cardID);
        return { TxID: ctx.stub.getTxID };
    }
    async deleteCity(ctx, cityID) {
        await ctx.stub.deleteState(cityID);
    }
    //queryCardByOwnerPhoneNumber
    async queryCardByOwnerPhoneNumber(ctx, phoneNumber) {
        try {
            const queryString = {};
            queryString.selector = {
                docType: "card",
                owner: phoneNumber
            };
            const results = await this.getQueryResultForQueryString(ctx, JSON.stringify(queryString));
            return JSON.stringify(results[0]);
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    //queryAllPendingRegistration
    async queryAllPendingRegistration(ctx) {
        try {
            const queryString = {};
            queryString.selector = {
                state: REGISTRATION_STATE.PENDING
            };
            const results = await this.getQueryResultForQueryString(ctx, JSON.stringify(queryString));
            return JSON.parse(results);
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    //queryResultReturnResult
    async queryResult(ctx, queryString) {
        let resultIterators = await ctx.stub.getQueryResult(queryString);
        let result = await this.getAllResults(resultIterators, false);
        return result;
    }
    async queryRecordResult(ctx, queryString) {
        let resultIterators = await ctx.stub.getQueryResult(queryString);
        let result = await this.getAllRecordResults(resultIterators, false);
        return result;
    }
    async getQueryResultForQueryString(ctx, queryString) {
        let resultsIterator = await ctx.stub.getQueryResult(queryString);
        let results = await this.getAllResults(resultsIterator, false);
        return JSON.stringify(results);
    }
    async getAllRecordResults(iterator, isHistory) {
        let allResults = [];
        let res = await iterator.next();
        while (!res.done) {
            if (res.value && res.value.value.toString()) {
                let jsonRes = {};
                if (isHistory && isHistory === true) {
                    jsonRes.TxId = res.value.tx_id;
                    jsonRes.Timestamp = res.value.timestamp;
                    try {
                        jsonRes.Value = JSON.parse(res.value.value.toString('utf8'));
                    }
                    catch (err) {
                        console.log(err);
                        jsonRes.Value = res.value.value.toString('utf8');
                    }
                }
                else {
                    jsonRes.Key = res.value.key;
                    try {
                        jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
                    }
                    catch (err) {
                        console.log(err);
                        jsonRes.Record = res.value.value.toString('utf8');
                    }
                }
                allResults.push(jsonRes.Record);
            }
            res = await iterator.next();
        }
        iterator.close();
        return allResults;
    }
    async getAllResults(iterator, isHistory) {
        let allResults = [];
        let res = await iterator.next();
        while (!res.done) {
            if (res.value && res.value.value.toString()) {
                let jsonRes = {};
                if (isHistory && isHistory === true) {
                    jsonRes.TxId = res.value.tx_id;
                    jsonRes.Timestamp = res.value.timestamp;
                    try {
                        jsonRes.Value = JSON.parse(res.value.value.toString('utf8'));
                    }
                    catch (err) {
                        console.log(err);
                        jsonRes.Value = res.value.value.toString('utf8');
                    }
                }
                else {
                    jsonRes.Key = res.value.key;
                    try {
                        jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
                    }
                    catch (err) {
                        console.log(err);
                        jsonRes.Record = res.value.value.toString('utf8');
                    }
                }
                allResults.push(jsonRes);
            }
            res = await iterator.next();
        }
        iterator.close();
        return allResults;
    }
    //Xu ly iterator
    //getUserID
    getUserId(ctx) {
        const rs = ctx.clientIdentity.getID();
        const find = rs.match(/[A-Za-z0-9_-]{22}/);
        if (find === null)
            return 'admin';
        return find[0];
    }
    //process city & district
    //add city
    async addCity(ctx, ...cityAsString) {
        try {
            const city = {
                id: cityAsString[0],
                cityName: cityAsString[1],
                currentNumber: cityAsString[2],
                docType: "city"
            };
            await ctx.stub.putState(city.id, Buffer.from(JSON.stringify(city)));
            return { TxID: city.id };
        }
        catch (error) {
            throw new Error(error);
        }
    }
}
exports.CardContract = CardContract;
//# sourceMappingURL=CardContract.js.map