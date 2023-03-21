import { Schema, model, Types } from "mongoose";

export interface ChatInterface {
  receiver_id: Types.ObjectId;
  sender_id: Types.ObjectId;
}

const chatSchema = new Schema<ChatInterface>({
  receiver_id: { type: Schema.Types.ObjectId, ref: "user", required: true },
  sender_id: { type: Schema.Types.ObjectId, ref: "user", required: true },
});

export const Chat = model<ChatInterface>("chat", chatSchema);
