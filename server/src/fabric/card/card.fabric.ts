import { query } from "express";
import { Card, City } from "./cardInterface";
import { getCardContract } from "./contractProcess";


//registryCard
export async function registryCard( userID: string, card: Card){
    try{
        const contract = await getCardContract(userID);
        const params: Array<any> =[
            card.id,
            card.fullName,
            card.dateOfBirth,
            card.gender,
            card.address,
            card.nation,
            card.hometown,
            card.registrationCity,
            card.owner,
            card.mail
        ]  
        const rs = await contract.submitTransaction("createRegistration", ...params);
        return {success: true, result: JSON.parse(rs.toString()) }
    }
    catch(err){
        return {success: false, result:{error: err}};
        }
}
export async function registryCardV2 (userID: string, card: Card){
    try {
        const contract = await getCardContract(userID);
        const rs = await contract.submitTransaction('createCardRegistration',JSON.stringify(card))
        return {success: true, result: JSON.parse(rs.toString())}
    } catch (error) {
        return {success: false, result: error}
    }
}
//updateCard
export async function updateCard(userID: string, cardID: string, updatePayload: any): Promise<any>{
    try{
        const contract = await getCardContract(userID);
        const rs = await contract.submitTransaction("updateCard", cardID, JSON.stringify(updatePayload));
        return {success: true, result: JSON.parse(rs.toString())}
    }
    catch(err){
        return {success: false, result: {error: err}}
    }
}
export async function getCardByID(userID: string, cardID: string): Promise<any>{
    try{
        const contract = await getCardContract(userID);
        const rs = await contract.evaluateTransaction('getCard', cardID);
        return {result: JSON.parse(rs.toString())}
    }
    catch(err){
        return {err}
    }
}
export async function queryAllCards(){
    try{
        const contract = await getCardContract("admin");
        const queryString: any ={};
        queryString.selector = {
                docType: "card"
            }
        //("{\"selector\":{\"docType\":\"card\"}}")
        const rs = await contract.evaluateTransaction('queryRecordResult',JSON.stringify(queryString) );
        const cards  = JSON.parse(rs.toString())
        // const rs = await contract.evaluateTransaction('queryAllCards',JSON.stringify(queryString))
        // const cards  = JSON.parse(rs.toString())
        return { success: true, result: { cards } };
    }
    catch(err){
        return err;
    }
}
export async function queryPendingCards(){
    try{
        const contract = await getCardContract("admin");
        const queryString: any ={};
        queryString.selector = {
                docType: "card",
                $or: [
                    {registrationState:"pending"},
                    {registrationState:"approved"}
                ],
            }
        //("{\"selector\":{\"docType\":\"card\"}}")
        const rs = await contract.evaluateTransaction('queryRecordResult',JSON.stringify(queryString) );
        const cards  = JSON.parse(rs.toString())
        // const rs = await contract.evaluateTransaction('queryAllCards',JSON.stringify(queryString))
        // const cards  = JSON.parse(rs.toString())
        return { success: true, result: { cards } };
    }
    catch(err){
        return err;
    }
}
export async function querySuccessCards(){
    try{
        const contract = await getCardContract("admin");
        const queryString: any ={};
        queryString.selector = {
                docType: "card",
                registrationState: "registered"
            }
        //("{\"selector\":{\"docType\":\"card\"}}")
        const rs = await contract.evaluateTransaction('queryRecordResult',JSON.stringify(queryString) );
        const cards  = JSON.parse(rs.toString())
        // const rs = await contract.evaluateTransaction('queryAllCards',JSON.stringify(queryString))
        // const cards  = JSON.parse(rs.toString())
        return { success: true, result: { cards } };
    }
    catch(err){
        return err;
    }
}
export async function queryRejectedCards(){
    try{
        const contract = await getCardContract("admin");
        const queryString: any ={};
        queryString.selector = {
                docType: "card",
                registrationState:"rejected"
            }
        //("{\"selector\":{\"docType\":\"card\"}}")
        const rs = await contract.evaluateTransaction('queryRecordResult',JSON.stringify(queryString) );
        const cards  = JSON.parse(rs.toString())
        // const rs = await contract.evaluateTransaction('queryAllCards',JSON.stringify(queryString))
        // const cards  = JSON.parse(rs.toString())
        return { success: true, result: { cards } };
    }
    catch(err){
        return err;
    }
}
export async function queryCardByCity(registrationCity: string){
    try{
        const contract = await getCardContract("admin");
        const queryString: any ={};
        queryString.selector = {
                docType: "card",
                registrationCity: registrationCity
            }
        //("{\"selector\":{\"docType\":\"card\"}}")
        const rs = await contract.evaluateTransaction('queryRecordResult',JSON.stringify(queryString) );
        const cards  = JSON.parse(rs.toString())
        // const rs = await contract.evaluateTransaction('queryAllCards',JSON.stringify(queryString))
        // const cards  = JSON.parse(rs.toString())
        return { success: true, result: { cards } };
    }
    catch(err){
        return err;
    }
}
export async function queryCardByUserID(phoneNumber: string){
    try{
        const contract = await getCardContract("admin");
        const queryString: any ={};
        queryString.selector = {
            owner: phoneNumber,
            docType: "card",
        }
        console.log(queryString);
        //("{\"selector\":{\"docType\":\"card\"}}")
        const rs = await contract.evaluateTransaction('queryRecordResult',JSON.stringify(queryString));
        const cards  = JSON.parse(rs.toString())
        console.log(cards)
        // const rs = await contract.evaluateTransaction('queryAllCards',JSON.stringify(queryString))
        // const cards  = JSON.parse(rs.toString())
        return { success: true, result: { cards } };
    }
    catch(err){
        return err;
    }
}
//acceptRegistration
export async function acceptRegistration(userID: string, cardID: string, cardNumber: string): Promise<any>{
    try{
        const contract = await getCardContract(userID);
        const rs = await contract.submitTransaction("acceptRegistration", cardID, cardNumber);
        if(rs.toString().length !==0){
            return {success: true, result: {TxID: rs.toString()}}
        }
        else{
            throw new Error("Khong the accept dang ky *from fabric*"); 
        }
    }
    catch(err){
        return {success: false, result: {error: err}}
    }
}

