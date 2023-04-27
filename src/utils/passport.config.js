
const passport = require('passport');
const local = require('passport-local');
const { hashPassword, comparePassword } = require('./bcrypt');
const { STRATEGY_REGISTER, STRATEGY_LOGIN } = require('./constants');
const BdSessionManager = require('../dao/mongoManager/dbSessionManager');
const BdCartManager = require('../dao/mongoManager/dbCartManager');
const { default: mongoose } = require('mongoose');


const InitPassport = () => {
    passport.use(STRATEGY_REGISTER, new local.Strategy({
        passReqToCallback: true,
        usernameField: 'email',
        passwordField: 'password',
    }, async (req, username, password, done) => {
        const { first_name, last_name, age } = req.body;
        try {
            const userExist = await BdSessionManager.getEmail({ email: username});
            if (userExist) {
                done(null, false);
            } else {
                const hash = await hashPassword(password);
                const cart = await BdCartManager.CreateCarts();
                const id = mongoose.Types.ObjectId(cart);
                if (username === 'adminCoder@coder.com') {
                    const user = await BdSessionManager.createSession({
                        first_name: first_name,
                        last_name: last_name,
                        age: age,
                        email: username,
                        password: hash,
                        role: 'admin',
                        cart: id,
                    });
                    done(null, user);
                } else {
                    const user = await BdSessionManager.createSession({
                        first_name: first_name,
                        last_name: last_name,
                        age: age,
                        email: username,
                        password: hash,
                        role: 'user',
                        cart: id,
                    });
                    done(null, user);
                }
            }
        } catch (err) {
            done(err);
        }
    }));
    passport.use(STRATEGY_LOGIN, new local.Strategy({
        passReqToCallback: true,
        usernameField: 'email',
        passwordField: 'password',
    }, async (req, username, password, done) => {
        try {
            const userExist = await BdSessionManager.getEmail({ email: username });
            const isVadidPassword = await comparePassword(password, userExist.password);
            if (userExist && isVadidPassword) {
                done(null, userExist);
            } else {
                done(null, false);
            }
        } catch (err) {
            done(null, false);
        }
    }));
    passport.serializeUser ((user,done)=>{
        done(null, user._id);
    })
    passport.deserializeUser (async (_id,done)=>{
        const user = await BdSessionManager.UserSession(_id);
        done(null, user)
    })
}

module.exports = InitPassport;