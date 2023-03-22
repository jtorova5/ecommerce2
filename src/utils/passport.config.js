
const passport = require('passport');
const local = require('passport-local');
const UsersModel = require('../dao/models/users.model');
const { hashPassword, comparePassword } = require('./bcrypt');
const { STRATEGY_REGISTER, STRATEGY_LOGIN } = require('./constants');
const dbSessionManager = require('../dao/mongoManager/dbSessionManager');
const dbCartManager = require('../dao/mongoManager/dbCartManager');
const { default: mongoose } = require('mongoose');


const InitPassport = () => {
    passport.use(STRATEGY_REGISTER, new local.Strategy({
        passReqToCallback: true,
        usernameField: 'email',
        passwordField: 'password',
    }, async (req, username, password, done) => {
        const { first_name, last_name, age } = req.body;
        try {
            const userExist = await dbSessionManager.getEmail({ email: username});
            if (userExist) {
                done(null, false);
            } else {
                const hash = await hashPassword(password);
                const cart = await dbCartManager.CreateCarts();
                const id = mongoose.Types.ObjectId(cart);
                if (username === 'adminCoder@coder.com') {
                    const user = await dbSessionManager.createSession({
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
                    const user = await dbSessionManager.createSession({
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
            const userExist = await dbSessionManager.getEmail({ email: username });
            const isVadidPassword = await comparePassword(password, user.password);
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
        const user = await dbSessionManager.UserSession(_id);
        done(null, user)
    })
};

module.exports = InitPassport;