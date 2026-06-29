```javascript
const { check, validationResult } = require('express-validator');

const validate = (method) => {
  switch (method) {
    case 'crearUsuario': {
      return [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('apellido', 'El apellido es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria y debe tener al menos 8 caracteres').isLength({ min: 8 }),
      ];
    }
    case 'login': {
      return [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
      ];
    }
    default:
      return [];
  }
};

const validarCampos = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  next();
};

module.exports = { validate, validarCampos };
```