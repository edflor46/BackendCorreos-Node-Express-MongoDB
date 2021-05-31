
const express = require('express');
const cors = require('cors');

require('colors');


class Server {
    constructor() {

        /*==========SERVER EXPRESS==========*/
        this.app = express();

        /*==========LISTEN ON PORT==========*/
        this.port = process.env.PORT;

        /*==========PATHS==========*/
        this.paths = {
            correos: '/api/correos',
            usuarios: '/api/usuarios'
        }

        /*==========MIDDLEWEARES==========*/
        this.middleweares();

        /*==========ROUTES==========*/
        this.routes();
    }

    /* -------------------------------------------------------------------------- */
    /*                                MIDDLEWEARES                                */
    /* -------------------------------------------------------------------------- */
    middleweares() {

        /*==========CORS==========*/
        this.app.use(cors());

        /*==========PARSE JSON==========*/
        this.app.use(express.json());

        /*==========DIR STATIC==========*/
        this.app.use(express.static('public'));
    }

    /* -------------------------------------------------------------------------- */
    /*                                   ROUTES                                   */
    /* -------------------------------------------------------------------------- */

    routes() {
        this.app.use(this.paths, require('../routes/correos.route'));
    }

    /* -------------------------------------------------------------------------- */
    /*                                   LISTEN                                   */
    /* -------------------------------------------------------------------------- */
    listen() {
        this.app.listen(this.port, () => {
            console.log('\n\nServidor corriendo en el puerto'.cyan, this.port.magenta);
        });
    }
}

module.exports = Server;