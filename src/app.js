import express, { urlencoded } from 'express';
import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';

const app = express();
const PORT = 8080;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req,res)=> {
    const URL = `${req.protocol}://${req.headers.host}`;
    res.status(200).send(`Hola! estoy en ${URL} ! servidor andando en puerto: ${PORT} satisfactoriamente`)
})

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Corriendo en puerto 8080
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
