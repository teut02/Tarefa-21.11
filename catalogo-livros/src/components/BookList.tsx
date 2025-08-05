import React from 'react';
import { Book } from '../types/book';
import BookItem from './BookItem';

interface BookListProps {
  books: Book[];
  onDelete: (id: string) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onDelete }) => {
  return (
    <div className="book-list">
      {books.length === 0 ? (
        <p>Nenhum livro cadastrado.</p>
      ) : (
        books.map((book) => (
          <BookItem
            key={book._id}
            book={book}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
};

export default BookList;