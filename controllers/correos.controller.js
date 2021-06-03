const Correo = require('../models/correo');

/* -------------------------------------------------------------------------- */
/*                                 SEND CORREO                                */
/* -------------------------------------------------------------------------- */
const sendCorreo = (req, res)=> {

    /*==========REQ==========*/
    const {destinatario, nombre, msg,  } = req.body;
    const correo = new Correo({destinatario, nombre, msg});

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

const getCorreos = () => {
    res.json({
        msg: 'Get Correos'
    })
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