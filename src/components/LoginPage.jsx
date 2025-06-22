import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  // Bubble component with theme-aware colors
  const Bubble = ({ size, left, top, delay, duration }) => {
    return (
      <motion.div
        initial={{ y: '100vh', opacity: 0 }}
        animate={{ 
          y: `-${size * 2}px`,
          opacity: [0, 0.4, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: duration,
          delay: delay,
          repeat: Infinity,
          repeatDelay: Math.random() * 5,
          ease: "easeOut"
        }}
        className="
          absolute rounded-full pointer-events-none
          light:bg-blue-300/40 dark:bg-white/20
          light:filter light:blur-[3px] dark:filter dark:blur-[2px]
        "
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${left}%`,
          top: `${top}%`,
        }}
      />
    );
  };

  // Generate random bubbles
  const bubbles = Array.from({ length: 20 }).map((_, i) => {
    const size = Math.random() * 120 + 30; // 30-150px bubbles
    return (
      <Bubble
        key={i}
        size={size}
        left={Math.random() * 100}
        top={Math.random() * 100 + 20} // Start slightly below viewport
        delay={Math.random() * 8}
        duration={Math.random() * 15 + 10} // 10-25 seconds duration
      />
    );
  });

  return (
    <section
      id="login"
      className="
        py-24 min-h-screen flex items-center justify-center 
        overflow-hidden relative
        bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 
        dark:from-blue-900 dark:via-purple-900 dark:to-pink-900
      "
    >
      {/* Background bubbles */}
      <div className="absolute inset-0 overflow-hidden">
        {bubbles}
      </div>

      {/* Content container */}
      <div className="container mx-auto px-6 text-center max-w-lg relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="
            text-3xl md:text-4xl font-bold 
            text-gray-900 dark:text-gray-100 
            mb-8 leading-tight
          "
        >
          Create Your FREE Portfolio in Seconds with iRah
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          className="
            text-lg 
            text-gray-700 dark:text-gray-300 
            mb-10
          "
        >
          Join now to showcase your skills with a stunning portfolio.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        >
          <motion.button
            whileHover={{ 
              scale: 1.1, 
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
              backgroundColor: 'rgba(255,255,255,0.3)'
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogin}
            className="
              px-10 py-4 
              bg-white/20 hover:bg-white/30 
              backdrop-blur-md 
              border border-white/30 
              text-gray-900 dark:text-white 
              text-lg font-semibold 
              rounded-xl 
              transition-all duration-300 
              shadow-xl
            "
          >
            Login Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default LoginPage;