// @ts-nocheck

export class ArtifactProcessor {
    public currentArtifact: string;
    private onFileContent: (filePath: string, fileContent: string) => void;
    private onShellCommand: (shellCommand: string) => void;

    constructor(
        currentArtifact: string, 
        onFileContent: (filePath: string, fileContent: string) => void, 
        onShellCommand: (shellCommand: string) => void
    ) {
        this.currentArtifact = currentArtifact;
        this.onFileContent = onFileContent;
        this.onShellCommand = onShellCommand;
    }

    append(artifact: string) {
        this.currentArtifact += artifact;
    }

    parse() {
        try {
            const actionRegex = /<boltAction type="(.*?)"(?: filePath="(.*?)")?>([\s\S]*?)<\/boltAction>/;
            const match = this.currentArtifact.match(actionRegex);

            if (!match) return;

            const [, actionType, filePath, actionContent] = match;

            if (actionType === "shell") {
                this.onShellCommand(actionContent.trim());
            } else if (actionType === "file" && filePath) {
                this.onFileContent(filePath, actionContent.trim());
            }

            // Remove the processed action from currentArtifact
            this.currentArtifact = this.currentArtifact.replace(match[0], "").trim();
        } catch (e) {
            console.error("Error parsing artifact:", e);
        }
    }
}
