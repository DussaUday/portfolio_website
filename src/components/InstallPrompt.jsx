import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');

  useEffect(() => {
    // Debug logging
    console.log('Checking install prompt conditions');
    setDebugInfo('Checking install conditions...');

    // Check if the app is already installed
    const isStandaloneCheck = (
      window.matchMedia('(display-mode: standalone)').matches || 
      window.navigator.standalone ||
      document.referrer.includes('android-app://')
    );
    
    setIsStandalone(isStandaloneCheck);
    
    if (isStandaloneCheck) {
      console.log('App is already installed');
      setDebugInfo('App is already installed (standalone mode detected)');
      return;
    }

    // Check if prompt was previously dismissed
    const isDismissed = localStorage.getItem('installPromptDismissed') === 'true';
    if (isDismissed) {
      console.log('Install prompt was previously dismissed');
      setDebugInfo('Install prompt was previously dismissed');
      return;
    }

    const handleBeforeInstallPrompt = (e) => {
      console.log('beforeinstallprompt event fired', e);
      setDebugInfo('beforeinstallprompt event received');
      
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Fallback: If the event doesn't fire within 10 seconds, show anyway
    const timeout = setTimeout(() => {
      if (!isStandaloneCheck && !isDismissed) {
        console.log('Fallback: Showing install prompt after timeout');
        setDebugInfo('Showing fallback prompt (event not received)');
        setIsVisible(true);
      }
    }, 10000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      clearTimeout(timeout);
    };
  }, []);

  const handleInstallClick = async () => {
    try {
      if (deferredPrompt) {
        console.log('Triggering install prompt');
        setDebugInfo('Triggering install prompt...');
        
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        
        console.log(`User ${outcome} the install prompt`);
        setDebugInfo(`User ${outcome} the install prompt`);
        
        if (outcome === 'accepted') {
          localStorage.setItem('installPromptDismissed', 'true');
        }
      } else {
        console.log('No deferred prompt available');
        setDebugInfo('No install prompt available - showing fallback');
        
        // Enhanced fallback instructions
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const isAndroid = /Android/.test(navigator.userAgent);
        
        let instructions = 'To install this app:';
        
        if (isIOS) {
          instructions += '\n1. Tap the Share button\n2. Select "Add to Home Screen"';
        } else if (isAndroid) {
          instructions += '\n1. Open browser menu\n2. Tap "Install App" or "Add to Home Screen"';
        } else {
          instructions += '\nLook for "Install" or "Add to Home Screen" in your browser\'s menu';
        }
        
        alert(instructions);
      }
    } catch (error) {
      console.error('Install error:', error);
      setDebugInfo(`Install error: ${error.message}`);
      alert('Installation failed. Please try again or check browser support.');
    } finally {
      setIsVisible(false);
      setDeferredPrompt(null);
    }
  };

  const handleDismissClick = () => {
    localStorage.setItem('installPromptDismissed', 'true');
    setIsVisible(false);
    setDebugInfo('User dismissed the install prompt');
  };

  // Don't show if in standalone mode
  if (isStandalone) return null;

  return (
    <>
      {/* Debug info - remove in production */}
      <div style={{ position: 'fixed', bottom: 10, left: 10, background: 'white', padding: 10, zIndex: 10000 }}>
        <pre>{debugInfo}</pre>
      </div>

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
    </>
  );
}

export default InstallPrompt;