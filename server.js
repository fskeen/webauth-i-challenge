const express = require('express');
const server = express();
const accountsRouter = require('./routes/accounts/accountsRouter');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const dbConfig = require('./data/dbConfig');

const sessionConfig = {
    name: 'chocochip',
    secret: process.env.SESSION_SECRET || 'keep it secret, keep it safe',
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false,
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: true,
    store: new KnexSessionStore({
        knex: dbConfig, 
        createtable: true,
        tablename: 'knexsessions',
        sidfieldname: 'sessionsid',
        clearInterval: 1000 * 60 * 30,
    })
};
server.use(session(sessionConfig));
server.use('/accounts', accountsRouter);
server.use(express.json());


module.exports = server;

/**
 * write middleware that will check for username and pword
 * 
 * withCredentials when using axios
 * configure credentials for cors() on server 
*/