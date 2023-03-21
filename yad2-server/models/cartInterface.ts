import { Schema, model, Types } from "mongoose";

export interface CartInterface {
  userId: string;
  productId: Types.ObjectId;
}

const cartSchema = new Schema<CartInterface>({
  userId: { type: String, required: true },
  productId: { type: Schema.Types.ObjectId, required: true },
});

export const Cart = model<CartInterface>("cart", cartSchema);
