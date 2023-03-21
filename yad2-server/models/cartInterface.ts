import { Schema, model, Types } from "mongoose";

export interface CartInterface {
  userId: Types.ObjectId;
  productId: Types.ObjectId;
}

const cartSchema = new Schema<CartInterface>({
  userId: { type: Schema.Types.ObjectId, required: true },
  productId: { type: Schema.Types.ObjectId, required: true },
});

export const Cart = model<CartInterface>("cart", cartSchema);
