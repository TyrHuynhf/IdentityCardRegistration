import { Application, Request, Response, NextFunction } from "express";
const express = require('express')
const connection = require('./db')
import * as bodyParser from "body-parser";
import userRouter from './api/user.api';
import cardRouter from './api/card.api';
import authRouter from './api/auth.api';
import cityRouter from './api/city.api';
import uploadRouter from './api/upload.api'
import * as dotenv from 'dotenv';
const mongoose = require('mongoose')
const cors = require('cors')
// import { authentication } from './middleware/auth.middleware'

declare global {
    namespace Express {
      interface Request {
        user?: any
      }
    }
}

const connectDB = async()=>{
  try {
    await mongoose.connect(`mongodb+srv://tyrhdev:tyhuynh@card-identity-registrat.wxfmn.mongodb.net/card-identity-registration?retryWrites=true&w=majority`,{
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  } catch (error) {
    console.log(error)
    console.log("Could not connect to database")
    process.exit(1)
  }
}
const app = express();
dotenv.config()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
// app.use(authentication);

app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('/auth', authRouter);
app.use('/city', cityRouter)
app.use('/upload', uploadRouter)
app.use(express.json());
app.get("/test", (req: Request, res: Response) => {
    res.status(200).send("Hello World!");
});

app.listen(3000, () =>{
    console.log("Started CR server")
});