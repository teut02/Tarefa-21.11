import React from 'react';
import { Book } from '../types/book';

interface BookItemProps {
  book: Book;
  onDelete: (id: string) => void;
}

const BookItem: React.FC<BookItemProps> = ({ book, onDelete }) => {
  return (
    <div className="book-item">
      <h3>{book.title}</h3>
      <p><strong>Autor:</strong> {book.author}</p>
      <p><strong>Status:</strong> {book.status}</p>
      <button 
        onClick={() => onDelete(book._id!)}
        className="delete-button"
      >
        Remover
      </button>
    </div>
  );
};

export default BookItem;