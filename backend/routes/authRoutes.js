```javascript
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Modelo de usuario
const User = require('../models/User');

// Registro de usuarios
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ msg: 'El correo electrónico ya está registrado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ msg: 'Registro exitoso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al registrar usuario' });
    }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ msg: 'Correo electrónico o contraseña incorrectos' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({ msg: 'Correo electrónico o contraseña incorrectos' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
            expiresIn: '1h'
        });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al iniciar sesión' });
    }
});

// Cierre de sesión
router.post('/logout', async (req, res) => {
    try {
        req.session.destroy();
        res.clearCookie('authCookie');
        res.status(200).json({ msg: 'Cierre de sesión exitoso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al cerrar sesión' });
    }
});

module.exports = router;
```