import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const templateThumbnails = {
  template1: 'https://res.cloudinary.com/drc8bufjn/image/upload/v1750351397/message_attachments/um0qhhthgjl57cmusuiz.png',
  template2: 'https://res.cloudinary.com/drc8bufjn/image/upload/v1750351498/message_attachments/o84egysoadrnzd5oiz6e.png',
  template3: 'https://res.cloudinary.com/drc8bufjn/image/upload/v1750351591/message_attachments/ptwfpqd0wirpz5tworrg.png',
  template4: 'https://res.cloudinary.com/drc8bufjn/image/upload/v1750351674/message_attachments/fhwk7hvqum1bmm28fcl2.png',
  template5: 'https://res.cloudinary.com/drc8bufjn/image/upload/v1750351822/message_attachments/xkjalwnrv1ft9b2a5wgb.png',
  template6: 'https://res.cloudinary.com/drc8bufjn/image/upload/v1750351917/message_attachments/bxfz7l1780pvi4nxy0dc.png',
  template7: 'https://res.cloudinary.com/drc8bufjn/image/upload/v1750351981/message_attachments/ifarkhhf5w95xh9xmnks.png',
  template8: 'https://res.cloudinary.com/drc8bufjn/image/upload/v1750352112/message_attachments/iefhymm3ndj1xiiidqjj.png',
  template9: 'https://res.cloudinary.com/drc8bufjn/image/upload/v1750352250/message_attachments/wskpmdgfpybrm432ptdw.png',
  template10: 'https://res.cloudinary.com/drc8bufjn/image/upload/v1750352282/message_attachments/mz9qdv36tneykpjp7l2u.png',
  template11: 'https://res.cloudinary.com/drc8bufjn/image/upload/v1750433562/message_attachments/moi5hpa9ekl53z0rvhft.png',
  template12: 'https://res.cloudinary.com/drc8bufjn/image/upload/v1750433640/message_attachments/tyl4pkxcpwysrfqqsctb.png',
  template13: 'https://res.cloudinary.com/drc8bufjn/image/upload/v1750393960/message_attachments/qqd4mbdvlqflsywooxhy.png',
  template14: 'https://res.cloudinary.com/drc8bufjn/image/upload/v1750433395/message_attachments/sdmebyf6zpi1gccsy5mn.png',
  template15: 'https://res.cloudinary.com/drc8bufjn/image/upload/v1750435784/message_attachments/iuh3vxutdd5vvzoivgcb.png',
  template16: 'https://res.cloudinary.com/drc8bufjn/image/upload/v1750435865/message_attachments/t4vj4vryfnqrvbtmygvr.png',
  template17: 'https://res.cloudinary.com/drc8bufjn/image/upload/v1750435938/message_attachments/xsljkzwyzmdkjlcilsjn.png',
  template18: 'https://res.cloudinary.com/drc8bufjn/image/upload/v1750436018/message_attachments/h5zojjk7jen8vpesfays.png',
  template19: 'https://res.cloudinary.com/drc8bufjn/image/upload/v1750436094/message_attachments/ppb8hxr7qfjh8nw7dwzs.png',
  template20: 'https://res.cloudinary.com/drc8bufjn/image/upload/v1750436193/message_attachments/vtgrkunmththrvo33hyp.png',
  template21: 'https://res.cloudinary.com/drc8bufjn/image/upload/v1750581648/message_attachments/fdkubiyiittwcn71sw4y.png',
  template22: 'https://res.cloudinary.com/drc8bufjn/image/upload/v1750868764/portfolios/mhpd6evbccf7pffgx2nt.png',
  templateEcommerce1: 'https://res.cloudinary.com/drc8bufjn/image/upload/v1755895228/portfolios/h3p9fnuoxlnzr6j9oiid.png',
  templateEcommerce2: 'https://res.cloudinary.com/drc8bufjn/image/upload/v1755895228/portfolios/h3p9fnuoxlnzr6j9oiid.png',
  custom: 'https://res.cloudinary.com/drc8bufjn/image/upload/v1712674716/message_attachments/placeholder-template.jpg',
};

