// Load .env locally only (NOT on Render)
require("dotenv").config({ override: false, silent: true });

const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;
console.log("Loaded API Key:", apiKey ? "OK" : "MISSING");  // <-- IMPORTANT

const genAI = new GoogleGenerativeAI(apiKey);

// Status route
app.get("/", (req, res) => {
    res.send("Curabot Backend is Running Successfully!");
});

// Chat route
app.post("/api/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;
        if (!userMessage) {
            return res.status(400).json({ error: "Message is required" });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(userMessage);
        const aiReply = result.response.text();

        res.json({ reply: aiReply });

    } catch (err) {
        console.error("AI Error:", err);
        res.status(500).json({ error: "AI service failed" });
    }
});

// Port for Render or local
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port", PORT));
