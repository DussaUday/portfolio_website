// src/components/Intro.jsx
import { motion } from 'framer-motion';

const Intro = () => {
  return (
    <section id="intro" className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 dark:text-white">
            About <span className="text-blue-600 dark:text-blue-400">Portfolio Creator</span>
          </h2>
          <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300">
            <p>
              Welcome to Portfolio Creator, your ultimate solution for crafting stunning, professional portfolios that showcase your skills and achievements. Whether you're a designer, developer, or creative professional, we help you stand out with customizable templates, vibrant color schemes, and user-friendly tools.
            </p>
            <p>
              Our platform is designed to make portfolio creation effortless, allowing you to focus on what matters most - your work. With responsive designs that look great on any device and intuitive editors that require no coding knowledge, you can have a professional portfolio ready in minutes.
            </p>
            <p>
              What sets us apart is our attention to detail and commitment to quality. We provide not just templates, but complete design systems that ensure your portfolio looks cohesive and professional across all sections.
            </p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { number: '100+', label: 'Color Schemes' },
              { number: '24/7', label: 'Support' },
              { number: '1K+', label: 'Happy Users' },
              { number: '99%', label: 'Satisfaction' }
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{item.number}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Intro;