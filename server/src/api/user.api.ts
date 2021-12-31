import { changePassword, verifyUserByPolice, queryUser, 
    modifyUser, getUserByUID, getAllUsers,
    getCitizens, getPolices,
} from "../fabric/user/user.fabric";
import { Authentication } from "../middleware/auth.middleware";
import { Router, Request, Response, NextFunction } from "express";
const bcrypt = require('bcrypt')
const router = Router();
const jwt_secret = "blockchain tech";

router.get('/me',Authentication, async(req: Request, res: Response)=>{
    try{
        const user = await getUserByUID(req.user.id);
        const me = user.Record
       // delete(me.password)
        res.send(me);
    }
    catch(err){
        console.log(err);
    }
})

router.get('/allUsers',Authentication, async(req: Request, res: Response)=>{
    try{
        const user = await getAllUsers();
        res.send(user);
    }
    catch(err){
        console.log(err);
    }
})
router.get('/citizens',Authentication, async(req: Request, res: Response)=>{
    try{
        const user = await getCitizens();
        res.send(user);
    }
    catch(err){
        console.log(err);
    }
})
router.get('/polices',Authentication, async(req: Request, res: Response)=>{
    try{
        const user = await getPolices();
        res.send(user);
    }
    catch(err){
        console.log(err);
    }
})
router.post('/changePassword', Authentication, async(req: Request, res: Response)=>{
    try{
        const newPwd = req.body.newPassword;
        const rs = await changePassword( req.user.id, bcrypt.hashSync(newPwd, 5));
        if(rs.TxID) return res.status(200).send({success: true, msg:" doi mat khau thanh cong"});
        else return res.status(401).send({success: false, msg:" doi mat khau KHONG thanh cong"});
    }
    catch(err){
        console.log(err);
    }
})

//getUserByUID
router.get('/:id', Authentication, async(req: Request, res: Response)=>{
    try{
        const user = await getUserByUID(req.params.id);
        res.json((user));

    }
    catch(err){
        console.log(err);
        res.send({success: false, message: "Khong the tim kiem nguoi dung theo ID"});
    }
})

//modifyUser

router.put('/:id', Authentication, async(req: Request, res: Response)=>{
    try{
        const payloadUser = req.body;
        const result = await modifyUser(req.params.id, payloadUser);
        if(result.TxID) return res.status(200).send({success: true, message: "cap nhat user thanh cong"})
        else return res.status(401).send({success: false, message: "cap nhat user that bai"})
    }
    catch(err){
        console.log(err);
        res.send({success: false, message: "Khong the cap nhat nguoi dung theo ID"});
    }
})

//verifyUserByPolice

router.put('/:id/verify', Authentication, async(req: Request, res: Response)=>{
    try{
        //if(req.user.role !=="admin" || req.user.role !=="police") return res.status(401).send("Khong duoc uy quyen");
        const result = await verifyUserByPolice(req.user.id, req.params.id);
        if(result.TxID) return res.status(200).send({success: true})
    }
    catch(err){
        console.log(err);
        res.send({success: false})
    }
})

export default router;
