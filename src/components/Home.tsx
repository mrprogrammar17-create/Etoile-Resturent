/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Star, Quote, ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import { useState, useEffect } from 'react';
import { DISHES, REVIEWS, OFFERS } from '../data';

interface HomeProps {
  setCurrentPage: (page: string) => void;
  darkMode: boolean;
}

export default function Home({ setCurrentPage, darkMode }: HomeProps) {
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);

  // Auto advance reviews
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveReviewIdx((prev) => (prev + 1) % REVIEWS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const signatureDishes = DISHES.filter((d) => d.tags.includes('Signature')).slice(0, 3);
  const featuredOffer = OFFERS[0];

  return (
    <div id="home-page-container">
      {/* 1. Hero Section */}
      <section
        id="hero-section"
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Dynamic Full Screen Dark Backdrop Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1600&auto=format&fit=crop"
            alt="L'Étoile Fine Dining Room"
            className="w-full h-full object-cover filter brightness-[0.35] contrast-[1.10] scale-105 transform hover:scale-100 transition-transform duration-[10000ms]"
            referrerPolicy="no-referrer"
          />
          {/* Subtle Golden Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-black/40"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center mt-12">
          {/* Award Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="flex items-center justify-center space-x-2 mb-6"
          >
            <div className="h-[1px] w-8 bg-gold"></div>
            <span className="font-sans text-xs tracking-[0.25em] text-gold font-semibold uppercase flex items-center gap-1.5">
              <Star className="h-3 w-3 fill-gold" /> THREE MICHELIN STARS 2026
            </span>
            <div className="h-[1px] w-8 bg-gold"></div>
          </motion.div>

          {/* Majestic Main Name Title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
            className="font-serif text-5xl sm:text-7xl lg:text-8xl tracking-[0.1em] text-white font-bold leading-tight mb-4"
          >
            L&rsquo;ÉTOILE
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.6 }}
            className="font-serif text-base sm:text-xl lg:text-2xl text-gold-light italic tracking-widest mb-10"
          >
            An Operatic Symphony of Modern French Haute Cuisine
          </motion.p>

          {/* Animated CTA Luxury Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <button
              id="hero-cta-menu"
              onClick={() => setCurrentPage('menu')}
              className="w-full sm:w-auto px-10 py-4 bg-gold text-black font-sans text-xs uppercase tracking-[0.2em] font-bold shadow-[0_10px_30px_rgba(197,160,89,0.3)] transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5 cursor-pointer rounded-none"
            >
              View Tasting Menu
            </button>
            <button
              id="hero-cta-reserve"
              onClick={() => setCurrentPage('reservation')}
              className="w-full sm:w-auto px-10 py-4 border border-white/20 text-white hover:text-gold hover:border-gold font-sans text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:-translate-y-0.5 bg-transparent cursor-pointer rounded-none"
            >
              Book a Table
            </button>
          </motion.div>
        </div>

        {/* Scroll helper */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10 opacity-70">
          <span className="font-sans text-[9px] tracking-[0.3em] text-gold-light uppercase mb-2">SCROLL TO DISCOVER</span>
          <div className="h-10 w-[1px] bg-gradient-to-b from-gold to-transparent animate-bounce"></div>
        </div>
      </section>

      {/* 2. Brand Ethos Snippet */}
      <section
        className={`py-24 ${
          darkMode ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-950'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Compass className="h-10 w-10 text-gold mx-auto mb-6 animate-spin-slow" />
          <h2 className="font-serif text-3xl sm:text-4xl tracking-widest text-gold mb-6 uppercase">
            THE ALCHEMY OF FLAVOR
          </h2>
          <p className="font-sans text-sm sm:text-base tracking-widest leading-relaxed text-gray-500 max-w-2xl mx-auto mb-8">
            At L&rsquo;Étoile, dishes are not merely prepared—they are choreographed. Every plate is a theatrical canvas displaying organic ingredients harvested from small estate farms, masterfully paired with rare gems from our century-old wine crypt.
          </p>
          <button
            onClick={() => setCurrentPage('about')}
            className="font-serif text-xs italic tracking-[0.2em] text-gold hover:text-gold-light transition-colors flex items-center justify-center mx-auto space-x-2"
          >
            <span>DISCOVER OUR PROVENANCE</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </section>

      {/* 3. Featured Dishes Section */}
      <section
        id="featured-dishes-showcase"
        className={`py-24 border-t border-b ${
          darkMode ? 'bg-obsidian border-gold/15' : 'bg-zinc-50 border-gold/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gold font-sans text-xs tracking-[0.25em] font-semibold uppercase mb-2">CHEF'S SIGNATURES</p>
            <h2 className="font-serif text-3xl sm:text-4xl tracking-widest text-gold-dark uppercase font-semibold">
              THE CELESTIAL TRILOGY
            </h2>
            <div className="h-[2px] w-24 bg-gold mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {signatureDishes.map((dish, idx) => (
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className={`group flex flex-col justify-between border h-full transition-all duration-500 overflow-hidden ${
                  darkMode
                    ? 'bg-zinc-900 border-gold/10 hover:border-gold/30 hover:shadow-2xl hover:shadow-gold/5'
                    : 'bg-white border-gold/10 hover:border-gold/30 hover:shadow-xl'
                }`}
              >
                {/* Image Frame with Zoom */}
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-750"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-obsidian/80 backdrop-blur-md border border-gold/30 px-3 py-1">
                    <span className="font-serif text-gold text-sm font-semibold">${dish.price}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-1 mb-2">
                      <Star className="h-3 w-3 fill-gold text-gold" style={{ strokeWidth: 0 }} />
                      <span className="font-mono text-[9px] tracking-widest text-gold">{dish.rating} / 5 Rating</span>
                    </div>

                    <h3 className={`font-serif text-lg tracking-wider mb-2 font-medium ${
                      darkMode ? 'text-white' : 'text-zinc-900'
                    }`}>
                      {dish.name}
                    </h3>
                    <p className={`font-sans text-xs tracking-wider leading-relaxed mb-4 ${
                      darkMode ? 'text-gray-400' : 'text-zinc-650'
                    }`}>
                      {dish.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gold/10">
                    <button
                      onClick={() => setCurrentPage('menu')}
                      className="font-serif text-xs italic tracking-widest text-gold hover:text-gold-light transition-all flex items-center space-x-1"
                    >
                      <span>Explore details</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Special Gastronomic Offer Section */}
      <section
        id="home-special-offer"
        className={`py-24 ${
          darkMode ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-950'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 bg-charcoal/40 border border-gold/15 p-8 lg:p-12 relative">
            {/* Design Corner Frame Highlights */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gold"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gold"></div>

            {/* Graphic Image Column */}
            <div className="w-full lg:w-1/2 overflow-hidden aspect-video lg:aspect-square">
              <img
                src={featuredOffer.image}
                alt={featuredOffer.title}
                className="w-full h-full object-cover filter brightness-[0.8] hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Offer content */}
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-gold" />
                <span className="font-sans text-xs tracking-[0.25em] text-gold font-bold">LIMITED TIME MASTERPIECE</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl tracking-widest text-gold-light leading-tight font-medium">
                {featuredOffer.title}
              </h2>
              <p className="font-sans text-xs sm:text-sm tracking-wider uppercase text-gold">
                {featuredOffer.subtitle} • {featuredOffer.discount}
              </p>
              <p className="font-sans text-xs sm:text-sm tracking-widest leading-relaxed text-gray-400">
                {featuredOffer.description}
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button
                  onClick={() => setCurrentPage('offers')}
                  className="px-6 py-3.5 bg-gold hover:bg-gold-dark text-black font-sans text-xs tracking-widest font-bold transition-colors cursor-pointer"
                >
                  ACQUIRE VOUCHER
                </button>
                <div className="h-full border-l border-gold/20 pl-4 py-2">
                  <p className="font-mono text-[9px] text-zinc-400 tracking-widest uppercase mb-1">PROMO CODE</p>
                  <p className="font-mono text-xs text-gold tracking-widest font-semibold">{featuredOffer.promoCode}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Gilded Testimonial Slider */}
      <section
        id="testimonials-banner"
        className={`py-24 border-t border-b ${
          darkMode ? 'bg-obsidian border-gold/15' : 'bg-zinc-50 border-gold/10'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-2xl tracking-[0.2em] text-gold uppercase">THE SCRIPTS OF PRAISE</h2>
            <p className="font-sans text-[10px] tracking-[0.2em] text-gray-500 uppercase mt-2">WORDS FROM THE GUESTBOOK</p>
          </div>

          <div className="relative p-8 sm:p-12 border border-gold/15 backdrop-blur-md flex flex-col items-center text-center">
            <Quote className="h-10 w-10 text-gold/30 mb-6" />

            <div className="min-h-[140px] flex items-center justify-center">
              <p className={`font-serif text-base sm:text-lg tracking-wide leading-relaxed italic ${
                darkMode ? 'text-gray-100' : 'text-zinc-850'
              }`}>
                &ldquo;{REVIEWS[activeReviewIdx].text}&rdquo;
              </p>
            </div>

            {/* Author details */}
            <div className="mt-8 flex flex-col items-center">
              <img
                src={REVIEWS[activeReviewIdx].avatar}
                alt={REVIEWS[activeReviewIdx].author}
                className="w-12 h-12 rounded-full border border-gold/40 object-cover mb-3"
                referrerPolicy="no-referrer"
              />
              <p className={`font-serif text-sm tracking-widest font-semibold ${
                darkMode ? 'text-white' : 'text-zinc-900'
              }`}>
                {REVIEWS[activeReviewIdx].author}
              </p>
              {REVIEWS[activeReviewIdx].dishName && (
                <p className="font-mono text-[9px] text-gold tracking-widest uppercase mt-0.5">
                  Favored: {REVIEWS[activeReviewIdx].dishName}
                </p>
              )}
            </div>

            {/* Navigation Handles */}
            <div className="flex items-center space-x-6 mt-10">
              <button
                onClick={() => setActiveReviewIdx((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length)}
                className="p-1 px-3 border border-gold/25 hover:border-gold text-gold hover:bg-gold/5 transition-colors cursor-pointer"
                aria-label="Previous review"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex space-x-2">
                {REVIEWS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveReviewIdx(i)}
                    className={`h-1.5 w-1.5 rounded-full transition-all ${
                      activeReviewIdx === i ? 'bg-gold w-4' : 'bg-gold/30'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => setActiveReviewIdx((prev) => (prev + 1) % REVIEWS.length)}
                className="p-1 px-3 border border-gold/25 hover:border-gold text-gold hover:bg-gold/5 transition-colors cursor-pointer"
                aria-label="Next review"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
