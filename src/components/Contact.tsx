/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Compass, Sparkles } from 'lucide-react';

interface ContactProps {
  darkMode: boolean;
}

export default function Contact({ darkMode }: ContactProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [mapZoom, setMapZoom] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    // Save message locally as standard persistent interaction
    const messages = JSON.parse(localStorage.getItem('letoile_messages') || '[]');
    messages.push({ name, email, subject, message, date: new Date().toISOString() });
    localStorage.setItem('letoile_messages', JSON.stringify(messages));

    setSubmitted(true);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 8000);
  };

  return (
    <div id="contact-page" className="pt-24 font-sans">
      {/* 1. Header Banner */}
      <section className="relative py-20 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1200&auto=format&fit=crop"
            alt="Warm Paris lighting"
            className="w-full h-full object-cover filter brightness-[0.35]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-black/30"></div>
        </div>
        <div className="relative z-10 text-center max-w-4xl px-4">
          <Compass className="h-8 w-8 text-gold mx-auto mb-4" />
          <h1 className="font-serif text-4xl sm:text-6xl text-white font-bold tracking-widest uppercase">
            CONCIERGE PORTAL
          </h1>
          <p className="font-serif text-sm italic text-gold-light mt-3 tracking-widest">
            For private event space, media, cellier appraisals, and custom culinary planning.
          </p>
        </div>
      </section>

      {/* 2. Coordinates, Working Hours, and Message form */}
      <section className={`py-20 ${darkMode ? 'bg-obsidian text-white' : 'bg-white text-zinc-900'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Quick coordinates: Column spans 4 */}
            <div className="lg:col-span-4 space-y-8">
              {/* Box 1: Coordinates details */}
              <div className="border border-gold/15 p-6 bg-charcoal/40 relative">
                <div className="absolute -top-[1px] left-4 bg-gold text-black text-[9px] font-sans tracking-[0.25em] px-3 py-0.5 font-bold uppercase">
                  COORDINATES
                </div>
                <ul className="space-y-6 pt-4 text-xs sm:text-sm tracking-wider font-sans text-gray-400">
                  <li className="flex items-start space-x-3.5">
                    <MapPin className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <p className={darkMode ? 'text-white font-bold' : 'text-zinc-900 font-bold'}>PARIS RESIDENCE</p>
                      <p className="text-xs leading-normal mt-1">9 Place des Vosges, 75004 Paris, France</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3.5">
                    <Phone className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <p className={darkMode ? 'text-white font-bold' : 'text-zinc-900 font-bold'}>DIRECT CONCIERGE</p>
                      <p className="text-xs leading-normal mt-1">+33 1 42 78 15 15</p>
                      <p className="text-[10px] text-zinc-500 mt-0.5">Available 10:00 AM – 11:30 PM UTC</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3.5">
                    <Mail className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <p className={darkMode ? 'text-white font-bold' : 'text-zinc-900 font-bold'}>SECURE ELECTRONICMAIL</p>
                      <p className="text-xs leading-normal mt-1">concierge@letoile-paris.com</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Box 2: Operating Hours */}
              <div className="border border-gold/15 p-6 bg-charcoal/40 relative">
                <div className="absolute -top-[1px] left-4 bg-gold text-black text-[9px] font-sans tracking-[0.25em] px-3 py-0.5 font-bold uppercase">
                  JOURS DE DRAME
                </div>
                <div className="pt-4 space-y-4 font-sans text-xs tracking-wider text-gray-400">
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <p className={darkMode ? 'text-white font-bold' : 'text-zinc-900 font-bold'}>WEEKDAY CHOREOGRAPHY</p>
                      <p className="text-xs mt-0.5">TUE - SUN: 12:00 PM – 11:30 PM</p>
                      <p className="text-[10px] text-zinc-500 mt-0.5">Kitchen closes at 10:45 PM for dessert curation</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 opacity-60">
                    <Clock className="h-5 w-5 text-zinc-650 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">MONDAY SABBATICAL</p>
                      <p className="text-xs mt-0.5">CLOSED</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact concierge dispatch: Column spans 8 */}
            <div className="lg:col-span-8">
              <div className="border border-gold/15 p-6 sm:p-8 bg-charcoal/30 relative space-y-6">
                <div>
                  <h3 className="font-serif text-xl text-gold tracking-widest uppercase font-semibold">Concierge Inquiry Form</h3>
                  <p className="font-sans text-[9px] text-zinc-500 tracking-widest uppercase mt-0.5">A specialist will reply in 24 hours</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase font-bold tracking-widest text-gold-light">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Representative name..."
                        className={`w-full py-3.5 px-4 text-xs tracking-wider rounded-none border focus:outline-none focus:border-gold transition-colors ${
                          darkMode ? 'bg-zinc-950 border-gold/10 text-white' : 'bg-zinc-50 border-gold/20 text-zinc-900'
                        }`}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase font-bold tracking-widest text-gold-light">Your Email *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Electronic mail address..."
                        className={`w-full py-3.5 px-4 text-xs tracking-wider rounded-none border focus:outline-none focus:border-gold transition-colors ${
                          darkMode ? 'bg-zinc-950 border-gold/10 text-white' : 'bg-zinc-50 border-gold/20 text-zinc-900'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase font-bold tracking-widest text-gold-light">Subject of Coordination *</label>
                    <input
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Press interview, Private room banquet booking, Sommelier appraisal..."
                      className={`w-full py-3.5 px-4 text-xs tracking-wider rounded-none border focus:outline-none focus:border-gold transition-colors ${
                        darkMode ? 'bg-zinc-950 border-gold/10 text-white' : 'bg-zinc-50 border-gold/20 text-zinc-900'
                      }`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase font-bold tracking-widest text-gold-light">Detailed message *</label>
                    <textarea
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please draft details, group numbers, dietary restrictions, preferred calendar dates..."
                      className={`w-full py-3.5 px-4 text-xs tracking-wider rounded-none border focus:outline-none focus:border-gold transition-colors ${
                        darkMode ? 'bg-zinc-950 border-gold/10 text-white' : 'bg-zinc-50 border-gold/20 text-zinc-900'
                      }`}
                    />
                  </div>

                  {submitted && (
                    <div className="flex items-center space-x-2 text-gold text-xs font-serif italic animate-bounce">
                      <CheckCircle className="h-4.5 w-4.5 shrink-0" />
                      <span>Request recorded successfully! An invitation or receipt copy has been dispatched to your files.</span>
                    </div>
                  )}

                  <div>
                    <button
                      type="submit"
                      className="w-full py-4 bg-gold hover:bg-gold-dark text-black text-xs font-sans tracking-widest font-bold uppercase transition-all duration-300 shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <Send className="h-4 w-4" />
                      <span>DISPATCH INQUIRY</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Custom Simulated Interactive Map Vector Panel (Highly Premium Custom UI) */}
      <section className={`py-12 border-t ${darkMode ? 'bg-zinc-950 border-gold/15' : 'bg-zinc-50 border-gold/10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center">
            <h3 className="font-serif text-lg text-gold tracking-widest uppercase">THE ARRIVAL COMPASS</h3>
            <p className="font-sans text-[9px] text-gray-500 tracking-widest uppercase mt-0.5">Interactive vector mapping of Place des Vosges</p>
          </div>

          <div className="relative aspect-[21/9] w-full rounded-none border border-gold/15 bg-zinc-950 text-white overflow-hidden p-6 flex flex-col justify-between">
            {/* Map lines decor (simulates streets grid elegantly) */}
            <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(#AA7C11_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            {/* Custom SVG line grid overlay */}
            <svg className="absolute inset-0 w-full h-full z-0 opacity-15 pointer-events-none stroke-gold" fill="none">
              <line x1="10%" y1="0" x2="10%" y2="100%" />
              <line x1="30%" y1="0" x2="40%" y2="100%" />
              <line x1="70%" y1="0" x2="55%" y2="100%" />
              <line x1="90%" y1="0" x2="90%" y2="100%" />
              <line x1="0" y1="20%" x2="100%" y2="20%" />
              <line x1="0" y1="50%" x2="100%" y2="50%" />
              <line x1="0" y1="80%" x2="100%" y2="80%" />
              <circle cx="50%" cy="50%" r={50 * mapZoom} />
              <circle cx="50%" cy="50%" r={110 * mapZoom} />
            </svg>

            {/* Compass rose card */}
            <div className="relative z-10 bg-black/80 backdrop-blur-md border border-gold/20 p-4 max-w-[240px] text-[10px] space-y-2 font-mono">
              <div className="flex items-center space-x-1.5 text-gold font-bold">
                <Compass className="h-4 w-4 animate-spin-slow rotate-12" />
                <span>GPS VECTOR: 48.8554° N, 2.3669° E</span>
              </div>
              <p className="text-gray-400 leading-tight">Located in the historical Marais district, directly bordering the royal courtyard garden.</p>
              <div className="flex space-x-2 pt-1.5 border-t border-gold/10">
                <button onClick={() => setMapZoom(prev => Math.min(prev + 0.2, 2))} className="px-2 py-1 border border-gold/30 hover:border-gold text-gold cursor-pointer font-bold">ZOOM +</button>
                <button onClick={() => setMapZoom(prev => Math.max(prev - 0.2, 0.6))} className="px-2 py-1 border border-gold/30 hover:border-gold text-gold cursor-pointer font-bold">ZOOM -</button>
              </div>
            </div>

            {/* Animated Pin Marker right in center */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <MapPin className="h-8 w-8 text-gold fill-black" strokeWidth={1.5} />
              </motion.div>
              <div className="h-1.5 w-4 bg-gold/30 blur-[2px] rounded-full scale-x-125 mt-0.5 animate-pulse"></div>
              <span className="font-serif text-[11px] font-bold text-white tracking-widest bg-black/90 border border-gold px-2.5 py-1 uppercase mt-1 z-12">
                L&rsquo;ÉTOILE RESTAURANT
              </span>
            </div>

            {/* Map footer markers */}
            <div className="relative z-10 flex justify-between text-[8px] sm:text-[9px] font-sans tracking-widest font-semibold uppercase text-zinc-500">
              <span>◆ METRO: SAINT-PAUL (LINE 1)</span>
              <span>◆ METRO: BASTILLE (LINES 1, 5, 8)</span>
              <span>◆ PRIVATE CONCIERGE PARKING AVAILABLE</span>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
