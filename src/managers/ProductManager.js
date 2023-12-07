import fs from 'fs';

class ProductManager {
    #path;
    #format;

    constructor(path) {
        this.#path = path;
        this.#format = 'utf-8';
        this.products = [];
    }
//valida si un producto con el mismo codigo ya existe
    async #validateProduct(product) {
        const products = await this.getProducts();
        const duplicateProduct = products.find(item => item.code === product.code);
        if (duplicateProduct !== undefined) {
            console.log('A product with the same code already exists');
            return false;
        }
        return true;
    }
// get products, sino: error
    async getProducts() {
        try {
            return JSON.parse(await fs.promises.readFile(this.#path, this.#format));
        } catch (error) {
            console.log('Error: file not found');
            return [];
        }
    }

    //espera a que se cargue la lista de productos, luego verifica si la lista está vacía para generar un nuevo ID basado en el último ID existente más uno, o devuelve 1 si no hay productos en la lista. 
    async #generateId() {
        const products = await this.getProducts();
        return products.length === 0 ? 1 : products[products.length - 1].id + 1;
    }

    async addProduct(title, description, price, thumbnail, code, category, stock) {
        const products = await this.getProducts();

        const newProduct = {
            id: await this.#generateId(),
            title,
            description,
            price,
            thumbnail: thumbnail || [],
            code,
            category,
            stock,
            status: true,
        };

        if (await this.#validateProduct(newProduct)) {
            products.push(newProduct);
            await fs.promises.writeFile(this.#path, JSON.stringify(products, null, '\t'));
            this.products = products;
            return newProduct;
        }
    }

    async getProductById(id) {
        const products = await this.getProducts();
        const product = products.find(item => item.id === id);
        return product;
    }

    async updateProduct(id, update) {
        const products = await this.getProducts();
        const index = products.findIndex(item => item.id === id);

        if (index !== -1) {
            const isValid = await this.#validateProduct(update);

            if (!isValid) {
                console.log('Error updating: invalid update');
                return;
            }

            products[index] = { ...products[index], ...update };
            await fs.promises.writeFile(this.#path, JSON.stringify(products, null, '\t'), this.#format);
            this.products = products;
            console.log('Updated Product', products[index]);
        } else {
            console.log('Error updating: Product not found');
        }
    }

    async deleteProduct(id) {
        try {
            const products = await this.getProducts();
            const filterProducts = products.filter(item => item.id !== id);

            if (products.length !== filterProducts.length) {
                await fs.promises.writeFile(
                    this.#path,
                    JSON.stringify(filterProducts, null, '\t'),
                    this.#format
                );
                this.products = filterProducts;
                console.log('Product successfully removed');
            } else {
                console.log('The product with that id does not exist');
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const productManager = new ProductManager('./src/api/products.json');