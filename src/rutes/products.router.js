import { Router } from "express";
import ProductsManager from "../clases/productsManager.js";

const router = Router();

const productsManager = new ProductsManager();

router.get('/', async (req,res)=>{
    const limit = req.query.limit;
    if (!limit) return res.send(await productsManager.getProducts())
    const productos = await productsManager.getProducts()
    const prodlimit = productos.slice(0, limit)
    res.send({status: "success", payload: prodlimit})
})

router.get('/:pid', async(req, res)=>{
    const product = await productsManager.getProductsById(req.params.pid)
    res.send(product)
})

router.post('/', async (req, res) => {
    const nProduct = req.body
    res.send(await productsManager.addProducts(nProduct))
})

router.delete('/:pid', async (req, res) => {
    const pid = req.params.pid
    res.send(await productsManager.deleteProduct(pid))
})

router.put('/:pid', async (req, res) => {
    const pid = req.params.pid;
    const updateProduct = req.body;
    res.send(await productsManager.updateProduct(pid, updateProduct))
})

export default router;