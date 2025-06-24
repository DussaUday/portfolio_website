import React from 'react';
import { useState, useEffect } from 'react';
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
import Chatbox from './components/Chatbox';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    const savedMode = localStorage.getItem('devcraft-darkMode');
    return savedMode ? JSON.parse(savedMode) : 
      window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [showLanding, setShowLanding] = useState(() => {
    if (typeof window === 'undefined') return true;
    return !sessionStorage.getItem('devcraft-landing-completed');
  });

  const navigate = useNavigate();

  // Check for saved route on initial load
  useEffect(() => {
    const lastRoute = sessionStorage.getItem('lastRoute');
    if (lastRoute && lastRoute !== '/') {
      navigate(lastRoute);
    }
  }, [navigate]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('devcraft-darkMode', JSON.stringify(newMode));
  };

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
            <Chatbox darkMode={darkMode} />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Home;