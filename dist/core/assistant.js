"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Assistant = void 0;
const readline_1 = __importDefault(require("readline"));
const gptClient_1 = require("../api/gptClient");
class Assistant {
    constructor() {
        this.context = [
            { role: "system", content: "You are Ari, a helpful AI assistant." }
        ];
    }
    async handleInput(input) {
        const userMessage = { role: "user", content: input };
        this.context.push(userMessage);
        const reply = await (0, gptClient_1.chatWithGPT)(this.context);
        this.context.push({ role: "assistant", content: reply });
        return reply;
    }
    start() {
        const rl = readline_1.default.createInterface({
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
            }
            else {
                console.log("You must say 'Hey Ari' to interact.");
            }
        });
    }
}
exports.Assistant = Assistant;
