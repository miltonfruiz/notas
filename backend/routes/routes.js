```javascript
// Importaciones necesarias
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nota = require('./nota.model'); // Modelo de nota
const usuario = require('./usuario.model'); // Modelo de usuario

// Crear aplicación Express
const app = express();
app.use(express.json());

// Función para verificar token
function verificarToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Acceso denegado');

    try {
        const decoded = jwt.verify(token, 'secretkey');
        req.usuario = decoded;
        next();
    } catch (ex) {
        res.status(400).send('Token invalido');
    }
}

// Ruta para crear nota (protegida)
app.post('/notas', verificarToken, async (req, res) => {
    const notaNueva = new nota({
        titulo: req.body.titulo,
        contenido: req.body.contenido,
        usuario: req.usuario._id
    });
    try {
        const notaGuardada = await notaNueva.save();
        res.send(notaGuardada);
    } catch (ex) {
        res.status(400).send(ex.message);
    }
});

// Ruta para obtener todas las notas de un usuario (protegida)
app.get('/notas', verificarToken, async (req, res) => {
    try {
        const notas = await nota.find({ usuario: req.usuario._id });
        res.send(notas);
    } catch (ex) {
        res.status(400).send(ex.message);
    }
});

// Ruta para obtener una nota por ID (protegida)
app.get('/notas/:id', verificarToken, async (req, res) => {
    try {
        const notaEncontrada = await nota.findById(req.params.id);
        if (!notaEncontrada) return res.status(404).send('Nota no encontrada');
        if (notaEncontrada.usuario.toString() !== req.usuario._id.toString()) return res.status(401).send('Acceso denegado');
        res.send(notaEncontrada);
    } catch (ex) {
        res.status(400).send(ex.message);
    }
});

// Ruta para actualizar una nota (protegida)
app.put('/notas/:id', verificarToken, async (req, res) => {
    try {
        const notaEncontrada = await nota.findById(req.params.id);
        if (!notaEncontrada) return res.status(404).send('Nota no encontrada');
        if (notaEncontrada.usuario.toString() !== req.usuario._id.toString()) return res.status(401).send('Acceso denegado');
        notaEncontrada.titulo = req.body.titulo;
        notaEncontrada.contenido = req.body.contenido;
        const notaActualizada = await notaEncontrada.save();
        res.send(notaActualizada);
    } catch (ex) {
        res.status(400).send(ex.message);
    }
});

// Ruta para eliminar una nota (protegida)
app.delete('/notas/:id', verificarToken, async (req, res) => {
    try {
        const notaEncontrada = await nota.findById(req.params.id);
        if (!notaEncontrada) return res.status(404).send('Nota no encontrada');
        if (notaEncontrada.usuario.toString() !== req.usuario._id.toString()) return res.status(401).send('Acceso denegado');
        await notaEncontrada.remove();
        res.send('Nota eliminada');
    } catch (ex) {
        res.status(400).send(ex.message);
    }
});

// Ruta para registrar un nuevo usuario
app.post('/usuarios', async (req, res) => {
    const usuarioExiste = await usuario.findOne({ email: req.body.email });
    if (usuarioExiste) return res.status(400).send('Usuario ya existe');

    const usuarioNuevo = new usuario({
        nombre: req.body.nombre,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    });
    try {
        const usuarioGuardado = await usuarioNuevo.save();
        res.send(usuarioGuardado);
    } catch (ex) {
        res.status(400).send(ex.message);
    }
});

// Ruta para iniciar sesión
app.post('/login', async (req, res) => {
    const usuarioEncontrado = await usuario.findOne({ email: req.body.email });
    if (!usuarioEncontrado) return res.status(400).send('Usuario no encontrado');

    const esValido = bcrypt.compareSync(req.body.password, usuarioEncontrado.password);
    if (!esValido) return res.status(400).send('Contraseña incorrecta');

    const token = jwt.sign({ _id: usuarioEncontrado._id }, 'secretkey');
    res.send(token);
});

// Iniciar servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});
```