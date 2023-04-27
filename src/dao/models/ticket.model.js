
const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  purchase_datetime: {
    type: Date,
    default: Date.now(),
  },
  amount: {
    type: Number,
  },
  purchaser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'carts',
  },
  products: {
    type: Array,
  }
});

const TicketsModel = mongoose.model('tickets', TicketSchema);

module.exports = TicketsModel;