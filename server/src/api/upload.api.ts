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
        //Tiến hành gửi mail, nếu có gì đó bạn có thể xử lý trước khi gửi mail
    var transporter =  nodemailer.createTransport({ // config mail server
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'identitycardreg@gmail.com', //Tài khoản gmail vừa tạo
            pass: 'tyhuynhle' //Mật khẩu tài khoản gmail vừa tạo
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
                <h4> Chào ${req.body.fullName}</h4>
                <span style="color: black">Đăng ký làm thẻ căn cước công dân của bạn đã được duyệt <br>
                Vui lòng đến cơ quan công an tỉnh/thành phố  ${req.body.registrationCity} vào lúc ${req.body.inviteTime} ngày ${req.body.invitationDate} để tiến hành hoàn thành quy trình làm thẻ căn cước công dân <br>
                Khi đi vui lòng mang theo khai sinh, hộ khẩu
                </span>
                <br><br><br><br><br>
                <hr></hr>
                <h4>Đây là mail tự động từ hệ thống đăng ký làm căn cước công dân</h4>
            </div>
        </div>
        </div>
    `;
    var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        from: 'NQH-Test nodemailer',
        to: req.body.mail,//req.body.mail,
        subject: 'Mail xác nhận đăng ký thành công',
        text: '',
        html: content //Nội dung html mình đã tạo trên kia :))
    }
    transporter.sendMail(mainOptions, function(err, info){
        if (err) {
            console.log(err);
            res.send('Co loi')
        } else {
            console.log('Message sent: ' +  info.response);
            res.send( 'Một email đã được gửi đến tài khoản của bạn'); //Gửi thông báo đến người dùng
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
            user: 'identitycardreg@gmail.com', //Tài khoản gmail vừa tạo
            pass: 'tyhuynhle' //Mật khẩu tài khoản gmail vừa tạo
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
                <h4> Chào ${req.body.fullName}</h4>
                <span style="color: black">Đăng ký làm thẻ căn cước công dân của bạn đã bị hủy <br>
                Lý do: ${req.body.rejectReason} 
                <br>
                </span>
                <br><br><br><br><br>
                <hr></hr>
                <h4>Đây là mail tự động từ hệ thống đăng ký làm căn cước công dân</h4>
            </div>
        </div>
        </div>
    `;
    var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        from: 'NQH-Test nodemailer',
        to: req.body.mail,//req.body.mail,
        subject: 'Mail xác nhận đăng ký không thành công',
        text: '',
        html: content //Nội dung html mình đã tạo trên kia :))
    }
    transporter.sendMail(mainOptions, function(err, info){
        if (err) {
            console.log(err);
            res.send('Co loi')
        } else {
            console.log('Message sent: ' +  info.response);
            res.send( 'Một email đã được gửi đến tài khoản của bạn'); //Gửi thông báo đến người dùng
        }
    });
    } catch (error) {
        res.send(error)
    }
    
});
export default router;