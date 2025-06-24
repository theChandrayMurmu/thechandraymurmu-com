import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // On mount, check system or saved preference
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return next;
    });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-xl font-bold text-gray-900">Chandray Murmu</div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            <button 
              onClick={() => scrollToSection('hero')}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('projects')}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection('blog')}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Blog
            </button>
            <button 
              onClick={() => scrollToSection('support')}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Support
            </button>
            <a
              href="/resume.pdf"
              download
              className="ml-4 px-4 py-2 rounded bg-black text-white font-semibold shadow hover:bg-gray-900 transition-colors border border-black"
            >
              Resume
            </a>
            {/* Dark/Light Mode Toggle */}
            <div className="flex items-center ml-4">
              <Sun className={`mr-1 ${!isDark ? 'text-yellow-500' : 'text-gray-400'}`} size={18} />
              <Switch checked={isDark} onCheckedChange={toggleTheme} />
              <Moon className={`ml-1 ${isDark ? 'text-blue-500' : 'text-gray-400'}`} size={18} />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            <button 
              onClick={() => scrollToSection('hero')}
              className="block w-full text-left text-gray-600 hover:text-gray-900 transition-colors py-2"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('projects')}
              className="block w-full text-left text-gray-600 hover:text-gray-900 transition-colors py-2"
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection('blog')}
              className="block w-full text-left text-gray-600 hover:text-gray-900 transition-colors py-2"
            >
              Blog
            </button>
            <button 
              onClick={() => scrollToSection('support')}
              className="block w-full text-left text-gray-600 hover:text-gray-900 transition-colors py-2"
            >
              Support
            </button>
            <a
              href="/resume.pdf"
              download
              className="block w-full text-left px-4 py-2 rounded bg-black text-white font-semibold shadow hover:bg-gray-900 transition-colors border border-black mt-2"
            >
              Resume
            </a>
            {/* Dark/Light Mode Toggle for Mobile */}
            <div className="flex items-center mt-4">
              <Sun className={`mr-1 ${!isDark ? 'text-yellow-500' : 'text-gray-400'}`} size={18} />
              <Switch checked={isDark} onCheckedChange={toggleTheme} />
              <Moon className={`ml-1 ${isDark ? 'text-blue-500' : 'text-gray-400'}`} size={18} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
