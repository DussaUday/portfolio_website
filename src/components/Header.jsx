import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import React from 'react';

const Header = ({ darkMode, toggleDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', href: '#intro' },
    { name: 'Features', href: '#features' },
    { name: 'Colors', href: '#colors' },
    { name: 'Templates', href: '#templates' },
    { name: 'Contact', href: '#contact' },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-2 shadow-lg' : 'py-4'
      } ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <motion.a
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            href="#"
            className="flex items-center"
          >
            <motion.div
              className={`flex justify-center items-center w-10 h-10 rounded-full bg-gradient-to-r ${
                darkMode ? 'from-blue-600 to-indigo-800' : 'from-cyan-400 to-blue-700'
              } shadow-lg space-x-0.5 text-base font-bold ${
                darkMode ? 'text-white' : 'text-black'
              }`}
              initial={{ scale: 0, rotate: -180 }}
              animate={{
                scale: 1,
                rotate: 0,
                boxShadow: [
                  `0 0 8px ${darkMode ? 'rgba(79, 70, 229, 0.5)' : 'rgba(74, 222, 243, 0.5)'}`,
                  `0 0 12px ${darkMode ? 'rgba(79, 70, 229, 0.8)' : 'rgba(74, 222, 243, 0.8)'}`,
                  `0 0 8px ${darkMode ? 'rgba(79, 70, 229, 0.5)' : 'rgba(74, 222, 243, 0.5)'}`,
                ],
              }}
              transition={{
                scale: { duration: 0.8, ease: 'easeOut' },
                rotate: { duration: 0.8, ease: 'easeOut' },
                boxShadow: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
              }}
              whileHover={{
                scale: [1, 1.05, 1],
                transition: { duration: 0.6, repeat: 2, ease: 'easeInOut' },
              }}
            >
              <motion.span
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 200 }}
                className="text-xs"
              >
                &lt;
              </motion.span>
              <motion.img
                src="https://cdn-icons-png.flaticon.com/512/84/84380.png"
                alt="Pencil Icon"
                className="w-3 h-3"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                whileHover={{
                  rotate: [0, 10, -10, 10, 0],
                  transition: { duration: 0.5, ease: 'easeInOut' },
                }}
              />
              <motion.span
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3, type: 'spring', stiffness: 200 }}
                className="text-xs"
              >
                &gt;
              </motion.span>
            </motion.div>
            <span className="ml-2 text-xl font-bold">
              <span className={`mr-1 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Dev</span>
              <span
                className={`px-1.5 py-0.5 rounded-lg text-xs ${
                  darkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800'
                }`}
              >
                Craft
              </span>
            </span>
          </motion.a>

          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                >
                  <a
                    href={item.href}
                    className={`relative px-1 py-2 font-medium transition-colors ${
                      darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 origin-bottom transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.1 + 0.3, duration: 0.5 }}
              >
                <button
                  onClick={toggleDarkMode}
                  className={`p-2 rounded-full focus:outline-none ${
                    darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'
                  }`}
                  aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {darkMode ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  )}
                </button>
              </motion.li>
            </ul>
          </nav>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full mr-2 ${
                darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            <button
              onClick={toggleMobileMenu}
              className={`p-2 rounded-full ${
                darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`md:hidden overflow-hidden w-full max-w-md mx-auto ${
                darkMode ? 'bg-gray-800' : 'bg-gray-50'
              } rounded-lg mt-2 shadow-lg`}
            >
              <ul className="px-4 py-2">
                {navItems.map((item) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-b border-gray-200 dark:border-gray-700 last:border-0"
                  >
                    <a
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block py-3 px-2 font-medium ${
                        darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                      }`}
                    >
                      {item.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;