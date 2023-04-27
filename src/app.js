
const { mongoURL, adminName, NODE, PORT } = require('./config/config');
const express = require('express');
const handlebars = require('express-handlebars');
const productsRouteBd = require('./routes/products.routes.db')
const cartsRouteBd = require('./routes/carts.routes.db')
const chatsRouter = require('./routes/chats.routes')
const server = express();
const mongoose = require('mongoose');
const session = require('express-session');
const MongoConnect = require ('connect-mongo');
const routerViews = require('./routes/views.routes');
const routerSession = require('./routes/session.routes');
const routerMocking = require('./routes/mockingproducts.router');
const InitPassport = require('./utils/passport.config');
const passport = require('passport');
const userRouter = require('./routes/user.routes.bd');
const errorList = require('./utils/errors');

mongoose.set('strictQuery', false)


server.listen(8080, ()=> {
    console.log(PORT);
});


//handlerbars
server.engine('handlebars', handlebars.engine());
server.set('views', __dirname + '/views');
server.set('view engine', 'handlebars');

//express
server.use(express.static(__dirname +'/public'));
server.use(express.json())
server.use(express.urlencoded({extended:true}))

//session para cookies del login
server.use(session({
  store: MongoConnect.create({
    mongoUrl: 'mongodb+srv://admin:123@codercluster.ew29ctl.mongodb.net/?retryWrites=true&w=majority',
    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true},
  }),
  secret: 'clavesecreta',
  resave: true,
  saveUninitialized: true,
}));

server.use(errorList)

InitPassport ();
server.use (passport.initialize());
server.use (passport.session());

//rutas
server.use(routerViews);
server.use("/api/session",routerSession);
server.use("/api/mockingproducts/",routerMocking);

//rutas mongodb
server.use("/api/productsBd/", productsRouteBd );
server.use("/api/cartsBd/", cartsRouteBd );
server.use("/api/chats/", chatsRouter );
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