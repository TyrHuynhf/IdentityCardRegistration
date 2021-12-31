import { registerUser} from "../fabric/user/registerUser";
import { getCitizenByPhoneNumber, getPoliceByPhoneNumber } from "../fabric/user/user.fabric";
import { User } from "../fabric/user/userInterface";
import { Authentication } from "../middleware/auth.middleware";
import { Router, Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken"
import {nanoid} from "nanoid";
const bcrypt = require('bcrypt')
const router = Router();
const jwt_secret = "blockchaintech";

router.post('/registry/citizen', async (req, res)=>{
    try{
        const userCheck = await getCitizenByPhoneNumber(req.body.phoneNumber);
        
        if(typeof(userCheck)== 'undefined'){
            const citizen: User = {
                id : "U"+nanoid().toUpperCase(),
                fullName: req.body.fullName,
                password: await bcrypt.hash(req.body.password, 10),
                phoneNumber: req.body.phoneNumber,
                role: "citizen",
                dateOfBirth: req.body.dateOfBirth,
                docType: "user",
                verifyPolice: req.body.verifyPolice
            }
            
            await registerUser(citizen);
            return res.status(201).json({
                success: true,
                message: `dang ky thanh cong ${req.body.fullName}`
            })
            
        }
        else {
            res.status(400).send("sdt da ton tai")
        }
    }
    catch(err){
        return res.status(400).send(err.message)
    }
});

router.post('/registry/police', Authentication, async (req: Request, res: Response)=>{
    try{
        const userCheck = await getPoliceByPhoneNumber(req.body.phoneNumber);
        
        if(typeof(userCheck)== 'undefined'){
            const police: User = {
                id : "U"+nanoid().toUpperCase(),
                fullName: req.body.fullName,
                password: await bcrypt.hash(req.body.password, 6),
                phoneNumber: req.body.phoneNumber,
                role: "police",
                dateOfBirth: req.body.dateOfBirth,
                docType: "user",
                verifyPolice: "admin",
                verified: true
            }
            await registerUser(police);
            return res.status(201).json({
                success: true,
                message: `dang ky thanh cong ${req.body.fullName}`
            })
        }
        else{
            res.status(400).send("SDT da ton tai")
        }
    }
    catch(err){
        console.log(err);
        return res.status(400).send("Error why register user")
    }
});

router.post('/login/citizen', async(req: Request, res: Response)=>{
    try{
        const citizen = await getCitizenByPhoneNumber(req.body.phoneNumber);
        if(typeof citizen === "undefined") return res.status(401).send({success: false, message: "khong ton tai tai khoan"});
        const isPasswordCorrect = await bcrypt.compare(req.body.password, citizen.Record.password);
        if(!isPasswordCorrect){
            return res.status(401).send({
                success: false,
                message: "Khong dung ten tai khoan or mat khau"
            })
        }
        delete(citizen.Record.password);
        const token = jwt.sign(citizen.Record, jwt_secret);
        const rs = {
            success: true, 
            data: {
                user: citizen.Record,
                token: token
            } 
        }
        await res.status(200).send(rs);
        console.log(`User ${citizen.Record.fullName} log-in successfully`);
    }
    catch(err){
        console.log(err);
        res.send({success: false, message: "Khong tim thay tai khoan trong mang", error: err})
    }
})

router.post('/login/police', async(req: Request, res: Response)=>{
    try{
        const police = await getPoliceByPhoneNumber(req.body.phoneNumber);
        if(typeof police === "undefined") return res.status(401).send({success: false, message: "khong ton tai tai khoan"});
        const isPasswordCorrect = await bcrypt.compare(req.body.password, police.Record.password);
        if(!isPasswordCorrect){
            return res.status(401).send({
                success: false,
                message: "Khong dung ten tai khoan or mat khau"
            })
        }
        delete(police.Record.password);
        const token = jwt.sign(police.Record, jwt_secret);
        const rs = {
            success: true, 
            data: {
                user: police.Record,
                token: token
            } 
        }
        await res.status(200).send(rs);
    }
    catch(err){
        console.log(err);
    }
});
export default router;