import mongoose, { Model, Schema } from "mongoose";
import { Entry } from "../interfaces";

// interface EntryCreat extends Omit<Entry, "_id" | "createAt"> {}
const entrySchema = new Schema(
  {
    description: { type: String, required: true },
    create: { type: Number },
    status: {
      type: String,
      enum: {
        values: ["pending", "in-progress", "finished"],
        message: "{VALUE} no es un estado permitido",
      },
      default: "pending",
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const EntryModel: Model<Entry> =
  mongoose.models.Entry || mongoose.model("Entry", entrySchema);

export default EntryModel;
