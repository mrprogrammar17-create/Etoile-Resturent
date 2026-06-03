/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Twitter, Send, Award, Sparkles } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: string) => void;
  darkMode: boolean;
}

export default function Footer({ setCurrentPage, darkMode }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    // Persist newsletter signup locally as a high-fidelity touch
    const newsletters = JSON.parse(localStorage.getItem('letoile_newsletters') || '[]');
    newsletters.push({ email, date: new Date().toISOString() });
    localStorage.setItem('letoile_newsletters', JSON.stringify(newsletters));

    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 8000);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="main-footer"
      className={`relative pt-20 pb-10 border-t ${
        darkMode ? 'bg-obsidian border-gold/15 text-gray-400' : 'bg-zinc-50 border-gold/10 text-zinc-600'
      }`}
    >
      {/* Absolute Decorative Divider */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center space-x-3 bg-transparent">
        <div className={`h-[1px] w-20 ${darkMode ? 'bg-gradient-to-l from-gold to-transparent' : 'bg-gradient-to-l from-gold-dark to-transparent'}`}></div>
        <Sparkles className="h-4 w-4 text-gold hover:scale-125 transition-transform" />
        <div className={`h-[1px] w-20 ${darkMode ? 'bg-gradient-to-r from-gold to-transparent' : 'bg-gradient-to-r from-gold-dark to-transparent'}`}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand & Narrative */}
        <div id="footer-column-brand" className="space-y-6">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <Award className="h-6 w-6 text-gold" />
            <span className="font-serif text-2xl tracking-widest font-semibold text-gold">L&rsquo;ÉTOILE</span>
          </div>
          <p className="font-sans text-xs sm:text-sm tracking-wide leading-relaxed">
            Where culinary wizardry meets theatrical design. Experience Parisian fine dining under a constellation of golden memories nestled in the heart of the culinary district.
          </p>
          <div className="flex space-x-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 border border-gold/20 hover:border-gold hover:text-gold transition-all duration-300 rounded-full" aria-label="Instagram">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 border border-gold/20 hover:border-gold hover:text-gold transition-all duration-300 rounded-full" aria-label="Facebook">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 border border-gold/20 hover:border-gold hover:text-gold transition-all duration-300 rounded-full" aria-label="Twitter">
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Dynamic Pages Links */}
        <div id="footer-column-links" className="space-y-6">
          <h3 className="font-serif text-lg tracking-widest text-gold font-medium">EXPLORE</h3>
          <ul className="space-y-3 font-sans text-xs sm:text-sm tracking-wider">
            {[
              { id: 'about', label: 'Our Story' },
              { id: 'menu', label: 'Curated Menu' },
              { id: 'reservation', label: 'Reservations' },
              { id: 'gallery', label: 'Bespoke Gallery' },
              { id: 'testimonials', label: 'Guest Reviews' },
              { id: 'offers', label: 'Special Experiences' }
            ].map(link => (
              <li key={link.id}>
                <button
                  onClick={() => { setCurrentPage(link.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className={`hover:text-gold flex items-center space-x-1.5 transition-colors cursor-pointer text-left`}
                >
                  <span className="text-gold text-xs">◆</span>
                  <span>{link.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Operating Hours */}
        <div id="footer-column-hours" className="space-y-6">
          <h3 className="font-serif text-lg tracking-widest text-gold font-medium">HOURS OF DRAMA</h3>
          <ul className="space-y-4 font-sans text-xs sm:text-sm tracking-wider">
            <li className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-gold shrink-0 mt-0.5" />
              <div>
                <p className={darkMode ? 'text-white font-medium' : 'text-zinc-800 font-medium'}>TUE - SUN</p>
                <p className="text-xs">Lunch: 12:00 PM – 3:30 PM</p>
                <p className="text-xs">Dinner: 6:00 PM – 11:30 PM</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-zinc-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-zinc-500 font-medium">MONDAY</p>
                <p className="text-zinc-500 text-xs">Private Gastronomic Sabbatical</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Newsletter concierge */}
        <div id="footer-column-newsletter" className="space-y-6">
          <h3 className="font-serif text-lg tracking-widest text-gold font-medium">NEWSLETTER</h3>
          <p className="font-sans text-xs sm:text-sm tracking-wide leading-relaxed">
            Subscribe to receive exclusive invitations to secret tasting table dinners and seasonal updates of white truffles.
          </p>
          <form id="newsletter-form" onSubmit={handleSubscribe} className="relative mt-2">
            <input
              type="email"
              placeholder="Your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`w-full py-3 pl-4 pr-12 text-xs tracking-wider rounded-none border focus:outline-none transition-all ${
                darkMode
                  ? 'bg-zinc-950 border-gold/15 text-white focus:border-gold'
                  : 'bg-white border-gold/20 text-zinc-900 focus:border-gold-dark'
              }`}
            />
            <button
              type="submit"
              className="absolute right-0 top-0 h-full px-4 text-gold hover:text-white hover:bg-gold/15 transition-colors"
              aria-label="Subscribe"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
          {subscribed && (
            <p className="text-xs text-gold font-sans animate-pulse font-medium">
              ✓ Welcome to the Inner Circle. An invitation will arrive shortly.
            </p>
          )}
        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t ${
        darkMode ? 'border-gold/10' : 'border-gold/5'
      } flex flex-col md:flex-row items-center justify-between text-xs tracking-widest font-sans`}>
        <p className="mb-4 md:mb-0">
          © {currentYear} L&rsquo;Étoile Parisienne. All rights reserved. Registered Michelin Member.
        </p>
        <div className="flex space-x-6 text-gold-dark">
          <button onClick={() => setCurrentPage('contact')} className="hover:text-gold transition-colors">CONCIERGE</button>
          <span>•</span>
          <button onClick={() => setCurrentPage('reservation')} className="hover:text-gold transition-colors">RESERVATIONS</button>
          <span>•</span>
          <span className="text-zinc-600">PRIVACY POLICY</span>
        </div>
      </div>
    </footer>
  );
}
