
const mongoose = require('mongoose');
import { v4 as uuidV4 } from 'uuid';

const TicketSchema = new mongoose.Schema({
  code: {
    type: uuidV4(),
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
});

const TicketsModel = mongoose.model('tickets', TicketSchema);

module.exports = TicketsModel;