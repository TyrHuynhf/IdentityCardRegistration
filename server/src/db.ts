const mongoose = require('mongoose')
const db = `mongodb+srv://tyrhdev:tyhuynh@card-identity-registrat.wxfmn.mongodb.net/card-identity-registration?retryWrites=true&w=majority`;
export async function connection(){
    try {
        const connectParams ={
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        await mongoose.connect(db, connectParams)
        console.log("connected database mongo")
    } catch (error) {
        console.log(error)
        console.log("Could not connect to database")
    }
}