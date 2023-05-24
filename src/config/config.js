
const dotenv = require ('dotenv');
const path = require ('path');
const {program} = require ('commander');

program.requiredOption('--mode <mode>', 'modo de ejecucion del servidor','production')
program.parse()

const ambiente = program.opts().mode

dotenv.config(
    {
        path: path.join(__dirname, ambiente == 'production' ?'../.env.production':'../.env.development' ),
    }
)

module.exports = {
    NODE: process.env.ENVIRONMENT,
    PORT: process.env.PORT,
    mongoURL: process.env.MONGOURL,
    adminName: process.env.ADMINNAME,
    adminPassword: process.env.ADMINPASSWORD,
    mailing: {
        user:process.env.CORREO, 
        password:process.env.CORREO_PASSWORD,
    },
    percistence: process.env.PERCISTENCE,
    PRIVATE_KEY_JWT: process.env.PRIVATE_KEY_JWT,
}