const Correo = require('../models/correo');

/* -------------------------------------------------------------------------- */
/*                                 SEND CORREO                                */
/* -------------------------------------------------------------------------- */
const sendCorreo = (req, res) => {

    /*==========REQ==========*/
    const { destinatario, nombre, msg, } = req.body;
    const correo = new Correo({ destinatario, nombre, msg });

    /*==========SAVE MONGODB==========*/
    correo.save();

    /*==========RES==========*/
    res.json({
        correo
    })
}

/* -------------------------------------------------------------------------- */
/*                                   GET ALL                                  */
/* -------------------------------------------------------------------------- */

const getCorreos = async (req, res) => {

    /*==========REQ QUERY==========*/
    const { limit = 5, page = 1 } = parseInt(req.query);

    /*==========CUSTOMIZE LABELS==========*/
    const myCustomLabels = {
        totalDocs: 'total',
        docs: 'correos',
        limit: 'perPage',
        page: 'currentPage',
        nextPage: 'next',
        prevPage: 'prev',
        totalPages: 'totalPages',
        pagingCounter: 'slNo',
        meta: 'paginator',
    };

    /*==========OPTIONS==========*/
    const options = {
        limit,
        page,
        customLabels: myCustomLabels
    }

    /*==========DATA==========*/
    const correos = await Correo.paginate({}, options);

    /*==========RES==========*/
    res.json(correos);
}

/* -------------------------------------------------------------------------- */
/*                                 GET FOR ONE                                */
/* -------------------------------------------------------------------------- */

const getCorreo = () => {
    res.json({
        msg: 'get Correo'
    })

}

module.exports = {
    sendCorreo,
    getCorreos,
    getCorreo

}