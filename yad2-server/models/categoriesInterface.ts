import { Schema, model, Types } from "mongoose";

export interface CategoriesInterface {
  categorieId: Number;
  categorieName: string;
}

const categorySchema = new Schema<CategoriesInterface>({
  categorieId: { type: Number, required: true },
  categorieName: { type: String, required: true },
});

export const Category = model<CategoriesInterface>("category", categorySchema);
