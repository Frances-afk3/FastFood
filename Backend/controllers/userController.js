import User from '../models/User.js';
import bcrypt from 'bcryptjs';

/**
 * @desc    Ottiene i dati del profilo utente loggato
 * @route   GET /api/users/me
 * @access  Privato
 */
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'Utente non trovato' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Errore nel recupero del profilo' });
  }
};

/**
 * @desc    Aggiorna il profilo dell’utente loggato
 * @route   PUT /api/users/me
 * @access  Privato
 */
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'Utente non trovato' });

    user.name = req.body.name || user.name;
    user.surname = req.body.surname || user.surname;
    user.preferences = req.body.preferences || user.preferences;
    user.address = req.body.address || user.address;
    user.paymentMethod = req.body.paymentMethod || user.paymentMethod;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role
    });
  } catch (err) {
    res.status(500).json({ message: 'Errore durante l’aggiornamento del profilo' });
  }
};

/**
 * @desc    Cancella il profilo dell’utente loggato
 * @route   DELETE /api/users/me
 * @access  Privato
 */
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);
    if (!user) return res.status(404).json({ message: 'Utente non trovato' });
    res.status(200).json({ message: 'Utente eliminato correttamente' });
  } catch (err) {
    res.status(500).json({ message: 'Errore durante l’eliminazione' });
  }
};
