import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const socketRef = useRef();
  const messagesEndRef = useRef(null);
  const chatButtonRef = useRef(null);

  // Check for system dark mode preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);
    
    const handler = (e) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handler);
    
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    // Connect to Socket.io server
    socketRef.current = io('https://dev-server-tvbl.onrender.com');

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleChatbox = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          name: 'Irah', 
          message: "Hi there! 👋 I'm Irah, your AI assistant. How can I help you today?",
          isBot: true 
        }]);
      }, 500);
    }
  };

  const handleSendMessage = async () => {
  if (!inputValue.trim()) return;

  const userMessage = { 
    name: 'You', 
    message: inputValue,
    isBot: false 
  };
  setMessages(prev => [...prev, userMessage]);
  setInputValue('');
  setIsTyping(true);

  try {
    const response = await fetch('https://dev-server-tvbl.onrender.com/api/chat/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: inputValue })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.answer) {
      throw new Error('No answer received from server');
    }

    const botMessage = { 
      name: 'Irah', 
      message: data.answer,
      isBot: true 
    };
    setMessages(prev => [...prev, botMessage]);
  } 
  catch (error) {
    console.error('Error:', error);
    const errorMessage = { 
      name: 'Irah', 
      message: "Sorry! I'm having trouble connecting. Please try again later.",
      isBot: true 
    };
    setMessages(prev => [...prev, errorMessage]);
  } finally {
    setIsTyping(false);
  }
};

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${isOpen ? 'w-full md:w-96 max-w-[calc(100%-2rem)]' : 'w-16 h-16'}`}>
      {/* Chat button with enhanced tire, road, and air animations */}
      {!isOpen ? (
        <button 
          ref={chatButtonRef}
          onClick={toggleChatbox}
          className={`w-16 h-16 rounded-full flex items-center justify-center shadow-xl transition-all duration-500 ease-in-out overflow-hidden relative
            ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gradient-to-br from-blue-500 to-indigo-600'}`}
          aria-label="Open chat"
        >
          {/* Road animation (moving stripes) */}
          <div className="absolute bottom-0 left-0 right-0 h-3 overflow-hidden">
            <div className={`absolute top-0 left-0 h-full w-full flex ${isDarkMode ? 'opacity-30' : 'opacity-50'}`}>
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i}
                  className={`h-full w-4 ${isDarkMode ? 'bg-indigo-400' : 'bg-white'} mr-4 animate-moveRoad`}
                  style={{ animationDelay: `${i * 100}ms` }}
                />
              ))}
            </div>
          </div>
          
          {/* Air/wind animation (particles) */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`absolute rounded-full ${isDarkMode ? 'bg-indigo-300/30' : 'bg-white/30'}`}
                style={{
                  width: `${Math.random() * 4 + 2}px`,
                  height: `${Math.random() * 4 + 2}px`,
                  top: `${Math.random() * 60}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float ${Math.random() * 3 + 2}s linear infinite`,
                  animationDelay: `${Math.random() * 2}s`,
                  opacity: Math.random() * 0.7 + 0.3
                }}
              />
            ))}
          </div>

          {/* Tire icon with rotation and tread pattern */}
          <div className="relative h-10 w-10 transition-transform duration-500 hover:rotate-180">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              className={`h-full w-full ${isDarkMode ? 'text-indigo-400' : 'text-white'}`}
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="8" />
              <circle cx="12" cy="12" r="3" />
              <line x1="12" y1="4" x2="12" y2="6" />
              <line x1="12" y1="18" x2="12" y2="20" />
              <line x1="4" y1="12" x2="6" y2="12" />
              <line x1="18" y1="12" x2="20" y2="12" />
              <line x1="5.64" y1="5.64" x2="7.05" y2="7.05" />
              <line x1="16.95" y1="16.95" x2="18.36" y2="18.36" />
              <line x1="5.64" y1="18.36" x2="7.05" y2="16.95" />
              <line x1="16.95" y1="7.05" x2="18.36" y2="5.64" />
            </svg>
            <div className={`absolute top-0 right-0 h-2 w-2 rounded-full animate-pulse ${isDarkMode ? 'bg-green-400' : 'bg-white'}`}></div>
          </div>
        </button>
      ) : (
        <div 
          className={`w-full h-[500px] max-h-[80vh] bg-white dark:bg-gray-900 rounded-xl shadow-2xl flex flex-col border transition-all duration-500 ease-in-out
            ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
        >
          {/* Header */}
          <div className={`p-4 flex items-center space-x-3 ${isDarkMode ? 'bg-gray-800 border-b border-gray-700' : 'bg-gradient-to-r from-blue-500 to-indigo-600'}`}>
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-transform duration-500 hover:rotate-180
                ${isDarkMode ? 'bg-gray-700/50' : 'bg-white/20'}`}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className={`font-semibold text-lg truncate ${isDarkMode ? 'text-white' : 'text-white'}`}>
                Irah AI Assistant
              </h4>
              <p className={`text-xs truncate ${isDarkMode ? 'text-gray-300' : 'text-blue-100'}`}>
                {isTyping ? 'Typing...' : 'Online'}
              </p>
            </div>
            <button 
              onClick={toggleChatbox}
              className={`ml-auto p-1 rounded-full transition-colors duration-200 ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-white hover:bg-white/10'}`}
              aria-label="Close chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className={`flex-1 p-4 overflow-y-auto ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`mb-3 flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div 
                  className={`px-4 py-3 rounded-2xl max-w-[85%] relative transition-all duration-200 ${msg.isBot 
                    ? `${isDarkMode ? 'bg-gray-700 text-gray-100 border-gray-600' : 'bg-white text-gray-800 border-gray-100'} rounded-tl-none shadow-sm border`
                    : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-tr-none shadow'}`}
                >
                  {!msg.isBot && (
                    <span className="absolute -right-1.5 top-0 w-3 h-3 bg-indigo-600 transform rotate-45"></span>
                  )}
                  {msg.isBot && (
                    <span className={`absolute -left-1.5 top-0 w-3 h-3 transform rotate-45 border-l border-t 
                      ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-100'}`}
                    ></span>
                  )}
                  <div className={`text-xs font-semibold mb-1 ${msg.isBot ? (isDarkMode ? 'text-indigo-300' : 'text-indigo-600') : 'text-blue-100'}`}>
                    {msg.name}
                  </div>
                  <div className="whitespace-pre-wrap">
                    {msg.message}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="mb-3 flex justify-start">
                <div className={`px-4 py-3 rounded-2xl rounded-tl-none shadow-sm border relative
                  ${isDarkMode ? 'bg-gray-700 text-gray-100 border-gray-600' : 'bg-white text-gray-800 border-gray-100'}`}
                >
                  <span className={`absolute -left-1.5 top-0 w-3 h-3 transform rotate-45 border-l border-t 
                    ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-100'}`}
                  ></span>
                  <div className={`text-xs font-semibold mb-1 ${isDarkMode ? 'text-indigo-300' : 'text-indigo-600'}`}>
                    Irah
                  </div>
                  <div className="flex space-x-1">
                    <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-gray-400' : 'bg-gray-500'} animate-bounce`} style={{ animationDelay: '0ms' }}></div>
                    <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-gray-400' : 'bg-gray-500'} animate-bounce`} style={{ animationDelay: '150ms' }}></div>
                    <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-gray-400' : 'bg-gray-500'} animate-bounce`} style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className={`p-3 border-t ${isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'}`}>
            <div className="flex space-x-2">
              <div className="flex-1 relative">
                <textarea
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyPress}
                  rows="1"
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 resize-none pr-12 transition-all
                    ${isDarkMode ? 'border-gray-600 bg-gray-800 text-white focus:ring-indigo-500' : 'border-gray-300 bg-white text-gray-800 focus:ring-blue-500'}`}
                  style={{ minHeight: '44px', maxHeight: '120px' }}
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className={`absolute right-2 bottom-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200
                    ${inputValue.trim() 
                      ? `${isDarkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-blue-500 hover:bg-blue-600'} text-white` 
                      : `${isDarkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-200 text-gray-400'} cursor-not-allowed`}`}
                  aria-label="Send message"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            <p className={`text-xs mt-2 text-center ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              Powered by DevCraftz • {new Date().getFullYear()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbox;