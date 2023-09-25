import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import produtoController from './controller/produtoController.js'

const server = express();
server.use(cors());
server.use(express.json());

// Endpoints
server.use(produtoController);

server.listen(process.env.PORT, () => {
    console.log("API ONLINE ON PORT "+process.env.PORT)
});