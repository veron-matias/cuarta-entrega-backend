#4 entrega VERON MATIAS
- $nodemon src/app.js ejecuta en http://localhost:8080
- GET localhost:8080/api/products/  <<---- lista todos los productos de products.json
- POST localhost:8080/api/products/  en body+ JSON <<---- añade un nuevo producto con ID automatico y el codigo del producto no se puede repetir
- DELETE localhost:8080/api/products/:pid  <<------ borra el producto si es que existe.
- POST localhost:8080/api/products/:pid <<--- actualiza el producto existente

- POST localhost:8080/api/carts/1/product/6 << agrega, por ejemplo, al carrito ID:1 el producto 6, si se repite la operacion, la cantidad del producto aumenta
- GET localhost:8080/api/carts/1/ << MOstrara el array del carrito ID:1
- POST localhost:8080/api/carts/ << CREA NUEVO ARRAY DE CARRITO ID: AUTOMATICO