import readline from "readline";
import { chatWithGPT } from "../api/gptClient";
import { GPTMessage } from "../types";

export class Assistant {
    private context: GPTMessage[] = [
        { role: "system", content: "You are Ari, a helpful AI assistant." }
    ];

    constructor() {}

    async handleInput(input: string): Promise<string> {
        const userMessage: GPTMessage = { role: "user", content: input };
        this.context.push(userMessage);

        const reply = await chatWithGPT(this.context);
        this.context.push({ role: "assistant", content: reply });
        return reply;
    }

    start() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        console.log("Say 'Hey Ari' to start a conversation. Type 'exit' to quit.");

        rl.on("line", async (line) => {
            if (line.toLowerCase() === "exit") {
                rl.close();
                return;
            }

            if (line.toLowerCase().startsWith("hey ari")) {
                const query = line.replace(/hey ari/i, "").trim();
                const reply = await this.handleInput(query || "Hello!");
                console.log(`Ari: ${reply}`);
            } else {
                console.log("You must say 'Hey Ari' to interact.");
            }
        });
    }
}