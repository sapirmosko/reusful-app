import express from 'express';
import { addImageForCategorie,getAllCategories, getAmountOfProductsByCategories } from '../2-logic/categorieLogic';

export const CategoriesRoute = express.Router();

CategoriesRoute.get('/categories', async (req, res) => {
    const categories = await getAllCategories();
    res.status(200).json(categories);
})

CategoriesRoute.post('/categories/image', async (req:any, res:any) => {
    const body = req.files;
    await addImageForCategorie(body)

})

CategoriesRoute.get('/categories/chart',async (req,res)=>{
    try{
        const results = await getAmountOfProductsByCategories();
        res.status(200).json(results);
    }catch(e){
        res.status(400).json(e)
    }
})