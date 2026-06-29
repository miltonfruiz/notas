```typescript
import React, { useState, useEffect } from 'react';

interface Note {
  id: number;
  title: string;
  content: string;
}

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/notes')
      .then(response => response.json())
      .then(data => setNotes(data));
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    fetch('http://localhost:5000/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    })
      .then(response => response.json())
      .then(data => setNotes([...notes, data]));
    setTitle('');
    setContent('');
  };

  const handleDelete = (id: number) => {
    fetch(`http://localhost:5000/notes/${id}`, { method: 'DELETE' })
      .then(() => setNotes(notes.filter(note => note.id !== id)));
  };

  return (
    <div>
      <h1>Notas</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Título"
        />
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Contenido"
        />
        <button type="submit">Crear nota</button>
      </form>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <button onClick={() => handleDelete(note.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
```