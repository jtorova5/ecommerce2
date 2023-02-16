
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true,  
    },
    description: {
        type: String,
        require: true, 
    },
    code:{
        type: String,
        require: true, 
    },
    price:{
        type: Number,
        require: true, 
    },
    status:Boolean,
    stock: {
        type: Number,
        default:1,
    },    
    category:{
        type: String,
        require: true, 
    },
    thumbnail:String,
})

const productsModel = mongoose.model('products', productSchema);

module.exports = productsModel;