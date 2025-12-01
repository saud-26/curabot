document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatWindow = document.getElementById('chat-window');

    // The URL of your backend server
const API_URL = 'http://localhost:3000/get-advice';


    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const symptoms = userInput.value.trim();

        if (!symptoms) return;

        // Display user's message
        addMessage(symptoms, 'user');
        
        // Clear input field and show typing indicator
        userInput.value = '';
        const typingIndicator = addMessage('Thinking...', 'bot', true);

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ symptoms }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Network response was not ok.');
            }

            const data = await response.json();
            
            // Remove the "thinking" message
            typingIndicator.remove();
            
            // Display AI's response with formatting
            addMessage(data.advice, 'bot');

        } catch (error) {
            console.error('Error:', error);
            typingIndicator.remove();
            addMessage(`Sorry, something went wrong: ${error.message}`, 'bot');
        }
    });

    function addMessage(text, sender, isTyping = false) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${sender}-message`);
        
        if (isTyping) {
            messageElement.id = 'typing-indicator';
        }

        // Simple markdown-to-HTML conversion
        let formattedText = text
            .replace(/\*\*\*(.*?)\*\*\*/g, '<h3>$1</h3>') // For disclaimer/headers
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // For bold text
            .replace(/\n/g, '<br>');

        messageElement.innerHTML = `<p>${formattedText}</p>`;
        chatWindow.appendChild(messageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll to the bottom
        return messageElement;
    }

});

