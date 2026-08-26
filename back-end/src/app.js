import express from 'express';
import dotenv from 'dotenv';
import Routes from './routes/Router.js';
import path, { join } from 'path';
import cors from 'cors';
import dbConnect from './lib/dbConnect.js';
import dns from 'dns';
import cookieParse from 'cookie-parser';


dotenv.config();

dns.setServers(['1.1.1.1', '8.8.8.8']);

const PORT = process.env.PORT || 5000;
const app = express();
const __dirname = path.resolve();

app.use(cookieParse());
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));

app.use(cors({
    origin:process.env.NODE_ENV !== "production" ? "http://localhost:3000" : "https://www.votacaao",
    credentials:true
}));

app.use('/api',Routes);


//production
if(process.env.NODE_ENV === "production"){

    app.use(express.static(join(__dirname, "front-end","dist")))
    
    app.use(/.*/,(req,res)=>{
        res.sendFile(path.join(__dirname,"front-end","dist","index.html"))
    });
}



dbConnect().then(()=>{
    app.listen(PORT,()=>{
    console.log(`App running at ${PORT}`)
})
})









