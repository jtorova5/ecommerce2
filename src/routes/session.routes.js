
const { Router } = require('express');
const UsersModel = require('../dao/models/users.model');
const { hashPassword} = require('../utils/bcrypt');
const passport = require ('passport');
const { STRATEGY_REGISTER, STRATEGY_LOGIN } = require('../utils/constants');
const viewControllers = require('../controller/views.controller');
const { mdlwOnlyAdmin } = require('../utils/middleware');

const router = Router();

router.post('/login', passport.authenticate(STRATEGY_LOGIN), async (req, res) => {
    if (!req.user) {
        return res.status(404).json({msg:'User not found'})
    } 
    req.session.user = req.user
    res.json({msg:'ok'})
})

router.post('/register', passport.authenticate(STRATEGY_REGISTER) ,async (req, res) => {
    res.send(req.user);
})

router.post('/forgot-password', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UsersModel.findOne({ email })
        if (user) {
            const hash = await hashPassword(password);
            await UsersModel.updateOne({ email }, { password: hash })
            res.send(user);
        }else {
            res.status (404).send('Email not found')
        }
    } catch (error) {
        console.log (error)
        res.status(500).send('Error creating user');
    }
})

router.get('/current',mdlwOnlyAdmin,viewControllers.current);

module.exports = router;