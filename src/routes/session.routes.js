
const { Router } = require('express');
const UsersModel = require('../dao/models/users.model');
const { hashPassword, comparePassword } = require('../utils/bcrypt');
const passport = require ('passport');
const { STRATEGY_REGISTER } = require('../utils/constants');
const viewControllers = require('../controller/views.controller');

const router = Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (email == 'adminCoder@coder.com' && password == '123456') {
        const userAdmin = { first_name: 'Admin', last_name: 'Coder', age: '25', email, password, role: 'admin' };
        req.session.user = userAdmin;
    }
    const user = await UsersModel.findOne({ email });
    const isValidPassword = await comparePassword(password, user.password);
    if (user && isValidPassword) {
        req.session.user = { ...user, rol: 'user' };
        res.send(user);
    } else {
        res.status(401).send("Email o contraseña incorrecta,intente nuevamente");
    }
});

router.post('/register', passport.authenticate(STRATEGY_REGISTER) ,async (req, res) => {
    res.send(req.user);
});

router.post('/forgot-password', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UsersModel.findOne({ email })
        if (user) {
            const hash = await hashPassword(password);
            await UsersModel.updateOne({ email }, { password: hash })
            res.send(user);
        }else {
            res.status (404).send('Email no encontrado')
        }
    } catch (error) {
        console.log (error)
        res.status(500).send('Error al crear usuario');
    }
})

router.get('/current', viewControllers.current);


module.exports = router;