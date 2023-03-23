import { Category } from "../models/categoriesInterface";
import { Product } from "../models/productModel";

export async function getAllCategories() {
  let results = await Category.find();
  console.log(results);
  return results;
}

export async function addImageForCategorie(URL: any) {
  // const imageId = uniqid();
  // const key = await saveImagesToS3Cat(URL, imageId)
  // const query = `UPDATE categorie SET categorieImage = '${key}' where id =3`
  // const [results] = await execute(query);

  const [results]: any = [];
  return results;
}

export async function getAmountOfProductsByCategories() {
  //   const query =
  //     "SELECT COUNT(*) AS value, c.categorieName as name FROM categorie c JOIN products p ON p.categorieId = c.id WHERE p.productDate >= DATE(NOW()) GROUP BY c.id, c.categorieName;";
  //   const [results] = await execute(query);
  const results = await Product.aggregate().sortByCount("categorieId");
  const categories = await getAllCategories();

  results.forEach((row) => {
    let categoryId = row._id;
    categories.forEach((category) => {
      if (categoryId == category.id) {
        row["name"] = category.categorieName;
      }
    });
  });
  console.log(results);
  return results;
}
