// Io was provided by the cdn

const socket = io("http://localhost:8100");

socket.on("orders", (ordersCollection) => {
  console.log("ordersCollection", ordersCollection);
});

const sendBtn = document.querySelector("#send");

sendBtn.onclick = () => {
  console.log("hey", socket);
  socket.emit("collection", {
    name: "orders",
    dynaData: {
      "0x1mds0d1wjk0ds1djk0s1djks01dsj10": [
        {
          action: "buy",
          amount: "0.01",
          token: "ETH",
        },
        {
          action: "sell",
          amount: "0.02",
          token: "ETH",
        },
      ],
    },
  });
};
