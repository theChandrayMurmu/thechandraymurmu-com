import { useEffect, useState } from "react";

const fetchLocationAndWeather = async () => {
  try {
    // Get location info
    const locRes = await fetch("https://ipapi.co/json/");
    const locData = await locRes.json();
    const { city, country_name, latitude, longitude } = locData;
    // Get weather info
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
  // month is 0-indexed
  // Create a date at midnight IST (GMT+5:30)
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

const Hero = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const [location, setLocation] = useState({ city: "", country: "", latitude: null, longitude: null, temperature: null });
  const [loading, setLoading] = useState(true);
  const [elapsed, setElapsed] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
      const istMidnight = getISTMidnightDate(1998, 10, 25); // November is month 10 (0-indexed)
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

  return (
    <section id="hero" className="w-full min-h-[60vh] flex items-center justify-center relative bg-gradient-to-br from-blue-50 to-indigo-100">
      <h1 className="text-4xl font-extrabold text-slate-800 mb-10 text-center">Hero Section</h1>
      <div className="absolute bottom-6 right-6 w-full max-w-xs bg-white/90 rounded-2xl shadow-xl px-3 py-2 flex flex-col gap-2 items-end font-sans text-base text-slate-700 border border-slate-200 text-right">
        <div className="flex items-center gap-2 justify-end w-full">
          <span role="img" aria-label="hourglass">⏳</span>
          <span>{elapsed ? elapsed : "..."}</span>
        </div>
        <div className="flex items-center gap-2 justify-end w-full">
          <span role="img" aria-label="clock">🕒</span>
          <span>{dateTime.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2 justify-end w-full">
          <span role="img" aria-label="world map">🗺</span>
          <span>{loading || location.latitude === null || location.longitude === null ? "Coords: ..." : `Coords: ${location.latitude}, ${location.longitude}`}</span>
        </div>
        <div className="flex items-center gap-2 justify-end w-full">
          <span role="img" aria-label="location">📍</span>
          <span>{loading ? "Locating..." : `${location.city}, ${location.country}`}{location.temperature !== null ? <span className="ml-2" role="img" aria-label="temperature">🌡️ {location.temperature}°C</span> : null}</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
