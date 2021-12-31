import {City} from "../fabric/card/cardInterface"
import { addCity, addDistrict, getCityByID, getCitiByName, getAllCity, deleteCity } from "../fabric/card/card.fabric"
import { Authentication } from "../middleware/auth.middleware";
import { Router, Request, Response, NextFunction } from "express";
import { nanoid } from "nanoid";
import { getAutomaticTypeDirectiveNames } from "typescript";
const router = Router();

router.post('/', Authentication, async (req: Request, res: Response)=>{
    try{
        const city : City ={
            id: "C"+ req.body.currentNumber,
            cityName: (req.body.cityName).toUpperCase(),
            currentNumber: req.body.currentNumber
        }
        const rs = await addCity(req.user.id, city);
        if(rs.length !== 0) return res.send(rs)
    }
    catch(err){
        console.log(err);
        res.send({success: false, error: err})
    }
})

router.get('/:id', async (req, res)=>{
    try{
        const result = await getCityByID(req.params.id);
        res.send(result)
    }
    catch(err){
        res.send(err);
    }
})
router.get('/access/:citiName', async (req, res)=>{
    try{
        const rs = await getCitiByName(req.params.citiName);
        res.send(rs) 
    }
    catch(err){
        res.send(err)
    }
})
router.get('/allCity/getCities', async (req, res)=>{
    try{
        const rs = await getAllCity();
        res.send(rs.cities);
    }
    catch(err){
        res.send(err)
    }
})
router.delete('/:id',async (req, res)=>{
    try {
        const rs = await deleteCity('admin', req.params.id)
        res.send('xoa thanh pho thanh cong')
    } catch (error) {
        res.send(error)
    }
})
export default router