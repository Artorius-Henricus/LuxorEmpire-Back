import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import usuarioController from './controller/usuarioController.js';

const server = express();
server.use(cors());
server.use(express.json());

// Endpoints
server.use(usuarioController);

// Imagens Liberar
server.use('/storage/usersIcons', express.static('storage/usersIcons'))


server.listen(process.env.PORT, () => {
    console.log("API ONLINE ON PORT "+process.env.PORT)
});