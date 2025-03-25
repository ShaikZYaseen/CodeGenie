import {prismaClient} from "db/client";
import {redisClient} from "redis/client";

import express from "express";
import cors from

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})


