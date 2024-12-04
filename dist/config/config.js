"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPENAI_API_KEY = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
if (!exports.OPENAI_API_KEY) {
    throw new Error("Missing OpenAI API Key in environment variables.");
}
