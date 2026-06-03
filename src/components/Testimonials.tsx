/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquare, Award, CheckCircle, Sparkles } from 'lucide-react';
import { REVIEWS } from '../data';
import { Review } from '../types';

interface TestimonialsProps {
  darkMode: boolean;
}

export default function Testimonials({ darkMode }: TestimonialsProps) {
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');

  // Review writer inputs
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [dishName, setDishName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop');
  const [successMsg, setSuccessMsg] = useState(false);

  // Pre-curated elegant user avatars for guest catalog selection
  const avatars = [
    { label: 'Gourmand Madame', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop' },
    { label: 'Michelin Critic', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop' },
    { label: 'Culinary Journalist', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop' },
    { label: 'Epicurean Gentleman', url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop' }
  ];

  // Load reviews from local storage on bootstrap
  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem('letoile_reviews') || '[]');
    if (savedReviews.length > 0) {
      setReviewsList([...REVIEWS, ...savedReviews]);
    }
  }, []);

  const handleCreateReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    const newReview: Review = {
      id: 'rev-user-' + Math.floor(Math.random() * 1000000),
      author: name,
      avatar: selectedAvatar,
      rating,
      text,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      dishName: dishName || undefined,
      highlight: false
    };

    const currentSaved = JSON.parse(localStorage.getItem('letoile_reviews') || '[]');
    currentSaved.push(newReview);
    localStorage.setItem('letoile_reviews', JSON.stringify(currentSaved));

    // Update state lists
    setReviewsList([...REVIEWS, ...currentSaved]);

    // Reset fields
    setName('');
    setText('');
    setDishName('');
    setRating(5);
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 8000);
  };

  // Filter pipeline
  const filteredReviews = useMemo(() => {
    return reviewsList.filter((rev) => filterRating === 'all' || rev.rating === filterRating);
  }, [reviewsList, filterRating]);

  return (
    <div id="testimonials-page" className="pt-24 font-sans">
      {/* 1. Header Hero Banner */}
      <section className="relative py-20 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop"
            alt="Warm glowing salon table"
            className="w-full h-full object-cover filter brightness-[0.35]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-black/30"></div>
        </div>
        <div className="relative z-10 text-center max-w-4xl px-4">
          <MessageSquare className="h-8 w-8 text-gold mx-auto mb-4" />
          <h1 className="font-serif text-4xl sm:text-6xl text-white font-bold tracking-widest uppercase">
            SCRIPTS OF LUXURY
          </h1>
          <p className="font-serif text-sm italic text-gold-light mt-3 tracking-widest">
            A dynamic ledger tracking gastronomic reflections and epicurean insights.
          </p>
        </div>
      </section>

      {/* 2. Rating Filters and score counts */}
      <section className={`py-12 border-b ${darkMode ? 'bg-zinc-950 border-gold/15' : 'bg-zinc-50 border-gold/10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-serif text-lg text-gold font-semibold uppercase tracking-wider">The Score Registry</h3>
            <p className="font-sans text-[10px] text-gray-500 tracking-widest uppercase">Select stars to filter comments</p>
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {[
              { val: 'all', label: 'All Reviews' },
              { val: 5, label: '5 Stars' },
              { val: 4, label: '4 Stars' }
            ].map((btn) => {
              const isActive = filterRating === btn.val;
              return (
                <button
                  key={btn.val}
                  onClick={() => setFilterRating(btn.val as any)}
                  className={`px-4 py-2.5 text-xs font-sans tracking-widest border font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                    isActive
                      ? 'bg-gold border-gold text-black'
                      : darkMode
                      ? 'border-gold/10 text-gray-400 hover:border-gold'
                      : 'border-gold/20 text-zinc-700 hover:border-gold'
                  }`}
                >
                  {btn.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Review Card Grads & Add Review form */}
      <section className={`py-20 ${darkMode ? 'bg-obsidian text-white' : 'bg-white text-zinc-900'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Review card list: Column spans 7 */}
            <div className="lg:col-span-7 space-y-6">
              <AnimatePresence mode="popLayout">
                {filteredReviews.length === 0 ? (
                  <div className="text-center py-20 border border-gold/10">
                    <Award className="h-10 w-10 text-gold/30 mx-auto mb-4" />
                    <p className="font-serif text-lg text-gold font-bold">LEDGER VACANT</p>
                    <p className="font-sans text-xs text-gray-500 mt-1">No custom evaluations represent this ratings filter yet.</p>
                  </div>
                ) : (
                  filteredReviews.map((rev, idx) => (
                    <motion.div
                      key={rev.id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5, delay: idx * 0.05 }}
                      className={`p-6 border relative transition-all duration-300 ${
                        rev.highlight
                          ? 'border-gold bg-gold/5'
                          : darkMode
                          ? 'bg-zinc-900 border-gold/10 hover:border-gold/25'
                          : 'bg-zinc-50 border-gold/10 hover:border-gold/20 shadow-md'
                      }`}
                    >
                      {/* Corner highlighted emblem if highlighted */}
                      {rev.highlight && (
                        <div className="absolute top-0 right-0 bg-gold text-black text-[9px] font-sans tracking-[0.2em] px-3 py-1 font-bold">
                          HONORARY GUEST
                        </div>
                      )}

                      <div className="flex items-start space-x-4">
                        {/* Avatar */}
                        <img
                          src={rev.avatar}
                          alt={rev.author}
                          className="w-12 h-12 rounded-full object-cover border border-gold/30 shrink-0"
                          referrerPolicy="no-referrer"
                        />

                        {/* Text Content */}
                        <div className="space-y-4 flex-1">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3.5 w-3.5 ${
                                    i < rev.rating ? 'text-gold fill-gold' : 'text-zinc-600'
                                  }`}
                                  style={{ strokeWidth: 0 }}
                                />
                              ))}
                            </div>
                            <h4 className={`font-serif text-base tracking-widest font-semibold ${
                              darkMode ? 'text-white' : 'text-zinc-900'
                            }`}>{rev.author}</h4>
                            <p className="font-sans text-[9px] text-zinc-400 tracking-wider uppercase">Verified Dining Day: {rev.date}</p>
                          </div>

                          <p className={`font-serif text-xs sm:text-sm tracking-wide italic leading-relaxed ${
                            darkMode ? 'text-gray-300' : 'text-zinc-750'
                          }`}>
                            &ldquo;{rev.text}&rdquo;
                          </p>

                          {rev.dishName && (
                            <div className="inline-block px-2.5 py-1 bg-gold/5 border border-gold/15">
                              <span className="font-mono text-[9px] tracking-widest uppercase text-gold">Favored Plate: {rev.dishName}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Form to submit review: Column spans 5 */}
            <div className="lg:col-span-5">
              <div className="border border-gold/15 p-6 bg-charcoal/40 relative space-y-6">
                <div>
                  <h3 className="font-serif text-lg text-gold tracking-widest uppercase">SIGN THE GUESTBOOK</h3>
                  <p className="font-sans text-[9px] text-gray-500 tracking-widest uppercase mt-0.5">Publish your epicurean reflections</p>
                </div>

                <form onSubmit={handleCreateReview} className="space-y-4">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase font-bold tracking-widest text-gold-light">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Lady Vivienne"
                      className={`w-full py-3 px-4 text-xs tracking-wider rounded-none border focus:outline-none focus:border-gold transition-colors ${
                        darkMode ? 'bg-zinc-950 border-gold/10 text-white' : 'bg-zinc-50 border-gold/20 text-zinc-900'
                      }`}
                    />
                  </div>

                  {/* Rating Field */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase font-bold tracking-widest text-gold-light">Culinary Rating Rating *</label>
                    <div className="flex items-center space-x-1 pt-1">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setRating(num)}
                          className="focus:outline-none cursor-pointer"
                        >
                          <Star
                            className={`h-6 w-6 transition-transform hover:scale-110 ${
                              num <= rating ? 'text-gold fill-gold' : 'text-zinc-650'
                            }`}
                            style={{ strokeWidth: num <= rating ? 0 : 1.5 }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dish Tried */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase font-bold tracking-widest text-gold-light">Plate Enjoyed (Optional)</label>
                    <input
                      type="text"
                      value={dishName}
                      onChange={(e) => setDishName(e.target.value)}
                      placeholder="e.g. A5 Miyazaki Wagyu Tenderloin"
                      className={`w-full py-3 px-4 text-xs tracking-wider rounded-none border focus:outline-none focus:border-gold transition-colors ${
                        darkMode ? 'bg-zinc-950 border-gold/10 text-white' : 'bg-zinc-50 border-gold/20 text-zinc-900'
                      }`}
                    />
                  </div>

                  {/* Preloaded Avatar Row selectors */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase font-bold tracking-widest text-gold-light">Select Avatar Portrait</label>
                    <div className="flex space-x-3 pt-1">
                      {avatars.map((av) => {
                        const isSelected = selectedAvatar === av.url;
                        return (
                          <button
                            key={av.url}
                            type="button"
                            onClick={() => setSelectedAvatar(av.url)}
                            className={`relative focus:outline-none rounded-full border cursor-pointer ${
                              isSelected ? 'border-gold p-0.5' : 'border-transparent'
                            }`}
                          >
                            <img
                              src={av.url}
                              alt={av.label}
                              className="w-10 h-10 rounded-full object-cover"
                              title={av.label}
                              referrerPolicy="no-referrer"
                            />
                            {isSelected && (
                              <span className="absolute -bottom-1 -right-1 bg-gold text-black rounded-full p-0.5 text-[8px]">✓</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Message write-ups */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase font-bold tracking-widest text-gold-light">Reflections Comment *</label>
                    <textarea
                      rows={4}
                      required
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Share detailed reflections of L'Étoile dining choreography, pacing or wine pairing accuracy..."
                      className={`w-full py-3 px-4 text-xs tracking-wider rounded-none border focus:outline-none focus:border-gold transition-colors ${
                        darkMode ? 'bg-zinc-950 border-gold/10 text-white' : 'bg-zinc-50 border-gold/20 text-zinc-900'
                      }`}
                    />
                  </div>

                  {/* Success checks */}
                  {successMsg && (
                    <div className="flex items-center space-x-2 text-gold animate-bounce text-xs font-serif italic mt-2">
                      <CheckCircle className="h-4 w-4 shrink-0" />
                      <span>Your evaluations have been recorded dynamically!</span>
                    </div>
                  )}

                  {/* Submit CTA */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-gold hover:bg-gold-dark text-black text-xs font-sans tracking-widest font-bold uppercase transition-transform scale-100 hover:scale-101 cursor-pointer flex items-center justify-center space-x-2"
                    >
                      <Sparkles className="h-4 w-4" />
                      <span>SIGN BOOK</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
