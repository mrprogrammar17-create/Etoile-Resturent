/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Award, Compass, Star, Heart, Flame } from 'lucide-react';

interface AboutProps {
  darkMode: boolean;
  setCurrentPage: (page: string) => void;
}

export default function About({ darkMode, setCurrentPage }: AboutProps) {
  const team = [
    {
      name: 'Chef Laurent Dumont',
      role: 'Executive Chef & Visionary',
      bio: 'Trained under French culinary gods in Paris, Laurent translates architectural geometry and organic structures into award-winning culinary plates.',
      image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=400&auto=format&fit=crop',
    },
    {
      name: 'Amandine Valois',
      role: 'Head Sommelier',
      bio: 'Presides over our legendary cellar containing over 10,000 vintages. Amandine specializes in pairing dynamic modern French dishes with forgotten Loire Valley biodynamic selections.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    },
    {
      name: 'Benoît Mercier',
      role: 'Master Pastry Chef',
      bio: 'The structural genius behind our tableside blown sugar spheres. Benoît treats desserts as interactive kinetic sculptures that balance warmth, chill, and acidity.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    },
  ];

  const milestones = [
    { year: '1998', title: 'The Dream Begun', desc: 'L\'Étoile opens its doors in a historic Parisian estate under Founder Jean-Luc Dumont.' },
    { year: '2008', title: 'The First Star Sparkles', desc: 'Honored with its first Michelin Star for groundbreaking tableside flambé techniques.' },
    { year: '2016', title: 'Laurent Takes the Helm', desc: 'Son Laurent Dumont elevates the dining room, integrating glassmorphism architecture and rare Asian spices.' },
    { year: '2022', title: 'Bespoke Private Crypt Built', desc: 'Amandine Valois constructs our subterranean wine vault, cataloging legendary Pétrus and Krug champagnes.' },
    { year: '2026', title: 'The Triple Constellation', desc: 'Awarded the highest culinary honor of Three Michelin stars for pure perfection in execution.' },
  ];

  return (
    <div id="about-page" className="pt-24 font-sans">
      {/* 1. Header Hero Banuer */}
      <section className="relative py-28 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1250&auto=format&fit=crop"
            alt="Warm Dining Interior"
            className="w-full h-full object-cover filter brightness-[0.35] scale-102"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-black/30"></div>
        </div>
        <div className="relative z-10 text-center max-w-4xl px-4">
          <p className="text-gold font-sans text-xs sm:text-sm tracking-[0.3em] font-medium uppercase mb-3">OUR CHRONICLES</p>
          <h1 className="font-serif text-4xl sm:text-6xl text-white font-bold tracking-widest uppercase">
            THE LEGACY OF L&rsquo;ÉTOILE
          </h1>
          <div className="h-[2px] w-16 bg-gold mx-auto mt-6"></div>
        </div>
      </section>

      {/* 2. Double Column Storytelling Block */}
      <section className={`py-24 ${darkMode ? 'bg-obsidian text-white' : 'bg-white text-zinc-900'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Story */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Compass className="h-5 w-5 text-gold" style={{ strokeWidth: 1.5 }} />
                <span className="text-gold tracking-[0.3em] text-xs font-bold uppercase">PHILOSOPHY OF FAITH</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl tracking-widest font-semibold leading-tight text-gold-light uppercase">
                A HEAVENLY TALE OF DISCIPLINE & CRAFT
              </h2>
              <p className="text-xs sm:text-sm tracking-widest leading-relaxed text-gray-400">
                L&rsquo;Étoile was founded on a simple, yet extraordinarily rigorous belief: culinary creation is a form of fine drama. Each ingredient must possess a verifiable lineage, each plating must challenge structural weight, and each service must feel like a synchronized opera of elegance.
              </p>
              <p className="text-xs sm:text-sm tracking-widest leading-relaxed text-gray-500">
                To achieve such perfect heights, we discard over-complicated processing. Instead, we master foundational elements: embers, temperature limits, high-pressure extractions, silk reductions, and blown sugar geometry.
              </p>
              
              <div className="pt-6">
                <button
                  onClick={() => setCurrentPage('menu')}
                  className="px-8 py-3.5 bg-gold text-black text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5 cursor-pointer rounded-none shadow-[0_10px_30px_rgba(197,160,89,0.2)]"
                >
                  VIEW THE ALCHEMY
                </button>
              </div>
            </div>

            {/* Cinematic Story Image panel */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full border border-gold/20 -z-10 translate-x-2 translate-y-2"></div>
              <img
                src="https://images.unsplash.com/photo-1581299894007-aaa50297cf16?q=80&w=800&auto=format&fit=crop"
                alt="Chef preparing signature plates"
                className="w-full object-cover filter brightness-[0.8] aspect-[4/3] border border-gold/15"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Executive Chef Editorial Presentation */}
      <section className={`py-24 border-t border-b ${darkMode ? 'bg-zinc-950 border-gold/15 text-white' : 'bg-zinc-50 border-gold/10 text-zinc-900'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Portrait Frame */}
            <div className="w-full lg:w-2/5 relative">
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-gold z-10"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-gold z-10"></div>
              <div className="overflow-hidden aspect-[3/4]">
                <img
                  src={team[0].image}
                  alt={team[0].name}
                  className="w-full h-full object-cover filter hover:scale-105 transition-transform duration-1000 brightness-90"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Editorial Content */}
            <div className="w-full lg:w-3/5 space-y-6">
              <div className="flex items-center space-x-2">
                <Flame className="h-5 w-5 text-gold" />
                <span className="text-gold tracking-[0.25em] text-xs font-bold uppercase">THE EXECUTIVE ARCHITECT</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl tracking-widest font-bold text-gold uppercase">
                CHEF LAURENT DUMONT
              </h2>
              <p className="font-serif text-sm italic text-gold-light tracking-wider">
                &ldquo;A perfect dish must trigger three distinct registers: dynamic memory, visual weight architecture, and cellular surprise.&rdquo;
              </p>
              <div className="space-y-4 text-xs sm:text-sm tracking-widest leading-relaxed text-gray-400">
                <p>
                  Dumont studied culinary arts in Paris, apprenticing in numerous double and triple Michelin kitchens. He views cooking as a kinetic craft, utilizing seasonal changes to balance thermal heat maps on a guest&rsquo;s tongue.
                </p>
                <p>
                  His culinary blueprints are drafted by hand before hitting the hot stoves—combining organic geometry, gold foils, wild micro-succulents, and custom wood-smoked air to envelope L&rsquo;Étoile guests in a multi-sensory bubble.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Team Culinary Guild Masteries */}
      <section className={`py-24 ${darkMode ? 'bg-obsidian text-white' : 'bg-white text-zinc-900'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gold font-sans text-xs tracking-[0.25em] font-semibold uppercase mb-2">THE CONCIERGE GUILD</p>
            <h2 className="font-serif text-2xl sm:text-3xl tracking-widest text-gold-dark uppercase font-semibold">
              MASTERS OF THE SENSES
            </h2>
            <div className="h-[2px] w-16 bg-gold mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className={`p-6 border flex flex-col justify-between h-full transition-all duration-300 ${
                  darkMode ? 'bg-zinc-900 border-gold/10 hover:border-gold/30' : 'bg-zinc-50 border-gold/10 hover:border-gold/20'
                }`}
              >
                <div className="space-y-4">
                  <div className="aspect-[4/3] overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h3 className="font-serif text-lg tracking-wider text-gold font-semibold uppercase mt-4">{member.name}</h3>
                  <p className="font-sans text-[10px] tracking-widest text-gold uppercase font-semibold">{member.role}</p>
                  <p className="font-sans text-xs tracking-wider leading-relaxed text-gray-500">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Gilded Timeline of Accolades */}
      <section className={`py-24 border-t border-b ${darkMode ? 'bg-zinc-950 border-gold/15 text-white' : 'bg-zinc-50 border-gold/10 text-zinc-900'}`}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <Award className="h-8 w-8 text-gold mx-auto mb-4" />
            <h2 className="font-serif text-2xl sm:text-3xl tracking-widest text-gold uppercase font-semibold">
              HISTORIC HARVESTS
            </h2>
            <p className="font-sans text-[9px] tracking-widest text-gray-500 uppercase mt-1">Our path to perfection</p>
          </div>

          <div className="relative border-l-2 border-gold/15 pl-6 sm:pl-10 space-y-12 max-w-3xl mx-auto">
            {milestones.map((item, idx) => (
              <div key={item.year} className="relative group">
                {/* Timeline Orb */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 h-4 w-4 bg-obsidian border-2 border-gold rounded-full group-hover:bg-gold transition-all duration-300"></div>

                <div className="space-y-1.5">
                  <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-gold bg-gold/5 px-2.5 py-1 border border-gold/20">
                    {item.year}
                  </span>
                  <h3 className={`font-serif text-lg tracking-wider font-semibold mt-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{item.title}</h3>
                  <p className="font-sans text-xs tracking-wider leading-relaxed text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
