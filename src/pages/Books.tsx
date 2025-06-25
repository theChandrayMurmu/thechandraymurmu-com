import React, { useState } from 'react';
import DevStrip from '@/components/ui/DevStrip';

// Book data with categories
const books = [
  { id: '5EORDwAAQBAJ', url: 'https://books.google.co.in/books?id=5EORDwAAQBAJ&authuser=0', title: 'Kaizen: The Japanese Method for Transforming Habits, One Small Step at a Time', author: 'Sarah Harvey', isbn: '1529005361', category: 'Self-Help' },
  { id: 'k9KfzgEACAAJ', url: 'https://books.google.co.in/books?id=k9KfzgEACAAJ&authuser=0', title: 'Right Thing, Right Now: Justice in an Unjust World', author: 'Ryan Holiday', isbn: '1788166310', category: 'Stoicism' },
  { id: 'E0VYEAAAQBAJ', url: 'https://books.google.co.in/books?id=E0VYEAAAQBAJ&authuser=0', title: 'Discipline Is Destiny: A NEW YORK TIMES BESTSELLER', author: 'Ryan Holiday', isbn: '1782837582', category: 'Stoicism' },
  { id: 'e260zQEACAAJ', url: 'https://books.google.co.in/books?id=e260zQEACAAJ&authuser=0', title: 'Pocket Full of Do', author: 'Chris Do', isbn: '0578657163', category: 'Creativity' },
  { id: 'JI_sEAAAQBAJ', url: 'https://books.google.co.in/books?id=JI_sEAAAQBAJ&authuser=0', title: 'New Happy: Getting Happiness Right in a World That\'s Got It Wrong', author: 'Stephanie Harrison', isbn: '139872209X', category: 'Self-Help' },
  { id: 'V0kxEAAAQBAJ', url: 'https://books.google.co.in/books?id=V0kxEAAAQBAJ&authuser=0', title: 'The Minimalist Entrepreneur: How Great Founders Do More with Less', author: 'Sahil Lavingia', isbn: '0349431396', category: 'Business' },
  { id: '0kGxDwAAQBAJ', url: 'https://books.google.co.in/books?id=0kGxDwAAQBAJ&authuser=0', title: 'Principles for Success', author: 'Ray Dalio', isbn: '1982147253', category: 'Business' },
  { id: 'VRMWvuybZg0C', url: 'https://books.google.co.in/books?id=VRMWvuybZg0C&authuser=0', title: 'ZAG: The #1 Strategy of High-Performance Brands', author: 'Marty Neumeier', isbn: '0132798123', category: 'Business' },
  { id: 'E2O8AwAAQBAJ', url: 'https://books.google.co.in/books?id=E2O8AwAAQBAJ&authuser=0', title: 'The 46 Rules of Genius: An Innovator\'s Guide to Creativity', author: 'Marty Neumeier', isbn: '0133900266', category: 'Creativity' },
  { id: 'kZKjRfuZd1UC', url: 'https://books.google.co.in/books?id=kZKjRfuZd1UC&authuser=0', title: 'The Designful Company: How to build a culture of nonstop innovation', author: 'Marty Neumeier', isbn: '0321648811', category: 'Creativity' },
  { id: '4MA9CgAAQBAJ', url: 'https://books.google.co.in/books?id=4MA9CgAAQBAJ&authuser=0', title: 'The Brand Flip: Why customers now run companies and how to profit from it', author: 'Marty Neumeier', isbn: '0134172973', category: 'Business' },
  { id: '8IOBjgEACAAJ', url: 'https://books.google.co.in/books?id=8IOBjgEACAAJ&authuser=0', title: 'The Brand Gap: How to Bridge the Distance Between Business Strategy and Design : a Whiteboard Overview', author: 'Marty Neumeier', isbn: '0321348109', category: 'Business' },
  { id: 'ikl91bkuYpMC', url: 'https://books.google.co.in/books?id=ikl91bkuYpMC&authuser=0', title: 'Tuesdays With Morrie: The most uplifting book ever written about the importance of human connection', author: 'Mitch Albom', isbn: '0748112618', category: 'Philosophy' },
  { id: 'FzVjBgAAQBAJ', url: 'https://books.google.co.in/books?id=FzVjBgAAQBAJ&authuser=0', title: 'The Alchemist', author: 'Paulo Coelho', isbn: '0062416219', category: 'Philosophy' },
  { id: 'zYlZDwAAQBAJ', url: 'https://books.google.co.in/books?id=zYlZDwAAQBAJ&authuser=0', title: 'The Infinite Game: From the bestselling author of Start With Why', author: 'Simon Sinek', isbn: '0241979722', category: 'Business' },
  { id: '3SliAgAAQBAJ', url: 'https://books.google.co.in/books?id=3SliAgAAQBAJ&authuser=0', title: 'Leaders Eat Last: The leadership book that every good manager needs, from the multi-million copy bestselling author of Start With Why', author: 'Simon Sinek', isbn: '0670923184', category: 'Business' },
  { id: '0M--CwAAQBAJ', url: 'https://books.google.co.in/books?id=0M--CwAAQBAJ&authuser=0', title: 'Find Your Why: A Practical Guide for Discovering Purpose for You and Your Team', author: 'Simon Sinek, David Mead, Peter Docker', isbn: '1101992980', category: 'Business' },
  { id: 'r2yCRUxo0EYC', url: 'https://books.google.co.in/books?id=r2yCRUxo0EYC&authuser=0', title: 'Start With Why: How Great Leaders Inspire Everyone to Take Action', author: 'Simon Sinek', isbn: '0241958237', category: 'Business' },
  { id: 'VprjCwAAQBAJ', url: 'https://books.google.co.in/books?id=VprjCwAAQBAJ&authuser=0', title: 'The 4 Disciplines of Execution: Achieving Your Wildly Important Goals', author: 'Chris McChesney, Sean Covey, Jim Huling', isbn: '1451627068', category: 'Productivity' },
  { id: '0XupDAAAQBAJ', url: 'https://books.google.co.in/books?id=0XupDAAAQBAJ&authuser=0', title: 'The 7 Habits of Highly Effective People: The Infographics Edition', author: 'Stephen R Covey', isbn: '1633533107', category: 'Productivity' },
  { id: 'YNA6DwAAQBAJ', url: 'https://books.google.co.in/books?id=YNA6DwAAQBAJ&authuser=0', title: 'Benjamin Franklin: A Life From Beginning to End', author: 'Hourly History', isbn: '1537393014', category: 'Biography' },
  { id: 'rTRJAwAAQBAJ', url: 'https://books.google.co.in/books?id=rTRJAwAAQBAJ&authuser=0', title: 'Minimalism: Live a Meaningful Life', author: 'Joshua Fields Millburn, Ryan Nicodemus', isbn: '0615648223', category: 'Self-Help' },
  { id: 'xmeJCgAAQBAJ', url: 'https://books.google.co.in/books?id=xmeJCgAAQBAJ&authuser=0', title: 'Algorithms to Live By: The Computer Science of Human Decisions', author: 'Brian Christian, Griffiths', isbn: '0007547986', category: 'Productivity' },
  { id: '8O6NEAAAQBAJ', url: 'https://books.google.co.in/books?id=8O6NEAAAQBAJ&authuser=0', title: 'Who Says You Can\'t? You Do', author: 'Daniel Chidiac', isbn: '0525573615', category: 'Self-Help' },
  { id: '2miEugEACAAJ', url: 'https://books.google.co.in/books?id=2miEugEACAAJ&authuser=0', title: 'I Don\'t Want to Be Happy - Said No One, Ever!: The Art and Science Behind Developing One of Life\'s Most Important Skills - In 5 Simple Hacks!', author: 'Shadé Zahrai', isbn: '0648226107', category: 'Self-Help' },
  { id: '7qryDwAAQBAJ', url: 'https://books.google.co.in/books?id=7qryDwAAQBAJ&authuser=0', title: 'Welcome Home: A Guide to Building a Home For Your Soul', author: 'Najwa Zebian', isbn: '1529336511', category: 'Self-Help' },
  { id: 'hCf-DwAAQBAJ', url: 'https://books.google.co.in/books?id=hCf-DwAAQBAJ&authuser=0', title: 'How to Win Friends and Influence People', author: 'Dale Carnegie', isbn: '8194790891', category: 'Self-Help' },
  { id: 'TjBfCgAAQBAJ', url: 'https://books.google.co.in/books?id=TjBfCgAAQBAJ&authuser=0', title: 'Anything You Want: 40 Lessons for a New Kind of Entrepreneur', author: 'Derek Sivers', isbn: '0241973503', category: 'Business' },
  { id: '4W7TAgAAQBAJ', url: 'https://books.google.co.in/books?id=4W7TAgAAQBAJ&authuser=0', title: 'Newspaper Blackout', author: 'Austin Kleon', isbn: '0061989940', category: 'Creativity' },
  { id: 'AT--DwAAQBAJ', url: 'https://books.google.co.in/books?id=AT--DwAAQBAJ&authuser=0', title: 'Keep Going', author: 'Austin Kleon', isbn: '6023859933', category: 'Creativity' },
  { id: 'Lh6SCgAAQBAJ', url: 'https://books.google.co.in/books?id=Lh6SCgAAQBAJ&authuser=0', title: 'The Steal Like an Artist Journal: A Notebook for Creative Kleptomaniacs', author: 'Austin Kleon', isbn: '0761185682', category: 'Creativity' },
  { id: 'Z4E4zwEACAAJ', url: 'https://books.google.co.in/books?id=Z4E4zwEACAAJ&authuser=0', title: 'Put Your Ass Where Your Heart Wants to Be', author: 'Steven Pressfield', isbn: '9798986164304', category: 'Creativity' },
  { id: 'lwFAuAEACAAJ', url: 'https://books.google.co.in/books?id=lwFAuAEACAAJ&authuser=0', title: 'The Artist\'s Journey: The Wake of the Hero\'s Journey and the Lifelong Pursuit of Meaning', author: 'Steven Pressfield', isbn: '1936891549', category: 'Creativity' },
  { id: 'FR7hAAAAQBAJ', url: 'https://books.google.co.in/books?id=FR7hAAAAQBAJ&authuser=0', title: 'Turning Pro: Tap Your Inner Power and Create Your Life\'s Work', author: 'Steven Pressfield', isbn: '1936891050', category: 'Creativity' },
  { id: 'sR3hAAAAQBAJ', url: 'https://books.google.co.in/books?id=sR3hAAAAQBAJ&authuser=0', title: 'The War of Art: Break Through the Blocks and Win Your Inner Creative Battles', author: 'Steven Pressfield', isbn: '1936891042', category: 'Creativity' },
  { id: 'EbltAAAAQBAJ', url: 'https://books.google.co.in/books?id=EbltAAAAQBAJ&authuser=0', title: 'Man\'s Search For Meaning: The classic tribute to hope from the Holocaust', author: 'Viktor E Frankl', isbn: '1448177685', category: 'Philosophy' },
  { id: '6U2czgEACAAJ', url: 'https://books.google.co.in/books?id=6U2czgEACAAJ&authuser=0', title: 'When You\'re Ready, This Is How You Heal', author: 'Wiest', isbn: '194975944X', category: 'Self-Help' },
  { id: 'xCgA0AEACAAJ', url: 'https://books.google.co.in/books?id=xCgA0AEACAAJ&authuser=0', title: 'The Mountain Is You: Transforming Self-Sabotage Into Self-Mastery', author: 'Brianna Wiest', isbn: '1949759229', category: 'Self-Help' },
  { id: 'Qt1ZvgAACAAJ', url: 'https://books.google.co.in/books?id=Qt1ZvgAACAAJ&authuser=0', title: '101 Essays That Will Change the Way You Think', author: 'Brianna Wiest', isbn: '1945796065', category: 'Self-Help' },
  { id: 'bdJwzwEACAAJ', url: 'https://books.google.co.in/books?id=bdJwzwEACAAJ&authuser=0', title: 'The Pivot Year', author: 'Brianna Wiest', isbn: '1949759628', category: 'Self-Help' },
  { id: 'gRJSEAAAQBAJ', url: 'https://books.google.co.in/books?id=gRJSEAAAQBAJ&authuser=0', title: 'Principles for Dealing with the Changing World Order: Why Nations Succeed and Fail', author: 'Ray Dalio', isbn: '1982160276', category: 'Business' },
  { id: '2eyaEAAAQBAJ', url: 'https://books.google.co.in/books?id=2eyaEAAAQBAJ&authuser=0', title: 'Principles for Navigating Big Debt Crises', author: 'Ray Dalio', isbn: '1668009293', category: 'Business' },
  { id: 'okk1DwAAQBAJ', url: 'https://books.google.co.in/books?id=okk1DwAAQBAJ&authuser=0', title: 'Principles: Life and Work', author: 'Ray Dalio', isbn: '1501124021', category: 'Business' },
  { id: 'g2uXEAAAQBAJ', url: 'https://books.google.co.in/books?id=g2uXEAAAQBAJ&authuser=0', title: 'Principles: Your Guided Journal (Create Your Own Principles to Get the Work and Life You Want)', author: 'Ray Dalio', isbn: '1668010194', category: 'Business' },
  { id: 'rRgNzgEACAAJ', url: 'https://books.google.co.in/books?id=rRgNzgEACAAJ&authuser=0', title: 'The Boy Who Would Be King', author: 'Ryan Holiday', isbn: '0578810042', category: 'Stoicism' },
  { id: 'h_M3DwAAQBAJ', url: 'https://books.google.co.in/books?id=h_M3DwAAQBAJ&authuser=0', title: 'Conspiracy: Peter Thiel, Hulk Hogan, Gawker, and the Anatomy of Intrigue', author: 'Ryan Holiday', isbn: '0735217661', category: 'Business' },
  { id: 'nHU7DwAAQBAJ', url: 'https://books.google.co.in/books?id=nHU7DwAAQBAJ&authuser=0', title: 'Trust Me I\'m Lying: Confessions of a Media Manipulator', author: 'Ryan Holiday', isbn: '1782834230', category: 'Business' },
  { id: 'dueNEAAAQBAJ', url: 'https://books.google.co.in/books?id=dueNEAAAQBAJ&authuser=0', title: 'The Daily Stoic Journal: 366 Days of Writing and Reflection on the Art of Living', author: 'Ryan Holiday, Stephen Hanselman', isbn: '0525534393', category: 'Stoicism' },
  { id: 'TR2MDAAAQBAJ', url: 'https://books.google.co.in/books?id=TR2MDAAAQBAJ&authuser=0', title: 'The Daily Stoic: 366 Meditations on Wisdom, Perseverance, and the Art of Living', author: 'Ryan Holiday, Stephen Hanselman', isbn: '0735211744', category: 'Stoicism' },
  { id: 'F3zZDwAAQBAJ', url: 'https://books.google.co.in/books?id=F3zZDwAAQBAJ&authuser=0', title: 'Lives of the Stoics: The Art of Living from Zeno to Marcus Aurelius', author: 'Ryan Holiday, Stephen Hanselman', isbn: '1782835504', category: 'Stoicism' },
  { id: 'j0GXCgAAQBAJ', url: 'https://books.google.co.in/books?id=j0GXCgAAQBAJ&authuser=0', title: 'Ego Is the Enemy', author: 'Ryan Holiday', isbn: '069819215X', category: 'Stoicism' },
  { id: 'nY6BEAAAQBAJ', url: 'https://books.google.co.in/books?id=nY6BEAAAQBAJ&authuser=0', title: 'The Daily Dad: 366 Meditations on Parenting, Love and Raising Great Kids', author: 'Ryan Holiday', isbn: '1800815042', category: 'Stoicism' },
  { id: 'zNn9EAAAQBAJ', url: 'https://books.google.co.in/books?id=zNn9EAAAQBAJ&authuser=0', title: 'The Obstacle is the Way Expanded 10th Anniversary Edition: The Timeless Art of Turning Trials into Triumph', author: 'Ryan Holiday', isbn: '0593949099', category: 'Stoicism' },
  { id: '916TDwAAQBAJ', url: 'https://books.google.co.in/books?id=916TDwAAQBAJ&authuser=0', title: 'Stillness is the Key: An Ancient Strategy for Modern Life', author: 'Ryan Holiday', isbn: '178283527X', category: 'Stoicism' },
  { id: '2S0lAwAAQBAJ', url: 'https://books.google.co.in/books?id=2S0lAwAAQBAJ&authuser=0', title: 'The Obstacle is the Way: The Ancient Art of Turning Adversity to Advantage', author: 'Ryan Holiday', isbn: '1782830057', category: 'Stoicism' },
  { id: 'isMsEAAAQBAJ', url: 'https://books.google.co.in/books?id=isMsEAAAQBAJ&authuser=0', title: 'Courage Is Calling: Fortune Favors the Brave', author: 'Ryan Holiday', isbn: '0593191684', category: 'Stoicism' },
  { id: '_4DyEAAAQBAJ', url: 'https://books.google.co.in/books?id=_4DyEAAAQBAJ&authuser=0', title: 'Money Works: The Guide to Financial Literacy', author: 'Abhijeet Kolapkar', isbn: '9357082131', category: 'Business' },
  { id: 'BDFDEAAAQBAJ', url: 'https://books.google.co.in/books?id=BDFDEAAAQBAJ&authuser=0', title: 'The Almanack Of Naval Ravikant: A Guide to Wealth and Happiness', author: 'Eric Jorgenson', isbn: '9354893945', category: 'Business' },
  { id: 'M_XrEAAAQBAJ', url: 'https://books.google.co.in/books?id=M_XrEAAAQBAJ&authuser=0', title: 'Make Epic Money', author: 'Ankur Warikoo', isbn: '1529938996', category: 'Business' },
  { id: 'MZMJEQAAQBAJ', url: 'https://books.google.co.in/books?id=MZMJEQAAQBAJ&authuser=0', title: 'Do Epic Shit', author: 'Ankur Warikoo', category: 'Business' },
];

