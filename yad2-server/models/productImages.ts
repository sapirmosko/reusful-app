import { Schema, model, Types } from "mongoose";

export interface ProductImagesInterface {
  productId: Types.ObjectId;
  imageUrl: string;
}

const productImagesSchema = new Schema<ProductImagesInterface>({
  productId: { type: Schema.Types.ObjectId, required: true },
  imageUrl: { type: String, required: true },
});

export const ProductImages = model<ProductImagesInterface>(
  "productImages",
  productImagesSchema
);
