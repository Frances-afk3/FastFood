import mongoose from 'mongoose';

const allergenSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }
}, { timestamps: true });

const Allergen = mongoose.model('Allergen', allergenSchema);
export default Allergen;
