import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import usuarioController from './controller/usuarioController.js';
import produtoController from './controller/produtoController.js';

const server = express();
server.use(cors());
server.use(express.json());

// Endpoints
server.use(usuarioController);
server.use(produtoController);

// Imagens Liberar
server.use('/storage/usersIcons', express.static('storage/usersIcons'));
server.use('/storage/productImages', express.static('storage/productImages'));


server.listen(process.env.PORT, () => {
    console.log("API ONLINE ON PORT "+process.env.PORT)
});