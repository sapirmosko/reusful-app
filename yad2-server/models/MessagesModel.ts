import { Schema, model, Types } from "mongoose";

export interface MessagesInterface {
  sender_id: Types.ObjectId;
  reciver_id: Types.ObjectId;
  message: string;
  time: Date;
}

const messageSchema = new Schema<MessagesInterface>({
  sender_id: { type: Schema.Types.ObjectId, ref: "user", required: true },
  reciver_id: { type: Schema.Types.ObjectId, ref: "user", required: true },
  message: { type: String, required: true },
  time: { type: Date, required: true },
});

export const Message = model<MessagesInterface>("message", messageSchema);
