const express = require('express');
const cors = require('cors');

const dbfRouter = require('./routes/dbf');

const server = express();

server.use(express.json());
server.use(cors({
    "origin": '*',
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "allowedHeaders": ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
    "optionsSuccessStatus": 200,
    "maxAge": 1000
}));

server.use('/dbf', dbfRouter);

const port = process.env.PORT || 8000;

server.listen(port, () => console.log(`Server for dbf constructer is started at port ${port}`));