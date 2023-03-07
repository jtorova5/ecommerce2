
const passport = require('passport');
const local = require('passport-local');
const UsersModel = require('../dao/models/users.model');
const { hashPassword, comparePassword } = require('./bcrypt');
const { STRATEGY_REGISTER, STRATEGY_LOGIN } = require('./constants');


const InitPassport = () => {
    passport.use(STRATEGY_REGISTER, new local.Strategy({
        passReqToCallback: true,
        usernameField: 'email',
        passwordField: 'password',
    }, async (req, username, password, done) => {
        const { first_name, last_name, age } = req.body;
        try {
            const userExist = await UsersModel.findOne({ email: username });
            if (userExist) {
                done(null, false);
            } else {
                const hash = await hashPassword(password);
                const user = await UsersModel.create({
                    first_name,
                    last_name,
                    age,
                    email: username,
                    password: hash
                });
                done(null, user);
            }
        } catch (err) {
            done(err, false);
        }
    }))

    passport.use(STRATEGY_LOGIN, new local.Strategy({
        passReqToCallback: true,
        usernameField: 'email',
        passwordField: 'password',
    }, async (req, username, password, done) => {
        try {
            const userExist = await UsersModel.findOne({ email: username });
            const isVadidPassword = await comparePassword(password, user.password);
            if (userExist && isVadidPassword) {
                done(null, userExist);
            } else {
                done(null, false);
            }
        } catch (err) {
            done(null, false);
        }
    }))

    passport.serializeUser ((user,done)=>{
        done(null, user._id);
    })

    passport.deserializeUser (async (id,done)=>{
        const user = await UsersModel.findById(id);
        done(null, user)
    })
}

module.exports = InitPassport;