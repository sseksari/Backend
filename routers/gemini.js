const express=require('express')
const gemini=express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv=require('dotenv')
dotenv.config()
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


gemini.get('/places',async(req,res)=>{
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const prompt = "Write a story about a magic backpack"
    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        res.send(text)
    } catch (error) {
        console.log(error)
        res.send("No Response")
    }
})

module.exports=gemini