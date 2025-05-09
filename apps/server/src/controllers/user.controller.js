const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users); // toJSON limpia la respuesta
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};
