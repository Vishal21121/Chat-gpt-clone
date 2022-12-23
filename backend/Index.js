// express initialization
const express = require('express')
// using dotenv package
require('dotenv').config();
const cors = require('cors');
const app = express();
app.use(express.json())
app.use(cors())
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// api route
app.post('/api/text',async (req,res)=>{
    const {prompt} = req.body
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0,
        max_tokens: 2000,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0,
    });
    console.log(response.data.choices[0].text)
    res.status(200).json({success:true,data:response.data.choices[0].text})
    
})

app.listen(5000,()=>{
    console.log("listening at port 5000")
})
