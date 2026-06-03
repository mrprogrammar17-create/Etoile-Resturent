/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Eye, ZoomIn, Image as ImageIcon } from 'lucide-react';
import { GALLERY_ITEMS } from '../data';

interface GalleryProps {
  darkMode: boolean;
}

export default function Gallery({ darkMode }: GalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'interior' | 'plating' | 'chef' | 'wine'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = {
    all: 'All Chapters',
    interior: 'Sensory Salon',
    plating: 'Choreographed Plates',
    chef: 'Kitchen Masters',
    wine: 'Subterranean Vault'
  };

  // Filter items
  const filteredItems = useMemo(() => {
    return GALLERY_ITEMS.filter((item) => selectedCategory === 'all' || item.category === selectedCategory);
  }, [selectedCategory]);

  const handleOpenLightbox = (itemId: string) => {
    const idx = GALLERY_ITEMS.findIndex((item) => item.id === itemId);
    if (idx !== -1) {
      setLightboxIndex(idx);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === 0 ? GALLERY_ITEMS.length - 1 : prev! - 1));
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! + 1) % GALLERY_ITEMS.length);
    }
  };

  return (
    <div id="gallery-page" className="pt-24 font-sans">
      {/* 1. Header Banner */}
      <section className="relative py-20 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1200&auto=format&fit=crop"
            alt="Murano Glass glowing"
            className="w-full h-full object-cover filter brightness-[0.35]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-black/30"></div>
        </div>
        <div className="relative z-10 text-center max-w-4xl px-4">
          <ImageIcon className="h-8 w-8 text-gold mx-auto mb-4" />
          <h1 className="font-serif text-4xl sm:text-6xl text-white font-bold tracking-widest uppercase">
            STUDIO L&rsquo;ÉTOILE
          </h1>
          <p className="font-serif text-sm italic text-gold-light mt-3 tracking-widest">
            A visual symphony of textures, lights, and meticulous craftsmanship.
          </p>
        </div>
      </section>

      {/* 2. Categorization Tab Selector */}
      <section className={`py-6 border-b ${darkMode ? 'bg-zinc-950 border-gold/15' : 'bg-zinc-50 border-gold/5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 md:justify-center overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {Object.entries(categories).map(([key, label]) => {
              const isSelected = selectedCategory === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key as any)}
                  className={`px-5 py-2.5 text-xs tracking-widest font-sans uppercase whitespace-nowrap cursor-pointer transition-all ${
                    isSelected
                      ? 'text-gold font-bold border-b-2 border-gold bg-gold/5'
                      : 'text-gray-400 hover:text-gold'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Fluid Masonry Grid */}
      <section className={`py-20 min-h-[50vh] ${darkMode ? 'bg-obsidian text-white' : 'bg-white text-zinc-900'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="break-inside-avoid relative overflow-hidden group border border-gold/10 hover:border-gold/30 bg-zinc-950 flex flex-col justify-between"
                >
                  {/* Image with zoom triggers */}
                  <div className="relative overflow-hidden cursor-pointer" onClick={() => handleOpenLightbox(item.id)}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full object-cover filter brightness-[0.8] group-hover:scale-105 transition-transform duration-750"
                      referrerPolicy="no-referrer"
                    />

                    {/* Dark Glass Overlay hover card */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-6 text-center space-y-2">
                      <ZoomIn className="h-8 w-8 text-gold animate-bounce" />
                      <span className="font-serif text-sm tracking-widest text-gold font-semibold uppercase">{item.title}</span>
                      <span className="font-sans text-[10px] text-zinc-400 tracking-wider uppercase font-semibold">{categories[item.category]}</span>
                    </div>
                  </div>

                  {/* Text details in simple cards list */}
                  <div className={`p-4 border-t ${darkMode ? 'border-gold/10 bg-zinc-900' : 'border-gold/5 bg-zinc-50'}`}>
                    <h3 className="font-serif text-sm tracking-wider text-gold font-semibold uppercase mb-1">{item.title}</h3>
                    <p className="font-sans text-xs tracking-wider text-gray-500 leading-relaxed font-light">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 4. Elegant Full Screen Lightbox Modal Grid */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark glass backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxIndex(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />

            {/* Modal Closer */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-5 right-5 p-2 bg-zinc-900 border border-gold/20 text-gold hover:text-white transition-colors cursor-pointer z-52"
              aria-label="Close Lightbox"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Large Image presentation frame with arrow navigation buttons */}
            <div className="relative max-w-5xl w-full z-10 flex flex-col items-center space-y-4">
              {/* Image Frame */}
              <div className="relative aspect-video w-full flex items-center justify-center bg-black/40 overflow-hidden">
                {/* Arrow Left */}
                <button
                  onClick={handlePrev}
                  className="absolute left-4 p-3 bg-zinc-900 border border-gold/20 text-gold hover:bg-gold hover:text-black transition-all cursor-pointer z-12"
                  aria-label="Previous Image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <motion.img
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  src={GALLERY_ITEMS[lightboxIndex].image}
                  alt={GALLERY_ITEMS[lightboxIndex].title}
                  className="max-h-[70vh] max-w-full object-contain filter shadow-2xl"
                  referrerPolicy="no-referrer"
                />

                {/* Arrow Right */}
                <button
                  onClick={handleNext}
                  className="absolute right-4 p-3 bg-zinc-900 border border-gold/20 text-gold hover:bg-gold hover:text-black transition-all cursor-pointer z-12"
                  aria-label="Next Image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Text Description underneath the image */}
              <div className="text-center space-y-1.5 max-w-2xl px-4">
                <p className="font-mono text-[9px] tracking-[0.25em] text-gold uppercase font-bold">
                  CHAPTER {lightboxIndex + 1} OF {GALLERY_ITEMS.length} • {categories[GALLERY_ITEMS[lightboxIndex].category]}
                </p>
                <h3 className="font-serif text-xl text-white font-bold tracking-widest uppercase">
                  {GALLERY_ITEMS[lightboxIndex].title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-gray-400 tracking-wider leading-relaxed">
                  {GALLERY_ITEMS[lightboxIndex].description}
                </p>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
