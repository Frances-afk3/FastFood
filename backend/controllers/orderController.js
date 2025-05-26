import Order from '../models/Order.js';
import Restaurant from '../models/Restaurant.js';

/**
 * @desc    Crea un nuovo ordine
 * @route   POST /api/orders
 * @access  Privato (cliente)
 */
export const createOrder = async (req, res) => {
  const { restaurantId, items, delivery, deliveryAddress, deliveryCost } = req.body;

  try {
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) return res.status(404).json({ message: 'Ristorante non trovato' });

    const newOrder = new Order({
      customer: req.user.id,
      restaurant: restaurantId,
      items,
      delivery,
      deliveryAddress: delivery === 'domicilio' ? deliveryAddress : undefined,
      deliveryCost: delivery === 'domicilio' ? deliveryCost : 0
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: 'Errore nella creazione dell’ordine' });
  }
};

/**
 * @desc    Ottieni tutti gli ordini dell’utente loggato
 * @route   GET /api/orders/my
 * @access  Privato
 */
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user.id }).populate('items.meal');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Errore nel recupero degli ordini' });
  }
};

/**
 * @desc    Aggiorna lo stato dell’ordine (ristoratore)
 * @route   PUT /api/orders/:orderId/status
 * @access  Privato (ristoratore)
 */
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ message: 'Ordine non trovato' });

    const restaurant = await Restaurant.findById(order.restaurant);
    if (!restaurant || restaurant.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Non autorizzato a modificare questo ordine' });
    }

    order.status = req.body.status || order.status;
    const updated = await order.save();
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Errore nell’aggiornamento dello stato dell’ordine' });
  }
};
