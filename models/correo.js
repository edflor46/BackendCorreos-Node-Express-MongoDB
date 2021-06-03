
const { Schema, model } = require('mongoose');

/* -------------------------------------------------------------------------- */
/*                               ESCHEMA CORREO                               */
/* -------------------------------------------------------------------------- */

const correoSchema =  Schema({

    destinatario: {
        type: String,
        required: [true,"El destinatario es obligatorio"]
    },

    correo:{
        type: String,
        required: [true,"El correo es obligatorio"]
    },
    
    fecha: {
        type: Date,
        default: Date.now
    }

});

/* -------------------------------------------------------------------------- */
/*                                 RETURN DATA                                */
/* -------------------------------------------------------------------------- */

correoSchema.methods.toJSON = function(){
    const {__v, ...data} = this.toObject();
    return data;
}

module.exports = model