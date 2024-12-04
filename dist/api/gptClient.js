"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatWithGPT = chatWithGPT;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config/config");
async function chatWithGPT(messages) {
    try {
        const response = await axios_1.default.post("https://api.openai.com/v1/chat/completions", {
            model: "gpt-4",
            messages,
        }, {
            headers: {
                Authorization: `Bearer ${config_1.OPENAI_API_KEY}`,
                "Content-Type": "application/json",
            },
        });
        return response.data.choices[0].message.content;
    }
    catch (error) {
        console.error("Error communicating with GPT API:", error);
        return "I'm sorry, I couldn't process that.";
    }
}
