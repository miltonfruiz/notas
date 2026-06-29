```javascript
const jwt = require('jsonwebtoken');
const config = require('../config');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).send({ error: 'Por favor, inicia sesión' });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).send({ error: 'Token no válido' });
  }
};

module.exports = authMiddleware;
```