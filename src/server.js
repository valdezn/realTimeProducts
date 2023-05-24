import Express from "express";
import routerProducts from "./rutes/products.router.js";
import routerCarts from "./rutes/carts.router.js";
import __dirname from "./utils.js";

const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(Express.static(__dirname + 'public'));

app.use('/api/products/', routerProducts);
app.use('/api/carts/', routerCarts);

app.listen(8080, ()=> console.log('Escuchando en el puerto 8080'));