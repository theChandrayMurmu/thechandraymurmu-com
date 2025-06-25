import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Sample project data - replace with your actual projects
const featuredProjects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution built with React, Node.js, and MongoDB. Features include user authentication, payment integration, and admin dashboard.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    demoUrl: "#",
    githubUrl: "#",
    featured: true
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    technologies: ["React", "TypeScript", "Socket.io", "PostgreSQL"],
    demoUrl: "#",
    githubUrl: "#",
    featured: true
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "A responsive weather dashboard with location-based forecasts, interactive maps, and historical weather data visualization.",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop",
    technologies: ["React", "D3.js", "Weather API", "Tailwind CSS"],
    demoUrl: "#",
    githubUrl: "#",
    featured: true
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "A modern, responsive portfolio website with smooth animations, dark mode, and optimized performance.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
    technologies: ["React", "Vite", "Framer Motion", "Tailwind CSS"],
    demoUrl: "#",
    githubUrl: "#",
    featured: true
  }
];

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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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

  // Auto-play slider
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const autoPlayInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProjects.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(autoPlayInterval);
  }, [isAutoPlaying]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        prevSlide();
      } else if (event.key === 'ArrowRight') {
        nextSlide();
      } else if (event.key === ' ') {
        event.preventDefault();
        setIsAutoPlaying(!isAutoPlaying);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProjects.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const currentProject = featuredProjects[currentSlide];

  return (
    <section id="hero" className="relative w-full overflow-hidden pt-16" style={{ minHeight: 'calc(100vh - 64px)' }}>
      {/* Full-screen Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${featuredProjects[0].image})`
        }}
      />
      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-4 sm:px-6 lg:px-8">
        {/* Main Header */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent drop-shadow-lg">
            Full Stack Developer & UI/UX Designer
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto drop-shadow-lg">
            Crafting digital experiences that matter
          </p>
        </div>
      </div>
      {/* Status Info Card */}
      <div className="absolute bottom-6 right-6 w-full max-w-xs bg-black/60 backdrop-blur-md rounded-2xl shadow-xl px-3 py-2 flex flex-col gap-2 items-end font-sans text-sm text-white border border-white/20 text-right">
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
