import {prismaClient} from "db/client";
import {redisClient} from "redis-client/client";
import { authMiddleware } from "./middlewares/auth";

import express, { type Request, type Response } from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.post('/projects',authMiddleware, async(req:Request,res:Response) => {
    try {
       const {prompt} = req.body;
       //@ts-ignore
       const userId = req.userId!;
       //Add logic to generate name from the prompt
    //    console.log(prompt);
       const description = prompt;
       const project = await prismaClient.project.create({
           data: {
               description,
              userId
           }
       }) 
       res.json({projectId:project.id});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
        
    }
})

app.get('/projects',authMiddleware, async(req:Request,res:Response) => {
    try {
        //@ts-ignore
        const userId = req.userId!;
        const project = await prismaClient.project.findFirst({
            where:{
                userId
            }
        });
        res.json(project);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});    
    }
});



app.listen(8080, () => {
    console.log("Server is running on port 8080");
})


