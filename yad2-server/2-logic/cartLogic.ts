import { Cart } from "../models/cartInterface";
export async function addProductToCart(userId: String, productId: String) {
  let cartNewProduct = new Cart({ userId: userId, productId: productId });
  let results = await cartNewProduct.save();
  //   const query = "INSERT INTO cart(userId,productId) VALUES(?,?)";
  //   const [results] = await execute<OkPacket>(query, [userId, productId]);
  return results;
}

export async function showCartProducts(userId: String) {
  let results = await Cart.find({ userId: userId });
  //   const query = `SELECT products.* FROM cart JOIN products ON cart.productId = products.id WHERE cart.userId = ${userId}`;
  //   const [results] = await execute<OkPacket>(query);
  return results;
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
  let results = Cart.findOne({ userId: userId, productId: productId });
  return results;
}
