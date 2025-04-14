const inputField = document.getElementById("input");
const md = window.markdownit; 

let hasHovered = false;

inputField.addEventListener("mouseenter", function () {
    if (!hasHovered) {
        inputField.style.width = "500px";
        hasHovered = true;
    }
});

const inputField1 = document.getElementById("input");
const result = document.getElementById("result");
const button = document.getElementById("button");

inputField1.addEventListener("input", function () {
    this.style.height = "35px";
    const maxHeight = 100;
    const minHeight = 35;
    const contentHeight = Math.max(this.scrollHeight, minHeight);
    const newHeight = Math.min(contentHeight, maxHeight);
    this.style.height = newHeight + "px";
    button.style.height = newHeight + "px";
});



async function sendPromptToOllama(prompt) {
    try {
      
        const botMessageContainer = document.createElement('div');
        botMessageContainer.classList.add('bot-message');

       
        const loadingContainer = document.createElement('div');
        loadingContainer.classList.add('loading-container');

        const loadingDots = document.createElement('div');
        loadingDots.classList.add('loading-dots');

    
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('span');
            loadingDots.appendChild(dot);
        }

        loadingContainer.appendChild(loadingDots);
        botMessageContainer.appendChild(loadingContainer);
        document.getElementById('prompt').appendChild(botMessageContainer);

       
        const response = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: prompt,
                model: "llama3.1"
            })
        });

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullResponse = '';
        
        while (true) {
            const { done, value } = await reader.read();
            
            if (done) break;
            
            const chunk = decoder.decode(value);
            try {
                const jsonResponse = JSON.parse(chunk);
                if (!jsonResponse.done) {
                   
                    const loadingContainer = botMessageContainer.querySelector('.loading-container');
                    if (loadingContainer) {
                        botMessageContainer.removeChild(loadingContainer);
                    }
                    
                    fullResponse += jsonResponse.response;
                    botMessageContainer.innerHTML = fullResponse;
                    scrollToBottom();
                }
            } catch (parseError) {
                console.error('Error parsing chunk:', parseError.message);
            }
        }

    } catch (error) {
        document.getElementById("err_msg").textContent = error.message + "!";
    }
    scrollToBottom();
}

function scrollToBottom() {
    const promptContainer = document.getElementById('result');
    promptContainer.scrollTop = promptContainer.scrollHeight;
}

document.getElementById("button").onclick = function send() {
    inputField1.style.height = "35px";
    button.style.height = inputField1.style.height;

    document.getElementById("err_msg").textContent = "";

    if (document.getElementById("input").value == "") {
        document.getElementById("err_msg").textContent = "A prompt is required!";
    } else {
        result.style.width = "550px";
        result.style.height = "auto";
        const userPrompt = document.getElementById("input").value;

        const userMessage = `<div class="user-message">${userPrompt}</div>`;
        document.getElementById('prompt').innerHTML += userMessage;

        document.getElementById("input").value = "";
        scrollToBottom();

        sendPromptToOllama(userPrompt);
    }
};


//ChatBot

const materialButton = document.querySelector("#toggle-button");
const chatbotUI = document.getElementById("chatbot-ui");

materialButton.addEventListener("click", () => {
    // Toggle the visibility of the chatbot UI
    chatbotUI.classList.toggle("visible");

    // Adjust the position of `theBox` if needed
    if (chatbotUI.classList.contains("visible")) {
        theBox.style.transform = "translateX(-200px)"; // Adjust to move as desired
    } else {
        theBox.style.transform = "translateX(0)";
    }
});

