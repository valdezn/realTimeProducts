import fs from 'fs';
import { v4 as uuid } from 'uuid';


export default class ProductsManager {
    constructor(){
        this.path = "./clases/files/products.json"
        this.products = []
    }

    getProducts = async () => {
        try {
            const view = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(view);
            return products;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    getProductsById = async (id) => {
        const read = await this.getProducts();
        const ip = read.find((product) => {
            return product.id === id
        })
        return ip ? ip : `El producto con id: ${id} no existe.`
    }

    addProducts = async (product) => {
        const file = await this.getProducts();
        product.id = uuid();
        if (file.length == 0){
            this.products.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'))
        } else {
            const update = [...file, product]
            await fs.promises.writeFile(this.path, JSON.stringify(update, null, '\t'));
        } 
    }

    updateProduct = async (id, product) => {
        const productById = await this.getProductsById(id);
        if(!productById) return `El producto con id: ${id} no existe.`
        await this.deleteProduct(id)
        const productOld = await this.getProducts()
        const products = [{...product, id:id}, ...productOld]
        return await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
    }

    deleteProduct = async (id) => {
        const read = await this.getProducts();
        const idp = read.find(products => products.id === id)
        if (idp != undefined){
            const ip = read.filter(products => products.id != id)
            await fs.promises.writeFile(this.path, JSON.stringify(ip, null, '\t'));
            return console.log(`El producto con id: ${id} ha sido eliminado`)
        } else {
            console.log(`El id: ${id} no existe.`)
            return `El id: ${id} no existe.`
        }
    }
}

