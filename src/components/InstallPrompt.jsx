import { useState, useEffect } from 'react';

function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already dismissed the prompt
    const isDismissed = localStorage.getItem('installPromptDismissed');
    if (isDismissed) return;

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the default browser prompt
      e.preventDefault();
      // Store the event for later use
      setDeferredPrompt(e);
      // Show the custom prompt
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Cleanup event listener
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the browser's install prompt
    await deferredPrompt.prompt();
    // Wait for the user's response
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    // Clear the prompt
    setDeferredPrompt(null);
    setIsVisible(false);
  };

  const handleDismissClick = () => {
    // Store dismissal in localStorage to prevent showing the prompt again
    localStorage.setItem('installPromptDismissed', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-dark p-6 rounded-xl shadow-2xl max-w-sm w-full mx-4 animate-slide-up">
        <h2 className="text-2xl font-bold text-dark dark:text-secondary mb-4">
          Install Our App
        </h2>
        <p className="text-dark/80 dark:text-secondary/80 mb-6">
          Add our app to your home screen for a better experience. <br />Click the
          install button below to get started.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleDismissClick}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-dark dark:text-secondary rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
          >
            Dismiss
          </button>
          <button
            onClick={handleInstallClick}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-highlight transition-colors"
          >
            Install
          </button>
        </div>
      </div>
    </div>
  );
}

export default InstallPrompt;