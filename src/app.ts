import express from "express";
import { createServer, Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import { WsEvents } from "./ws-event.enum";

class App {
  public PORT: number = 8100;
  public app: express.Application;
  public server: HttpServer;

  private io: Server;

  constructor() {
    this.routes();
    this.initSockets();
    this.openWsConnection();
  }

  public routes(): void {
    this.app = express();
    this.app.route("/").get((req, res) => {
      res.send("Hellow my friendo!");
    });
  }

  private initSockets(): void {
    this.server = createServer(this.app);
    this.io = new Server(this.server, {
      cors: {
        origin: "http://127.0.0.1:5500/",
        methods: ["GET", "POST"]
      },
    });
  }

  private openWsConnection(): void {
    this.io.on(WsEvents.CONNECT, (socket: any) => {
      console.log("User connected");
      this.openMainChannel(socket);
      this.onDisconnectWs(socket);
    });
  }

  private openMainChannel(socket: Socket<any>): void {
    socket.on(WsEvents.CHANNEL_MSG_NAME, (collection: any) => {
      console.log("message: " + collection);
    });
  }

  private onDisconnectWs(socket: Socket<any>): void {
    socket.on(WsEvents.DISCONNECT, () => {
      console.log("user disconnected");
    });
  }
}

export default new App();
