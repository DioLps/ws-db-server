import { Document } from "mongoose";

export interface RtCollectionModel extends Document {
  name?: string;
  dynaData?: any;
}
