const Correo = require('../models/correo');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

/* -------------------------------------------------------------------------- */
/*                                 SEND CORREO                                */
/* -------------------------------------------------------------------------- */
const sendCorreo = (req, res) => {

    /*==========REQ==========*/
    const { destinatario, nombre, asunto, msg, } = req.body;

    const template = `
        <h1>
            Correo enviado por 
            <b>Correos App</b> 
                <small>
                Powered by 
                <b>Eduardo Flores</b>
                </small>
        </h1>
        <br><br>
        <h3>Remitente: <span>${nombre}</span></h3>
        <br><br>
        <p>${msg}</p>
    
    `;

    /*==========INSTANCIA GOOGLE OAUTH2==========*/
    const oAuth2Client = new google.auth.OAuth2(
        process.env.ID_CLIENT,
        process.env.SECRECT_CLIENT,
        process.env.REDIRECT_URI
    );

    oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

    /*==========SEND MAIL==========*/
    async function sendMail() {

        /*==========CREDENTIALS==========*/
        try {
            const accessToken = await oAuth2Client.getAccessToken();
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: 'development.edflor@gmail.com',
                    clientId: process.env.ID_CLIENT,
                    clientSecret: process.env.SECRECT_CLIENT,
                    refreshToken: process.env.REFRESH_TOKEN,
                    accessToken: accessToken
                }
            });

            /*==========MAIL OPTIONS==========*/
            const mailOptions = {
                from: `Correos App<development.edflor@gmail.com>`,
                // to: email,
                to: destinatario,
                subject: asunto,
                html: template
            }

            /*==========SEND / RETURN DATA==========*/
            const result = await transporter.sendMail(mailOptions);
            return result;

        } catch (error) {
            console.log(error);
        }

    }

    if (sendMail()) {

        /*==========EXECUTE FUNTION==========*/
        sendMail()
            .then((result) => res.status(200).json({ msg: 'Correo Enviado' }))
            .catch((error) => console.log(error.message));

        /*==========SAVE MONGODB==========*/
        const correo = new Correo({ destinatario, nombre, asunto, msg });
        correo.save();

    } else {
        /*==========BAD RES==========*/
        res.status(400).json({
            msg: "Error al enviar el correo"
        });

    }
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

const getCorreo = async (req, res) => {

    /*==========ID==========*/
    const { id } = req.params;

    /*==========SEARCH ID=========*/
    const correo = await Correo.findById(id);
    res.json({
        correo
    });

}

module.exports = {
    sendCorreo,
    getCorreos,
    getCorreo

}