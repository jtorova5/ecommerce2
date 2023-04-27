
const {GENERIC_ERROR} = require('./enumErrors');

class CustomError {
    static createError({code=500,msg,typeError=GENERIC_ERROR}){
        const error = new Error(msg);
        error.code = code;
        error.type = typeError
        return error;
    }
}

module.exports = CustomError;