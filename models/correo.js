
const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

/* -------------------------------------------------------------------------- */
/*                               ESCHEMA CORREO                               */
/* -------------------------------------------------------------------------- */

const correoSchema =  Schema({

    destinatario: {
        type: String,
        required: [true,"El destinatario es obligatorio"]
    },

    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },

    asunto: {
        type: String,
        required:[true, "El asunto es obligatorio"]
    },

    msg:{
        type: String,
        required: [true,"El mensaje es obligatorio"]
    },
    
    fecha: {
        type: Date,
        default: Date.now
    }

});

/*==========PAGINATE==========*/
correoSchema.plugin(mongoosePaginate);

/*==========RETURN DATA==========*/
correoSchema.methods.toJSON = function(){
    const {__v, ...data} = this.toObject();
    return data;
}

module.exports = model('Correo', correoSchema);