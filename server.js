const express = require('express')
const server = express();
const accountsRouter = require('./routes/accounts/accountsRouter')

server.use('/accounts', accountsRouter);
server.use(express.json());

module.exports = server;