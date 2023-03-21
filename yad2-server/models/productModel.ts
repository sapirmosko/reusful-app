import { Schema, model, Types } from "mongoose";
import { User } from "./userModel";
export interface ProductInterface {
  productName: string;
  productDescription: string;
  productPrice: number;
  productStatus: string;
  productDate: Date;
  productImage: string;
  category: Types.ObjectId;
  categorieId: number;
  user: string;
  imageUrl: string;
}

const productSchema = new Schema<ProductInterface>({
  productName: { type: String, required: true },
  productDescription: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productStatus: { type: String, required: true },
  productDate: Date,
  productImage: String,
  category: { type: Schema.Types.ObjectId, ref: "category" },
  categorieId: Number,
  user: { type: String, ref: "user" },
  imageUrl: String,
});

export const Product = model<ProductInterface>("product", productSchema);
