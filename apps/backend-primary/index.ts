import {prismaClient} from "db/client";
import {redisClient} from "redis/client";
import { authMiddleware } from "./middlewares/auth";

import express, { type Request, type Response } from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.post('/projects',authMiddleware, async(req:Request,res:Response) => {
    try {
       const {prompt} = req.body;
       const userId = req.userId;
       //Add logic to generate name from the prompt
       const description = prompt.split("/n")[0];
       const project = await prismaClient.project.create({
           data: {
               description
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
        const userId = req.userId;
        const projects = await prismaClient.project.findMany();
        res.json(projects);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});    
    }
});



app.listen(3000, () => {
    console.log("Server is running on port 3000");
})


