const { Router } = require('express');
const { check } = require('express-validator');
const { sendCorreo, getCorreos, getCorreo } = require('../controllers/correos.controller');
const validID = require('../helpers/db-validators');
const { validarCampos } = require('../middleweares/validarCampos');

/*==========ROUTER==========*/
const router = Router();

/* -------------------------------------------------------------------------- */
/*                                 SEND CORREO                                */
/* -------------------------------------------------------------------------- */
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('destinatario', 'Ingresa un correo valido').isEmail(),
    check('msg', 'El mensaje es obligatorio').not().isEmpty(),
    validarCampos
],
sendCorreo); 

/* -------------------------------------------------------------------------- */
/*                                   GET ALL                                  */
/* -------------------------------------------------------------------------- */
router.get('/', getCorreos); 

/* -------------------------------------------------------------------------- */
/*                                 GET FOR ONE                                */
/* -------------------------------------------------------------------------- */
router.get('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(validID),
    validarCampos
],getCorreo); 

module.exports = router;