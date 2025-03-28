import * as fs from "fs";
import path from "path";

const BASE_WORKER_DIR = path.join(process.cwd(),"../code-server/tmp","bolty-worker");

// Ensure directory exists
if (!fs.existsSync(BASE_WORKER_DIR)) {
    fs.mkdirSync(BASE_WORKER_DIR, { recursive: true });
}

export async function onFileUpdate(filePath: string, fileContent: string) {
    console.log(`writing file: ${filePath}`);
    console.log("basedir", BASE_WORKER_DIR);
    await Bun.write(`${BASE_WORKER_DIR}/${filePath}`, fileContent);
}

export async function onShellCommand(shellCommand: string) {
    console.log(`Executing shell command: ${shellCommand}`);
    console.log(`Working directory: ${BASE_WORKER_DIR}`);

    const isWindows = process.platform === "win32"; // Detect Windows
    let cmd = isWindows 
        ? ["cmd.exe", "/c", shellCommand]   // Use Windows Command Prompt
        : ["sh", "-c", shellCommand];      // Use Unix Shell

    const result = Bun.spawnSync({
        cmd,
        cwd: BASE_WORKER_DIR,
        stdout: "pipe",
        stderr: "pipe",
    });

    console.log(result.stdout.toString());
    console.error(result.stderr.toString());
}
