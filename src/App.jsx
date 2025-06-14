import React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Features from './components/Features';
import ColorCombinations from './components/ColorCombinations';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Templates from './components/Templates';
import InstallPrompt from './components/InstallPrompt';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode');
      if (savedMode !== null) {
        return savedMode === 'true';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark' : ''}`}>
      <InstallPrompt />
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="flex-grow pt-16">
        <AnimatePresence mode="wait">
          <Hero />
          <Intro />
          <Features />
          <ColorCombinations />
          <Templates />
          <Contact />
        </AnimatePresence>
      </main>

      <Footer />
      
    </div>
  );
}

export default App;