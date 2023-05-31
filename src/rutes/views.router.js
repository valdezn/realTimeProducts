import express from 'express';
import ProductsManager from '../clases/productsManager.js';


const router = express.Router();

const productsManager = new ProductsManager()


router.get('/', async (req, res) => {
    let allProducts = await productsManager.getProducts()
    res.render('home.handlebars', {
        title: "Products",
        products: allProducts
    })
})


router.get('/realtimeproducts', async (req, res) => {
    let allProducts = await productsManager.getProducts()
    res.render('realTimeProducts.handlebars', {
        title: "Products",
        products: allProducts
    })
})


export default router;