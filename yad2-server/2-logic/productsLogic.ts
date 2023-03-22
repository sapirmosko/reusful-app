import { Types } from "mongoose";
import { ProductImage } from "../models/productImages";
import { ProductInterface, Product } from "../models/productModel";
import { saveImagesToStorage } from "./storageLogic";

const uniqid = require("uniqid");

export async function getProductsByCategorie(id: string) {
  let objectID = new Types.ObjectId(id);
  const results = Product.find({ categorieId: objectID });
  return results;
}

export async function addProduct(product: ProductInterface, file: any) {
  const imageId = uniqid();
  const url = await saveImagesToStorage(file, imageId);
  product.imageUrl = url;
  let productToSave = new Product(product);
  let prod = await productToSave.save();
  console.log(prod);

  return prod;
}

export async function getProductById(id: string) {
  let objectId = new Types.ObjectId(id);
  let product = await Product.findById(objectId);
  return product;
}

export async function getProductByUserId(id: string) {
  let product = await Product.find({ user: id });
  return product;
}

export async function deleteProductById(product: ProductInterface, id: string) {
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
  let objectId = new Types.ObjectId(id);
  let productDelete = Product.findByIdAndDelete(objectId);
  return productDelete;
}

export async function addproductImages(files: any[], productId: string) {
  const resultsArray: any = [];
  let objectId = new Types.ObjectId(productId);
  files.forEach(async (file) => {
    const imageId = uniqid();
    const url = await saveImagesToStorage(file, imageId);
    let productImage = new ProductImage({ imageUrl: url, productId: objectId });
    let savedProd = await productImage.save();
    resultsArray.push(savedProd);
  });
  return resultsArray;
}

export async function getProductImages(id: string) {
  // const query = `SELECT * FROM productimages WHERE productId = ${id}`;
  // const [results] = await execute(query);
  let objectId = new Types.ObjectId(id);
  let productImages = ProductImage.find({ productId: objectId });
  return productImages;
}

export async function editProduct(product: ProductInterface, id: String) {
  /*const { productName, productDescription, productPrice, productDate, categorieId } = product
    const query = `UPDATE products SET productName = '${productName}', productDescription = '${productDescription}', productPrice = '${productPrice}', productDate = '${productDate}', categorieId = '${categorieId}' WHERE id = ${id}`
    const [results] = await execute<OkPacket>(query);*/
  let results = Product.findByIdAndUpdate(id, product);
  return results;
}
