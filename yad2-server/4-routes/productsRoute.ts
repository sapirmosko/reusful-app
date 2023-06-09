import express, { response } from "express";
import {
  addProduct,
  addproductImages,
  deleteProductById,
  editProduct,
  getProductById,
  getProductByUserId,
  getProductImages,
  getProductsByCategorie,
} from "../2-logic/productsLogic";
import fetch from "node-fetch";
import { Product } from "../models/productModel";

export const ProductsRoute = express.Router();

ProductsRoute.get("/products/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await getProductsByCategorie(id);
    // console.log(response);

    res.status(200).json(response);
  } catch (e) {
    res.status(400).json(e);
  }
});

ProductsRoute.get("/products/userid/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await getProductByUserId(id);
    res.status(200).json(response);
  } catch (e) {
    res.status(400).json(e);
  }
});

ProductsRoute.post("/products/add", async (req: any, res: any) => {
  try {
    const body = req.body;
    const file = req.files;

    const results = await addProduct(body, file.productImage);
    // console.log(body);

    res.status(200).json(results);
  } catch (e) {
    // console.log(e);

    res.status(400).json(e);
  }
});

ProductsRoute.get("/products/single/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const results = await getProductById(id);
    res.status(200).json(results);
  } catch (e) {
    res.status(400).json(e);
  }
});

ProductsRoute.post("/products/delete/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  // console.log(body);
  try {
    const response = await deleteProductById(body, id);
    res.status(200).json(response);
  } catch (e) {
    res.status(400).json(e);
  }
});

ProductsRoute.post("/products/images/:id", async (req: any, res) => {
  // console.log(req.files)
  const files = req.files.productImage;
  const productId = req.params.id;
  try {
    const response = await addproductImages(files, productId);
    res.status(200).json(response);
  } catch (e) {
    res.status(400).json(e);
  }
});

ProductsRoute.post("/products/getimages/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await getProductImages(id);
    res.status(200).json(response);
  } catch (e) {
    res.status(400).json(e);
  }
});

ProductsRoute.post("/products/edit/:id", async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  console.log(body);
  console.log(id);
  try {
    const response = await editProduct(body, id);
    res.status(200).json(response);
  } catch (e) {
    res.status(400).json(e);
  }
});

// ProductsRoute.get("/productsAddMany", async (req, res) => {
//   const response = await fetch(
//     "https://api.escuelajs.co/api/v1/products/?categoryId=1",
//     {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//       },
//     }
//   );
//   const result: any = await response.json();
//   for (let i = 0; 25; i++) {
//     let product = new Product({
//       productName: result[i].title,
//       productDescription: result[i].description,
//       productImage: result[i].images[0],
//       productPrice: result[i].price,
//       productStatus: "New",
//       productDate: new Date(),
//       categorieId: "641a0a3b3050bc3488c568f5",
//       userId: "3QP0YOByC2SHIO1C6hzR6aejBGw2",
//       imageUrl: result[i].images[0],
//     });
//     let prod = await product.save();
//   }
//   result.array.forEach(async (element: any) => {});
//   try {
//     res.status(200).json();
//   } catch (e) {
//     res.status(400).json(e);
//   }
// });
