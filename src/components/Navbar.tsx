/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Moon, Sun, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export default function Navbar({ currentPage, setCurrentPage, darkMode, setDarkMode }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'menu', label: 'Our Menu' },
    { id: 'reservation', label: 'Reservations' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'testimonials', label: 'Reviews' },
    { id: 'offers', label: 'Special Offers' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (pageId: string) => {
    setCurrentPage(pageId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? darkMode
              ? 'bg-black/40 border-b border-gold/20 backdrop-blur-md py-4'
              : 'bg-white/40 border-b border-gold/20 backdrop-blur-md py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              id="navbar-logo"
              className="flex items-center space-x-2 cursor-pointer group"
              onClick={() => handleNavClick('home')}
            >
              <Sparkles className="h-6 w-6 text-gold group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-serif text-2xl tracking-widest font-semibold flex items-center">
                <span className="text-gold">L&rsquo;</span>
                <span className={darkMode ? 'text-white' : 'text-zinc-900'}>ÉTOILE</span>
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <div id="desktop-menu" className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3 py-2 text-xs xl:text-sm font-sans tracking-widest font-medium transition-colors duration-300 ${
                    currentPage === item.id
                      ? 'text-gold'
                      : darkMode
                      ? 'text-gray-300 hover:text-gold'
                      : 'text-zinc-700 hover:text-gold'
                  }`}
                >
                  {item.label}
                  {currentPage === item.id && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-gold"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Header Right Action Elements */}
            <div id="navbar-actions" className="hidden md:flex items-center space-x-4">
              {/* Dark/Light mode toggle */}
              <button
                id="theme-toggle-btn"
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full border transition-all duration-300 ${
                  darkMode
                    ? 'border-gold/20 hover:border-gold hover:bg-gold/10 text-gold'
                    : 'border-gold/30 hover:border-gold-dark hover:bg-gold/5 text-gold-dark'
                }`}
                title={darkMode ? 'Switch to Ivory Marble' : 'Switch to Obsidian Darkness'}
              >
                {darkMode ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
              </button>

              <button
                id="nav-cta-reservation"
                onClick={() => handleNavClick('reservation')}
                className="px-6 py-2 border border-gold text-gold text-[11px] uppercase tracking-widest hover:bg-gold hover:text-black transition-all duration-300 bg-transparent rounded-none"
              >
                Book a Table
              </button>
            </div>

            {/* Mobile Actions: Theme, Menu Trigger */}
            <div id="mobile-controls" className="flex items-center space-x-2 lg:hidden">
              <button
                id="mobile-theme-toggle"
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full border transition-all duration-300 ${
                  darkMode
                    ? 'border-gold/20 text-gold'
                    : 'border-gold/30 text-gold-dark'
                }`}
              >
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>

              <button
                id="mobile-menu-trigger"
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-none border transition-colors ${
                  darkMode
                    ? 'border-gold/20 text-white hover:text-gold hover:border-gold'
                    : 'border-gold/30 text-zinc-900 hover:text-gold hover:border-gold'
                }`}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer (with animation) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-x-0 top-18 z-40 lg:hidden shadow-2xl border-b ${
              darkMode ? 'bg-obsidian border-gold/20' : 'bg-white border-gold/10'
            } backdrop-blur-lg max-h-[85vh] overflow-y-auto`}
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  id={`mobile-nav-link-${item.id}`}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 font-serif tracking-widest text-lg font-medium border-l-2 transition-all ${
                    currentPage === item.id
                      ? 'border-gold text-gold bg-gold/5'
                      : 'border-transparent text-gray-500 hover:text-gold'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
              <div className="pt-4 px-4">
                <button
                  id="mobile-cta-reservation"
                  onClick={() => handleNavClick('reservation')}
                  className="w-full py-4 bg-gradient-to-r from-gold-deep to-gold-dark text-black text-center font-sans tracking-widest font-semibold text-xs transition-all duration-300 shadow-md"
                >
                  BOOK A TABLE NOW
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
