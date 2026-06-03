/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Copy, Check, Clock, Sparkles, HelpCircle } from 'lucide-react';
import { OFFERS } from '../data';

interface OffersProps {
  darkMode: boolean;
  setCurrentPage: (page: string) => void;
}

export default function Offers({ darkMode, setCurrentPage }: OffersProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'seasonal' | 'tasting' | 'event'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = {
    all: 'All Promotions',
    tasting: 'Tasting flights',
    seasonal: 'Seasonal harvests',
    event: 'Elite banquets'
  };

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 3000);
  };

  // Filter pipeline
  const filteredOffers = useMemo(() => {
    return OFFERS.filter((item) => selectedCategory === 'all' || item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div id="promotions-page" className="pt-24 font-sans">
      {/* 1. Header Banner */}
      <section className="relative py-20 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1200&auto=format&fit=crop"
            alt="Gold wine bottles lining"
            className="w-full h-full object-cover filter brightness-[0.35]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-black/30"></div>
        </div>
        <div className="relative z-10 text-center max-w-4xl px-4">
          <Gift className="h-8 w-8 text-gold mx-auto mb-4" />
          <h1 className="font-serif text-4xl sm:text-6xl text-white font-bold tracking-widest uppercase">
            GASTRONOMIC GIFTS
          </h1>
          <p className="font-serif text-sm italic text-gold-light mt-3 tracking-widest">
            Seasonal experiences and exclusive vouchers curated for special celebrations.
          </p>
        </div>
      </section>

      {/* 2. Categorization selector chips */}
      <section className={`py-6 border-b ${darkMode ? 'bg-zinc-950 border-gold/15' : 'bg-zinc-50 border-gold/10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 md:justify-center overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {Object.entries(categories).map(([key, label]) => {
              const isSelected = selectedCategory === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key as any)}
                  className={`px-5 py-2.5 text-xs tracking-widest font-sans uppercase whitespace-nowrap cursor-pointer transition-colors ${
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

      {/* 3. Offer cards columns list */}
      <section className={`py-20 ${darkMode ? 'bg-obsidian text-white' : 'bg-white text-zinc-900'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            <AnimatePresence mode="popLayout">
              {filteredOffers.map((item, idx) => {
                const isCopied = copiedId === item.id;
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, delay: idx * 0.05 }}
                    className={`flex flex-col lg:flex-row items-stretch border relative transition-all duration-300 ${
                      darkMode ? 'bg-zinc-900 border-gold/10 hover:border-gold/25' : 'bg-zinc-50 border-gold/10 hover:border-gold/20'
                    }`}
                  >
                    {/* Visual Card Decor Corner details */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-gold/30"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-gold/30"></div>

                    {/* Image Banner on left: Coppers 5 cols */}
                    <div className="w-full lg:w-2/5 aspect-[16/10] lg:aspect-auto overflow-hidden relative min-h-[250px]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover filter brightness-[0.8]"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4 bg-obsidian/85 backdrop-blur-md border border-gold/30 px-3 py-1">
                        <span className="font-sans text-[9px] tracking-widest text-gold font-bold uppercase">{categories[item.category]}</span>
                      </div>
                    </div>

                    {/* Content Area on right: Coppers 7 cols */}
                    <div className="w-full lg:w-3/5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Sparkles className="h-4.5 w-4.5 text-gold" />
                          <span className="font-sans text-[10px] tracking-widest text-gold font-bold uppercase">OFFICIAL L&rsquo;ÉTOILE ACCELERATOR</span>
                        </div>
                        
                        <div className="space-y-1">
                          <h3 className={`font-serif text-2xl sm:text-3xl font-bold tracking-wider ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{item.title}</h3>
                          <p className="font-mono text-xs text-gold tracking-widest uppercase font-semibold">{item.subtitle} • {item.discount}</p>
                        </div>

                        <p className={`font-sans text-xs sm:text-sm tracking-wider leading-relaxed ${darkMode ? 'text-gray-400' : 'text-zinc-650'}`}>
                          {item.description}
                        </p>
                      </div>

                      {/* Code copy action box */}
                      <div className="pt-4 border-t border-gold/10 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                        {/* Promo Clip */}
                        <div className="flex items-center space-x-2">
                          <span className={`text-[10px] uppercase font-bold tracking-widest ${darkMode ? 'text-gray-500' : 'text-zinc-400'}`}>COUPON CODE:</span>
                          <button
                            onClick={() => handleCopyCode(item.id, item.promoCode)}
                            className="px-3.5 py-2 border border-gold/25 font-mono text-xs text-gold tracking-widest font-semibold hover:border-gold hover:bg-gold/5 flex items-center space-x-2 cursor-pointer"
                          >
                            <span>{item.promoCode}</span>
                            {isCopied ? (
                              <Check className="h-3.5 w-3.5 text-green-500" />
                            ) : (
                              <Copy className="h-3.5 w-3.5" />
                            )}
                          </button>
                        </div>

                        {/* Conditions and direct reserve jump */}
                        <div className="flex space-x-3 sm:justify-end">
                          <button
                            onClick={() => { setCurrentPage('reservation'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            className="px-5 py-3 bg-gradient-to-r from-gold-deep to-gold-dark text-black text-[10px] font-bold tracking-widest uppercase hover:brightness-110 cursor-pointer"
                          >
                            BOOK EXPERIENCE NOW
                          </button>
                        </div>
                      </div>

                      {/* Display fine conditions below */}
                      <div className="pt-2 text-[9px] font-sans text-zinc-500 space-y-1">
                        <p className="font-semibold uppercase tracking-widest flex items-center gap-1">
                          <HelpCircle className="h-3 w-3 inline text-gold-dark" /> Fine Details:
                        </p>
                        <ul className="list-disc pl-4 space-y-0.5 tracking-wide leading-normal">
                          {item.conditions.map((cond, cin) => (
                            <li key={cin}>{cond}</li>
                          ))}
                          <li>Expired Date: {item.expiryDate}</li>
                        </ul>
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
