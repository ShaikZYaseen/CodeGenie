import express from "express";
import cors from "cors";
import OpenAI from "openai";
import { prismaClient } from "db/client";
import { ArtifactProcessor } from "./parser";
import { onFileUpdate, onPromptEnd, onShellCommand } from "./os.ts";
import { systemPrompt } from "./SystemPromptTemplate.tsx";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/prompt", async (req, res) => {
    try {
        const { prompt, projectId } = req.body;
        const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

        // Save the user prompt to the database
        await prismaClient.prompt.create({
            data: {
                content: prompt,
                projectId,
                type: "USER",
            },
        });

        // Fetch all prompts for the project
        const allPrompts = await prismaClient.prompt.findMany({
            where: {
                projectId,
            },
            orderBy: {
                createdAt: "asc",
            },
        });

        // Prepare messages for the OpenAI API
        const messages:any = allPrompts.map((p) => ({
            role: p.type === "USER" ? "user" : "assistant",
            content: p.content,
        }));

        messages.unshift({
            role: "system",
            content: systemPrompt("REACT_NATIVE"),
        });

        // Initialize the ArtifactProcessor
        let artifactProcessor = new ArtifactProcessor(
            "",
            (filePath, fileContent) => onFileUpdate(filePath, fileContent, projectId, "", "NEXTJS"),
            (shellCommand) => onShellCommand(shellCommand, projectId, "")
        );
        let artifact = "";

        // Call the OpenAI API with streaming enabled
        const response = await client.chat.completions.create({
            model: "o3-mini-2025-01-31",
            messages,
            stream: true,
        });

        // Handle the streaming response
        const decoder = new TextDecoder();
        for await (const chunk of response) {
            const text = JSON.stringify(chunk);
            artifactProcessor.append(text);
            artifactProcessor.parse();
            artifact += text;
        }

        // Save the final artifact to the database
        await prismaClient.prompt.create({
            data: {
                content: artifact,
                projectId,
                type: "SYSTEM",
            },
        });

        res.status(200).json({ message: "Prompt processed successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.listen(9090, () => {
    console.log("Server is running on port 9090");
});