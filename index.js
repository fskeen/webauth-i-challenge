require('dotenv').config()
const server = require('./server.js')
const port = process.env.PORT || 8000;

server.listen(port, () => console.log(`Listen well, for port ${port} holds many secrets...`))