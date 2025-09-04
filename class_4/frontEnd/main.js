const elements = {
  chatContainer: document.getElementById("messages"),
  form: document.getElementById("chatForm"),
  userInput: document.getElementById("userInput"),
};

localStorage.setItem("user_id", "7654321"); //Prueba de user_id
const apiUri = "http://localhost:3000/ask";

const appendMessage = (message, sender) => {
  const messageElem = document.createElement("div");
  messageElem.classList.add("message", sender);

  messageElem.textContent = message;
  console.log("Appending message: ", message);

  elements.chatContainer.appendChild(messageElem);
  elements.chatContainer.scrollTop = elements.chatContainer.scrollHeight;
  if (message.includes("Error") || message.includes("Network error")) {
    messageElem.style.color = "red";
  }
};

const sendMessage = async (message) => {
  const userId = localStorage.getItem("user_id");
  try {
    appendMessage("Escribiendo...", "bot");
    const response = await fetch(apiUri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: message, user_id: userId }),
    });

    const data = await response.json();
    if (response.ok) {
      elements.chatContainer.lastChild.remove(); //Remover "Escribiendo..."
      appendMessage(data.respuesta, "bot");
    } else {
      elements.chatContainer.lastChild.remove();
      appendMessage("Error:" + data.message, "bot");
    }
  } catch (err) {
    setTimeout(() => {
      elements.chatContainer.lastChild.remove();
      appendMessage("Network error!", "bot");
    }, 2000);
  }
};

elements.form.addEventListener("submit", (e) => {
  e.preventDefault();
  const userMessage = elements.userInput.value.trim();
  if (!userMessage) return;

  appendMessage(userMessage, "user");
  elements.userInput.value = "";

  sendMessage(userMessage);
});
