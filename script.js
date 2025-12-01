document.getElementById("chat-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const input = document.getElementById("user-input");
    const message = input.value.trim();
    if (!message) return;

    addMessage(message, "user");
    input.value = "";

    try {
        const response = await fetch("https://curabot-j3co.onrender.com/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message }),
        });

        const data = await response.json();

        if (data.reply) {
            addMessage(data.reply, "bot");
        } else {
            addMessage("Sorry, something went wrong: AI service failed.", "bot");
        }
    } catch (err) {
        addMessage("Server error, try again later.", "bot");
        console.error(err);
    }
});

function addMessage(text, sender) {
    const chatWindow = document.getElementById("chat-window");
    const messageDiv = document.createElement("div");
    messageDiv.className = "message " + sender + "-message";
    messageDiv.textContent = text;
    chatWindow.appendChild(messageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}
