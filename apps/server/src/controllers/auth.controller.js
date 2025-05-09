const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); 

const JWT_SECRET = process.env.JWT_SECRET || 'mi_clave_secreta';

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });

        const token = jwt.sign(
        { userId: user._id, role: user.role },
        JWT_SECRET,
        { expiresIn: '2h' }
        );

        res.json({ token, user: { email: user.email, name: user.name, role: user.role } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

exports.registerUser = async (req, res) => {
    const { email, password, name, role } = req.body;

    try {
        // Validar si el correo ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
        return res.status(400).json({ message: 'El correo ya está registrado' });
        }

        // Crear usuario (se encripta en el modelo)
        const user = new User({ email, password, name, role });
        await user.save();

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al registrar usuario' });
    }
};