import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LandingPage = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 6000; // 3 seconds total
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const newProgress = Math.min(elapsed / duration, 1);
      setProgress(newProgress);
      
      if (newProgress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsVisible(false);
        setTimeout(() => onComplete(), 500);
      }
    };
    
    requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animate);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 overflow-hidden"
        >
          {/* Advanced Particle System */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(50)].map((_, i) => {
              const size = Math.random() * 8 + 2;
              const duration = Math.random() * 15 + 10;
              const delay = Math.random() * 5;
              
              return (
                <motion.div
                  key={i}
                  initial={{ 
                    x: Math.random() * 100 - 50,
                    y: Math.random() * 100 - 50,
                    scale: Math.random() * 0.5 + 0.5,
                    opacity: 0
                  }}
                  animate={{
                    x: [null, Math.random() * 200 - 100],
                    y: [null, Math.random() * 200 - 100],
                    rotate: [0, 360],
                    opacity: [0, 0.4, 0]
                  }}
                  transition={{
                    duration: duration,
                    delay: delay,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'linear'
                  }}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    filter: 'blur(1px)'
                  }}
                />
              );
            })}
          </div>

          {/* Glowing Grid Background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNwYXR0ZXJuKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')]"></div>
          </div>

          {/* Main Content Container */}
          <div className="relative z-10 w-full max-w-4xl px-6">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ 
                scale: 1, 
                rotate: 0,
                filter: [
                  'drop-shadow(0 0 10px rgba(124, 58, 237, 0.5))',
                  'drop-shadow(0 0 20px rgba(139, 92, 246, 0.8))',
                  'drop-shadow(0 0 30px rgba(168, 85, 247, 0.6))',
                  'drop-shadow(0 0 10px rgba(124, 58, 237, 0.5))'
                ]
              }}
              transition={{
                scale: { 
                  duration: 1.2, 
                  ease: [0.34, 1.56, 0.64, 1] 
                },
                rotate: { 
                  duration: 1.5, 
                  ease: [0.76, 0, 0.24, 1] 
                },
                filter: { 
                  duration: 4, 
                  repeat: Infinity 
                }
              }}
              className="mx-auto mb-16 flex justify-center"
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -5, 0],
                  y: [0, -10, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut'
                }}
                className="relative"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 blur-xl opacity-60 animate-pulse"></div>
                <motion.div
                  className="flex justify-center items-center w-32 h-32 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 shadow-2xl"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    rotate: { 
                      duration: 20, 
                      repeat: Infinity, 
                      ease: 'linear' 
                    },
                    scale: { 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: 'easeInOut' 
                    }
                  }}
                >
                  <motion.div
                    animate={{
                      rotate: [0, -360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      rotate: { 
                        duration: 15, 
                        repeat: Infinity, 
                        ease: 'linear' 
                      },
                      scale: { 
                        duration: 3, 
                        repeat: Infinity 
                      }
                    }}
                    className="text-white text-6xl font-bold"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-20 w-20"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Title Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.4,
                duration: 1,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="text-center mb-12"
            >
              <motion.h1
                className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                style={{
                  background: 'linear-gradient(90deg, #a78bfa, #c4b5fd, #a78bfa, #8b5cf6, #a78bfa)',
                  backgroundSize: '300% 300%',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  textShadow: '0 2px 10px rgba(139, 92, 246, 0.3)'
                }}
              >
                DevCraftz
              </motion.h1>
              
              <motion.p
                className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ 
                  delay: 0.8,
                  duration: 1.2
                }}
              >
                Where Ideas Become  <span className="font-semibold text-purple-300">Intuitive Web & App </span> Experiences.
              </motion.p>
            </motion.div>

            {/* Progress Indicator */}
            <motion.div 
              className="relative h-2 bg-gray-800 rounded-full overflow-hidden max-w-md mx-auto mb-16"
              initial={{ opacity: 0, scaleX: 0.8 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ 
                delay: 1.2,
                duration: 0.6
              }}
            >
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: progress }}
                transition={{ 
                  duration: 3,
                  ease: [0.65, 0, 0.35, 1]
                }}
                style={{ 
                  originX: 0,
                  boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)'
                }}
              />
              <motion.div
                className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-30"
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />
            </motion.div>

            {/* Loading Indicator */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                delay: 1.6,
                duration: 0.8
              }}
            >
              <motion.div
                className="flex space-x-2 mb-4"
                animate={{
                  transition: {
                    staggerChildren: 0.2
                  }
                }}
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 bg-purple-400 rounded-full"
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.6, 1, 0.6],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 1.4,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />
                ))}
              </motion.div>
              
              <motion.p
                className="text-sm text-gray-400 uppercase tracking-widest"
                animate={{
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                Crafting your experience
              </motion.p>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.div
            className="absolute bottom-8 left-0 right-0 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ 
              delay: 2,
              duration: 1
            }}
          >
            <p className="text-xs text-gray-400 tracking-wider">
              © {new Date().getFullYear()} DevCraftz . All rights reserved.
            </p>
          </motion.div>

          {/* Glow Effects */}
          <div className="absolute -bottom-1/4 -left-1/4 w-full h-full bg-purple-900 rounded-full filter blur-[150px] opacity-20"></div>
          <div className="absolute -top-1/4 -right-1/4 w-full h-full bg-indigo-900 rounded-full filter blur-[150px] opacity-20"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LandingPage;