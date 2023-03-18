import { execute } from "../1-dal/dal";
import fs from 'fs'
import { saveImagesToS3, saveImagesToS3Cat } from "./awsLogic";
const uniqid = require('uniqid');

export async function getAllCategories() {
    const query = 'SELECT * FROM categorie';
    const [results] = await execute(query);
    console.log(results);
    return results;
}

export async function addImageForCategorie(URL: any) {
    const imageId = uniqid();
    const key = await saveImagesToS3Cat(URL, imageId)
    const query = `UPDATE categorie SET categorieImage = '${key}' where id =3`
    const [results] = await execute(query);
    return results;
}

export async function getAmountOfProductsByCategories(){
    const query = 'SELECT COUNT(*) AS value, c.categorieName as name FROM categorie c JOIN products p ON p.categorieId = c.id WHERE p.productDate >= DATE(NOW()) GROUP BY c.id, c.categorieName;'
    const [results] = await execute(query);
    console.log(results);
    return results;
}