//rejectRegistration
export async function rejectRegistration(userID: string, cardID: string ): Promise<any>{
    try{
        const contract = await getCardContract(userID);
        const rs = await contract.submitTransaction("rejectRegistration", cardID); 
        if(rs.toString().length!==0){
            return {success: true, result: {TxID: rs.toString()}}
        }
        else{
            throw new Error("Khong the loai bo dang ky");
        } 
    }
    catch(err){ 
        return {success: false, result:{error: err}}
    }
}

export async function approveRegistration(userID: string, cardID: string ): Promise<any>{
    try{
        const contract = await getCardContract(userID);
        const rs = await contract.submitTransaction("approveRegistration", cardID); 
        if(rs.toString().length!==0){
            return {success: true, result: {TxID: rs.toString()}}
        }
        else{
            throw new Error("Khong the loai bo dang ky");
        } 
    }
    catch(err){ 
        return {success: false, result:{error: err}}
    }
}
//queryPendingRegistration
export async function queryPendingRegistration(userID: string): Promise<any>{
    try{
        const contract = await getCardContract(userID);
        const cardsAsBuffer = await contract.evaluateTransaction("queryAllPendingRegistration");
        const cards = JSON.parse(cardsAsBuffer.toString());
        if(cards.length >0){
            return {success: true, result: {cards}}
        }
        else{
            throw new Error("Khong the truy xuat pending cards *from fabric*")
        }
    }
    catch(err){
        return {success: false, result:{error: err}}
    }
}
//getCardByCardID
export async function getCardByCardID(cardID: string): Promise<any>{
    try{
        const contract = await getCardContract('admin');
        const queryString: any ={};
        queryString.selector={
            docType: "card",
            id: cardID
        }
        const rs = await contract.evaluateTransaction('queryRecordResult', JSON.stringify(queryString));
        const cards=  JSON.parse(rs.toString());
        return cards[0]
        
    }
    catch(err){
        console.log(err)
    }
}

