
const { Router } = require('express');
const UsersModel = require('../dao/models/users.model');
const { hashPassword, comparePassword } = require('../utils/bcrypt');
const passport = require ('passport');
const { STRATEGY_REGISTER, STRATEGY_LOGIN } = require('../utils/constants');
const viewControllers = require('../controller/views.controller');
const sessioncontroller = require('../controller/session.controller');
const permissions = require('../utils/middleware');
const jwt = require('../utils/jwt');

const router = Router();

router.post('/register', passport.authenticate(STRATEGY_REGISTER) , sessioncontroller.sessionLogin);
router.post('/login', passport.authenticate(STRATEGY_LOGIN), sessioncontroller.loginRegister);
router.post('/forgot-password', sessioncontroller.forgotPassword);
router.get('/redirectForgotPassword/:token', sessioncontroller.redirectRecoverPassword);
router.post('/forgotpassword', jwt.getPayloadByCookie, sessioncontroller.RecoverPassword);
router.post('/premium/:uid', sessioncontroller.updateRole);
router.get('/current', permissions.mdlwOnlyAdmin ,viewControllers.current);

module.exports = router;