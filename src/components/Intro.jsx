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
            About <span className="text-blue-600 dark:text-blue-400">Website Creator</span>
          </h2>
          <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300">
            <p>
              Welcome to Website Creator, your all-in-one platform for building professional websites of any kind. Whether you’re launching a portfolio, an online store, a blog, or a corporate site, our tools empower you to create with ease and style.
            </p>
            <p>
              Our platform offers a drag-and-drop editor, customizable templates, and seamless integrations to bring your vision to life. No coding skills? No problem. Our intuitive interface ensures anyone can design a website that looks great on all devices.
            </p>
            <p>
              We’re committed to versatility and quality, providing templates and features tailored to diverse industries. From SEO tools to e-commerce functionality, Website Creator has everything you need to succeed online.
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
              { number: '200+', label: 'Templates' },
              { number: '24/7', label: 'Support' },
              { number: '10K+', label: 'Happy Users' },
              { number: '98%', label: 'Satisfaction' }
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