//queryCardByQueryString
export async function queryCardByQueryString(userID: string, queryString: string): Promise<any>{
    try{
        const contract = await getCardContract(userID);
        const result = await contract.evaluateTransaction("queryResult", queryString);
        return JSON.parse(result.toString())
    }
    catch(err){
        throw err;
    }
}
// getcard
export async function queryCardByID(id: string) {
    try{
        const contract = await getCardContract("admin")
        const queryString : any = {}
        queryString.selector = {
            docType: "card",
            id: id
        }
        const result = await this.queryCardByQueryString(JSON.stringify(queryString));
        return result;
    }
    catch(err){
        console.log(err);
    }
}
//deleteCard
export async function deleteCard(userID: string, cardID: string):Promise<any>{
    try{
        const contract = await getCardContract(userID);
        const rs = await contract.submitTransaction("deleteCard", cardID);
        if(rs.toString().length!==0){
            return {success: true, result:{TxID: rs.toString()}}
        }
        else{
            throw new Error("Khong the xoa card");
        }
    }
    catch(err){
        return {success: true, result:{error: err}}
    }
}
export async function deleteCity(userID: string, cityID: string){
    try{
        const contract = await getCardContract(userID);
        const rs = await contract.submitTransaction("deleteCity", cityID);
        if(rs.toString().length!==0){
            return {success: true, result:{TxID: rs.toString()}}
        }
        else{
            throw new Error("Khong the xoa city");
        }
    }
    catch(err){
        return {success: false, result:{error: err}}
    }
}
//addCity
export async function addCity(userID: string, city: City):Promise<any>{
    try{
        const contract = await getCardContract(userID);
        const params: Array <any> =[
            city.id,
            city.cityName,
            city.currentNumber
        ]
        const rs = await contract.submitTransaction("addCity",...params);
        return {success: true, result: JSON.parse(rs.toString())}
    }
    catch(err){
        return {success: false, result:{error: err}}
    }
}
//addDistrict
export async function addDistrict( userID: string, district: any): Promise<any>{
    try{
        const contract = await getCardContract(userID);
        const rs = await contract.submitTransaction("addDistrict", JSON.stringify(district));
        return {success: true, result: {TxID: rs.toString()}}
    }
    catch(err){
        return {success: false, result: {error: err}}
    }
}
export async function getCityByID(cityId: string) {
    const queryString = {
        selector: {
            id: cityId,
            docType: "city"
        }
    }
    const result = await queryCardByQueryString('admin', JSON.stringify(queryString));
    return result[0].Record;
}
export async function getCitiByName(cityName: string){
    try{
        const queryString: any ={};
        queryString.selector ={
            docType: "city",
            cityName: cityName
        }
        //("{\"selector\":{\"docType\":\"city\", \"cityName\":\""+cityName+"\"}}")
        const rs = await queryCardByQueryString('admin', JSON.stringify(queryString) );
        return rs[0].Record;
    }
    catch(err){
        throw new Error (err);
    }
}
export async function getAllCity() {
    try{
        const contract = await getCardContract('admin')
        const queryString: any ={};
        queryString.selector={
            docType: "city"
        }
        //("{\"selector\":{\"docType\":\"city\"}}")
        const result = await contract.evaluateTransaction('queryRecordResult',JSON.stringify(queryString) );
        //queryCardByQueryString('admin', JSON.stringify(queryString));
        const cities = JSON.parse((result.toString()));
        return {success: true,  cities}
    }
    catch(err){
        throw new Error(err)
    }
}