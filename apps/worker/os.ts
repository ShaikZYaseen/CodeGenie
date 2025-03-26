import { prismaClient } from "db/client";
import { RelayWebsocket } from "./ws.ts";

function getBaseWorkerDir(type: "NEXTJS" | "REACT_NATIVE") {
    if (type === "NEXTJS") {
        return "/tmp/next-app";
    }
    return "/tmp/mobile-app";
}

export async function onFileUpdate(
    filePath: string,
    fileContent: string,
    projectId: string,
    promptId: string,
    type: "NEXTJS" | "REACT_NATIVE"
) {
    await prismaClient.action.create({
        data: {
            projectId,
            promptId,
            content: `Updated file ${filePath}`,
        },
    });

    const ws = RelayWebsocket.getInstance();
    ws.send(
        JSON.stringify({
            event: "admin",
            data: {
                type: "update-file",
                content: fileContent,
                path: `${getBaseWorkerDir(type)}/${filePath}`,
            },
        })
    );
}

export async function onShellCommand(shellCommand: string, projectId: string, promptId: string) {
    const commands = shellCommand.split("&&");
    const ws = RelayWebsocket.getInstance();

    for (const command of commands) {
        const trimmedCommand = command.trim();
        console.log(`Running command: ${trimmedCommand}`);

        ws.send(
            JSON.stringify({
                event: "admin",
                data: {
                    type: "command",
                    content: trimmedCommand,
                },
            })
        );

        await prismaClient.action.create({
            data: {
                projectId,
                promptId,
                content: `Ran command: ${trimmedCommand}`,
            },
        });
    }
}

export function onPromptEnd(promptId: string) {
    const ws = RelayWebsocket.getInstance();
    ws.send(
        JSON.stringify({
            event: "admin",
            data: {
                type: "prompt-end",
            },
        })
    );
}