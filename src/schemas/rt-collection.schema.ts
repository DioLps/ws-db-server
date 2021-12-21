import { Schema, model } from "mongoose";
import { RtCollectionModel } from "../models";

const rtCollectionSchema = new Schema(
  {
    name: String,
    dynaData: Object,
  },
  {
    timestamps: true,
  }
);

export default model<RtCollectionModel>("RtCollection", rtCollectionSchema);
