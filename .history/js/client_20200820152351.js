const socket = io("http://localhost:8000");

const form = document.getElementById("send-container");

const messageInp = document.getElementById("messageInp");

const messageContainer = document.querySelector(".container");

var audio = new Audio('../audio/')

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInp.value;
    append(`you:${message}`,'right');
    socket.emit('send',message);
    messageInp.value=''
})

const name = prompt("Enter your name to join this conversation");

const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
};

socket.emit("new-user-joined", name);

socket.on("user-joined", (name) => {
    append(`${name} joined the chat`,'right')
});
socket.on("receive", (data) => {
    append(`${data.name}:${data.message}`,'left')
});
socket.on("left", (name) => {
    append(`${name} left the conversation`,'left')
});
