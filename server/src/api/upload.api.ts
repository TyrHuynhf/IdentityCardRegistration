const upload = require('../middleware/upload.picture.middleware')
import {updateCard} from '../fabric/card/card.fabric' 
import { Router, Request, Response } from "express"
const Grid = require('gridfs-stream')
const mongoose = require('mongoose');
const nodemailer = require('nodemailer')
import {connection} from '../db'
import { Authentication } from '../middleware/auth.middleware';
const router = Router();
const fs = require('fs')
var imgModel = require('../model/model');
var path = require('path');
let gfs, fpfs;
connection();

const conn = mongoose.connection;
conn.once("open", function(){
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("picture")
    fpfs = Grid(conn.db, mongoose.mongo);
    fpfs.collection("fingerprint")
})
router.post('/file/test/try',upload.single("file"), async (req, res)=>{
    try {
        
        if(req.file == undefined) res.send("You must select a file");
        const imgUrl = await  req.file.filename;
        return res.send(imgUrl)
    } catch (error) {
        res.send(error);
        
    }
})

router.get('/picture/:filename', async (req,res)=>{
    try {
        const file = await gfs.files.findOne({filename: req.params.filename})
        const readStream = gfs.createReadStream(file.filename)
        readStream.pipe(res)
    } catch (error){
        res.send(error)
    }
})
router.get('/fingerprint/:filename', async (req,res)=>{
    try {
        const file = await fpfs.files.findOne({filename: req.params.filename})
        const readStream = fpfs.createReadStream(file.filename)
        readStream.pipe(res)
    } catch (error){
        res.send(error)
    }
})
router.delete("/file/:filename", async (req, res) => {
    try {
        await gfs.files.deleteOne({ filename: req.params.filename });
        res.send("success");
    } catch (error) {
        console.log(error);
        res.send("An error occured.");
    }
});
router.post('/send-mail',async function(req, res) {
    try {
        const payload ={
            invitationDate: req.body.invitationDate,
            inviteTime: req.body.inviteTime,
        }
        updateCard("admin", req.body.id, payload)
        //Ti???n h??nh g???i mail, n???u c?? g?? ???? b???n c?? th??? x??? l?? tr?????c khi g???i mail
    var transporter =  nodemailer.createTransport({ // config mail server
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'identitycardreg@gmail.com', //T??i kho???n gmail v???a t???o
            pass: 'tyhuynhle' //M???t kh???u t??i kho???n gmail v???a t???o
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });
    var content = '';
    content += `
        <div >
        <div lang='vi'>
            <div style="padding: 10px; background-color: white;">
                <h4 style="color: #0085ff">Identity Card Registration System</h4>
                <h4> Ch??o ${req.body.fullName}</h4>
                <span style="color: black">????ng k?? l??m th??? c??n c?????c c??ng d??n c???a b???n ???? ???????c duy???t <br>
                Vui l??ng ?????n c?? quan c??ng an t???nh/th??nh ph???  ${req.body.registrationCity} v??o l??c ${req.body.inviteTime} ng??y ${req.body.invitationDate} ????? ti???n h??nh ho??n th??nh quy tr??nh l??m th??? c??n c?????c c??ng d??n <br>
                Khi ??i vui l??ng mang theo khai sinh, h??? kh???u
                </span>
                <br><br><br><br><br>
                <hr></hr>
                <h4>????y l?? mail t??? ?????ng t??? h??? th???ng ????ng k?? l??m c??n c?????c c??ng d??n</h4>
            </div>
        </div>
        </div>
    `;
    var mainOptions = { // thi???t l???p ?????i t?????ng, n???i dung g???i mail
        from: 'NQH-Test nodemailer',
        to: req.body.mail,//req.body.mail,
        subject: 'Mail x??c nh???n ????ng k?? th??nh c??ng',
        text: '',
        html: content //N???i dung html m??nh ???? t???o tr??n kia :))
    }
    transporter.sendMail(mainOptions, function(err, info){
        if (err) {
            console.log(err);
            res.send('Co loi')
        } else {
            console.log('Message sent: ' +  info.response);
            res.send( 'M???t email ???? ???????c g???i ?????n t??i kho???n c???a b???n'); //G???i th??ng b??o ?????n ng?????i d??ng
        }
    });
    } catch (error) {
        res.send(error)
    }
    
});
router.post('/send-mail-reject',async function(req, res) {
    try {
    var transporter =  nodemailer.createTransport({ // config mail server
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'identitycardreg@gmail.com', //T??i kho???n gmail v???a t???o
            pass: 'tyhuynhle' //M???t kh???u t??i kho???n gmail v???a t???o
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });
    var content = '';
    content += `
        <div >
        <div lang='vi'>
            <div style="padding: 10px; background-color: white;">
                <h4 style="color: #0085ff">Identity Card Registration System</h4>
                <h4> Ch??o ${req.body.fullName}</h4>
                <span style="color: black">????ng k?? l??m th??? c??n c?????c c??ng d??n c???a b???n ???? b??? h???y <br>
                L?? do: ${req.body.rejectReason} 
                <br>
                </span>
                <br><br><br><br><br>
                <hr></hr>
                <h4>????y l?? mail t??? ?????ng t??? h??? th???ng ????ng k?? l??m c??n c?????c c??ng d??n</h4>
            </div>
        </div>
        </div>
    `;
    var mainOptions = { // thi???t l???p ?????i t?????ng, n???i dung g???i mail
        from: 'NQH-Test nodemailer',
        to: req.body.mail,//req.body.mail,
        subject: 'Mail x??c nh???n ????ng k?? kh??ng th??nh c??ng',
        text: '',
        html: content //N???i dung html m??nh ???? t???o tr??n kia :))
    }
    transporter.sendMail(mainOptions, function(err, info){
        if (err) {
            console.log(err);
            res.send('Co loi')
        } else {
            console.log('Message sent: ' +  info.response);
            res.send( 'M???t email ???? ???????c g???i ?????n t??i kho???n c???a b???n'); //G???i th??ng b??o ?????n ng?????i d??ng
        }
    });
    } catch (error) {
        res.send(error)
    }
    
});
export default router;