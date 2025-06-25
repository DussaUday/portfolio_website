import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

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
  custom: 'https://res.cloudinary.com/drc8bufjn/image/upload/v1712674716/message_attachments/placeholder-template.jpg',
};

function Dashboard() {
  const [portfolios, setPortfolios] = useState([]);
  const [templates] = useState([
    { id: 'template1', name: 'Basic Portfolio' },
    { id: 'template2', name: 'Modern Portfolio' },
    { id: 'template3', name: 'Classic Portfolio' },
    { id: 'template4', name: 'Minimalist Portfolio' },
    { id: 'template5', name: 'Creative Portfolio' },
    { id: 'template6', name: 'Professional Portfolio' },
    { id: 'template7', name: 'Dynamic Portfolio' },
    { id: 'template8', name: 'Cyberpunk Portfolio' },
    { id: 'template9', name: 'Elegant Portfolio' },
    { id: 'template10', name: 'Brutalist Portfolio' },
    { id: 'template11', name: 'Cyberpunk Portfolio' },
    { id: 'template12', name: 'Light Minimalist Portfolio' },
    { id: 'template13', name: 'Inspired Portfolio' },
    { id: 'template14', name: 'Minilook Light Theme' },
    { id: 'template15', name: 'Dark Cyberpunk Theme' },
    { id: 'template16', name: 'Minimalist Light Theme' },
    { id: 'template17', name: 'Retro Vaporwave' },
    { id: 'template18', name: 'Minimalist Serenity' },
    { id: 'template19', name: 'Dark Luxe' },
    { id: 'template20', name: 'Professional Dark Theme' },
    { id: 'template21', name: 'Glassmorphism Theme' },
    { id: 'custom', name: ' Custom your Own Template' },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [portfolioToDelete, setPortfolioToDelete] = useState(null);
  const [lockedTemplate, setLockedTemplate] = useState(null);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const res = await axios.get('https://dev-server-tvbl.onrender.com/api/portfolio', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setPortfolios(res.data);
      } catch (error) {
        console.error('Failed to load portfolios:', error.response?.data?.error || error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPortfolios();
  }, []);

  const handleDelete = async (portfolioId, repoUrl) => {
    try {
      await axios.delete(`https://dev-server-tvbl.onrender.com/api/portfolio/${portfolioId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        data: { repoUrl },
      });
      setPortfolios(portfolios.filter(portfolio => portfolio._id !== portfolioId));
      setPortfolioToDelete(null);
    } catch (error) {
      console.error('Failed to delete portfolio:', error.response?.data?.error || error.message);
    }
  };

  const handleCustomTemplateClick = () => {
    setLockedTemplate('custom');
    setShowComingSoon(true);
    
    setTimeout(() => {
      setShowComingSoon(false);
    }, 2000);
  };

  const handleTemplateClick = (templateId) => {
    if (portfolios.length >= 2 && templateId !== 'custom') {
      return;
    }
    
    if (templateId === 'custom') {
      handleCustomTemplateClick();
    } else {
      navigate(`/editor/${templateId}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
    >
      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={() => navigate('/')}
                        className="bg-gray-600 text-white px-3 py-2 rounded-lg shadow hover:bg-gray-700 transition-colors duration-200 flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Home
                      </motion.button>

      {/* Max Limit Message at the Top */}
      {portfolios.length >= 2 && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto mb-6 p-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-lg flex items-start"
        >
          <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <p>You've reached the maximum limit of 2 portfolios. Please delete an existing portfolio to create a new one.</p>
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-8"
        >
          Portfolio Dashboard
        </motion.h1>

        {/* Templates Section */}
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
              {templates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{ y: -5, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 ${portfolios.length >= 2 && template.id !== 'custom' ? 'opacity-80 cursor-not-allowed' : ''}`}
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
                            scale: lockedTemplate === 'custom' ? [1, 1.1, 1] : 1,
                            rotate: lockedTemplate === 'custom' ? [0, 10, -10, 0] : 0
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          <motion.span
                            className="text-white text-4xl font-bold"
                            animate={{
                              scale: lockedTemplate === 'custom' ? [1, 1.2, 1] : 1
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
                      className="absolute bottom-4 left-4 text-blue-900 dark:text-blue-300 font-semibold text-lg"
                      initial={{ y: 10 }}
                      whileHover={{ y: 0 }}
                    >
                      {template.name}
                    </motion.h3>
                    {showComingSoon && template.id === 'custom' && (
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
                      onClick={() => handleTemplateClick(template.id)}
                      disabled={portfolios.length >= 2 && template.id !== 'custom'}
                      className={`w-full flex items-center justify-center px-4 py-2 rounded-lg transition-colors duration-300 ${
                        template.id === 'custom' 
                          ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                          : portfolios.length >= 2 
                            ? 'bg-gray-400 cursor-not-allowed text-white' 
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
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
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full"
              />
            </div>
          ) : portfolios.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center"
            >
              <div className="max-w-md mx-auto">
                <svg className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
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
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
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
                              onClick={() => handleDelete(portfolio._id, portfolio.githubRepo)}
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
                            className="flex-1 text-center px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors duration-300"
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
      </div>
    </motion.div>
  );
}

export default Dashboard;