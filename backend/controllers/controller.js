```javascript
class Nota {
  constructor(id, titulo, contenido) {
    this.id = id;
    this.titulo = titulo;
    this.contenido = contenido;
  }
}

class NotasController {
  constructor() {
    this.notas = [];
    this.id = 1;
  }

  // Crear nota
  crearNota(titulo, contenido) {
    const nota = new Nota(this.id, titulo, contenido);
    this.notas.push(nota);
    this.id++;
    return nota;
  }

  // Leer notas
  leerNotas() {
    return this.notas;
  }

  // Leer nota por id
  leerNotaPorId(id) {
    return this.notas.find((nota) => nota.id === id);
  }

  // Actualizar nota
  actualizarNota(id, titulo, contenido) {
    const nota = this.notas.find((nota) => nota.id === id);
    if (nota) {
      nota.titulo = titulo;
      nota.contenido = contenido;
      return nota;
    } else {
      return null;
    }
  }

  // Eliminar nota
  eliminarNota(id) {
    const nota = this.notas.find((nota) => nota.id === id);
    if (nota) {
      this.notas = this.notas.filter((nota) => nota.id !== id);
      return true;
    } else {
      return false;
    }
  }
}

// Ejemplo de uso
const controller = new NotasController();

// Crear nota
const nota1 = controller.crearNota("Nota 1", "Contenido de la nota 1");
console.log(nota1);

// Leer notas
const notas = controller.leerNotas();
console.log(notas);

// Leer nota por id
const notaPorId = controller.leerNotaPorId(1);
console.log(notaPorId);

// Actualizar nota
const notaActualizada = controller.actualizarNota(1, "Nota 1 actualizada", "Contenido de la nota 1 actualizada");
console.log(notaActualizada);

// Eliminar nota
const eliminada = controller.eliminarNota(1);
console.log(eliminada);
```