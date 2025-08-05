import React, { useState } from 'react';
import axios from 'axios';
import { Book } from '../types/book';

const API_URL = 'https://crudcrud.com/api/0be37ce0269d45e59cd96864bf8b9dd6/livros';

interface BookFormProps {
  onBookAdded: () => void;
}

const BookForm: React.FC<BookFormProps> = ({ onBookAdded }) => {
  const [newBook, setNewBook] = useState<Omit<Book, '_id'>>({ 
    title: '', 
    author: '', 
    status: "Não lido" 
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, newBook);
      setNewBook({ title: '', author: '', status: "Não lido" });
      onBookAdded();
    } catch (error) {
      console.error("Erro ao adicionar livro:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <input
        type="text"
        placeholder="Título"
        value={newBook.title}
        onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Autor"
        value={newBook.author}
        onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
        required
      />
      <button type="submit">Adicionar Livro</button>
    </form>
  );
};

export default BookForm;