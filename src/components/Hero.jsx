import { motion } from 'framer-motion';
import React from 'react';

const Hero = () => {
  return (
    <section
      id="hero"
      className="pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900"
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
                href="#contact"
                className="px-8 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg font-medium text-center transition-all"
              >
                Start Building
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-1/2 w-full"
          >
            <div className="relative max-w-md mx-auto">
              <div className="absolute -top-4 -left-4 w-32 h-32 sm:w-48 sm:h-48 bg-purple-200 dark:bg-purple-900 rounded-xl opacity-50 animate-blob"></div>
              <div className="absolute top-0 -right-4 w-32 h-32 sm:w-48 sm:h-48 bg-blue-200 dark:bg-blue-900 rounded-xl opacity-50 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-4 left-10 w-32 h-32 sm:w-48 sm:h-48 bg-pink-200 dark:bg-pink-900 rounded-xl opacity-50 animate-blob animation-delay-4000"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="h-6 bg-gray-100 dark:bg-gray-700 flex items-center px-4">
                  <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <div className="p-4">
                  <div className="w-full h-40 sm:h-48 md:h-64 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-base sm:text-lg md:text-xl font-bold">
                      Website Preview
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;