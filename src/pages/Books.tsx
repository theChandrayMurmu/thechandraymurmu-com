import React from 'react';

// Example book data (replace with parsed XML data)
const books = [
  {
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt, David Thomas',
    cover: 'https://images-na.ssl-images-amazon.com/images/I/41as+WafrFL._SX258_BO1,204,203,200_.jpg',
  },
  {
    title: 'Clean Code',
    author: 'Robert C. Martin',
    cover: 'https://images-na.ssl-images-amazon.com/images/I/41-sN-mzwKL._SX374_BO1,204,203,200_.jpg',
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    cover: 'https://images-na.ssl-images-amazon.com/images/I/51-uspgqWIL._SX329_BO1,204,203,200_.jpg',
  },
  {
    title: 'Deep Work',
    author: 'Cal Newport',
    cover: 'https://images-na.ssl-images-amazon.com/images/I/41n5pVbT8CL._SX322_BO1,204,203,200_.jpg',
  },
  // Add more books as needed
];

const Books = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Bookshelf</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A curated collection of books I recommend for developers, designers, and lifelong learners.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {books.map((book, idx) => (
            <div key={idx} className="bg-gray-50 rounded-lg shadow hover:shadow-lg transition-all flex flex-col items-center p-4">
              <img src={book.cover} alt={book.title} className="w-32 h-48 object-cover rounded mb-4 shadow" />
              <h2 className="text-lg font-semibold text-gray-800 text-center mb-1">{book.title}</h2>
              <p className="text-sm text-gray-600 text-center">{book.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Books; 