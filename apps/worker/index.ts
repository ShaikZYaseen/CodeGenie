import express from "express";
import cors from "cors";
import OpenAI from "openai";
import { prismaClient } from "db/client";




const app=express();
app.use(express.json());
app.use(cors());

app.post("/prompt", async(req,res)=>{
    try {
     const {prompt, projectId} = req.body; 
     const client = new OpenAI({apiKey:process.env.OPENAI_API_KEY});
     await prismaClient.prompt.create({
            data: {
                content:prompt,
                projectId,
                type: "USER"

            }
     })

     const allPrompts = await prismaClient.prompt.findMany({
        where :{
            projectId,
        },
        orderBy:{
            createdAt:"asc"
        }
     });



    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
})



app.listen(9090,()=>{
    console.log("Server is running on port 9090")
})