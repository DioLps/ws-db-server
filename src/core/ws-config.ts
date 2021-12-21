import { Server as HttpServer } from "http";
import { Server, ServerOptions, Socket } from "socket.io";
import { RtCollectionModel, WsEvents } from "../models";
import { DbConfig } from "./db-config";

export class WsConfig {
  public db?: DbConfig;
  private socketOptions: Partial<ServerOptions> = {
    cors: {
      origin: "*",
    },
  };

  private io: Server;

  constructor(public server: HttpServer) {
    this.io = new Server(this.server, this.socketOptions);
  }

  public openWsConnection(): void {
    this.io.on(WsEvents.CONNECT, (socket: any) => {
      console.log("User connected");
      this.openMainChannel(socket);
      this.onDisconnectWs(socket);
    });
  }

  public openMainChannel(socket: Socket<any>): void {
    try {
      socket.on(
        WsEvents.CHANNEL_MSG_NAME,
        async (collection: RtCollectionModel) => {
          this.db = new DbConfig();
          await this.db.init();
          await this.db.addToCollection(collection);
          await this.db.closeDb();
          this.io.emit(collection.name, collection);
        }
      );
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  public onDisconnectWs(socket: Socket<any>): void {
    socket.on(WsEvents.DISCONNECT, () => {
      console.log("user disconnected");
    });
  }
}
