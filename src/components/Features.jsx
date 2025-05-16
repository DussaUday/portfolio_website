// src/components/Features.jsx
import { motion } from 'framer-motion';

const features = [
  {
    title: "Responsive Design",
    description: "Fully responsive layout using Tailwind CSS. Optimized for desktops, tablets, and mobile devices.",
    icon: "📱"
  },
  {
    title: "Hero Section",
    description: "Eye-catching introduction with name, title, and bio. Optionally includes a profile image or animated background.",
    icon: "🌟"
  },
  {
    title: "About Me",
    description: "Personal summary highlighting background, skills, and passion. Includes downloadable resume button.",
    icon: "👤"
  },
  {
    title: "Skills Showcase",
    description: "Displays technical and soft skills as icons, progress bars, or categorized lists.",
    icon: "💡"
  },
  {
    title: "Projects Portfolio",
    description: "Grid of featured projects with titles, descriptions, tech stack, and links to live previews and code.",
    icon: "🖥️"
  },
  {
    title: "Contact Form",
    description: "Functional form powered by EmailJS. Sends messages directly to your email with validation and feedback.",
    icon: "✉️"
  },
  {
    title: "Navigation Bar",
    description: "Sticky responsive navbar with smooth scrolling. Highlights current section with scroll indicators.",
    icon: "🧭"
  },
  {
    title: "Dark/Light Mode",
    description: "Toggle between themes with preference saved in localStorage for consistent user experience.",
    icon: "🌓"
  },
  {
    title: "Animations",
    description: "Scroll-triggered animations using Framer Motion. Hover effects and smooth transitions throughout.",
    icon: "🎬"
  },
  {
    title: "SEO Optimized",
    description: "Proper HTML structure and meta tags for search visibility. Optimized images and lazy loading.",
    icon: "🔍"
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
          🔥 Powerful Features
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