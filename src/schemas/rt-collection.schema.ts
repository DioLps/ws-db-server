import { Schema, model } from "mongoose";
import { RtCollectionModel } from "../models";

const rtCollectionSchema = new Schema(
  {},
  {
    timestamps: true,
    strict: false,
  }
);

export default model<RtCollectionModel>("RtCollection", rtCollectionSchema);
