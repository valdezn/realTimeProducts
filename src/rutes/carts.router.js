import { Router } from "express";
import CartsManager from "../clases/cartsManager.js";

const router = Router();
const cart = new CartsManager();

router.get('/', async (req, res) => {
    const limit = req.query.limit;
    if (!limit) return res.send(await cart.getCarts());
    const carts = await cart.getCarts();
    const cartLimit = carts.slice(0, limit)
    res.send(cartLimit)
})

router.get('/:cid', async (req, res) => {
    res.send(await cart.getCartById(req.params.cid))
})

router.post('/', async (req, res) => {
    await cart.addCarts();
    res.send({status: "success"})
})

router.post('/:cid/products/:pid', async (req, res) => {
    const idCart = req.params.cid;
    const idProduct = req.params.pid;
    await cart.addProductInCart(idCart, idProduct)
    res.send({status: "success"})
})

export default router;