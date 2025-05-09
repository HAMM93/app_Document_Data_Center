const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'mi_clave_secreta';

// Middleware para verificar el token JWT
exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // userId y role
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
};

// Middleware para verificar el rol del usuario
exports.checkRole = (...allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user?.role;

        if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: 'Acceso denegado: rol no autorizado' });
        }

        next();
    };
};