const getCoverUrl = (id: string) =>
  `https://books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`;

const BOOKS_PER_PAGE = 16;

const categories = ['All', ...Array.from(new Set(books.map(b => b.category)))];

const Books = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredBooks = books.filter(
    (book) =>
      (selectedCategory === 'All' || book.category === selectedCategory) &&
      (book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE) || 1;
  const startIdx = (page - 1) * BOOKS_PER_PAGE;
  const endIdx = startIdx + BOOKS_PER_PAGE;
  const paginatedBooks = filteredBooks.slice(startIdx, endIdx);

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  // Reset to page 1 when search or category changes
  React.useEffect(() => {
    setPage(1);
  }, [search, selectedCategory]);

  return (
    <>
      <DevStrip />
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Bookshelf</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A curated collection of books I recommend for developers, designers, and lifelong learners.
            </p>
          </div>
          <div className="mb-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Search books..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {paginatedBooks.length === 0 && (
              <div className="col-span-full text-center text-gray-400 text-lg py-20">
                No books to display yet.
              </div>
            )}
            {paginatedBooks.map((book) => (
              <a
                key={book.id}
                href={book.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-50 rounded-lg shadow hover:shadow-lg transition-all flex flex-col items-center p-4 group hover:bg-blue-50"
              >
                <img
                  src={getCoverUrl(book.id)}
                  alt={book.title}
                  className="w-32 h-48 object-cover rounded mb-4 shadow group-hover:scale-105 transition-transform"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://via.placeholder.com/128x192?text=No+Cover';
                  }}
                />
                <h2 className="text-lg font-semibold text-gray-800 text-center mb-1 line-clamp-2">{book.title}</h2>
                <p className="text-sm text-gray-600 text-center line-clamp-1">{book.author}</p>
              </a>
            ))}
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              onClick={handlePrev}
              disabled={page === 1}
              className="px-4 py-2 rounded border border-gray-300 bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              Previous
            </button>
            <span className="text-gray-600">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={page === totalPages}
              className="px-4 py-2 rounded border border-gray-300 bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Books; 