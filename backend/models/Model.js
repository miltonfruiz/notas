```javascript
const mongoose = require('mongoose');

const notaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  fechaCreacion: { type: Date, default: Date.now },
  fechaActualizacion: { type: Date, default: Date.now }
});

notaSchema.pre('save', function(next) {
  this.fechaActualizacion = Date.now();
  next();
});

const Nota = mongoose.model('Nota', notaSchema);

module.exports = Nota;
```