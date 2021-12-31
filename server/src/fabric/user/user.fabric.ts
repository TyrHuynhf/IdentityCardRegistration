import {getUserContract} from './contractProcess'

/*export async function getCitizenByPhoneNumber(phoneNumber: string):Promise<any>{
    try{
         const contract = await getUserContract('admin');
         const queryString :any = {};
         queryString.selector ={
             docType: "user",
             phoneNumber: phoneNumber,
             role: "citizen"
         }
         const result = await contract.evaluateTransaction('getQueryResultForQueryString', JSON.stringify(queryString));
         const users = await JSON.parse(result.toString());
         console.log(users)
         if(users.length===0){
             throw ("Khong tim thay User from fabric");
         }
         return users[0];
    }
    catch(error){
        throw error;
    }
}*/

export async function getCitizenByPhoneNumber(phoneNumber: any): Promise<any> {
    try {
        const contract = await getUserContract('admin');
        const queryString: any = {};
        queryString.selector = {
            phoneNumber: phoneNumber,
            docType: 'user',
            role: 'citizen'
        }
        const rs = await contract.evaluateTransaction('getQueryResultForQueryString', JSON.stringify(queryString));
        const users = JSON.parse(rs.toString());
        if(users.length === 0) return undefined;
        return users[0];
    } catch (error) {
        throw error;
    }
}
export async function getPoliceByPhoneNumber(phoneNumber: string):Promise<any>{
    try{
        const contract = await getUserContract('admin');
        const queryString : any = {}
        queryString.selector={
            docType: "user",
            $or: [
                {role:"police"},
                {role:"admin"}
            ],
            phoneNumber: phoneNumber
        }
        const result = await contract.evaluateTransaction("getQueryResultForQueryString", JSON.stringify(queryString));
        const users = JSON.parse(result.toString())
        if(result.length===0){
            throw ("Khong tim thay Police *from fabric*");
        }
        return users[0];
    }
    catch(error){
        throw error;
    }
}
export async function getAllUsers():Promise<any>{
    try{
        const contract = await getUserContract('admin');
        const queryString : any = {}
        queryString.selector={
            docType: "user",
        }
        const result = await contract.evaluateTransaction("queryRecordResult", JSON.stringify(queryString));
        const users = JSON.parse(result.toString())
        if(result.length===0){
            throw ("Co loi query User *from fabric*");
        }
        return users;
    }
    catch(error){
        throw error;
    }
}
export async function getCitizens():Promise<any>{
    try{
        const contract = await getUserContract('admin');
        const queryString : any = {}
        queryString.selector={
            docType: "user",
            role: 'citizen'
        }
        const result = await contract.evaluateTransaction("queryRecordResult", JSON.stringify(queryString));
        const users = JSON.parse(result.toString())
        if(result.length===0){
            throw ("Khong tim thay citizens *from fabric*");
        }
        return users;
    }
    catch(error){
        throw error;
    }
}
export async function getPolices():Promise<any>{
    try{
        const contract = await getUserContract('admin');
        const queryString : any = {}
        queryString.selector={
            docType: "user",
            role: 'police'
        }
        const result = await contract.evaluateTransaction("queryRecordResult", JSON.stringify(queryString));
        const users = JSON.parse(result.toString())
        if(result.length===0){
            throw ("Khong tim thay Police *from fabric*");
        }
        return users;
    }
    catch(error){
        throw error;
    }
}
export async function getUserByUID(userID: string): Promise<any>{
    try{
        const contract = await getUserContract('admin');
        const queryString : any ={ };
        queryString.selector={
            docType:"user",
            id: userID
        }
        const result = await contract.evaluateTransaction("queryResultByQueryString", JSON.stringify(queryString));
        const users = JSON.parse(result.toString());
        if(users.length===0){
            throw ("Khong tim thay userid *from fabric*")
        }
        return users[0];
    }
    catch(error){
        return error;
    }
}

export async function queryUser(userID: string, queryString: string): Promise<any>{
    try{
        const contract = await getUserContract(userID);
        const result = await contract.evaluateTransaction("queryResultByQueryString", JSON.stringify(queryString));
        return JSON.parse(result.toString());
    }
    catch(error){
        return error;
    }
}

export async function modifyUser(userID: string, userpayload: any): Promise<any>{
    try{
        const contract = await getUserContract(userID);
        const result = await contract.submitTransaction("updateUser",userID, JSON.stringify(userpayload));
        return {TxID: result.toString()}
    }
    catch(err){
        return {TxID: null}
    }
}

export async function verifyUserByPolice(userPoliceID: string, userverifiedID: string ){
    try{
        const contract = await getUserContract(userPoliceID);
        const result = await contract.submitTransaction("verifyUser", userverifiedID );
        return {TxID: result.toString()}
    }
    catch(err){
        return {TxID: null}
    }
}

export async function changePassword(userID: string, newPass: string) {
    try{
        const contract = await getUserContract(userID);
        const result = await contract.submitTransaction("changePassword", userID, newPass);
        return {TxID: result.toString()}
    }
    catch(err){
        return {TxID: null}
    }
}