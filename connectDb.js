import mongoose from "mongoose";

let connectTODB = ()=>{
    mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log("Mongo db connect successfully");
    }).catch((err)=>{
        console.log("Mongo db connection error ",err);
    })
}

export {connectTODB}