import React from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    title: "Drag-and-Drop Editor",
    description: "Build websites effortlessly with our intuitive drag-and-drop interface, perfect for beginners and pros alike.",
    icon: "🖱️"
  },
  {
    title: "Customizable colourfull Templates",
    description: "Choose from hundreds of templates colours for portfolios, e-commerce, blogs, and more, all fully customizable.",
    icon: "🎨"
  },
  {
    title: "Responsive Design",
    description: "Create websites that look stunning on any device, with automatic optimization for desktops, tablets, and mobiles.",
    icon: "📱"
  },
  {
    title: "E-Commerce Integration",
    description: "Set up online stores with payment gateways, product pages, and inventory management in minutes.",
    icon: "🛒"
  },
  {
    title: "SEO Tools",
    description: "Boost your site’s visibility with built-in SEO tools, meta tags, and analytics integration.",
    icon: "🔍"
  },
  {
    title: "Blogging Platform",
    description: "Create and manage blogs with rich text editors, categories, and social sharing features.",
    icon: "📝"
  },
  {
    title: "Contact Forms",
    description: "Add dynamic contact forms with validation and EmailJS integration for direct communication.",
    icon: "✉️"
  },
  {
    title: "Dark/Light Mode",
    description: "Offer users a choice of themes, with preferences saved for a personalized experience.",
    icon: "🌓"
  },
  {
    title: "Animations & Effects",
    description: "Enhance your site with scroll-triggered animations and hover effects using Framer Motion.",
    icon: "🎬"
  },
  {
    title: "Third-Party Integrations",
    description: "Connect with tools like Google Analytics, Mailchimp, and social media platforms seamlessly.",
    icon: "🔗"
  }
];

const Features = () => {
  return (
    <section id="features" className="py-16 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-12 text-center text-blue-600 dark:text-blue-400"
        >
          🚀 Versatile Features
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-600"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;