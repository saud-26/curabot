// server.js

// Load .env ONLY when running locally (NOT on Render)
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Load API Key from Render environment
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error("❌ ERROR: GEMINI_API_KEY is missing!");
}

const genAI = new GoogleGenerativeAI(apiKey);

// Default route
app.get("/", (req, res) => {
    res.send("Curabot AI Health Assistant Backend Running Successfully!");
});

// Chatbot route
app.post("/api/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;

        if (!userMessage) {
            return res.status(400).json({ error: "Message is required." });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(userMessage);
        const aiResponse = result.response.text();

        res.json({ reply: aiResponse });
    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ error: "AI service failed." });
    }
});

// Port for Render or local use
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
