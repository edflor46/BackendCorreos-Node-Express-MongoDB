
/*==========VARS==========*/
require('dotenv').config();

/*==========SERVIDOR==========*/
const Server = require('./models/server');

/*==========INSTANCIA==========*/
const server = new Server();

/*==========LISTEN==========*/

server.listen();


