const express=require('express')
const app=express()
const geminiAPI=require('./routers/gemini.js');
const dotenv=require('dotenv')
dotenv.config()
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro"});

const PORT= 3000 || process.env.PORT
app.get('/',(req,res)=>{
    res.send("Home page is ready")
})


app.use('/api/gemini/',geminiAPI);
app.listen(PORT,()=>{
    console.log("Server is listening at 3000")
})