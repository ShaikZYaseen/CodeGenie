import express from "express";
import cors from "cors";
import OpenAI from "openai";
import { prismaClient } from "db/client";
import { ArtifactProcessor } from "./parser";
import { onFileUpdate, onPromptEnd, onShellCommand } from "./os.ts";



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

     const messages: any = allPrompts.map((p) => ({
        role: p.type === "USER" ? "user" : "assistant",
        content: p.content,
      }));

      messages.unshift({
        role: "system",
        content: "You are an AI chatbot that answers in a friendly tone.",
      });


    let artifactProcessor = new ArtifactProcessor("",onFileUpdate,onShellCommand);
    let artifact ="";

      const response = await client.chat.completions.create({
        model: "gpt-4",
        messages ,
        max_tokens: 8000, 
        stream: true, 
      })
      .on('text' ,(text:any) => {
        artifactProcessor.append(text);
        artifactProcessor.parse();
        artifact += text;
      })
      .on('finalMessage', async(message:any) => {
            console.log("done!")
            await prismaClient.prompt.create({
                data: {
                    content: artifact,
                    projectId,
                    type :"SYSTEM"
                }
            })
      })
      .on('error', (error:any) => {
        console.log("error",error)
      })








    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
})



app.listen(9090,()=>{
    console.log("Server is running on port 9090")
})