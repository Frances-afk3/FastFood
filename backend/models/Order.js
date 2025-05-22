import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  items: [{
    meal: { type: mongoose.Schema.Types.ObjectId, ref: 'Meal' },
    quantity: { type: Number, default: 1 }
  }],
  status: { 
    type: String, 
    enum: ['ordinato', 'in preparazione', 'in consegna', 'consegnato'], 
    default: 'ordinato' 
  },
  delivery: {
    type: String,
    enum: ['ritiro', 'domicilio'],
    required: true
  },
  deliveryAddress: { type: String },
  deliveryCost: { type: Number, default: 0 },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
