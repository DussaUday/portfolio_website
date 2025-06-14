import { motion } from 'framer-motion';
import { useState } from 'react';

const ColorCombinations = () => {
  const [showAll, setShowAll] = useState(false);
  
  const colorCombos = [
    { id: 1, name: "Cool Serenity", colors: ['#5E60CE', '#64DFDF', '#80FFDB', '#F8F1E9'] },
    { id: 2, name: "Warm Sunset", colors: ['#F48C06', '#FAA307', '#E85D04', '#FFF3B0'] },
    { id: 3, name: "Muted Elegance", colors: ['#4A4E69', '#9A8C98', '#C9ADA7', '#F2E9E4'] },
    { id: 4, name: "Earthy Natural", colors: ['#606C38', '#283618', '#FEFAE0', '#DDA15E'] },
    { id: 5, name: "Vibrant Neon", colors: ['#7209B7', '#3F37C9', '#4361EE', '#F72585'] },
    { id: 6, name: "Candy Gradient", colors: ['#FF70A6', '#FF9770', '#FFD670', '#E9FF70'] },
    { id: 7, name: "Forest Greens", colors: ['#386641', '#6A994E', '#A7C957', '#F2E8CF'] },
    { id: 8, name: "Deep Purples", colors: ['#3A0CA3', '#7209B7', '#B5179E', '#F8F1FF'] },
    { id: 9, name: "Bold Harmony", colors: ['#EF476F', '#FFD166', '#06D6A0', '#073B4C'] },
    { id: 10, name: "Oceanic Warmth", colors: ['#118AB2', '#073B4C', '#FFD166', '#EF476F'] },
    { id: 11, name: "Retro Coastal", colors: ['#F4A261', '#E76F51', '#2A9D8F', '#264653'] },
    { id: 12, name: "Jewel Neutral", colors: ['#B5179E', '#7209B7', '#F48C06', '#F8F1E9'] },
    { id: 13, name: "Blue-Orange Pop", colors: ['#219EBC', '#023047', '#FFB703', '#FB8500'] },
    { id: 14, name: "Neutral Grays", colors: ['#6B7280', '#9CA3AF', '#D1D5DB', '#F3F4F6'] },
    { id: 15, name: "Electric Vivid", colors: ['#FF006E', '#8338EC', '#3A86FF', '#FBFF12'] },
    { id: 16, name: "Cool Slate", colors: ['#355070', '#6D8299', '#B1B8C7', '#D8E2F0'] },
    { id: 17, name: "Fiery Gradient", colors: ['#F94144', '#F3722C', '#F8961E', '#F9C74F'] },
    { id: 18, name: "Nature Harmony", colors: ['#90BE6D', '#43AA8B', '#577590', '#F9C74F'] },
    { id: 19, name: "Tropical Sunset", colors: ['#F9844A', '#F8961E', '#43AA8B', '#277DA1'] },
    { id: 20, name: "Coastal Serenity", colors: ['#4D908E', '#577590', '#43AA8B', '#F9C74F'] },
    { id: 21, name: "Aqua Blush", colors: ['#006D77', '#83C5BE', '#EDF6F9', '#FFDDD2'] },
    { id: 22, name: "Modern Earthy", colors: ['#F4F1DE', '#E07A5F', '#3D405B', '#81B29A'] },
    { id: 23, name: "Warm Grounded", colors: ['#F2CC8F', '#E07A5F', '#3D405B', '#81B29A'] },
    { id: 24, name: "Teal Gradient", colors: ['#05668D', '#028090', '#00A896', '#02C39A'] },
    { id: 25, name: "Peach Coral", colors: ['#FEC89A', '#F4978E', '#F08080', '#F8AD9D'] },
    { id: 26, name: "Coastal Warmth", colors: ['#2A9D8F', '#E9C46A', '#F4A261', '#E76F51'] },
    { id: 27, name: "Retro Palette", colors: ['#264653', '#2A9D8F', '#E9C46A', '#F4A261'] },
    { id: 28, name: "Neon Futuristic", colors: ['#F72585', '#7209B7', '#3F37C9', '#4CC9F0'] },
    { id: 29, name: "Coral Cream", colors: ['#F94144', '#F65A38', '#F48C06', '#FFE8D6'] },
    { id: 30, name: "Bold Electric", colors: ['#8338EC', '#3A86FF', '#FF006E', '#FBFF12'] },
    { id: 31, name: "Olive Wheat", colors: ['#606C38', '#283618', '#BC6C25', '#FEFAE0'] },
    { id: 32, name: "Pastel Candy", colors: ['#FF70A6', '#FF9770', '#E9FF70', '#FFD670'] },
    { id: 33, name: "Lush Greens", colors: ['#6A994E', '#A7C957', '#F2E8CF', '#386641'] },
    { id: 34, name: "Royal Purples", colors: ['#7209B7', '#B5179E', '#F8F1FF', '#3A0CA3'] },
    { id: 35, name: "Fresh Vibrant", colors: ['#FFD166', '#06D6A0', '#EF476F', '#118AB2'] },
    { id: 36, name: "Sea Citrus", colors: ['#073B4C', '#FFD166', '#EF476F', '#118AB2'] },
    { id: 37, name: "Coastal Retro", colors: ['#E76F51', '#2A9D8F', '#264653', '#F4A261'] },
    { id: 38, name: "Rich Neutral", colors: ['#7209B7', '#F48C06', '#F8F1E9', '#B5179E'] },
    { id: 39, name: "Vibrant Coastal", colors: ['#023047', '#FFB703', '#FB8500', '#219EBC'] },
    { id: 40, name: "Soft Grays", colors: ['#9CA3AF', '#D1D5DB', '#F3F4F6', '#6B7280'] },
    { id: 41, name: "Muted Blues", colors: ['#355070', '#D8E2F0', '#6D8299', '#B1B8C7'] },
    { id: 42, name: "Warm Gradient", colors: ['#F3722C', '#F8961E', '#F9C74F', '#F94144'] },
    { id: 43, name: "Green-Blue Harmony", colors: ['#43AA8B', '#577590', '#F9C74F', '#90BE6D'] },
    { id: 44, name: "Sunset Sea", colors: ['#F8961E', '#43AA8B', '#277DA1', '#F9844A'] },
    { id: 45, name: "Tranquil Tones", colors: ['#577590', '#43AA8B', '#F9C74F', '#4D908E'] },
    { id: 46, name: "Coral Warmth", colors: ['#F65A38', '#F48C06', '#FFE8D6', '#F94144'] },
    { id: 47, name: "Aqua Blush", colors: ['#83C5BE', '#EDF6F9', '#FFDDD2', '#006D77'] },
    { id: 48, name: "Earthy Modern", colors: ['#E07A5F', '#3D405B', '#81B29A', '#F4F1DE'] },
    { id: 49, name: "Warm Natural", colors: ['#E07A5F', '#3D405B', '#81B29A', '#F2CC8F'] },
    { id: 50, name: "Teal Spectrum", colors: ['#028090', '#00A896', '#02C39A', '#05668D'] },
    { id: 51, name: "Soft Coral", colors: ['#F4978E', '#F08080', '#F8AD9D', '#FEC89A'] },
    { id: 52, name: "Coastal Glow", colors: ['#E9C46A', '#F4A261', '#E76F51', '#2A9D8F'] },
    { id: 53, name: "Retro Natural", colors: ['#2A9D8F', '#E9C46A', '#F4A261', '#264653'] },
    { id: 54, name: "Futuristic Neon", colors: ['#3F37C9', '#4CC9F0', '#F72585', '#7209B7'] },
    { id: 55, name: "Warm Coral", colors: ['#F48C06', '#FFE8D6', '#F94144', '#F65A38'] },
    { id: 56, name: "Electric Pop", colors: ['#3A86FF', '#FF006E', '#FBFF12', '#8338EC'] },
    { id: 57, name: "Earthy Olive", colors: ['#283618', '#BC6C25', '#FEFAE0', '#606C38'] },
    { id: 58, name: "Playful Pastels", colors: ['#FF9770', '#E9FF70', '#FFD670', '#FF70A6'] },
    { id: 59, name: "Green Harmony", colors: ['#A7C957', '#F2E8CF', '#386641', '#6A994E'] },
    { id: 60, name: "Purple Elegance", colors: ['#B5179E', '#F8F1FF', '#3A0CA3', '#7209B7'] },
    { id: 61, name: "Vibrant Fresh", colors: ['#06D6A0', '#EF476F', '#118AB2', '#FFD166'] },
    { id: 62, name: "Citrus Sea", colors: ['#FFD166', '#EF476F', '#118AB2', '#073B4C'] },
    { id: 63, name: "Coastal Retro", colors: ['#2A9D8F', '#264653', '#F4A261', '#E76F51'] },
    { id: 64, name: "Neutral Jewel", colors: ['#F48C06', '#F8F1E9', '#B5179E', '#7209B7'] },
    { id: 65, name: "Orange-Blue", colors: ['#FFB703', '#FB8500', '#219EBC', '#023047'] },
    { id: 66, name: "Gray Palette", colors: ['#D1D5DB', '#F3F4F6', '#6B7280', '#9CA3AF'] },
    { id: 67, name: "Slate Blues", colors: ['#D8E2F0', '#6D8299', '#B1B8C7', '#355070'] },
    { id: 68, name: "Fiery Tones", colors: ['#F8961E', '#F9C74F', '#F94144', '#F3722C'] },
    { id: 69, name: "Nature Palette", colors: ['#577590', '#F9C74F', '#90BE6D', '#43AA8B'] },
    { id: 70, name: "Sea Sunset", colors: ['#43AA8B', '#277DA1', '#F9844A', '#F8961E'] },
    { id: 71, name: "Coastal Calm", colors: ['#43AA8B', '#F9C74F', '#4D908E', '#577590'] },
    { id: 72, name: "Coral Gradient", colors: ['#F48C06', '#FFE8D6', '#F65A38', '#F94144'] },
    { id: 73, name: "Blush Aqua", colors: ['#EDF6F9', '#FFDDD2', '#006D77', '#83C5BE'] },
    { id: 74, name: "Modern Earthy", colors: ['#3D405B', '#81B29A', '#F4F1DE', '#E07A5F'] },
    { id: 75, name: "Natural Warmth", colors: ['#3D405B', '#81B29A', '#F2CC8F', '#E07A5F'] },
    { id: 76, name: "Teal Harmony", colors: ['#00A896', '#02C39A', '#05668D', '#028090'] },
    { id: 77, name: "Coral Peach", colors: ['#F08080', '#F8AD9D', '#FEC89A', '#F4978E'] },
    { id: 78, name: "Coastal Vibrancy", colors: ['#F4A261', '#E76F51', '#2A9D8F', '#E9C46A'] },
    { id: 79, name: "Retro Coastal", colors: ['#E9C46A', '#F4A261', '#264653', '#2A9D8F'] },
    { id: 80, name: "Neon Bold", colors: ['#4CC9F0', '#F72585', '#7209B7', '#3F37C9'] },
    { id: 81, name: "Warm Coral", colors: ['#FFE8D6', '#F94144', '#F65A38', '#F48C06'] },
    { id: 82, name: "Vivid Electric", colors: ['#FF006E', '#FBFF12', '#8338EC', '#3A86FF'] },
    { id: 83, name: "Olive Earthy", colors: ['#BC6C25', '#FEFAE0', '#606C38', '#283618'] },
    { id: 84, name: "Candy Pastels", colors: ['#E9FF70', '#FFD670', '#FF70A6', '#FF9770'] },
    { id: 85, name: "Green Natural", colors: ['#F2E8CF', '#386641', '#6A994E', '#A7C957'] },
    { id: 86, name: "Purple Royal", colors: ['#F8F1FF', '#3A0CA3', '#7209B7', '#B5179E'] },
    { id: 87, name: "Fresh Bold", colors: ['#EF476F', '#118AB2', '#FFD166', '#06D6A0'] },
    { id: 88, name: "Sea Warmth", colors: ['#EF476F', '#118AB2', '#073B4C', '#FFD166'] },
    { id: 89, name: "Retro Palette", colors: ['#264653', '#F4A261', '#E76F51', '#2A9D8F'] },
    { id: 90, name: "Neutral Jewel", colors: ['#F8F1E9', '#B5179E', '#7209B7', '#F48C06'] },
    { id: 91, name: "Coastal Orange", colors: ['#FB8500', '#219EBC', '#023047', '#FFB703'] },
    { id: 92, name: "Soft Grays", colors: ['#F3F4F6', '#6B7280', '#9CA3AF', '#D1D5DB'] },
    { id: 93, name: "Blue Slate", colors: ['#6D8299', '#B1B8C7', '#355070', '#D8E2F0'] },
    { id: 94, name: "Warm Fiery", colors: ['#F9C74F', '#F94144', '#F3722C', '#F8961E'] },
    { id: 95, name: "Nature Palette", colors: ['#F9C74F', '#90BE6D', '#43AA8B', '#577590'] },
    { id: 96, name: "Sunset Sea", colors: ['#277DA1', '#F9844A', '#F8961E', '#43AA8B'] },
    { id: 97, name: "Coastal Tones", colors: ['#F9C74F', '#4D908E', '#577590', '#43AA8B'] },
    { id: 98, name: "Coral Warmth", colors: ['#FFE8D6', '#F65A38', '#F94144', '#F48C06'] },
    { id: 99, name: "Aqua Blush", colors: ['#FFDDD2', '#006D77', '#83C5BE', '#EDF6F9'] },
    { id: 100, name: "Earthy Modern", colors: ['#81B29A', '#F4F1DE', '#E07A5F', '#3D405B'] }
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
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                  {combo.name} (#{combo.id})
                </h3>
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