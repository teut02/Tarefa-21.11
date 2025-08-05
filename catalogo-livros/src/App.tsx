import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Book } from './types/book';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import './App.css';

const API_URL = 'https://crudcrud.com/api/0be37ce0269d45e59cd96864bf8b9dd6/livros';

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showFullList, setShowFullList] = useState(false);

  const fetchBooks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      setBooks(response.data);
    } catch (error) {
      setError('Falha ao carregar livros. Recarregue a página.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBook = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchBooks(); // Atualiza a lista após remoção
    } catch (error) {
      console.error('Erro ao deletar livro:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="app-container">
      <h1>📚 Catálogo de Livros</h1>
      
      <BookForm onBookAdded={fetchBooks} />
      
      <button 
        onClick={() => setShowFullList(!showFullList)}
        className="toggle-list-button"
      >
        {showFullList ? 'Ocultar Lista' : 'Mostrar Lista Completa'}
      </button>
      
      {error && <div className="error-message">{error}</div>}
      
      {isLoading ? (
        <p>Carregando...</p>
      ) : showFullList ? (
        <div className="full-list">
          {books.map(book => (
            <div key={book._id} className="full-list-item">
              <span>{book.title} - {book.author} ({book.status})</span>
              <button 
                onClick={() => handleDeleteBook(book._id!)}
                className="delete-button"
              >
                Remover
              </button>
            </div>
          ))}
        </div>
      ) : (
        <BookList books={books} onDelete={handleDeleteBook} />
      )}
    </div>
  );
};

export default App;