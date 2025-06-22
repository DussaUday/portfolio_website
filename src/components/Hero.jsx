import { motion } from 'framer-motion';
import React from 'react';

const Hero = () => {
  return (
    <section
      id="hero"
      className="pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 mb-10 md:mb-0"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-800 dark:text-white">
              Build Any <span className="text-blue-600 dark:text-blue-400">Website</span> with Ease
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
              Create stunning websites for any purpose—portfolios, e-commerce, blogs, or business
              sites. Our intuitive tools and customizable templates make professional web design
              accessible to everyone.
            </p>
            <p className="text-lg md:text-xl font-semibold text-blue-900 dark:text-red-500 mb-8 text-center animate-pulse">
              🎉 Launch your professional portfolio today — starting at only ₹799/- 🎉
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#features"
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-center transition-all shadow-lg"
              >
                Discover Features
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#login"
                className="px-8 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg font-medium text-center transition-all"
              >
                Get Started with Free student Portfolio
              </motion.a>
            </div>
          </motion.div>

          <motion.div
  initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ 
    duration: 0.8, 
    delay: 0.2,
    ease: [0.22, 1, 0.36, 1] // Smooth spring-like easing
  }}
  className="md:w-1/2 w-full relative"
>
  <div className="relative max-w-md mx-auto w-full px-4 md:px-0">
    {/* Enhanced animated blobs with 3D perspective */}
    <motion.div
      className="hidden sm:block absolute -top-4 -left-4 w-24 h-24 sm:w-32 sm:h-32 bg-purple-200 dark:bg-purple-900 rounded-xl opacity-50"
      initial={{ scale: 0, rotate: -45 }}
      animate={{ 
        scale: 1,
        rotate: 0,
        x: [0, -10, 5, 0],
        y: [0, -5, 3, 0]
      }}
      transition={{
        duration: 3,
        delay: 0.4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
    />
    
    <motion.div
      className="hidden sm:block absolute top-0 -right-4 w-24 h-24 sm:w-32 sm:h-32 bg-blue-200 dark:bg-blue-900 rounded-xl opacity-50"
      initial={{ scale: 0, rotate: 45 }}
      animate={{ 
        scale: 1,
        rotate: 0,
        x: [0, 10, -5, 0],
        y: [0, 5, -3, 0]
      }}
      transition={{
        duration: 3,
        delay: 0.6,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
    />
    
    <motion.div
      className="hidden sm:block absolute -bottom-4 left-10 w-24 h-24 sm:w-32 sm:h-32 bg-pink-200 dark:bg-pink-900 rounded-xl opacity-50"
      initial={{ scale: 0, rotate: 15 }}
      animate={{ 
        scale: 1,
        rotate: 0,
        x: [0, 5, -3, 0],
        y: [0, -8, 4, 0]
      }}
      transition={{
        duration: 3,
        delay: 0.8,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
    />
    
    {/* Website preview container with enhanced animations */}
    <motion.div 
      className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 w-full"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      {/* Browser chrome with animated dots */}
      <motion.div 
        className="h-6 bg-gray-100 dark:bg-gray-700 flex items-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div 
          className="w-2 h-2 rounded-full bg-red-500 mr-2"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.div 
          className="w-2 h-2 rounded-full bg-yellow-500 mr-2"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
        />
        <motion.div 
          className="w-2 h-2 rounded-full bg-green-500"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
        />
      </motion.div>
      
      <div className="p-4">
        <motion.div 
          className="w-full h-40 sm:h-48 md:h-64 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center overflow-hidden relative"
          initial={{ opacity: 0, scale: 0.9, borderRadius: "50%" }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            borderRadius: "0.5rem"
          }}
          transition={{ 
            delay: 0.4,
            duration: 0.8,
            ease: "backOut"
          }}
        >
          {/* Animated content inside the preview */}
          <motion.span 
            className="text-white text-base sm:text-lg md:text-xl font-bold relative z-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            Website Preview
          </motion.span>
          
          {/* Subtle animated background elements */}
          <motion.div 
            className="absolute -bottom-10 -left-10 w-20 h-20 bg-white opacity-10 rounded-full"
            animate={{
              x: [0, 40, 0],
              y: [0, 30, 0],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute -top-10 -right-10 w-24 h-24 bg-white opacity-10 rounded-full"
            animate={{
              x: [0, -30, 0],
              y: [0, -20, 0],
              scale: [1, 1.4, 1]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  </div>
</motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;