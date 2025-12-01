const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({ path: __dirname + "/.env" });


const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/get-advice", async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms) {
      return res.status(400).json({ error: "Symptoms are required." });
    }

    // FIXED FOR SDK 0.24.1 → gemini-pro ONLY
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
    You are a helpful AI health assistant. The user reports the following symptoms: "${symptoms}".
    Provide possible causes and helpful advice.

    ***Disclaimer: I am an AI assistant, not a medical professional.***
    `;

    const result = await model.generateContent(prompt);

    const text = result.response.text();
    res.json({ advice: text });

  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: "AI service failed." });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
