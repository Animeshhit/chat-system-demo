const socket = io();

// Select elements
const $messageForm = document.querySelector("#message-form");
const $messageInput = document.querySelector("#message-input");
const $messages = document.querySelector("#messages");

// Listen for incoming messages
socket.on("message", (message) => {
  const $li = document.createElement("li");
  $li.textContent = message;
  $messages.appendChild($li);
});

// Handle form submission
$messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = $messageInput.value;
  socket.emit("sendMessage", message);
  $messageInput.value = "";
  $messageInput.focus();
});
