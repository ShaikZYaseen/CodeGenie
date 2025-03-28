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
            const actionRegex = /<boltAction\s+type="(.*?)"(?:\s+filePath="(.*?)")?>([\s\S]*?)<\/boltAction>/g;

            let match;
            while ((match = actionRegex.exec(this.currentArtifact)) !== null) {
                const [, actionType, filePath, actionContent] = match;

                try {
                    if (actionType === "shell") {
                        console.log(`Executing shell command: ${actionContent.trim()}`);
                        this.onShellCommand(actionContent.trim());
                    } else if (actionType === "file" && filePath) {
                        console.log(`Writing to file: ${filePath}`);
                        this.onFileContent(filePath, actionContent.trim());
                    } else {
                        console.warn(`Unknown action type: ${actionType}`);
                    }

                    // Remove processed action from the artifact
                    this.currentArtifact = this.currentArtifact.replace(match[0], "").trim();
                } catch (error) {
                    console.error(`Error processing action "${actionType}":`, error);
                }
            }
        } catch (e) {
            console.error("Error parsing artifact:", e);
        }
    }
}
