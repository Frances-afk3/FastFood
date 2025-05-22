import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['cliente', 'ristoratore'], required: true },
  preferences: [String], // es: ["vegetariano", "senza glutine"]
  address: { type: String },
  paymentMethod: { type: String }, // es: carta di credito, prepagata
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
