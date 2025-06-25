import { useEffect, useState } from "react";
import { BackgroundLines } from "./ui/BackgroundLines";
import { Users, Briefcase } from "lucide-react";

function getISTMidnightDate(year: number, month: number, day: number) {
  // month is 0-indexed
  // Create a date at midnight IST (GMT+5:30)
  return new Date(Date.UTC(year, month, day, 18, 30, 0, 0));
}

function getElapsedTimeString(fromDate: Date, toDate: Date) {
  const diff = Math.max(0, toDate.getTime() - fromDate.getTime());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return `${days}d, ${hours}h, ${minutes}m, ${seconds}s`;
}

export function StatusInfo() {
  const [elapsed, setElapsed] = useState("");
  const [dateTime, setDateTime] = useState(new Date());
  const [coords, setCoords] = useState<{ latitude: number | null; longitude: number | null }>({ latitude: null, longitude: null });
  const [location, setLocation] = useState<{ city: string; country: string; temperature: number | null }>({ city: "", country: "", temperature: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const istMidnight = getISTMidnightDate(1998, 10, 25);
    const updateElapsed = () => setElapsed(getElapsedTimeString(istMidnight, new Date()));
    updateElapsed();
    const interval = setInterval(updateElapsed, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Try browser geolocation first
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
          fetchLocationAndWeather(pos.coords.latitude, pos.coords.longitude);
        },
        () => {
          // Fallback to IP-based location
          fetchLocationAndWeather();
        },
        { timeout: 5000 }
      );
    } else {
      fetchLocationAndWeather();
    }
  }, []);

  function fetchLocationAndWeather(lat?: number, lon?: number) {
    setLoading(true);
    if (lat != null && lon != null) {
      // Reverse geocode with ipapi for city/country
      fetch(`https://ipapi.co/json/`)
        .then(res => res.json())
        .then(data => {
          setLocation(loc => ({ ...loc, city: data.city, country: data.country_name }));
        });
      // Weather
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
        .then(res => res.json())
        .then(data => {
          setLocation(loc => ({ ...loc, temperature: data.current_weather?.temperature ?? null }));
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      // Fallback: get coords from ipapi
      fetch(`https://ipapi.co/json/`)
        .then(res => res.json())
        .then(data => {
          setCoords({ latitude: data.latitude, longitude: data.longitude });
          setLocation({ city: data.city, country: data.country_name, temperature: null });
          // Weather
          fetch(`https://api.open-meteo.com/v1/forecast?latitude=${data.latitude}&longitude=${data.longitude}&current_weather=true`)
            .then(res => res.json())
            .then(data2 => {
              setLocation(loc => ({ ...loc, temperature: data2.current_weather?.temperature ?? null }));
              setLoading(false);
            })
            .catch(() => setLoading(false));
        })
        .catch(() => setLoading(false));
    }
  }

  return (
    <div className="mt-6 flex flex-col gap-1 text-sm text-gray-300/80 font-mono items-center md:items-end">
      <div><span role="img" aria-label="hourglass">⏳</span> {elapsed}</div>
      <div><span role="img" aria-label="clock">🕒</span> {dateTime.toLocaleString()}</div>
      <div><span role="img" aria-label="world map">🗺</span> {loading || coords.latitude == null || coords.longitude == null ? "Coords: ..." : `Coords: ${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}`}</div>
      <div><span role="img" aria-label="location">📍</span> {loading ? "Locating..." : `${location.city}, ${location.country}`}{location.temperature != null ? <span className="ml-2" role="img" aria-label="temperature">🌡️ {location.temperature}°C</span> : null}</div>
    </div>
  );
}

const Hero = () => {
  return (
    <section id="hero">
      <BackgroundLines className="min-h-screen flex items-center justify-center">
        <div className="relative z-10 flex flex-col justify-center items-center text-center text-white px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col justify-center items-center w-full">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg text-center text-gray-900 select-none w-full">
              Building Team<br />Building Community
            </h1>
            <p className="text-lg md:text-xl text-black max-w-3xl mx-auto drop-shadow-lg text-center">
              Sharing my knowledge with world and learning to find my voice.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#community"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition-colors text-base"
              >
                <Users size={20} />
                Join Community
              </a>
              <a
                href="#hire"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-900 text-white font-semibold shadow hover:bg-gray-800 transition-colors text-base"
              >
                <Briefcase size={20} />
                Hire Me
              </a>
            </div>
          </div>
        </div>
      </BackgroundLines>
    </section>
  );
};

export default Hero;
