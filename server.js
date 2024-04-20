const express=require('express')
const app=express()
const geminiAPI=require('./gemini/calls.js');
const dotenv=require('dotenv')
dotenv.config()
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro"});


app.get('/',(req,res)=>{
    res.send("Home page is ready")
})

app.use('/api/gemini/',geminiAPI);
app.listen('3000',()=>{
    console.log("Server is listening at 3000")
})