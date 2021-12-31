"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserContract = void 0;
const fabric_contract_api_1 = require("fabric-contract-api");
class UserContract extends fabric_contract_api_1.Contract {
    constructor() {
        super('User');
    }
    // create User
    //userAsString: 0.UID 1.fullName 2.pwd 3.dateOfBirth 4.phoneNumber 
    async createUser(ctx, userAsString) {
        console.log("===CREATED USER======");
        const user = JSON.parse(userAsString);
        user.verified = user.verifyPolice ? true : false;
        user.createTime = new Date(ctx.stub.getTxTimestamp().seconds * 1000).toString();
        user.updateTime = new Date(ctx.stub.getTxTimestamp().seconds * 1000).toString();
        await ctx.stub.putState(user.id, Buffer.from(JSON.stringify(user)));
        console.log('====END CREATE USER====');
    }
    // update User
    async updateUser(ctx, userID, userAsString) {
        const payload = JSON.parse(userAsString);
        const userAsBytes = await ctx.stub.getState(userID);
        if (!userAsBytes || userAsBytes.length === 0) {
            throw new Error("Khong ton tai UID");
        }
        const currentUser = JSON.parse(userAsBytes.toString());
        const updatedUser = Object.assign(Object.assign({}, currentUser), payload);
        updatedUser.updateTime = new Date(ctx.stub.getTxTimestamp().seconds * 1000).toString();
        await ctx.stub.putState(updatedUser.id, Buffer.from(JSON.stringify(updatedUser)));
        return await ctx.stub.getTxID();
    }
    // change Password
    async changePassword(ctx, userID, newPW) {
        const userAsBytes = await ctx.stub.getState(userID);
        if (!userAsBytes || userAsBytes.length === 0) {
            throw new Error('Khoong tim thay UID');
        }
        const user = JSON.parse(userAsBytes.toString());
        user.password = newPW;
        await ctx.stub.putState(user.id, Buffer.from(JSON.stringify(user)));
        return ctx.stub.getTxID();
    }
    // verify User by police
    async verifyUser(ctx, userID) {
        const police = this.getUserId(ctx);
        const userAsBytes = await ctx.stub.getState(userID);
        const user = JSON.parse(userAsBytes.toString());
        user.verified = true;
        user.verifyPolice = police;
        user.updateTime = new Date(ctx.stub.getTxTimestamp().seconds * 1000).toString();
        await ctx.stub.putState(user.id, Buffer.from(JSON.stringify(user)));
        return ctx.stub.getTxID();
    }
    // lay info user by UID
    async readUserByUID(ctx, userID) {
        const userAsBytes = await ctx.stub.getState(userID);
        if (!userAsBytes || userAsBytes.length === 0) {
            throw new Error(" Khong ton tai UID");
        }
        return userAsBytes.toString();
    }
    // queryUserByPhoneNumberOrUID
    async queryUserByPhoneNumber(ctx, phoneNumber) {
        const queryString = {};
        queryString.selector = {};
        queryString.selector.phoneNumber = phoneNumber;
        const user = await this.queryResultByQueryString(ctx, queryString);
        return user;
    }
    //  queryResultByQueryString
    async queryResultByQueryString(ctx, queryString) {
        let resultIterators = await ctx.stub.getQueryResult(queryString);
        let results = await this.getAllResults(resultIterators, false);
        return JSON.stringify(results);
    }
    async getQueryResultForQueryString(ctx, queryString) {
        let resultsIterator = await ctx.stub.getQueryResult(queryString);
        let results = await this.getAllResults(resultsIterator, false);
        return JSON.stringify(results);
    }
    async queryRecordResult(ctx, queryString) {
        let resultIterators = await ctx.stub.getQueryResult(queryString);
        let result = await this.getAllRecordResults(resultIterators, false);
        return result;
    }
    async getAllResults(iterator, isHistory) {
        let allResults = [];
        let res = await iterator.next();
        while (!res.done) {
            if (res.value && res.value.value.toString()) {
                let jsonRes = {};
                console.log(res.value.value.toString('utf8'));
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
    // getID from MSP
    getUserId(ctx) {
        const rs = ctx.clientIdentity.getID();
        const find = rs.match(/[A-Za-z0-9_-]{22}/);
        if (find === null)
            return 'admin';
        return find[0];
    }
    // Them nguoi dung sample
    async initLedger(ctx) {
        const police = {
            id: "csgt",
            fullName: "Tyrh",
            password: "tyhuynh",
            role: "police",
            dateOfBirth: "19-11-1999",
            phoneNumber: "090909",
            createTime: new Date(ctx.stub.getTxTimestamp().seconds * 1000).toString(),
            updateTime: new Date(ctx.stub.getTxTimestamp().seconds * 1000).toString(),
            docType: "user"
        };
        const citizen = {
            id: "citizen",
            fullName: "Huynh Le Ty",
            password: "tyhuynh",
            role: "citizen",
            dateOfBirth: "19-11-1999",
            phoneNumber: "0822664657",
            createTime: new Date(ctx.stub.getTxTimestamp().seconds * 1000).toString(),
            updateTime: new Date(ctx.stub.getTxTimestamp().seconds * 1000).toString(),
            docType: "user"
        };
        await ctx.stub.putState(police.id, Buffer.from(JSON.stringify(police)));
        await ctx.stub.putState(citizen.id, Buffer.from(JSON.stringify(citizen)));
    }
}
exports.UserContract = UserContract;
//# sourceMappingURL=UserContract.js.map