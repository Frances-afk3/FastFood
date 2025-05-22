import mongoose from 'mongoose';

const mealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, // es: primo, dolce, bevanda
  price: { type: Number, required: true },
  image: { type: String }, // URL o nome file
  ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }],
  allergens: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Allergen' }],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // se creato dal ristoratore
}, { timestamps: true });

const Meal = mongoose.model('Meal', mealSchema);
export default Meal;
