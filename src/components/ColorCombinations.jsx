// src/components/ColorCombinations.jsx
import { motion } from 'framer-motion';
import { useState } from 'react';

const ColorCombinations = () => {
  const [showAll, setShowAll] = useState(false);
  
  const colorCombos = [
    { id: 1, colors: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#292F36'] },
    { id: 2, colors: ['#FFD93D', '#6A0573', '#1A535C', '#FFFD98'] },
    { id: 3, colors: ['#1A535C', '#FFCB77', '#FE5F55', '#F7F7FF'] },
    { id: 4, colors: ['#FF9F1C', '#2EC4B6', '#E71D36', '#011627'] },
    { id: 5, colors: ['#9B59B6', '#E74C3C', '#3498DB', '#2ECC71'] },
    { id: 6, colors: ['#3498DB', '#F1C40F', '#E74C3C', '#ECF0F1'] },
    { id: 7, colors: ['#E67E22', '#16A085', '#D35400', '#F39C12'] },
    { id: 8, colors: ['#8E44AD', '#C0392B', '#2980B9', '#27AE60'] },
    { id: 9, colors: ['#2980B9', '#27AE60', '#F39C12', '#BDC3C7'] },
    { id: 10, colors: ['#D35400', '#1ABC9C', '#34495E', '#E74C3C'] },
    { id: 11, colors: ['#2C3E50', '#E74C3C', '#ECF0F1', '#3498DB'] },
    { id: 12, colors: ['#16A085', '#F39C12', '#D35400', '#8E44AD'] },
    { id: 13, colors: ['#27AE60', '#2980B9', '#F1C40F', '#E67E22'] },
    { id: 14, colors: ['#1ABC9C', '#2C3E50', '#E74C3C', '#3498DB'] },
    { id: 15, colors: ['#E74C3C', '#ECF0F1', '#3498DB', '#2C3E50'] },
    { id: 16, colors: ['#F39C12', '#16A085', '#D35400', '#8E44AD'] },
    { id: 17, colors: ['#3498DB', '#E74C3C', '#2ECC71', '#F1C40F'] },
    { id: 18, colors: ['#9B59B6', '#E74C3C', '#1ABC9C', '#34495E'] },
    { id: 19, colors: ['#FF6B6B', '#4ECDC4', '#292F36', '#F7FFF7'] },
    { id: 20, colors: ['#2EC4B6', '#E71D36', '#011627', '#FF9F1C'] },
    { id: 21, colors: ['#6A0573', '#1A535C', '#FFFD98', '#FFD93D'] },
    { id: 22, colors: ['#FFCB77', '#FE5F55', '#F7F7FF', '#1A535C'] },
    { id: 23, colors: ['#011627', '#FF9F1C', '#2EC4B6', '#E71D36'] },
    { id: 24, colors: ['#292F36', '#FFE66D', '#4ECDC4', '#FF6B6B'] },
    { id: 25, colors: ['#F7FFF7', '#292F36', '#4ECDC4', '#FF6B6B'] },
    { id: 26, colors: ['#FE5F55', '#F7F7FF', '#1A535C', '#FFCB77'] },
    { id: 27, colors: ['#FFFD98', '#6A0573', '#1A535C', '#FFD93D'] },
    { id: 28, colors: ['#E71D36', '#011627', '#FF9F1C', '#2EC4B6'] },
    { id: 29, colors: ['#4ECDC4', '#FF6B6B', '#FFE66D', '#292F36'] },
    { id: 30, colors: ['#1A535C', '#FFD93D', '#6A0573', '#FFFD98'] },
    { id: 31, colors: ['#FFCB77', '#1A535C', '#FE5F55', '#F7F7FF'] },
    { id: 32, colors: ['#2EC4B6', '#FF9F1C', '#E71D36', '#011627'] },
    { id: 33, colors: ['#9B59B6', '#3498DB', '#E74C3C', '#2ECC71'] },
    { id: 34, colors: ['#F1C40F', '#3498DB', '#E74C3C', '#ECF0F1'] },
    { id: 35, colors: ['#16A085', '#E67E22', '#D35400', '#F39C12'] },
    { id: 36, colors: ['#C0392B', '#8E44AD', '#2980B9', '#27AE60'] },
    { id: 37, colors: ['#27AE60', '#2980B9', '#F39C12', '#BDC3C7'] },
    { id: 38, colors: ['#1ABC9C', '#D35400', '#34495E', '#E74C3C'] },
    { id: 39, colors: ['#E74C3C', '#2C3E50', '#ECF0F1', '#3498DB'] },
    { id: 40, colors: ['#F39C12', '#8E44AD', '#16A085', '#D35400'] },
    { id: 41, colors: ['#F1C40F', '#E67E22', '#27AE60', '#2980B9'] },
    { id: 42, colors: ['#2C3E50', '#3498DB', '#1ABC9C', '#E74C3C'] },
    { id: 43, colors: ['#ECF0F1', '#E74C3C', '#3498DB', '#2C3E50'] },
    { id: 44, colors: ['#D35400', '#F39C12', '#8E44AD', '#16A085'] },
    { id: 45, colors: ['#E74C3C', '#2ECC71', '#3498DB', '#F1C40F'] },
    { id: 46, colors: ['#1ABC9C', '#9B59B6', '#34495E', '#E74C3C'] },
    { id: 47, colors: ['#4ECDC4', '#F7FFF7', '#FF6B6B', '#292F36'] },
    { id: 48, colors: ['#E71D36', '#2EC4B6', '#011627', '#FF9F1C'] },
    { id: 49, colors: ['#1A535C', '#FFD93D', '#FFFD98', '#6A0573'] },
    { id: 50, colors: ['#FE5F55', '#FFCB77', '#F7F7FF', '#1A535C'] },
    { id: 51, colors: ['#011627', '#E71D36', '#FF9F1C', '#2EC4B6'] },
    { id: 52, colors: ['#FFE66D', '#292F36', '#4ECDC4', '#FF6B6B'] },
    { id: 53, colors: ['#1A535C', '#FFCB77', '#F7F7FF', '#FE5F55'] },
    { id: 54, colors: ['#6A0573', '#FFFD98', '#FFD93D', '#1A535C'] },
    { id: 55, colors: ['#FF9F1C', '#E71D36', '#2EC4B6', '#011627'] },
    { id: 56, colors: ['#FF6B6B', '#FFE66D', '#4ECDC4', '#292F36'] },
    { id: 57, colors: ['#FFD93D', '#1A535C', '#6A0573', '#FFFD98'] },
    { id: 58, colors: ['#FFCB77', '#FE5F55', '#1A535C', '#F7F7FF'] },
    { id: 59, colors: ['#2EC4B6', '#E71D36', '#FF9F1C', '#011627'] },
    { id: 60, colors: ['#9B59B6', '#2ECC71', '#E74C3C', '#3498DB'] },
    { id: 61, colors: ['#3498DB', '#ECF0F1', '#F1C40F', '#E74C3C'] },
    { id: 62, colors: ['#E67E22', '#F39C12', '#16A085', '#D35400'] },
    { id: 63, colors: ['#8E44AD', '#27AE60', '#C0392B', '#2980B9'] },
    { id: 64, colors: ['#2980B9', '#BDC3C7', '#27AE60', '#F39C12'] },
    { id: 65, colors: ['#D35400', '#E74C3C', '#1ABC9C', '#34495E'] },
    { id: 66, colors: ['#2C3E50', '#3498DB', '#E74C3C', '#ECF0F1'] },
    { id: 67, colors: ['#16A085', '#D35400', '#F39C12', '#8E44AD'] },
    { id: 68, colors: ['#27AE60', '#F1C40F', '#2980B9', '#E67E22'] },
    { id: 69, colors: ['#1ABC9C', '#E74C3C', '#2C3E50', '#3498DB'] },
    { id: 70, colors: ['#E74C3C', '#3498DB', '#ECF0F1', '#2C3E50'] },
    { id: 71, colors: ['#F39C12', '#8E44AD', '#D35400', '#16A085'] },
    { id: 72, colors: ['#3498DB', '#F1C40F', '#E74C3C', '#2ECC71'] },
    { id: 73, colors: ['#34495E', '#9B59B6', '#E74C3C', '#1ABC9C'] },
    { id: 74, colors: ['#FF6B6B', '#292F36', '#4ECDC4', '#F7FFF7'] },
    { id: 75, colors: ['#E71D36', '#FF9F1C', '#2EC4B6', '#011627'] },
    { id: 76, colors: ['#1A535C', '#FFFD98', '#6A0573', '#FFD93D'] },
    { id: 77, colors: ['#FFCB77', '#F7F7FF', '#1A535C', '#FE5F55'] },
    { id: 78, colors: ['#011627', '#2EC4B6', '#E71D36', '#FF9F1C'] },
    { id: 79, colors: ['#292F36', '#4ECDC4', '#FFE66D', '#FF6B6B'] },
    { id: 80, colors: ['#F7F7FF', '#1A535C', '#FFCB77', '#FE5F55'] },
    { id: 81, colors: ['#6A0573', '#1A535C', '#FFD93D', '#FFFD98'] },
    { id: 82, colors: ['#FF9F1C', '#011627', '#2EC4B6', '#E71D36'] },
    { id: 83, colors: ['#4ECDC4', '#FF6B6B', '#292F36', '#FFE66D'] },
    { id: 84, colors: ['#FFD93D', '#6A0573', '#1A535C', '#FFFD98'] },
    { id: 85, colors: ['#1A535C', '#FE5F55', '#FFCB77', '#F7F7FF'] },
    { id: 86, colors: ['#2EC4B6', '#011627', '#FF9F1C', '#E71D36'] },
    { id: 87, colors: ['#9B59B6', '#E74C3C', '#3498DB', '#2ECC71'] },
    { id: 88, colors: ['#3498DB', '#E74C3C', '#ECF0F1', '#F1C40F'] },
    { id: 89, colors: ['#E67E22', '#D35400', '#16A085', '#F39C12'] },
    { id: 90, colors: ['#8E44AD', '#2980B9', '#C0392B', '#27AE60'] },
    { id: 91, colors: ['#2980B9', '#F39C12', '#27AE60', '#BDC3C7'] },
    { id: 92, colors: ['#D35400', '#34495E', '#1ABC9C', '#E74C3C'] },
    { id: 93, colors: ['#2C3E50', '#ECF0F1', '#E74C3C', '#3498DB'] },
    { id: 94, colors: ['#16A085', '#F39C12', '#8E44AD', '#D35400'] },
    { id: 95, colors: ['#27AE60', '#E67E22', '#F1C40F', '#2980B9'] },
    { id: 96, colors: ['#1ABC9C', '#3498DB', '#E74C3C', '#2C3E50'] },
    { id: 97, colors: ['#E74C3C', '#2C3E50', '#3498DB', '#ECF0F1'] },
    { id: 98, colors: ['#F39C12', '#16A085', '#8E44AD', '#D35400'] },
    { id: 99, colors: ['#3498DB', '#2ECC71', '#F1C40F', '#E74C3C'] },
    { id: 100, colors: ['#34495E', '#1ABC9C', '#E74C3C', '#9B59B6'] }
  ];

  const displayedCombos = showAll ? colorCombos : colorCombos.slice(0, 10);

  return (
    <section id="colors" className="py-16 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white"
        >
          🎨 {showAll ? '100' : '10'} Stunning Color Combinations
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {displayedCombos.map((combo) => (
            <motion.div
              key={combo.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-wrap">
                {combo.colors.map((color, idx) => (
                  <div 
                    key={idx}
                    className="w-1/2 h-16"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Combo #{combo.id}</h3>
                <div className="flex flex-wrap gap-1">
                  {combo.colors.map((color, idx) => (
                    <div 
                      key={idx}
                      className="text-xs px-2 py-1 rounded-full flex items-center"
                      style={{ 
                        backgroundColor: `${color}20`,
                        color: color,
                        border: `1px solid ${color}`
                      }}
                    >
                      <span 
                        className="w-2 h-2 rounded-full mr-1"
                        style={{ backgroundColor: color }}
                      />
                      {color}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {!showAll && (
          <div className="text-center mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAll(true)}
              className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300"
            >
              Show All 100 Color Combinations
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ColorCombinations;