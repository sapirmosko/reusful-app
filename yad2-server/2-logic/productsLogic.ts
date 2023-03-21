import mongoose from "mongoose";
import { ProductInterface, Product } from "../models/productModel";

const uniqid = require("uniqid");

export async function getProductsByCategorie(id: number) {
  const results = Product.find({ categorieId: id });
  return results;
}

export async function addProduct(product: ProductInterface, file: any) {
  let productToSave = new Product(product);
  let prod = await productToSave.save();
  console.log(prod);

  return prod;
}

export async function getProductById(id: String) {
  let product = await Product.findById(id);
  return product;
}

export async function getProductByUserId(id: string) {
  let product = await Product.find({ user: id });
  return product;
}

export async function deleteProductById(product: ProductInterface, id: String) {
  // const { productImage } = product;

  // const qeuryImages = `SELECT * FROM productimages WHERE productId = ${id}`;
  // const resultsImagesRes = await execute<OkPacket>(qeuryImages);
  // const resultsImage = resultsImagesRes[0];
  // resultsImage.forEach(async (image: any) => {
  //   await deleteImageFromS3(image.productsImage);
  // });

  // await deleteImageFromS3(productImage);
  // const query = `DELETE FROM products WHERE id = ${id}`;
  // const [results] = await execute<OkPacket>(query);

  // TODO : Delete Image
  let productDelete = Product.findByIdAndDelete(id);
  return productDelete;
}

export async function addproductImages(files: any[], productId: any) {
  const resultsArray: any = [];
  // files.forEach(async (file) => {
  //   const imageId = "secondaryProductImages" + uniqid();
  //   let key = await saveProductImagesToS3(file, imageId);
  //   const query =
  //     "INSERT INTO productimages(productId,productsImage) VALUES (?,?)";
  //   const [results] = await execute<OkPacket>(query, [productId, key]);
  //   resultsArray.push(results);
  // });
  return resultsArray;
}

export async function getProductImages(id: number) {
  // const query = `SELECT * FROM productimages WHERE productId = ${id}`;
  // const [results] = await execute(query);
  const [results]: any = [];
  return results;
}

export async function editProduct(product: ProductInterface, id: String) {
  /*const { productName, productDescription, productPrice, productDate, categorieId } = product
    const query = `UPDATE products SET productName = '${productName}', productDescription = '${productDescription}', productPrice = '${productPrice}', productDate = '${productDate}', categorieId = '${categorieId}' WHERE id = ${id}`
    const [results] = await execute<OkPacket>(query);*/
  let results = Product.findByIdAndUpdate(id, product);
  return results;
}
