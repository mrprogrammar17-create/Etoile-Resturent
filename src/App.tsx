/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp, Award, Sparkles } from 'lucide-react';

// Import custom components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Menu from './components/Menu';
import Reservation from './components/Reservation';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Offers from './components/Offers';
import Contact from './components/Contact';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // 1. Interactive Loader Simulation (for cinematic entry)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2400); // Cinematic 2.4s loader

    return () => clearTimeout(timer);
  }, []);

  // 2. Back-To-Top Button Fader
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3. Dynamic Page SEO Title Synchronization
  useEffect(() => {
    const pageTitles: Record<string, string> = {
      home: "L'Étoile | Fine Dining - Michelin French Cuisine",
      about: "Our Story - L'Étoile Parisienne Legacy",
      menu: "Our Menu - Exquisite Gastronomy Chapters",
      reservation: "Book a Table - L'Étoile Concierge Booking",
      gallery: "Bespoke Gallery - Fine Plating & Salon Design",
      testimonials: "Guest Reviews & Reflections - L'Étoile Guestbook",
      offers: "Gastronomic Vouchers & Special Offers",
      contact: "Representative Support & Concierge Coordinates"
    };

    if (pageTitles[currentPage]) {
      document.title = pageTitles[currentPage];
    }
  }, [currentPage]);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // State-driven routing controller
  const renderActiveScreen = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} darkMode={darkMode} />;
      case 'about':
        return <About darkMode={darkMode} setCurrentPage={setCurrentPage} />;
      case 'menu':
        return <Menu darkMode={darkMode} />;
      case 'reservation':
        return <Reservation darkMode={darkMode} setCurrentPage={setCurrentPage} />;
      case 'gallery':
        return <Gallery darkMode={darkMode} />;
      case 'testimonials':
        return <Testimonials darkMode={darkMode} />;
      case 'offers':
        return <Offers darkMode={darkMode} setCurrentPage={setCurrentPage} />;
      case 'contact':
        return <Contact darkMode={darkMode} />;
      default:
        return <Home setCurrentPage={setCurrentPage} darkMode={darkMode} />;
    }
  };

  return (
    <div
      id="app-root-container"
      className={`min-h-screen transition-colors duration-500 font-sans relative overflow-x-hidden ${
        darkMode ? 'bg-obsidian text-zinc-300' : 'bg-[#FCFAF6] text-zinc-800'
      }`}
    >
      {/* Ambient Background Decor */}
      <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] bg-gold/15 rounded-full blur-[130px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[20%] right-[-5%] w-[500px] h-[500px] bg-gold/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute top-[40%] left-[5%] w-[450px] h-[450px] bg-gold/5 rounded-full blur-[110px] pointer-events-none z-0"></div>
      {/* A. Cinematic Luxury Pro-Preloader */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            id="app-luxury-preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center text-white"
          >
            <div className="space-y-6 text-center max-w-sm px-6 flex flex-col items-center">
              {/* Spinning Award */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                <Award className="h-14 w-14 text-gold" strokeWidth={1} />
              </motion.div>

              <div className="space-y-1">
                <h1 className="font-serif text-3xl sm:text-4xl tracking-[0.2em] font-semibold text-gold">
                  L&rsquo;ÉTOILE
                </h1>
                <p className="font-serif text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-zinc-500 italic">
                  PARISIAN MODERN GASTRONOMY
                </p>
              </div>

              {/* Progress Line */}
              <div className="w-48 h-[1px] bg-zinc-900 overflow-hidden relative rounded-full">
                <div className="absolute top-0 bottom-0 left-0 bg-gold animate-gold-shine w-1/3"></div>
              </div>

              <span className="font-sans text-[8px] tracking-[0.3em] text-zinc-650 uppercase">
                Choreographing senses...
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* B. Core Interactive Workspace App */}
      {!isLoading && (
        <>
          {/* Header Navigation */}
          <Navbar
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />

          {/* Dynamic Content view with smooth fade transitions */}
          <main id="main-content-window" className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.45 }}
              >
                {renderActiveScreen()}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Majestic Footer */}
          <Footer setCurrentPage={setCurrentPage} darkMode={darkMode} />

          {/* Back to top Button floating toggle */}
          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                id="back-to-top-btn"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={handleScrollTop}
                className="fixed bottom-8 right-8 z-40 p-3 bg-zinc-950 border border-gold hover:bg-gold hover:text-black text-gold shadow-lg shadow-black/80 transition-all cursor-pointer rounded-none group"
                title="Return to constellation"
              >
                <ArrowUp className="h-4.5 w-4.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.button>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
