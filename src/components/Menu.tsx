/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Sparkles, Star, Clock, Wine, Flame, Eye, X, BookOpen, Utensils } from 'lucide-react';
import { DISHES } from '../data';
import { Dish } from '../types';

interface MenuProps {
  darkMode: boolean;
}

export default function Menu({ darkMode }: MenuProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'starters' | 'mains' | 'desserts' | 'wines' | 'signatures'>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'priceAsc' | 'priceDesc'>('rating');
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

  // Available tags to toggle/filter
  const allTags = ['Signature', 'Gluten-Free', 'Vegetarian', 'Classic French'];

  const categoryLabels = {
    all: 'All Chapters',
    starters: 'Hors d&rsquo;œuvres',
    mains: 'Plat Principal',
    desserts: 'Desserts Magnifiques',
    wines: 'Grand Cellier Vin',
    signatures: 'Chef Curations'
  };

  // Toggle filter tag
  const handleTagToggle = (tag: string) => {
    if (filterTags.includes(tag)) {
      setFilterTags(filterTags.filter((t) => t !== tag));
    } else {
      setFilterTags([...filterTags, tag]);
    }
  };

  // Smooth filter and sorting pipeline
  const filteredDishes = useMemo(() => {
    return DISHES.filter((dish) => {
      // 1. Search Query
      const matchesSearch =
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase()));

      // 2. Category selection
      const matchesCategory =
        selectedCategory === 'all' ||
        (selectedCategory === 'signatures' && dish.tags.includes('Signature')) ||
        dish.category === selectedCategory;

      // 3. Tag toggles
      const matchesTags = filterTags.every((t) =>
        dish.tags.some((dishTag) => dishTag.toLowerCase().includes(t.toLowerCase()))
      );

      return matchesSearch && matchesCategory && matchesTags;
    }).sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (sortBy === 'priceAsc') {
        return a.price - b.price;
      }
      if (sortBy === 'priceDesc') {
        return b.price - a.price;
      }
      return 0;
    });
  }, [searchQuery, selectedCategory, filterTags, sortBy]);

  return (
    <div id="culinary-menu-page" className="pt-24 font-sans">
      {/* 1. Page Header */}
      <section className="relative py-20 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop"
            alt="Draped Wine bar"
            className="w-full h-full object-cover filter brightness-[0.3] blur-[1px]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-black/30"></div>
        </div>
        <div className="relative z-10 text-center max-w-4xl px-4">
          <Utensils className="h-8 w-8 text-gold mx-auto mb-4" />
          <h1 className="font-serif text-4xl sm:text-6xl text-white font-bold tracking-widest uppercase">
            THE SAVORY COPTIC
          </h1>
          <p className="font-serif text-sm italic text-gold-light mt-3 tracking-widest">
            Impeccable details of taste, temperature, and texture curated for gourmands.
          </p>
        </div>
      </section>

      {/* 2. Search & Filtering Controls Bar */}
      <section className={`py-12 border-b ${darkMode ? 'bg-zinc-950 border-gold/15' : 'bg-white border-gold/10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Elegant Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-3.5 h-4 w-4 text-gold/60" />
              <input
                type="text"
                placeholder="Search flavors, truffle, wagyu, lobster..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full py-3.5 pl-12 pr-4 text-xs tracking-wider rounded-none border focus:outline-none focus:border-gold transition-colors ${
                  darkMode
                    ? 'bg-zinc-900 border-gold/10 text-white placeholder-gray-500'
                    : 'bg-zinc-50 border-gold/20 text-zinc-900 placeholder-zinc-400'
                }`}
              />
            </div>

            {/* Sorter Dropdown */}
            <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
              <span className={`text-[10px] uppercase font-bold tracking-widest ${darkMode ? 'text-gray-400' : 'text-zinc-650'}`}>SORT CHRONICLE:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className={`px-4 py-3 text-xs tracking-widest rounded-none border focus:outline-none focus:border-gold font-sans cursor-pointer ${
                  darkMode
                    ? 'bg-zinc-900 border-gold/10 text-white'
                    : 'bg-white border-gold/20 text-zinc-900'
                }`}
              >
                <option value="rating">Michelin Rating (High)</option>
                <option value="priceAsc">Price (Low to High)</option>
                <option value="priceDesc">Price (High to Low)</option>
              </select>
            </div>
          </div>

          {/* Quick Tag Badges (Special diets, ingredients) */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className={`text-[10px] uppercase font-bold tracking-widest mr-2 ${darkMode ? 'text-gray-500' : 'text-zinc-400'}`}>Temptations:</span>
            {allTags.map((tag) => {
              const isActive = filterTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1.5 text-[9px] font-sans tracking-widest cursor-pointer border transition-all duration-300 ${
                    isActive
                      ? 'bg-gold border-gold text-black font-semibold'
                      : darkMode
                      ? 'border-gold/10 text-gray-400 hover:border-gold hover:text-white'
                      : 'border-gold/20 text-zinc-700 hover:border-gold hover:text-black'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
            {filterTags.length > 0 && (
              <button
                onClick={() => setFilterTags([])}
                className="text-[9px] tracking-widest text-gold hover:underline cursor-pointer ml-3 font-semibold"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 3. Category Carousel & Selection Tab */}
      <section className={`py-6 border-b ${darkMode ? 'bg-zinc-900 border-gold/10' : 'bg-zinc-50 border-gold/5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 md:justify-center overflow-x-auto pb-3 md:pb-0 scrollbar-none">
            {Object.entries(categoryLabels).map(([key, value]) => {
              const isSelected = selectedCategory === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key as any)}
                  className={`px-5 py-3 text-xs tracking-widest font-sans uppercase whitespace-nowrap cursor-pointer transition-all ${
                    isSelected
                      ? 'text-gold-light border-b-2 border-gold font-bold bg-gold/5'
                      : 'text-gray-400 hover:text-gold'
                  }`}
                  dangerouslySetInnerHTML={{ __html: value }}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Menu Card Grid */}
      <section className={`py-20 ${darkMode ? 'bg-obsidian text-white' : 'bg-white text-zinc-900'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredDishes.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <BookOpen className="h-10 w-10 text-gold/30 mx-auto" />
              <p className="font-serif text-lg text-gold">THE SCRIPT IS EMPTY</p>
              <p className="font-sans text-xs text-gray-500 max-w-sm mx-auto">No luxurious selections match your search queries or active filters. Try resetting terms.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setFilterTags([]); }}
                className="px-4 py-2 border border-gold text-gold text-xs font-sans tracking-widest hover:bg-gold/10 transition-colors"
              >
                RESET UNIVERSE
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredDishes.map((dish, idx) => (
                  <motion.div
                    key={dish.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    className={`group flex flex-col justify-between border h-full transition-all duration-500 overflow-hidden relative ${
                      darkMode
                        ? 'bg-zinc-900 border-gold/10 hover:border-gold/30 hover:shadow-2xl hover:shadow-gold/5'
                        : 'bg-zinc-50 border-gold/10 hover:border-gold/20 hover:shadow-xl'
                    }`}
                  >
                    {/* Visual Card Image Framer */}
                    <div className="relative overflow-hidden aspect-[4/3]">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-750"
                        referrerPolicy="no-referrer"
                      />
                      {/* Price box */}
                      <div className="absolute top-4 right-4 bg-obsidian/85 backdrop-blur-md border border-gold/30 px-3.5 py-1.5 z-10">
                        <span className="font-serif text-gold text-sm font-semibold">${dish.price}</span>
                      </div>
                      
                      {/* Overlay card play actions */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-13">
                        <button
                          onClick={() => setSelectedDish(dish)}
                          className="p-3 border border-gold rounded-full text-gold hover:bg-gold hover:text-black transition-all transform hover:scale-110 cursor-pointer"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Tags list */}
                        <div className="flex flex-wrap gap-1 mb-2">
                          {dish.tags.map(t => (
                            <span key={t} className="text-[8px] bg-gold/10 border border-gold/20 text-gold px-1.5 py-0.5 tracking-wider font-sans font-semibold uppercase">
                              {t}
                            </span>
                          ))}
                        </div>

                        {/* Title & Rating */}
                        <div className="flex justify-between items-start mb-2 gap-2">
                          <h3 className={`font-serif text-lg tracking-wider font-semibold group-hover:text-gold transition-colors leading-snug ${
                            darkMode ? 'text-white' : 'text-zinc-900'
                          }`}>
                            {dish.name}
                          </h3>
                        </div>

                        <p className={`font-sans text-xs tracking-wider leading-relaxed mb-4 ${
                          darkMode ? 'text-gray-400' : 'text-zinc-600'
                        }`}>
                          {dish.description}
                        </p>
                      </div>

                      {/* Detail triggers footer */}
                      <div className="pt-4 border-t border-gold/10 flex items-center justify-between text-[11px] font-sans tracking-widest text-gold-dark font-medium">
                        <div className="flex items-center space-x-1.5">
                          <Star className="h-3 w-3 text-gold fill-gold" style={{ strokeWidth: 0 }} />
                          <span>{dish.rating} (Michelin)</span>
                        </div>
                        <button
                          onClick={() => setSelectedDish(dish)}
                          className="hover:text-gold flex items-center space-x-1 cursor-pointer font-bold"
                        >
                          <span>DETAILS & PAIRING</span>
                          <span>→</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* 5. Gilded Culinary Detail Modal */}
      <AnimatePresence>
        {selectedDish && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal Glass Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDish(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />

            {/* Modal Body Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className={`relative max-w-2xl w-full border max-h-[90vh] overflow-y-auto ${
                darkMode ? 'bg-zinc-900 border-gold/30 text-white' : 'bg-white border-gold/25 text-zinc-900'
              } shadow-2xl p-6 sm:p-8`}
            >
              <button
                onClick={() => setSelectedDish(null)}
                className="absolute top-5 right-5 p-1 hover:bg-gold/10 text-gold hover:text-gold-light border border-transparent hover:border-gold/20"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="space-y-6">
                {/* Hero banner image */}
                <div className="aspect-video w-full overflow-hidden border border-gold/15">
                  <img
                    src={selectedDish.image}
                    alt={selectedDish.name}
                    className="w-full h-full object-cover filter brightness-[0.85]"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Star & Headers */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-gold text-gold" style={{ strokeWidth: 0 }} />
                    ))}
                    <span className="font-mono text-[9px] text-zinc-400 tracking-widest uppercase ml-2">Michelin Core Choice</span>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="font-serif text-2xl sm:text-3xl text-gold font-bold tracking-wider leading-snug">
                      {selectedDish.name}
                    </h2>
                    <span className="font-serif text-xl sm:text-2xl font-bold text-gold-light">${selectedDish.price}</span>
                  </div>
                  <p className={`font-sans text-xs tracking-wider leading-relaxed ${darkMode ? 'text-gray-300' : 'text-zinc-600'}`}>
                    {selectedDish.description}
                  </p>
                </div>

                {/* Specification detail nodes */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-t border-b border-gold/15 text-[11px] font-sans tracking-widest uppercase font-semibold">
                  <div className="flex items-center space-x-2 text-gold">
                    <Clock className="h-4 w-4 text-gold-dark shrink-0" />
                    <span>PREP: {selectedDish.prepTime || '15 mins'}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gold">
                    <Flame className="h-4 w-4 text-gold-dark shrink-0" />
                    <span>ENERGY: {selectedDish.calories || 320} KCAL</span>
                  </div>
                  {selectedDish.winePairing && (
                    <div className="flex items-center space-x-2 text-gold">
                      <Wine className="h-4 w-4 text-gold-dark shrink-0" />
                      <span className="truncate" title={selectedDish.winePairing}>CELLIER RECOMMENDATION</span>
                    </div>
                  )}
                </div>

                {/* Detailed Ingredients and pairings */}
                <div className="space-y-4">
                  {/* Ingredients */}
                  <div className="space-y-1.5">
                    <h4 className="font-serif text-xs uppercase text-gold tracking-widest font-semibold">Ingredients Chronology</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedDish.ingredients.map((ing) => (
                        <span key={ing} className={`text-[10px] px-2.5 py-1 font-sans border tracking-wider bg-transparent ${
                          darkMode ? 'border-gold/10 text-gray-300' : 'border-gold/15 text-zinc-700'
                        }`}>
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Sommelier's Pairing notes */}
                  {selectedDish.winePairing && (
                    <div className={`p-4 border-l-2 border-gold flex items-start space-x-3 ${
                      darkMode ? 'bg-zinc-950/40 text-gray-300' : 'bg-zinc-50 text-zinc-700'
                    }`}>
                      <Wine className="h-5 w-5 text-gold mt-0.5 shrink-0" />
                      <div className="space-y-0.5">
                        <h4 className="font-serif text-[10px] uppercase text-gold tracking-widest font-semibold">Sommelier&rsquo;s Private Pairing Choice</h4>
                        <p className="font-sans text-xs tracking-wider leading-relaxed">{selectedDish.winePairing}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Sub-actions */}
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setSelectedDish(null)}
                    className="px-6 py-3 border border-gold hover:bg-gold hover:text-black font-sans text-xs tracking-widest font-bold transition-all cursor-pointer"
                  >
                    RETURN TO CHAPTERS
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
