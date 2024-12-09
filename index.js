import express, { urlencoded } from "express";
import { configDotenv } from "dotenv";
configDotenv();
import cors from "cors"
import bodyParser from "body-parser"
import {connectTODB} from "./connectDb.js";
import { studentroute } from "./router/student.router.js";


connectTODB()


const app = express();

let PORT =4000;

app.use(cors())
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.send("kaushal");
})

app.use("/student",studentroute)



app.listen(process.env.PORT,(req,res)=>{
    console.log("Server is start on : ", process.env.PORT);
})