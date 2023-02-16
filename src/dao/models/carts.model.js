
const mongoose = require('mongoose')

const cartsSchema = new mongoose.Schema([
  {
    priceTotal: {
      type: Number,
      default: 0,
    },
    quantityTotal: {
      type: Number,
      default: 0,
    },
    products: {
      _id: false,
      type:Array,
      default:[],
      }
  }
]
)

const cartsModel = mongoose.model('carts', cartsSchema);

module.exports = cartsModel;