import { Card } from "../fabric/card/cardInterface";
import { registryCard,
        acceptRegistration,
        rejectRegistration,
        deleteCard,
        getCardByCardID,
        queryPendingRegistration,
        queryCardByQueryString,
        updateCard,
        queryCardByID,
        getCardByID,
        queryAllCards,
        getCitiByName,
        approveRegistration,
        queryCardByUserID,
        registryCardV2,
        queryPendingCards,
        querySuccessCards,
        queryRejectedCards,
        queryCardByCity
     } from "../fabric/card/card.fabric";
import { Authentication } from "../middleware/auth.middleware";
const uploadfp = require('../middleware/upload.fingerprint.middleware')
const upload = require('../middleware/upload.picture.middleware')
import { Router, Request, Response, NextFunction } from "express";
import {nanoid} from "nanoid";
import { createAdd } from "typescript";
const randomstring = require('randomstring')
//const mongoose = require('mongoose');
//import {connection} from '../db'
//connection();

//const conn = mongoose.connection;
const router = Router();

// router.post('/', Authentication, async (req, res )=>{
//     try{
//         const card : Card ={
//             id:  nanoid().toUpperCase(),
//             fullName: req.body.fullName,
//             dateOfBirth: req.body.dateOfBirth,
//             gender: req.body.gender,
//             nation: req.body.nation,
//             address: req.body.address,
//             hometown: req.body.hometown,
//             registrationCity: req.body.registrationCity,
//             owner: req.body.owner || req.user.id,
//             mail: req.body.mail
//         };
//         const result = await registryCard("admin", card);
//         return res.send({...result});
//     }
//     catch(err){
//         return {error: err};
//     }
// })
router.post('/addCards', Authentication, async (req, res )=>{
    try{
        console.log(req.user)
        const card : Card ={
            id:  "C"+ nanoid().toUpperCase(),
            fullName: req.body.fullName,
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            nation: req.body.nation,
            address: req.body.address,
            hometown: req.body.hometown,
            registrationCity: req.body.registrationCity,
            owner: req.user.phoneNumber,
            mail: req.body.mail,
            ethnic: req.body.ethnic,
            oldIdentityNumber: req.body.oldIdentityNumber,
            religion: req.body.religion,
            birthProvince: req.body.birthProvince,
            bloodType: req.body.bloodType,
            career: req.body.career,
            currentAddress: req.body.currentAddress,
            dadName: req.body.dadName,
            educationLevel: req.body.educationLevel,
            householder: req.body.householder,
            householderRelationship: req.body.householderRelationship,
            matrimony:req.body.matrimony,
            momName: req.body.momName,
            partnerName: req.body.partnerName,
            registrationType: req.body.registrationType,
            docType: "card",
        };
        const result = await registryCardV2(req.user.id, card);
        return res.send({...result});
    }
    catch(err){
        return {error: err};
    }
})
router.post('/addCardsByCitizen', Authentication, async (req, res )=>{
    try{
        const card : Card ={
            id:  "C"+ nanoid().toUpperCase(),
            fullName: req.body.fullName,
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            nation: req.body.nation,
            address: req.body.address,
            hometown: req.body.hometown,
            registrationCity: req.body.registrationCity,
            owner: req.user.phoneNumber,
            mail: req.body.mail,
            ethnic: req.body.ethnic,
            oldIdentityNumber: req.body.oldIdentityNumber,
            religion: req.body.religion,
            birthProvince: req.body.birthProvince,
            bloodType: req.body.bloodType,
            career: req.body.career,
            currentAddress: req.body.currentAddress,
            dadName: req.body.dadName,
            educationLevel: req.body.educationLevel,
            householder: req.body.householder,
            householderRelationship: req.body.householderRelationship,
            matrimony:req.body.matrimony,
            momName: req.body.momName,
            partnerName: req.body.partnerName,
            registrationType: req.body.registrationType,
            docType: "card",
        };
        const result = await registryCardV2(req.user.id, card);
        return res.send({...result});
    }
    catch(err){
        return {error: err};
    }
})

