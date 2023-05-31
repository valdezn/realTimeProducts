import Express from "express";
import handlebars from "express-handlebars";
import routerProducts from "./rutes/products.router.js";
import routerCarts from "./rutes/carts.router.js";
import __dirname from "./utils.js";
import viewsRouter from "./rutes/views.router.js";
import {Server} from "socket.io";
import ProductsManager from "./clases/productsManager.js";


const productsManager = new ProductsManager();
const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(Express.static(__dirname + '/public'));
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set('views', __dirname + '/views')


const expressServer = app.listen(8080, () => console.log("Listening"));
const socketServer = new Server(expressServer);


socketServer.on("connection", (socket) => {
  console.log("conected " + socket.id)
  //recibo el producto nuevo 
  socket.on('addProduct', async function(product) {     
      const result = await productsManager.addProducts(product);
    });
    //recibo el id del producto a eliminar
    socket.on("deleteProduct", async function(product) {  
      const productId = product
      const result = await productsManager.deleteProduct(productId);
      
      //envío a todos los sockets conectados la lista actualizada
      const updatedProducts = await productsManager.getProducts();
      socketServer.emit("updatedProducts", updatedProducts);
    });
  });
  
  app.use('/', viewsRouter)
  app.use('/api/products/', routerProducts);
  app.use('/api/carts/', routerCarts);