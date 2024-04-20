const express=require('express')
const gemini=express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv=require('dotenv')
dotenv.config()
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


gemini.get('/places',async(req,res)=>{
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const prompt = "Can you give me some places to visit in : New York. return me information in json format."
    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        var text = response.text();
        text=(text.replace(/[`]+/g, ''));
        let stringToRemove = "json";
        let newString = text.startsWith(stringToRemove) ? text.substring(stringToRemove.length) : text;
        // console.log(newString);
        res.send(newString)
    } catch (error) {
        console.log(error)
        res.send("No Response")
    }
})

module.exports=gemini