
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
      type: [
        {
          products: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
          },
          quantity: {
            type: Number,
            default: 1,
          },
          id: {
            type: String,
          }
        },
      ],
      default: [],
    }
  }
]
)

cartsSchema.pre('findById', function () {
  this.populate('products.product');
});

const cartsModel = mongoose.model('carts', cartsSchema);

module.exports = cartsModel;