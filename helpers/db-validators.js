const Correo = require('../models/correo');


/* -------------------------------------------------------------------------- */
/*                                  ID VALIDO                                 */
/* -------------------------------------------------------------------------- */

const validID = async (id) => {
    /*==========FIND BY ID==========*/
    const existCorreo = await Correo.findById(id);

    /*==========VALID CORREO==========*/
    if (!existCorreo) {
        throw new Error(`El id ${id}, no existe`)
    }
}
module.exports = validID;