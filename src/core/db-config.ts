import mongoose from "mongoose";
import { RtCollectionModel } from "../models";
import rtCollectionSchema from "../schemas/rt-collection.schema";

export class DbConfig {
  public client: typeof mongoose | any;

  public async closeDb(): Promise<void> {
    await this.client.connection?.close();
    console.log("Db closed!");
  }

  public listCollections(): any {
    return this.client.connection.collections;
  }

  public addToCollection(collection: RtCollectionModel): Promise<any> {
    return rtCollectionSchema.create(collection);
  }

  public async init(): Promise<any> {
    this.client = await mongoose.connect(process.env.MONGO_URL);
    console.log("Db opened!");
    return this.client;
  }
}
