import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Features from './components/Features';
import ColorCombinations from './components/ColorCombinations';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Templates from './components/Templates';
import InstallPrompt from './components/InstallPrompt';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';

function Home() {
  // Initialize dark mode with localStorage persistence
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    const savedMode = localStorage.getItem('devcraft-darkMode');
    return savedMode ? JSON.parse(savedMode) : 
      window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Initialize landing page state with sessionStorage persistence
  const [showLanding, setShowLanding] = useState(() => {
    if (typeof window === 'undefined') return true;
    return !sessionStorage.getItem('devcraft-landing-completed');
  });

  // Toggle dark mode handler
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('devcraft-darkMode', JSON.stringify(newMode));
  };

  // Apply dark mode class and save to localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
  }, [darkMode]);

  // Handle landing page completion
  const handleLandingComplete = () => {
    setShowLanding(false);
    sessionStorage.setItem('devcraft-landing-completed', 'true');
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <AnimatePresence mode="wait">
        {showLanding ? (
          <LandingPage onComplete={handleLandingComplete} darkMode={darkMode} />
        ) : (
          <>
            <InstallPrompt darkMode={darkMode} />
            <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <main className="flex-grow pt-16">
              <Hero darkMode={darkMode} />
              <Intro darkMode={darkMode} />
              <Features darkMode={darkMode} />
              <ColorCombinations darkMode={darkMode} />
              <Templates darkMode={darkMode} />
              <LoginPage darkMode={darkMode} />
              <Contact darkMode={darkMode} />
            </main>
            <Footer darkMode={darkMode} />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Home;