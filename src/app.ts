import express from "express";
import { Server, createServer } from "http";

import cors from "cors";

import routes from "./routes";
import { WsConfig } from "./core";

class App {
  public PORT: number = 4000;
  public app: express.Application;
  public server: Server;

  private ws: WsConfig;

  constructor() {
    this.app = express();
    this.middlewares();
    this.initSockets();
  }

  private middlewares(): void {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(routes);
  }

  private initSockets(): void {
    this.server = createServer(this.app);
    this.ws = new WsConfig(this.server);
    this.ws.openWsConnection();
  }
}

export default new App();