//getCard
router.get('/:id', async(req, res)=>{
    try{
        const card = await getCardByCardID(req.params.id);
        res.send(card);
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
})
//getAllCard
router.get('/allCards/access/test',  async (req, res)=>{
    try{
        const card = await queryAllCards();
        res.send(card.result.cards);
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
})
router.get('/pendingCards/test',  async (req, res)=>{
    try{
        const card = await queryPendingCards();
        res.send(card.result.cards);
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
})
router.get('/registeredCards/test',  async (req, res)=>{
    try{
        const card = await querySuccessCards();
        res.send(card.result.cards);
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
})
router.get('/rejectedCards/test',  async (req, res)=>{
    try{
        const card = await queryRejectedCards();
        res.send(card.result.cards);
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
})
router.get('/cardByCity/test/:cityName',  async (req, res)=>{
    try{
        const card = await queryCardByCity(req.params.cityName);
        const cards = card.result.cards
        var pendingCount =0
        var registeredCount =0
        var rejectedCount =0
        var approvedCount =0
        for(let i=0; i<cards.length; i++){
            if(cards[i].registrationState === 'pending') {
                pendingCount++
              }
              else{
                if(cards[i].registrationState === 'registered') registeredCount++
                else  {
                  if(cards[i].registrationState === 'approved') {
                    approvedCount++
                  }
                  else rejectedCount++
                }
              }
        }
        const count={
            pendingCount,
            registeredCount,
            rejectedCount,
            approvedCount
        }
        res.send(count);
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
})
router.get('/try/getCards',Authentication,  async (req, res)=>{
    try{
        const card = await queryCardByUserID(req.user.phoneNumber);
        res.send(card.result.cards);
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
})
//updateCard

router.put('/:id', Authentication, async(req: Request, res: Response)=>{
    try{
        const payload = req.body;
        const result = await updateCard(req.user.id, req.params.id, payload);
        
        res.send(result)
        if(result.length === 0) return res.status(403).send("Co loi");
    }
    catch(err){
        console.log(err);
    }
})
router.put('/picture/:id', Authentication, upload.single(""), async (req, res)=>{
    try {
        if(req.file == undefined) res.send("You must select a file");
        const payload = {picture: req.file.filename}
        const result = await updateCard("admin", req.params.id,payload )
        res.send(req.file.filename)
    } catch (error) {
        console.log(error)
        res.send("Them anh that bai")
    }
}  )
router.put('/fingerprint/:id', Authentication,uploadfp.single(""), async (req, res)=>{
    try {
        if(req.file == undefined) res.send("You must select a file");
        const payload = {fingerprints: req.file.filename}
        const result = await updateCard("admin", req.params.id,payload )
        res.send(req.file.filename)
    } catch (error) {
        console.log(error)
        res.send("Them anh that bai")
    }
}  )
router.post('/file/test/try',upload.single("file"), async (req, res)=>{
    try {
        
        if(req.file == undefined) res.send("You must select a file");
        const imgUrl = await  req.file.filename;
        return res.send(imgUrl)
    } catch (error) {
        res.send(error);
        
    }
})
// acceptRegistration
router.put("/acceptRegistration/:id", Authentication, async(req: Request, res: Response)=>{
    try{
        //if(req.user.role !== "police" || req.user.role !== "admin") return res.status(403).send("Khong duoc uy quyen");
        let validCheck = false;
        let random6LastNumber = "";
        const card = await getCardByCardID(req.params.id);  
        const city = await getCitiByName(card.birthProvince);
        const year = parseInt(card.dateOfBirth.substring(6,10));
        let checkNum;
        if(1900 <= year && year <= 1999){
            checkNum = 20; 
        }
        else if (2000 <= year && year <= 2099){
            checkNum = 21;
        } 
            else if(2100 <= year && year <= 2199){
                checkNum =22;
            }
                else if(2200 <= year && year <= 2299){
                    checkNum =23;
                }
                    else if(2300 <= year && year <= 2399){
                        checkNum =24
                    }
        let numberByYear;
        switch(checkNum){
            case 20: 
                if(card.gender ==="Nam") numberByYear =0; else numberByYear =1;
                break;
            case 21: 
                if(card.gender ==="Nam") numberByYear =2; else numberByYear =3;
                break;
            case 22: 
                if(card.gender ==="Nam") numberByYear =4; else numberByYear =5;
                break;
            case 23: 
                if(card.gender ==="Nam") numberByYear =6; else numberByYear =7;
                break;
            case 24: 
                if(card.gender ==="Nam") numberByYear =8; else numberByYear =9;
                break;
        }    
        let tempCardNumber = city.currentNumber + numberByYear + card.dateOfBirth.substring(8,10);
        while(!validCheck){
            random6LastNumber = randomstring.generate({
                length : 6,
                charset: "numeric"
            });
            const queryString: any ={}
            queryString.selector ={
                docType: "card",
                cardNumber : tempCardNumber + random6LastNumber
            }
            const rs = await queryCardByQueryString("admin", JSON.stringify(queryString));
            if(rs.length===0) validCheck = true;
        }
        var CardNumber='';
        if(card.registrationType == "Cấp lại CCCD"){
            CardNumber = card.oldIdentityNumber
        }
        else{
            CardNumber = tempCardNumber + random6LastNumber
        }
        const acceptRegistrationResult = await acceptRegistration("admin", req.params.id, CardNumber)    
        if(!acceptRegistrationResult.success){
            res.status(403).send("Tao the cccd buoc 1 thanh cong")
        }
        else{
        return res.json({TxID: acceptRegistrationResult.result.TxID})
        }
    }
    catch(err){
        console.log(err)
    }
})

router.put('/rejectRegistration/:id', Authentication, async(req: Request, res: Response)=>{
    try{
        await updateCard("admin", req.params.id, req.body)
        //if(req.user.role !== "police"|| req.user.role !== "admin") res.send("Khong duoc uy quyen")
        const rejectRegistrationCheck = await rejectRegistration(req.user.id, req.params.id);
        if(!rejectRegistrationCheck.success) {
            res.send("Co loi khi reject");
        }  
        else{
            res.json({TxID: rejectRegistrationCheck.result.TxID})
        }
    }
    catch(err){
        console.log(err);
    }
})
router.put('/approveRegistration/test/:id', Authentication, async(req: Request, res: Response)=>{
    try{
        //if(req.user.role !== "police"|| req.user.role !== "admin") res.send("Khong duoc uy quyen")
        const approveRegistrationCheck = await approveRegistration(req.user.id, req.params.id);
        if(!approveRegistrationCheck.success) {
            res.send("Co loi khi thong qua");
            console.log('co loi khi duyet')
        }  
        else{
            res.json({TxID: approveRegistrationCheck.result.TxID})
        }
    }
    catch(err){
        console.log(err);
    }
})
router.get('/search', async( req: Request, res: Response)=>{
    try{
        //search by cardNumber
        const cardNumber = req.query.cardNumber;
        const queryString: any = {};
        queryString.selector={
            docType: "card",
            cardNumber: cardNumber
        }
        const result = await queryCardByQueryString("admin", JSON.stringify(queryString));
        console.log(result);
        if(result.length === 0){
            res.status(403);
        }
        else {
            const rs =result[0].Record;
            res.send(rs);
        }

    }
    catch(err){
        console.log(err);
    }
})
router.get('/', async(req, res)=> {
    try {
        
    } catch (error) {
        
    }
})
export default router