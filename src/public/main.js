// Io was provided by the cdn

const socket = io("http://localhost:8100");

const sendBtn = document.querySelector("#send");

sendBtn.onclick = () => {
  console.log("hey", socket);
  socket.emit("collection",true)
};
