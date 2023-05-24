
const nodemailer = require('nodemailer');
const { mailing } = require('../config/config');

class Mailing {
    constructor() {
        this.transporter = nodemailer.createTransport ( {
            service: 'gmail',
            auth: {
                user: mailing.user, 
                pass: mailing.password
            }
        })
    }
    sendMail = ({ to, subject, html}) => this.transporter.sendMail({to, subject, html});
}

module.exports = new Mailing();