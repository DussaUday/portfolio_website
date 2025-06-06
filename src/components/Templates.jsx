import { motion } from 'framer-motion';

const templates = [
  {
    title: "Portfolio",
    description: "Elegant, minimalist layouts to showcase your creative or professional work with style.",
    image: "bg-gradient-to-br from-purple-500 to-blue-600",
    icon: "🎨",
    preview: {
      header: "bg-purple-700 text-white",
      content: "bg-white dark:bg-gray-800 flex flex-col items-center text-center p-3 rounded-t-lg",
      footer: "bg-gray-100 dark:bg-gray-700",
      layout: "flex flex-col",
      sampleContent: (
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-28 h-28 bg-gradient-to-r from-purple-300 to-blue-300 dark:from-purple-600 dark:to-blue-600 rounded-lg shadow-md"
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ duration: 0.3 }}
          />
          <motion.p
            className="text-sm font-semibold text-gray-800 dark:text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            Creative Portfolio
          </motion.p>
        </motion.div>
      )
    }
  },
  {
    title: "E-Commerce",
    description: "Vibrant online stores with product grids, carts, and checkout flows for maximum sales.",
    image: "bg-gradient-to-br from-pink-500 to-red-600",
    icon: "🛍️",
    preview: {
      header: "bg-red-700 text-white",
      content: "bg-white dark:bg-gray-800 grid grid-cols-2 gap-3 p-3 rounded-t-lg",
      footer: "bg-gray-100 dark:bg-gray-700",
      layout: "flex flex-col",
      sampleContent: (
        <motion.div
          className="grid grid-cols-2 gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {[...Array(4)].map((_, idx) => (
            <motion.div
              key={idx}
              className="bg-gradient-to-br from-pink-200 to-red-200 dark:from-pink-600 dark:to-red-600 rounded-md p-2 text-xs text-center text-gray-800 dark:text-white shadow-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              whileHover={{ scale: 1.1, boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)" }}
            >
              Item {idx + 1}
            </motion.div>
          ))}
        </motion.div>
      )
    }
  },
  {
    title: "Blog",
    description: "Clean, readable layouts for sharing stories with flexible post and category designs.",
    image: "bg-gradient-to-br from-green-500 to-teal-600",
    icon: "📝",
    preview: {
      header: "bg-teal-700 text-white",
      content: "bg-white dark:bg-gray-800 flex flex-col gap-2 p-3 rounded-t-lg",
      footer: "bg-gray-100 dark:bg-gray-700",
      layout: "flex flex-col",
      sampleContent: (
        <motion.div
          className="flex flex-col gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="h-5 bg-gradient-to-r from-green-200 to-teal-200 dark:from-green-600 dark:to-teal-600 rounded w-5/6 shadow-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ x: 5 }}
          />
          <motion.div
            className="h-5 bg-gradient-to-r from-green-200 to-teal-200 dark:from-green-600 dark:to-teal-600 rounded w-full shadow-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            whileHover={{ x: 5 }}
          />
          <motion.div
            className="h-5 bg-gradient-to-r from-green-200 to-teal-200 dark:from-green-600 dark:to-teal-600 rounded w-3/4 shadow-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            whileHover={{ x: 5 }}
          />
        </motion.div>
      )
    }
  },
  {
    title: "Business",
    description: "Professional templates with bold headers and client-focused service sections.",
    image: "bg-gradient-to-br from-blue-500 to-indigo-600",
    icon: "💼",
    preview: {
      header: "bg-indigo-700 text-white",
      content: "bg-white dark:bg-gray-800 flex flex-col items-center text-center p-3 rounded-t-lg",
      footer: "bg-gray-100 dark:bg-gray-700",
      layout: "flex flex-col",
      sampleContent: (
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-20 h-20 bg-gradient-to-r from-blue-300 to-indigo-300 dark:from-blue-600 dark:to-indigo-600 rounded-full shadow-md"
            whileHover={{ scale: 1.1, rotate: 4 }}
            transition={{ duration: 0.3 }}
          />
          <motion.p
            className="text-sm font-semibold text-gray-800 dark:text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            Our Services
          </motion.p>
        </motion.div>
      )
    }
  },
  {
    title: "Landing Page",
    description: "High-conversion layouts with vibrant visuals and strong calls-to-action.",
    image: "bg-gradient-to-br from-orange-500 to-yellow-600",
    icon: "🚀",
    preview: {
      header: "bg-yellow-700 text-white",
      content: "bg-white dark:bg-gray-800 text-center p-3 rounded-t-lg",
      footer: "bg-gray-100 dark:bg-gray-700",
      layout: "flex flex-col",
      sampleContent: (
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.p
            className="text-sm font-bold text-gray-800 dark:text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Call to Action
          </motion.p>
          <motion.div
            className="px-4 py-2 bg-blue-500 text-white text-xs rounded-full shadow-md"
            whileHover={{ scale: 1.1, backgroundColor: "#3b82f6" }}
            transition={{ duration: 0.3 }}
          >
            Sign Up Now
          </motion.div>
        </motion.div>
      )
    }
  },
  {
    title: "Non-Profit",
    description: "Mission-driven designs with donation-focused layouts to engage your audience.",
    image: "bg-gradient-to-br from-teal-500 to-cyan-600",
    icon: "❤️",
    preview: {
      header: "bg-cyan-700 text-white",
      content: "bg-white dark:bg-gray-800 text-center p-3 rounded-t-lg",
      footer: "bg-gray-100 dark:bg-gray-700",
      layout: "flex flex-col",
      sampleContent: (
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-20 h-20 bg-gradient-to-r from-teal-300 to-cyan-300 dark:from-teal-600 dark:to-cyan-600 rounded-lg shadow-md"
            whileHover={{ scale: 1.05, rotate: -2 }}
            transition={{ duration: 0.3 }}
          />
          <motion.p
            className="text-sm font-semibold text-gray-800 dark:text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            Support Our Cause
          </motion.p>
        </motion.div>
      )
    }
  },
  {
    title: "Event",
    description: "Dynamic layouts for event promotion with schedules, ticketing, and RSVP sections.",
    image: "bg-gradient-to-br from-red-500 to-orange-600",
    icon: "🎉",
    preview: {
      header: "bg-orange-700 text-white",
      content: "bg-white dark:bg-gray-800 flex flex-col items-center text-center p-3 rounded-t-lg",
      footer: "bg-gray-100 dark:bg-gray-700",
      layout: "flex flex-col",
      sampleContent: (
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-24 h-16 bg-gradient-to-r from-red-300 to-orange-300 dark:from-red-600 dark:to-orange-600 rounded-lg shadow-md"
            whileHover={{ scale: 1.05, rotate: 3 }}
            transition={{ duration: 0.3 }}
          />
          <motion.p
            className="text-sm font-semibold text-gray-800 dark:text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            Event Schedule
          </motion.p>
        </motion.div>
      )
    }
  },
  {
    title: "Restaurant",
    description: "Appetizing designs with menu displays, reservation forms, and gallery sections.",
    image: "bg-gradient-to-br from-amber-500 to-red-600",
    icon: "🍽️",
    preview: {
      header: "bg-red-800 text-white",
      content: "bg-white dark:bg-gray-800 grid grid-cols-2 gap-3 p-3 rounded-t-lg",
      footer: "bg-gray-100 dark:bg-gray-700",
      layout: "flex flex-col",
      sampleContent: (
        <motion.div
          className="grid grid-cols-2 gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {[...Array(4)].map((_, idx) => (
            <motion.div
              key={idx}
              className="bg-gradient-to-br from-amber-200 to-red-200 dark:from-amber-600 dark:to-red-600 rounded-md p-2 text-xs text-center text-gray-800 dark:text-white shadow-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              whileHover={{ scale: 1.1, boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)" }}
            >
              Dish {idx + 1}
            </motion.div>
          ))}
        </motion.div>
      )
    }
  },
  {
    title: "Education",
    description: "Engaging layouts for courses, learning platforms, and academic institutions.",
    image: "bg-gradient-to-br from-blue-600 to-green-500",
    icon: "📚",
    preview: {
      header: "bg-green-700 text-white",
      content: "bg-white dark:bg-gray-800 flex flex-col gap-2 p-3 rounded-t-lg",
      footer: "bg-gray-100 dark:bg-gray-700",
      layout: "flex flex-col",
      sampleContent: (
        <motion.div
          className="flex flex-col gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="h-5 bg-gradient-to-r from-blue-300 to-green-300 dark:from-blue-600 dark:to-green-600 rounded w-5/6 shadow-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ x: 5 }}
          />
          <motion.div
            className="h-5 bg-gradient-to-r from-blue-300 to-green-300 dark:from-blue-600 dark:to-green-600 rounded w-full shadow-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            whileHover={{ x: 5 }}
          />
          <motion.p
            className="text-sm font-semibold text-gray-800 dark:text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            Course List
          </motion.p>
        </motion.div>
      )
    }
  }
];

const Templates = () => {
  return (
    <section id="templates" className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white"
        >
          🖼️ Stunning Template Styles & Layouts
                        Sample View.
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.2)" }}
              className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-600"
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-600 mb-4"
              >
                <motion.div
                  className={`h-8 ${template.preview.header} flex items-center px-3`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-1.5"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1.5"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </motion.div>
                <motion.div
                  className={`h-40 ${template.preview.content} ${template.preview.layout}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  {template.preview.sampleContent}
                </motion.div>
                <motion.div
                  className={`h-10 ${template.preview.footer}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                />
              </motion.div>
              <div className={`h-16 ${template.image} rounded-lg mb-4 flex items-center justify-center text-4xl shadow-inner`}>
                {template.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{template.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{template.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="#contact"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-xl"
          >
            Explore All Templates
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Templates;