function Dashboard() {
  const [portfolios, setPortfolios] = useState([]);
  const [ecommerceSites, setEcommerceSites] = useState([]);
  const [templates] = useState([
    { id: 'template1', name: 'Basic Portfolio', category: 'Professional' },
    { id: 'template2', name: 'Modern Portfolio', category: 'Minimalist' },
    { id: 'template3', name: 'Classic Portfolio', category: 'Professional' },
    { id: 'template4', name: 'Minimalist Portfolio', category: 'Minimalist' },
    { id: 'template5', name: 'Creative Portfolio', category: 'Creative' },
    { id: 'template6', name: 'Professional Portfolio', category: 'Professional' },
    { id: 'template7', name: 'Dynamic Portfolio', category: 'Creative' },
    { id: 'template8', name: 'Cyberpunk Portfolio', category: 'Creative' },
    { id: 'template9', name: 'Elegant Portfolio', category: 'Minimalist' },
    { id: 'template10', name: 'Brutalist Portfolio', category: 'Creative' },
    { id: 'template11', name: 'Cyberpunk Portfolio', category: 'Creative' },
    { id: 'template12', name: 'Light Minimalist Portfolio', category: 'Minimalist' },
    { id: 'template13', name: 'Inspired Portfolio', category: 'Professional' },
    { id: 'template14', name: 'Minilook Light Theme', category: 'Minimalist' },
    { id: 'template15', name: 'Dark Cyberpunk Theme', category: 'Creative' },
    { id: 'template16', name: 'Minimalist Light Theme', category: 'Minimalist' },
    { id: 'template17', name: 'Retro Vaporwave', category: 'Creative' },
    { id: 'template18', name: 'Minimalist Serenity', category: 'Minimalist' },
    { id: 'template19', name: 'Dark Luxe', category: 'Professional' },
    { id: 'template20', name: 'Professional Dark Theme', category: 'Professional' },
    { id: 'template21', name: 'Glassmorphism Theme', category: 'Creative' },
    { id: 'template22', name: 'Semi Custom Template', category: 'Professional' },
    { id: 'custom', name: 'Custom Your Own Template', category: 'Custom' },
  ]);
  
  const [ecommerceTemplates] = useState([
    { id: 'templateEcommerce1', name: 'Basic E-commerce', category: 'Professional' },
    { id: 'templateEcommerce2', name: 'two E-commerce', category: 'Professional' },
    { id: 'custom', name: 'Custom E-commerce Template', category: 'Custom' },
  ]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [portfolioToDelete, setPortfolioToDelete] = useState(null);
  const [ecommerceToDelete, setEcommerceToDelete] = useState(null);
  const [lockedTemplate, setLockedTemplate] = useState(null);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [activeTab, setActiveTab] = useState('portfolio');
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || 
      (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [templateFilter, setTemplateFilter] = useState('all');
  const navigate = useNavigate();
  
  // Apply dark mode class to body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);
  
  // Fetch portfolios and e-commerce sites
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [portfolioRes, ecommerceRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/portfolio`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_BASE_URL}/api/ecommerce`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setPortfolios(portfolioRes.data);
        setEcommerceSites(ecommerceRes.data || []);
      } catch (error) {
        console.error('Failed to load data:', error.response?.data?.error || error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  
  // Handle portfolio deletion
  const handleDeletePortfolio = async (portfolioId, repoUrl) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/portfolio/${portfolioId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        data: { repoUrl },
      });
      setPortfolios(portfolios.filter(portfolio => portfolio._id !== portfolioId));
      setPortfolioToDelete(null);
    } catch (error) {
      console.error('Failed to delete portfolio:', error.response?.data?.error || error.message);
    }
  };

  // Handle e-commerce deletion
  const handleDeleteEcommerce = async (ecommerceId, repoUrl) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/ecommerce/${ecommerceId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        data: { repoUrl },
      });
      setEcommerceSites(ecommerceSites.filter(site => site._id !== ecommerceId));
      setEcommerceToDelete(null);
    } catch (error) {
      console.error('Failed to delete e-commerce site:', error.response?.data?.error || error.message);
    }
  };

  // Handle template clicks
  const handleTemplateClick = (templateId, type) => {
    const maxItems = type === 'portfolio' ? portfolios.length : ecommerceSites.length;
    if (maxItems >= 2 && templateId !== 'custom') {
      return;
    }
    if (templateId === 'custom') {
      setLockedTemplate('custom');
      setShowComingSoon(true);
      setTimeout(() => setShowComingSoon(false), 2000);
    } else {
      const route = type === 'portfolio' ? `/editor/${templateId}` : `/ecommerce-editor/${templateId}`;
      navigate(route);
    }
  };

  // Filter templates based on search and category
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          template.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = templateFilter === 'all' || template.category === templateFilter;
    return matchesSearch && matchesCategory;
  });
  
  // Filter e-commerce templates
  const filteredEcommerceTemplates = ecommerceTemplates.filter(template => {
    return template.name.toLowerCase().includes(searchQuery.toLowerCase());
  });
  
  // Get unique categories for filter dropdown
  const categories = [...new Set(templates.map(t => t.category))];
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
    >
      {/* Professional Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-10">
              <Link to="/" className="flex items-center space-x-2">
                <div className="bg-indigo-600 w-8 h-8 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-gray-800 dark:text-white">Dev Craftz</span>
              </Link>
              <nav className="hidden md:flex space-x-8">
                <Link to="/" className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">Home</Link>
                <Link to="/dashboard" className="text-indigo-600 font-medium dark:text-indigo-400">Dashboard</Link>
                              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
              
              <div className="relative">
                <button className="flex items-center space-x-2 focus:outline-none">
                  <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                    <span className="font-medium text-indigo-700 dark:text-indigo-300">U</span>
                  </div>
                  <span className="hidden md:inline text-gray-700 dark:text-gray-300">User</span>
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tabs */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex space-x-2 mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('portfolio')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'portfolio'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Portfolio Sites
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('ecommerce')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'ecommerce'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            E-commerce Sites
          </motion.button>
        </motion.div>

        {activeTab === 'portfolio' ? (
          <>
            {/* Portfolio Max Limit Message */}
            {portfolios.length >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-lg flex items-start"
              >
                <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p>You've reached the maximum limit of 2 portfolios. Please delete an existing portfolio to create a new one.</p>
              </motion.div>
            )}

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <motion.h1
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0"
              >
                Portfolio Dashboard
              </motion.h1>
              
              <div className="flex flex-wrap gap-2">
                <div className="relative">
                  <select
                    value={templateFilter}
                    onChange={(e) => setTemplateFilter(e.target.value)}
                    className="pl-4 pr-8 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <svg className="w-5 h-5 text-gray-500 absolute right-2 top-2.5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Portfolio Templates Section */}
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-12"
            >
              <div className="flex items-center justify-between mb-6">
                <motion.h2
                  whileHover={{ scale: 1.02 }}
                  className="text-2xl font-bold text-gray-700 dark:text-gray-200"
                >
                  Choose a Template
                </motion.h2>
                <motion.p
                  whileHover={{ scale: 1.02 }}
                  className="text-sm text-gray-500 dark:text-gray-400"
                >
                  {templates.length} templates available
                </motion.p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence>
                  {filteredTemplates.map((template, index) => (
                    <motion.div
                      key={template.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      whileHover={{ y: -5, scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 ${
                        portfolios.length >= 2 && template.id !== 'custom' ? 'opacity-80 cursor-not-allowed' : ''
                      }`}
                    >
                      <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
                        {template.id === 'custom' ? (
                          <motion.div
                            className="w-full h-full flex items-center justify-center"
                            initial={{ opacity: 0.8 }}
                            whileHover={{ opacity: 1 }}
                          >
                            <motion.div
                              className="w-20 h-20 rounded-full bg-purple-600 flex items-center justify-center"
                              initial={{ scale: 0.9 }}
                              animate={{
                                scale: lockedTemplate === 'custom' && activeTab === 'portfolio' ? [1, 1.1, 1] : 1,
                                rotate: lockedTemplate === 'custom' && activeTab === 'portfolio' ? [0, 10, -10, 0] : 0,
                              }}
                              transition={{ duration: 0.5 }}
                            >
                              <motion.span
                                className="text-white text-4xl font-bold"
                                animate={{
                                  scale: lockedTemplate === 'custom' && activeTab === 'portfolio' ? [1, 1.2, 1] : 1,
                                }}
                              >
                                +
                              </motion.span>
                            </motion.div>
                          </motion.div>
                        ) : (
                          <>
                            <motion.img
                              src={templateThumbnails[template.id]}
                              alt={`${template.name} Preview`}
                              className="w-full h-full object-cover"
                              loading="lazy"
                              initial={{ opacity: 0.8 }}
                              whileHover={{ opacity: 1, scale: 1.05 }}
                              transition={{ duration: 0.3 }}
                            />
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 1 }}
                            />
                          </>
                        )}
                        <motion.h3
                          className="absolute bottom-4 left-4 text-white font-semibold text-lg"
                          initial={{ y: 10 }}
                          whileHover={{ y: 0 }}
                        >
                          {template.name}
                        </motion.h3>
                        <div className="absolute top-3 right-3 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs font-medium px-2 py-1 rounded-full">
                          {template.category}
                        </div>
                        {showComingSoon && template.id === 'custom' && activeTab === 'portfolio' && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute inset-0 flex items-center justify-center bg-black/70"
                          >
                            <span className="text-white font-bold text-lg">Coming Soon!</span>
                          </motion.div>
                        )}
                      </div>
                      <div className="p-4">
                        <motion.button
                          onClick={() => handleTemplateClick(template.id, 'portfolio')}
                          disabled={portfolios.length >= 2 && template.id !== 'custom'}
                          className={`w-full flex items-center justify-center px-4 py-2 rounded-lg transition-colors duration-300 ${
                            template.id === 'custom'
                              ? 'bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white'
                              : portfolios.length >= 2
                              ? 'bg-gray-400 cursor-not-allowed text-white'
                              : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white'
                          }`}
                        >
                          <span>{template.id === 'custom' ? 'Try Custom' : 'Use Template'}</span>
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.section>

            {/* Portfolios Section */}
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <motion.h2
                  whileHover={{ scale: 1.02 }}
                  className="text-2xl font-bold text-gray-700 dark:text-gray-200"
                >
                  Your Portfolios
                </motion.h2>
                <motion.p
                  whileHover={{ scale: 1.02 }}
                  className="text-sm text-gray-500 dark:text-gray-400"
                >
                  {portfolios.length} portfolios created (Max: 2)
                </motion.p>
              </div>

              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full"
                  />
                </div>
              ) : portfolios.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center"
                >
                  <div className="max-w-md mx-auto">
                    <div className="w-16 h-16 mx-auto bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">No portfolios yet</h3>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                      Get started by selecting one of our beautiful templates above.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {portfolios.map((portfolio) => (
                      <motion.div
                        key={portfolio._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ y: -5 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
                      >
                        <div className="relative h-40 overflow-hidden">
                          <img
                            src={templateThumbnails[portfolio.templateId]}
                            alt={`Portfolio ${portfolio.templateId} Preview`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <h3 className="absolute bottom-4 left-4 text-white font-medium">
                            {portfolio.templateId.replace('template', 'Template ')}
                          </h3>
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(portfolio.createdAt).toLocaleDateString()}
                            </span>
                            <a
                              href={portfolio.githubPagesUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 rounded-full"
                            >
                              Live
                            </a>
                          </div>
                          {portfolioToDelete === portfolio._id ? (
                            <div className="flex flex-col space-y-2">
                              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                Delete this portfolio and GitHub repository?
                              </p>
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleDeletePortfolio(portfolio._id, portfolio.githubRepo)}
                                  className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors duration-300"
                                >
                                  Confirm Delete
                                </button>
                                <button
                                  onClick={() => setPortfolioToDelete(null)}
                                  className="flex-1 px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 text-sm font-medium rounded-lg transition-colors duration-300"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex space-x-2">
                              <Link
                                to={`/editor/${portfolio.templateId}`}
                                state={{ portfolio }}
                                className="flex-1 text-center px-3 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-300"
                              >
                                Edit
                              </Link>
                              <button
                                onClick={() => setPortfolioToDelete(portfolio._id)}
                                className="flex-1 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-600 dark:bg-red-900/30 dark:hover:bg-red-900/50 dark:text-red-400 text-sm font-medium rounded-lg transition-colors duration-300"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </motion.section>
          </>
        ) : (
          <>
            {/* E-commerce Max Limit Message */}
            {ecommerceSites.length >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-lg flex items-start"
              >
                <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p>You've reached the maximum limit of 2 e-commerce sites. Please delete an existing site to create a new one.</p>
              </motion.div>
            )}

            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-8"
            >
              E-commerce Dashboard
            </motion.h1>

            {/* E-commerce Templates Section */}
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-12"
            >
              <div className="flex items-center justify-between mb-6">
                <motion.h2
                  whileHover={{ scale: 1.02 }}
                  className="text-2xl font-bold text-gray-700 dark:text-gray-200"
                >
                  Choose an E-commerce Template
                </motion.h2>
                <motion.p
                  whileHover={{ scale: 1.02 }}
                  className="text-sm text-gray-500 dark:text-gray-400"
                >
                  {ecommerceTemplates.length} templates available
                </motion.p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence>
                  {filteredEcommerceTemplates.map((template, index) => (
                    <motion.div
                      key={template.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      whileHover={{ y: -5, scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 ${
                        ecommerceSites.length >= 2 && template.id !== 'custom' ? 'opacity-80 cursor-not-allowed' : ''
                      }`}
                    >
                      <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
                        {template.id === 'custom' ? (
                          <motion.div
                            className="w-full h-full flex items-center justify-center"
                            initial={{ opacity: 0.8 }}
                            whileHover={{ opacity: 1 }}
                          >
                            <motion.div
                              className="w-20 h-20 rounded-full bg-purple-600 flex items-center justify-center"
                              initial={{ scale: 0.9 }}
                              animate={{
                                scale: lockedTemplate === 'custom' && activeTab === 'ecommerce' ? [1, 1.1, 1] : 1,
                                rotate: lockedTemplate === 'custom' && activeTab === 'ecommerce' ? [0, 10, -10, 0] : 0,
                              }}
                              transition={{ duration: 0.5 }}
                            >
                              <motion.span
                                className="text-white text-4xl font-bold"
                                animate={{
                                  scale: lockedTemplate === 'custom' && activeTab === 'ecommerce' ? [1, 1.2, 1] : 1,
                                }}
                              >
                                +
                              </motion.span>
                            </motion.div>
                          </motion.div>
                        ) : (
                          <>
                            <motion.img
                              src={templateThumbnails[template.id]}
                              alt={`${template.name} Preview`}
                              className="w-full h-full object-cover"
                              loading="lazy"
                              initial={{ opacity: 0.8 }}
                              whileHover={{ opacity: 1, scale: 1.05 }}
                              transition={{ duration: 0.3 }}
                            />
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 1 }}
                            />
                          </>
                        )}
                        <motion.h3
                          className="absolute bottom-4 left-4 text-white font-semibold text-lg"
                          initial={{ y: 10 }}
                          whileHover={{ y: 0 }}
                        >
                          {template.name}
                        </motion.h3>
                        <div className="absolute top-3 right-3 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs font-medium px-2 py-1 rounded-full">
                          {template.category}
                        </div>
                        {showComingSoon && template.id === 'custom' && activeTab === 'ecommerce' && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute inset-0 flex items-center justify-center bg-black/70"
                          >
                            <span className="text-white font-bold text-lg">Coming Soon!</span>
                          </motion.div>
                        )}
                      </div>
                      <div className="p-4">
                        <motion.button
                          onClick={() => handleTemplateClick(template.id, 'ecommerce')}
                          disabled={ecommerceSites.length >= 2 && template.id !== 'custom'}
                          className={`w-full flex items-center justify-center px-4 py-2 rounded-lg transition-colors duration-300 ${
                            template.id === 'custom'
                              ? 'bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white'
                              : ecommerceSites.length >= 2
                              ? 'bg-gray-400 cursor-not-allowed text-white'
                              : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white'
                          }`}
                        >
                          <span>{template.id === 'custom' ? 'Try Custom' : 'Use Template'}</span>
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.section>

            {/* E-commerce Sites Section */}
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <motion.h2
                  whileHover={{ scale: 1.02 }}
                  className="text-2xl font-bold text-gray-700 dark:text-gray-200"
                >
                  Your E-commerce Sites
                </motion.h2>
                <motion.p
                  whileHover={{ scale: 1.02 }}
                  className="text-sm text-gray-500 dark:text-gray-400"
                >
                  {ecommerceSites.length} sites created (Max: 2)
                </motion.p>
              </div>

              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full"
                  />
                </div>
              ) : ecommerceSites.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center"
                >
                  <div className="max-w-md mx-auto">
                    <div className="w-16 h-16 mx-auto bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">No e-commerce sites yet</h3>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                      Get started by selecting one of our e-commerce templates above.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {ecommerceSites.map((site) => (
                      <motion.div
                        key={site._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ y: -5 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
                      >
                        <div className="relative h-40 overflow-hidden">
                          <img
                            src={templateThumbnails[site.templateId]}
                            alt={`E-commerce ${site.templateId} Preview`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <h3 className="absolute bottom-4 left-4 text-white font-medium">
                            {site.templateId.replace('templateEcommerce', 'E-commerce Template ')}
                          </h3>
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(site.createdAt).toLocaleDateString()}
                            </span>
                            <a
                              href={site.githubPagesUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 rounded-full"
                            >
                              Live
                            </a>
                          </div>
                          {ecommerceToDelete === site._id ? (
                            <div className="flex flex-col space-y-2">
                              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                Delete this e-commerce site and GitHub repository?
                              </p>
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleDeleteEcommerce(site._id, site.githubRepo)}
                                  className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors duration-300"
                                >
                                  Confirm Delete
                                </button>
                                <button
                                  onClick={() => setEcommerceToDelete(null)}
                                  className="flex-1 px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 text-sm font-medium rounded-lg transition-colors duration-300"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex space-x-2">
                              <Link
                                to={`/ecommerce-editor/${site.templateId}`}
                                state={{ ecommerce: site }}
                                className="flex-1 text-center px-3 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-300"
                              >
                                Edit
                              </Link>
                              <button
                                onClick={() => setEcommerceToDelete(site._id)}
                                className="flex-1 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-600 dark:bg-red-900/30 dark:hover:bg-red-900/50 dark:text-red-400 text-sm font-medium rounded-lg transition-colors duration-300"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </motion.section>
          </>
        )}
      </div>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="bg-indigo-600 w-8 h-8 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-gray-800 dark:text-white">Dev Craftz</span>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">Terms</a>
              <a href="#" className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">Privacy</a>
              <a href="#" className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">Docs</a>
              <a href="#" className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">Support</a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} Dev Craftz. All rights reserved.
          </div>
        </div>
      </footer>
    </motion.div>
  );
}

export default Dashboard;