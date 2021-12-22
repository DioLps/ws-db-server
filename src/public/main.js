localStorage.userWlt = "0x1mds0d1wjk0ds1djk0s1djks01dsj10";

// Io was provided by the cdn

const socket = io("http://localhost:8100");
const listEl = document.querySelector("#orders");
const sendBtn = document.querySelector("#send");

sendBtn.onclick = () => {
  socket.emit("collection", {
    name: "orders",
    dynaData: {
      [localStorage.userWlt]: [
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

class Orders {
  static listen = (ordersCollection) => {
    const orders = ordersCollection.dynaData[localStorage.userWlt];
    orders.forEach((order) => {
      const liEl = document.createElement("li");
      const spanActionEl = document.createElement("span");
      spanActionEl.textContent = order.action;
      const spanAmountEl = document.createElement("span");
      spanAmountEl.textContent = order.amount;
      const spanTokenEl = document.createElement("span");
      spanTokenEl.textContent = order.token;

      liEl.appendChild(spanActionEl);
      liEl.appendChild(spanAmountEl);
      liEl.appendChild(spanTokenEl);
      listEl.appendChild(liEl);
    });
    console.log("ordersCollection", ordersCollection);
  };
}

socket.on("orders", Orders.listen);
