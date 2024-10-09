import express from 'express';
import products from './data/products.js';
const port=8000;

const app = express();

app.get('/', (req, res) => {
    res.send('API is running..');
});

app.listen(port, () => console.log(`Server running on port  ${port}`))

