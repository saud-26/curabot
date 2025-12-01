document.addEventListener("DOMContentLoaded", () => {
    const chatForm = document.getElementById("chat-form");
    const userInput = document.getElementById("user-input");
    const chatWindow = document.getElementById("chat-window");

    const API_URL = "https://curabot-j3co.onrender.com/api/chat";

    chatForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const message = userInput.value.trim();

        if (!message) return;

        addMessage(message, "user");
        userInput.value = "";

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message })
            });

            const data = await response.json();

            if (data.reply) {
                addMessage(data.reply, "bot");
            } else {
                addMessage("AI could not respond. Please try again.", "bot");
            }

        } catch (err) {
            addMessage("Server error. Try again later.", "bot");
            console.error(err);
        }
    });

    function addMessage(text, sender) {
        const div = document.createElement("div");
        div.className = `message ${sender}-message`;
        div.textContent = text;
        chatWindow.appendChild(div);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }
});
