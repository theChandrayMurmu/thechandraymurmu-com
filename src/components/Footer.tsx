import { useState, useEffect } from 'react';

const fetchLocationAndWeather = async () => {
  try {
    const locRes = await fetch("https://ipapi.co/json/");
    const locData = await locRes.json();
    const { city, country_name, latitude, longitude } = locData;
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    const weatherData = await weatherRes.json();
    const temperature = weatherData.current_weather?.temperature;
    return {
      city,
      country: country_name,
      latitude,
      longitude,
      temperature,
    };
  } catch (e) {
    return {
      city: "Unknown",
      country: "Unknown",
      latitude: null,
      longitude: null,
      temperature: null,
    };
  }
};

function getISTMidnightDate(year: number, month: number, day: number) {
  const utcDate = new Date(Date.UTC(year, month, day, 18, 30, 0, 0));
  return utcDate;
}

function getElapsedTimeString(fromDate: Date, toDate: Date) {
  const diff = Math.max(0, toDate.getTime() - fromDate.getTime());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return `${days}d, ${hours}h, ${minutes}m, ${seconds}s`;
}

const Footer = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Date/time/location state for footer info box
  const [dateTime, setDateTime] = useState(new Date());
  const [location, setLocation] = useState({ city: "", country: "", latitude: null, longitude: null, temperature: null });
  const [loading, setLoading] = useState(true);
  const [elapsed, setElapsed] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
      const istMidnight = getISTMidnightDate(1998, 10, 25);
      setElapsed(getElapsedTimeString(istMidnight, new Date()));
    }, 1000);
    const istMidnight = getISTMidnightDate(1998, 10, 25);
    setElapsed(getElapsedTimeString(istMidnight, new Date()));
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchLocationAndWeather().then((data) => {
      setLocation(data);
      setLoading(false);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail('');
  };

  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 py-10 mt-16">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Logo and 4 Columns */}
        <div className="flex flex-col gap-8 w-full md:w-auto">
          <div className="mb-4 flex items-center gap-2">
            <img src="/logo-cc.png" alt="Chandray Murmu Logo" className="h-10 w-auto object-contain" />
            <span className="text-lg font-bold text-gray-800">Chandray Murmu</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <span className="text-md font-bold text-gray-700 mb-2 block">Create</span>
              <nav className="flex flex-col gap-2 text-gray-600 text-sm">
                <a href="/tools" className="hover:text-gray-900">Tools</a>
                <a href="#projects" className="hover:text-gray-900">Projects</a>
              </nav>
            </div>
            <div>
              <span className="text-md font-bold text-gray-700 mb-2 block">Consume</span>
              <nav className="flex flex-col gap-2 text-gray-600 text-sm">
                <a href="#blog" className="hover:text-gray-900">Blog</a>
                <a href="/books" className="hover:text-gray-900">Books</a>
              </nav>
            </div>
            <div>
              <span className="text-md font-bold text-gray-700 mb-2 block">Connect</span>
              <nav className="flex flex-col gap-2 text-gray-600 text-sm">
                <a href="mailto:hello@chandraymurmu.com" className="hover:text-gray-900">Contact</a>
                <a href="/creators" className="hover:text-gray-900">Creators</a>
              </nav>
            </div>
            <div>
              <span className="text-md font-bold text-gray-700 mb-2 block">Custom</span>
              <nav className="flex flex-col gap-2 text-gray-600 text-sm">
                <a href="/sitemap" className="hover:text-gray-900">Sitemap</a>
                <a href="#support" className="hover:text-gray-900">Support</a>
              </nav>
            </div>
          </div>
        </div>
        {/* Newsletter */}
        <div className="w-full md:w-auto flex flex-col items-start gap-4 mt-8 md:mt-0">
          <span className="text-md font-semibold text-gray-700">Subscribe to Now and Forever.</span>
          <form onSubmit={handleSubmit} className="flex gap-2 w-full">
            <input
              type="email"
              required
              placeholder="Your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm w-48"
            />
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition-colors text-sm">
              Subscribe
            </button>
          </form>
          {submitted && <span className="text-green-600 text-xs mt-1">Thank you for subscribing!</span>}
        </div>
      </div>
      <div className="text-center text-xs text-gray-400 mt-8">1998 &nbsp;⎯&nbsp; 2025. Chandray Murmu. All rights reserved.</div>
    </footer>
  );
};

export default Footer; 