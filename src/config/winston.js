
const winston = require('winston');

const OptionWinston = {
    levels:{
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5,
    },
    colors:{
        fatal: 'red',
        error: 'magenta',
        warning: 'yellow',
        info: 'green',
        http: 'blue',
        debug: 'white',
    },
};

const loggerProd = winston.createLogger({
    levels:OptionWinston.levels,
    transports: [
        new winston.transports.Console({level:'info',
        format:winston.format.combine(
            winston.format.colorize({colors:OptionWinston.colors}),
            winston.format.simple()
        )
    }),
        new winston.transports.File({level:'error',
        filename:'./errors.log',
        fotmat: winston.format.simple(),
    }),
    ],
});

const loggerDev = winston.createLogger({
    levels:OptionWinston.levels,
    transports: [
        new winston.transports.Console({level:'debug',
        format:winston.format.combine(
            winston.format.colorize({colors:OptionWinston.colors}),
            winston.format.simple()
        ) 
    }),
        new winston.transports.File({level: 'warning',filename: './src/errors.log',format: winston.format.simple(),
      }),
    ],
});

const mdwLogger = (req,res,next) => {
    req.logger = process.env.NODE_ENV ? loggerProd : loggerDev;
    req.logger.info(`${req.metod} - ${req.url}`);
    next();
};

module.exports = {mdwLogger}