import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function InstallPrompt({ darkMode }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    // Check if the app is already installed
    const isStandaloneCheck = window.matchMedia('(display-mode: standalone)').matches || 
                            window.navigator.standalone ||
                            document.referrer.includes('android-app://');
    setIsStandalone(isStandaloneCheck);

    // Check for iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSCheck = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIOSCheck);
    setIsSafari(/safari/.test(userAgent) && !/chrome/.test(userAgent) && isIOSCheck);

    // Check if prompt was previously dismissed
    const isDismissed = localStorage.getItem('installPromptDismissed');
    if (isDismissed === 'true') return;

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // For iOS, we need to show custom instructions
    if (isIOSCheck && !isStandaloneCheck) {
      // iOS doesn't support beforeinstallprompt, show custom instructions after a delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User ${outcome} the install prompt`);
        
        if (outcome === 'accepted') {
          localStorage.setItem('installPromptDismissed', 'true');
          setIsVisible(false);
        }
      } catch (err) {
        console.error('Error during install prompt:', err);
      }
    } else if (isIOS) {
      // iOS doesn't support beforeinstallprompt, show custom instructions
      alert(
        'To install this app:\n1. Tap the Share button\n2. Select "Add to Home Screen"\n3. Tap "Add" in the top right corner'
      );
      localStorage.setItem('installPromptDismissed', 'true');
      setIsVisible(false);
    } else {
      // Fallback for other browsers
      alert('To install this app, look for "Install" or "Add to Home Screen" in your browser\'s menu.');
      localStorage.setItem('installPromptDismissed', 'true');
      setIsVisible(false);
    }
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
            className={`relative z-10 w-full max-w-md rounded-xl shadow-2xl overflow-hidden ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-3 rounded-lg ${
                  darkMode ? 'bg-blue-900' : 'bg-blue-100'
                }`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 ${
                      darkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}
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
                <h2 className={`text-xl font-bold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Install App
                </h2>
              </div>
              
              <p className={`mb-6 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {isIOS ? (
                  <>
                    Add this app to your home screen for faster access:
                    <ol className="list-decimal pl-5 mt-2 space-y-1">
                      <li>Tap the Share button <i className="fas fa-share-square ml-1"></i></li>
                      <li>Select "Add to Home Screen"</li>
                      <li>Tap "Add" in the top right corner</li>
                    </ol>
                  </>
                ) : (
                  "Add this app to your home screen for faster access and offline capabilities."
                )}
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={handleInstallClick}
                  className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                    darkMode 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {isIOS ? "Show Instructions" : "Install"}
                </button>
                <button
                  onClick={handleDismissClick}
                  className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                    darkMode
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                  } border`}
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