import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if the app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches || 
        window.navigator.standalone ||
        document.referrer.includes('android-app://')) {
      setIsStandalone(true);
      return;
    }

    // Check if prompt was previously dismissed
    const isDismissed = localStorage.getItem('installPromptDismissed');
    if (isDismissed === 'true') return;

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Fallback: If the event doesn't fire within 10 seconds, show anyway
    const timeout = setTimeout(() => {
      if (!isStandalone && !isDismissed) {
        setIsVisible(true);
      }
    }, 10000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      clearTimeout(timeout);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User ${outcome} the install prompt`);
      
      if (outcome === 'accepted') {
        localStorage.setItem('installPromptDismissed', 'true');
      }
    } else {
      // Fallback for browsers that don't support beforeinstallprompt
      alert('To install this app, look for "Add to Home Screen" in your browser\'s menu.');
    }
    setIsVisible(false);
    setDeferredPrompt(null);
  };

  const handleDismissClick = () => {
    localStorage.setItem('installPromptDismissed', 'true');
    setIsVisible(false);
  };

  // Don't show if in standalone mode
  if (isStandalone) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={handleDismissClick}
          />
          
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            transition={{ 
              type: 'spring',
              damping: 25,
              stiffness: 300,
            }}
            className="relative z-10 w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-600 dark:text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Install App
                </h2>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Add this app to your home screen for faster access and offline capabilities.
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={handleInstallClick}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Install
                </button>
                <button
                  onClick={handleDismissClick}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Not Now
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default InstallPrompt;