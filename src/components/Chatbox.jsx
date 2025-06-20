import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const socketRef = useRef();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Connect to Socket.io server
    socketRef.current = io('https://dev-server-tvbl.onrender.com/');

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
    if (!isOpen) {
      // Add welcome message when first opening
      if (messages.length === 0) {
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            name: 'Irah', 
            message: "Hi there! 👋 I'm Irah, your AI assistant. How can I help you today?",
            isBot: true 
          }]);
        }, 500);
      }
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
      const response = await fetch('http://localhost:5000/api/chat/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputValue })
      });
      
      const data = await response.json();
      const botMessage = { 
        name: 'Irah', 
        message: data.answer,
        isBot: true 
      };
      setTimeout(() => {
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 800); // Simulate typing delay
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { 
        name: 'Irah', 
        message: "Sorry! I'm having trouble connecting. Please try again later.",
        isBot: true 
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={`fixed bottom-8 right-8 z-50 transition-all duration-300 ease-in-out ${isOpen ? 'w-80 h-[500px]' : 'w-16 h-16'}`}>
      {/* Chat button */}
      {!isOpen && (
        <button 
          onClick={toggleChatbox}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 flex items-center justify-center shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
          aria-label="Open chat"
        >
          <div className="relative h-8 w-8">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
  </svg>
  <div className="absolute top-0 right-0 h-2 w-2 bg-green-400 rounded-full animate-ping"></div>
</div>
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl shadow-2xl flex flex-col border border-gray-200 dark:border-gray-700 overflow-hidden transform transition-all duration-300 ease-in-out">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 p-4 text-white flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-lg truncate">Irah AI Assistant</h4>
              <p className="text-xs text-blue-100 truncate">
                {isTyping ? 'Typing...' : 'Online'}
              </p>
            </div>
            <button 
              onClick={toggleChatbox}
              className="ml-auto text-white hover:text-blue-200 transition-colors duration-200 p-1 rounded-full hover:bg-white/10"
              aria-label="Close chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-800/50">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`mb-3 flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div 
                  className={`px-4 py-3 rounded-2xl max-w-[85%] relative ${msg.isBot 
                    ? 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-tl-none shadow-sm border border-gray-100 dark:border-gray-600'
                    : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-tr-none shadow'}`}
                >
                  {!msg.isBot && (
                    <span className="absolute -right-1.5 top-0 w-3 h-3 bg-indigo-600 transform rotate-45"></span>
                  )}
                  {msg.isBot && (
                    <span className="absolute -left-1.5 top-0 w-3 h-3 bg-white dark:bg-gray-700 transform rotate-45 border-l border-t border-gray-100 dark:border-gray-600"></span>
                  )}
                  <div className="text-xs font-semibold mb-1 opacity-80">
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
                <div className="px-4 py-3 rounded-2xl bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-tl-none shadow-sm border border-gray-100 dark:border-gray-600 relative">
                  <span className="absolute -left-1.5 top-0 w-3 h-3 bg-white dark:bg-gray-700 transform rotate-45 border-l border-t border-gray-100 dark:border-gray-600"></span>
                  <div className="text-xs font-semibold mb-1 opacity-80">
                    Irah
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="flex space-x-2">
              <div className="flex-1 relative">
                <textarea
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  rows="1"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white resize-none pr-12"
                  style={{ minHeight: '44px', maxHeight: '120px' }}
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className={`absolute right-2 bottom-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${inputValue.trim() 
                    ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'}`}
                  aria-label="Send message"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
              Powered by AI • {new Date().getFullYear()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbox;