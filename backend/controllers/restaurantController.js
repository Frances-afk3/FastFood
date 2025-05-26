import Restaurant from '../models/Restaurant.js';
import Meal from '../models/Meal.js';

/**
 * @desc    Ottieni la lista di tutti i ristoranti
 * @route   GET /api/restaurants
 * @access  Pubblico
 */
export const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().populate('menu');
    res.status(200).json(restaurants);
  } catch (err) {
    res.status(500).json({ message: 'Errore nel recupero dei ristoranti' });
  }
};

/**
 * @desc    Ottieni un ristorante per ID
 * @route   GET /api/restaurants/:id
 * @access  Pubblico
 */
export const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate('menu');
    if (!restaurant) return res.status(404).json({ message: 'Ristorante non trovato' });
    res.status(200).json(restaurant);
  } catch (err) {
    res.status(500).json({ message: 'Errore nel recupero del ristorante' });
  }
};

/**
 * @desc    Modifica informazioni del ristorante (solo ristoratore)
 * @route   PUT /api/restaurants/:id
 * @access  Privato (ristoratore)
 */
export const updateRestaurantInfo = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) return res.status(404).json({ message: 'Ristorante non trovato' });
    if (restaurant.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Accesso negato' });
    }

    restaurant.name = req.body.name || restaurant.name;
    restaurant.location = req.body.location || restaurant.location;
    restaurant.phone = req.body.phone || restaurant.phone;
    restaurant.address = req.body.address || restaurant.address;

    const updated = await restaurant.save();
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Errore durante l’aggiornamento del ristorante' });
  }
};

/**
 * @desc    Aggiunge un nuovo piatto al menu del ristorante
 * @route   POST /api/restaurants/:id/meals
 * @access  Privato (ristoratore)
 */
export const createMeal = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: 'Ristorante non trovato' });

    if (restaurant.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Non autorizzato' });
    }

    const meal = new Meal({
      name: req.body.name,
      type: req.body.type,
      price: req.body.price,
      image: req.body.image,
      ingredients: req.body.ingredients, // array di ID Ingredient
      allergens: req.body.allergens,     // array di ID Allergen
      creator: req.user.id
    });

    const savedMeal = await meal.save();
    restaurant.menu.push(savedMeal._id);
    await restaurant.save();

    res.status(201).json(savedMeal);
  } catch (err) {
    res.status(500).json({ message: 'Errore durante la creazione del piatto' });
  }
};
