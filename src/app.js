
const express = require('express');
const handlebars = require('express-handlebars');
const productsRouteDB = require('./routes/products.routes.db');
const cartsRouteDB = require('./routes/carts.routes.db');
const viewRoute = require('./routes/views.routes');
const chatsRoutes = require('./routes/chats.routes');
const server = express();
const mongoose = require('mongoose');
const session = require('express-session');
const MongoConnect = require('connect-mongo');
const routerViews = require('./routes/views.route');
const routerSession = require('./routes/session.router');
const InitPassport = require('./utils/passport.config');
const passport = require('passport');
const userRouter = require('./routes/user.routes.bd');
const { mongoURL, adminName, NODE, PORT } = require('./config/config.js');

mongoose.set('strictQuery', false)

let port = 8080;

const httpServer = server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

//handlebars
server.engine('handlebars', handlebars.engine());
server.set('views', __dirname + '/views');
server.set('view engine', 'handlebars');

//express
server.use(express.static(__dirname + '/public'));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//session cookies
server.use(session({
    store: MongoConnect.create({
        mongoUrl: 'mongodb+srv://admin:123@codercluster.ew29ctl.mongodb.net/?retryWrites=true&w=majority',
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    }),
    secret: 'secretpassword',
    resave: true,
    saveUninitialized: true,
}))

InitPassport ();
server.use (passport.initialize());
server.use (passport.session());

//routes
server.use(routerViews);
server.use("/api/session", routerSession);

//routes mongodb
server.use("/", viewRoute);
server.use("/api/productsBd/", productsRouteDB);
server.use("/api/cartsBd/", cartsRouteDB);
server.use("/api/chats/", chatsRoutes);
server.use("/api/user/", userRouter);

//Connection with MongoDB Atlas Database
const test = async () => {
    await mongoose.connect('mongodb+srv://admin:123@codercluster.ew29ctl.mongodb.net/?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    );
    console.log('Successfully connected with MongoDB Atlas');
};

test();