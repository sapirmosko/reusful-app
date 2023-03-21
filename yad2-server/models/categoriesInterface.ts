import { Schema, model, Types } from "mongoose";

export interface CategoriesInterface {
  categorieName: string;
}

const categorySchema = new Schema<CategoriesInterface>({
  categorieName: { type: String, required: true },
});

export const Category = model<CategoriesInterface>("category", categorySchema);
