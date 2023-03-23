import { Cart } from "../models/cartInterface";
import { getProductById } from "./productsLogic";
export async function addProductToCart(userId: String, productId: String) {
  let cartNewProduct = new Cart({ userId: userId, productId: productId });
  let results = await cartNewProduct.save();
  //   const query = "INSERT INTO cart(userId,productId) VALUES(?,?)";
  //   const [results] = await execute<OkPacket>(query, [userId, productId]);
  return results;
}

export async function showCartProducts(userId: String) {
  const resultsArray: any = [];

  let results = await Cart.find({ userId: userId });
  for (let i = 0; i < results.length; i++) {
    let productID = results[i].productId;
    let prod = await getProductById(productID.toString());
    (results[i] as any).p = prod;
    resultsArray.push(prod);
  }

  //   const query = `SELECT products.* FROM cart JOIN products ON cart.productId = products.id WHERE cart.userId = ${userId}`;
  //   const [results] = await execute<OkPacket>(query);
  return resultsArray;
}

export async function deleteProductFromCart(userId: String, productId: String) {
  //   const query = `DELETE FROM cart WHERE userId = ${userId} AND productId = ${productId}`;
  //   const [results] = await execute<OkPacket>(query);
  let results = await Cart.findOneAndDelete({
    userId: userId,
    productId: productId,
  });
  return results;
}

export async function checkIfProductInCart(userId: String, productId: String) {
  //   const query = `SELECT * FROM cart WHERE userId = ${userId} AND productId = ${productId}`;
  //   const [results] = await execute<OkPacket>(query);
  let results = await Cart.findOne({ userId: userId, productId: productId });
  return results;
}
