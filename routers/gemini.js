const express=require('express')
const gemini=express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv=require('dotenv')
dotenv.config()
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function removeChar(text){
    text=(text.replace(/[`]+/g, ''));
    text = text.substring(0, 5) + text.substring(5).replace(/\s/, "");
    if(text.startsWith('JSON')){
        text=text.substring(4)
    }else if(text.startsWith('json')){
        text=text.substring(4)
    }
    return text
}

gemini.get('/places',async(req,res)=>{
    // const query=req.query
    const query={
        source:"Los Angeles",
        destination:"New york",
        budget:"10000",
        start_date:"05/05/2024",
        return_date:"05/10/2024"
    }
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const prompt = `Suggest me some places to visit. Consider the information. budget=$${query.budget}, current_location:${query.source},destination:${query.destination},leaving_date:${query.start_date},return_date:${query.return_date}.Consider all possible destinations and all kinds of expenses. Give me response in JSON format.Also give results according to my API plan.Name the array as "data"`
    // const prompt="Suggest me some flights from lax to sfo tomorrow along with links to book that flight. Give me response in JSON format."
    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        var text = response.text();
        text=removeChar(text)
        res.send(text)
    } catch (error) {
        console.log(error)
        res.send("No Response")
    }
})

gemini.get('/places/transportation',async(req,res)=>{
    // const query=req.query
    const query={
        source:"Los Angeles",
        destination:"New York",
        start_date:"05/05/2024",
        return_date:"05/10/2024"
    }
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const prompt=`Give me all flight details with parameters source=${query.source} , destination=${query.destination},start_date:${query.start_date},return_date:${query.return_date}. Provide me multile results for inbound and outbound for the trip.Also give me links to those.Give response in JSON format.Also give results according to my API plan.Name the array as "data"`
    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        var text = response.text();
        text=removeChar(text)
        res.send(text)
    } catch (error) {
        console.log(error)
        res.send("No Response")
    }
})

gemini.get('/places/poi',async(req,res)=>{
    // const query=req.query
    const query={
        source:"Los Angeles",
        destination:"New York",
        start_date:"05/05/2024",
        return_date:"05/10/2024"
    }
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const prompt=`Give me top 5 points of interest and its all kind of information along with top 3 google reviews of various kinds for each in ${query.destination}, arrival_date:${query.start_date},return_date:${query.return_date}.Also give me date for on what days of my travel the place would be closed,if not then just say "open".Also give me links to those.Limit the review text to 8 words. Give response in JSON format.Name the array as "data"`
    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        var text = response.text();
        text=removeChar(text)
        res.send(text)
    } catch (error) {
        console.log(error)
        res.send("No Response")
    }
})


gemini.get('/places/stays',async(req,res)=>{
    // const query=req.query
    const query={
        current_location:"JFK airport",
        places_to_visit:["Times Square","central park"],
        checkin_date:"05/05/2024",
        checkout_date:"05/10/2024"
    }
    // suggest stays near my arrival location in that city and 
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    
    const prompt=`Give me top 5 stays details along with top 3 google reviews for each with parameters current_location:${query.destination},checkin_date:${query.start_date},checkout_date:${query.return_date}.Suggest a stay near to these places ${query.places_to_visit} and ${query.current_location}.Also give me links to book those.Limit the review description text to 8 words.Give response in JSON format. Name the array as "data"`
    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        var text = response.text();
        text=removeChar(text)
        res.send(text)
    } catch (error) {
        console.log(error)
        res.send("No Response")
    }
})

gemini.get('/places/food',async(req,res)=>{
    // const query=req.query\
    // get food places near the places I want to visit and my stay location.
    const query={
        stay_location:"31 street broadway hotel",
        destination:"new york",
        places_to_visit:["Times Square","central park"],
        checkin_date:"05/05/2024",
        checkout_date:"05/10/2024"
    }
    // suggest stays near my arrival location in that city and 
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    
    const prompt=`Give me top 5 food places along with 2 google reviews for each with parameters stay_location:${query.stay_location} in ${query.destination},checkin_date:${query.start_date},checkout_date:${query.return_date}.Suggest 5 places near to ${query.places_to_visit}, ${query.stay_location}.Give me distances of the ${query.places_to_visit} and ${query.stay_location} from the food places.Also give me links to book those and their hours.Give response in JSON format.Limit the review description text to 8 words.Name the array as "data"`
    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        var text = response.text();
        text=removeChar(text)
        res.send(text)
    } catch (error) {
        console.log(error)
        res.send("No Response")
    }
})

module.exports=gemini