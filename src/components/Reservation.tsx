/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, Users, Armchair, CheckCircle, Flame, Sparkles, Phone, Mail } from 'lucide-react';
import { Reservation } from '../types';

interface ReservationProps {
  darkMode: boolean;
  setCurrentPage: (page: string) => void;
}

export default function ReservationPage({ darkMode, setCurrentPage }: ReservationProps) {
  // Input states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('19:00');
  const [guests, setGuests] = useState(2);
  const [tablePref, setTablePref] = useState<'standard' | 'window' | 'terrace' | 'vip_lounge'>('standard');
  const [specialRequest, setSpecialRequest] = useState('');
  
  // Custom seating grid selections (simulates choosing a physical table)
  const [selectedSeatTable, setSelectedSeatTable] = useState<number | null>(null);

  // Submission control
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Reservation | null>(null);

  const timeSlots = [
    '12:00', '13:00', '14:00', '18:00', '19:00', '20:00', '21:00', '22:00'
  ];

  const tablesMap = [
    { id: 1, label: 'Table d\'Or 1', seats: 2, zone: 'window' },
    { id: 2, label: 'Table d\'Or 2', seats: 4, zone: 'window' },
    { id: 3, label: 'Grand Terrace 3', seats: 4, zone: 'terrace' },
    { id: 4, label: 'Grand Terrace 4', seats: 6, zone: 'terrace' },
    { id: 5, label: 'Pétrus Sanctum 5', seats: 2, zone: 'vip_lounge' },
    { id: 6, label: 'Krug Pavillon 6', seats: 8, zone: 'vip_lounge' },
    { id: 7, label: 'Salon Standard 7', seats: 4, zone: 'standard' },
    { id: 8, label: 'Salon Standard 8', seats: 2, zone: 'standard' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !date) return;

    setIsSubmitting(true);

    const newReservation: Reservation = {
      id: 'res-' + Math.floor(Math.random() * 1000000),
      name,
      email,
      phone,
      date,
      time,
      guests,
      tablePref,
      specialRequest: specialRequest || undefined,
      status: tablePref === 'vip_lounge' ? 'pending' : 'confirmed'
    };

    setTimeout(() => {
      // Save reservation in local storage as a real durable interaction
      const currentReservations = JSON.parse(localStorage.getItem('letoile_reservations') || '[]');
      currentReservations.push(newReservation);
      localStorage.setItem('letoile_reservations', JSON.stringify(currentReservations));

      setConfirmedBooking(newReservation);
      setIsSubmitting(false);

      // Reset values
      setName('');
      setEmail('');
      setPhone('');
      setDate('');
      setGuests(2);
      setTablePref('standard');
      setSelectedSeatTable(null);
      setSpecialRequest('');
    }, 1800);
  };

  return (
    <div id="reservation-page" className="pt-24 font-sans">
      {/* 1. Header Banner */}
      <section className="relative py-20 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1578911373434-0cb395d2cbfb?q=80&w=1200&auto=format&fit=crop"
            alt="Table service setting"
            className="w-full h-full object-cover filter brightness-[0.35]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-black/30"></div>
        </div>
        <div className="relative z-10 text-center max-w-4xl px-4">
          <Armchair className="h-8 w-8 text-gold mx-auto mb-4" />
          <h1 className="font-serif text-4xl sm:text-6xl text-white font-bold tracking-widest uppercase">
            SECURE YOUR CONSTELLATION
          </h1>
          <p className="font-serif text-sm italic text-gold-light mt-3 tracking-widest">
            Bookings are open 60 days in advance. VIP experiences require personal concierge vetting.
          </p>
        </div>
      </section>

      {/* 2. Main Reservation Lounge Layout */}
      <section className={`py-20 ${darkMode ? 'bg-obsidian text-white' : 'bg-white text-zinc-900'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Form Fields: Column spans 7 */}
            <div className="lg:col-span-7 space-y-8">
              <div className="border border-gold/15 p-6 sm:p-8 rounded-none bg-charcoal/30 relative">
                <h2 className="font-serif text-2xl tracking-widest text-gold mb-6 uppercase">Concierge Request Form</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-gold-light">Representative Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jean-Luc Picard"
                        className={`w-full py-3.5 px-4 text-xs tracking-wider rounded-none border focus:outline-none focus:border-gold transition-colors ${
                          darkMode ? 'bg-zinc-950 border-gold/10 text-white' : 'bg-zinc-50 border-gold/20 text-zinc-900'
                        }`}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-gold-light">Secure Email *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="jean-luc@starfleet.com"
                        className={`w-full py-3.5 px-4 text-xs tracking-wider rounded-none border focus:outline-none focus:border-gold transition-colors ${
                          darkMode ? 'bg-zinc-950 border-gold/10 text-white' : 'bg-zinc-50 border-gold/20 text-zinc-900'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone & Guests */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-gold-light">Concierge Contact Phone *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+33 1 42 78 15 15"
                        className={`w-full py-3.5 px-4 text-xs tracking-wider rounded-none border focus:outline-none focus:border-gold transition-colors ${
                          darkMode ? 'bg-zinc-950 border-gold/10 text-white' : 'bg-zinc-50 border-gold/20 text-zinc-900'
                        }`}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-gold-light">Representative Guests *</label>
                      <div className="flex items-center space-x-1 border border-gold/10">
                        {[1, 2, 4, 6, 8, 12].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setGuests(num)}
                            className={`flex-1 py-3 text-xs font-semibold hover:bg-gold/5 transition-all text-center ${
                              guests === num ? 'bg-gold text-black hover:bg-gold' : 'text-gray-400'
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Date & Time Picker */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-gold-light">Selected Date *</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-3.5 h-4 w-4 text-gold-dark" />
                        <input
                          type="date"
                          required
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className={`w-full py-3 pl-12 pr-4 text-xs tracking-wider rounded-none border focus:outline-none focus:border-gold transition-colors ${
                            darkMode ? 'bg-zinc-950 border-gold/10 text-white select-none' : 'bg-zinc-50 border-gold/20 text-zinc-900'
                          }`}
                        />
                      </div>
                    </div>
                    <div className="space-y-2 opacity-100">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-gold-light">Preferred Flight Hour *</label>
                      <div className="grid grid-cols-4 gap-2">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setTime(slot)}
                            className={`py-2 text-[10px] font-sans border tracking-widest cursor-pointer transition-all ${
                              time === slot
                                ? 'bg-gold border-gold text-black font-bold'
                                : darkMode
                                ? 'border-gold/10 text-gray-400 hover:border-gold'
                                : 'border-gold/20 text-zinc-800 hover:border-gold'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Location Area Preferences */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-gold-light">Bespoke Zone Selection</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {[
                        { id: 'standard', label: 'Grande Salon', desc: 'Symphonic, classical Murano lights' },
                        { id: 'window', label: 'Boulevard window', desc: 'Candle-lit view' },
                        { id: 'terrace', label: 'Bonsai Terrace', desc: 'Heated open-air greenery' },
                        { id: 'vip_lounge', label: 'Pétrus Crypt (VIP)', desc: 'Concierge vetted, pre-paired' },
                      ].map((pref) => (
                        <button
                          key={pref.id}
                          type="button"
                          onClick={() => setTablePref(pref.id as any)}
                          className={`p-3 text-left border rounded-none transition-all cursor-pointer ${
                            tablePref === pref.id
                              ? 'border-gold bg-gold/5 text-gold'
                              : darkMode
                              ? 'border-gold/10 text-gray-400 hover:border-gold/20'
                              : 'border-gold/15 text-zinc-700 hover:border-gold/20'
                          }`}
                        >
                          <p className="font-serif text-xs font-semibold uppercase">{pref.label}</p>
                          <p className="text-[9px] text-zinc-500 font-sans tracking-wide mt-1 leading-tight">{pref.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Row 4: Special Instructions */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-gold-light">Allergies, Dietary Specs, or Anniversaries</label>
                    <textarea
                      rows={3}
                      value={specialRequest}
                      onChange={(e) => setSpecialRequest(e.target.value)}
                      placeholder="e.g. Vegetarian, anniversary tableside flower arrangements, strictly shellfish-free..."
                      className={`w-full py-3 px-4 text-xs tracking-wider rounded-none border focus:outline-none focus:border-gold transition-colors ${
                        darkMode ? 'bg-zinc-950 border-gold/10 text-white' : 'bg-zinc-50 border-gold/20 text-zinc-900'
                      }`}
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gradient-to-r from-gold-deep via-gold to-gold-dark text-black rounded-none text-xs tracking-[0.2em] font-bold transition-all hover:brightness-110 shadow-lg cursor-pointer flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-4.5 w-4.5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                          <span>ENGRAVING IN THE BOOK...</span>
                        </>
                      ) : (
                        <>
                          <span>SEAL THE TABLE REQUEST</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Sidebar Floor Plan Seating Selector: Column spans 5 */}
            <div className="lg:col-span-5 space-y-8">
              {/* Seating chart header */}
              <div className="border border-gold/15 p-6 rounded-none bg-charcoal/40 relative space-y-6">
                <div>
                  <h3 className="font-serif text-lg text-gold tracking-widest uppercase">THE DINING MAP</h3>
                  <p className="font-sans text-[9px] text-gray-500 tracking-widest uppercase mt-0.5">Select a real table number to coordinate seating</p>
                </div>

                {/* Simulated visual layout floorplan */}
                <div className="aspect-square w-full rounded-none border border-gold/10 bg-zinc-950/70 p-6 flex flex-col justify-between relative overflow-hidden">
                  {/* Stage/Dumont Chef Pod indicators */}
                  <div className="h-6 bg-gold/10 border-b border-gold/20 flex items-center justify-center text-[9px] tracking-[0.3em] font-sans font-bold text-gold">
                    LAURENT KITCHEN PODIUM
                  </div>

                  {/* Seat Grid */}
                  <div className="grid grid-cols-4 gap-4 flex-1 items-center justify-items-center py-6">
                    {tablesMap.map((tbl) => {
                      const isMatchingZone = tbl.zone === tablePref;
                      const isSelected = selectedSeatTable === tbl.id;
                      return (
                        <button
                          key={tbl.id}
                          type="button"
                          onClick={() => {
                            setSelectedSeatTable(tbl.id);
                            setTablePref(tbl.zone as any);
                          }}
                          className={`w-12 h-12 rounded-none border flex flex-col items-center justify-center transition-all ${
                            isSelected
                              ? 'bg-gold border-gold text-black scale-105 shadow-md shadow-gold/20 font-bold'
                              : isMatchingZone
                              ? 'border-gold-light text-gold-light bg-gold/5 hover:bg-gold/10'
                              : 'border-zinc-800 text-zinc-600 hover:border-zinc-700'
                          }`}
                          title={`${tbl.label} - ${tbl.seats} Guests`}
                        >
                          <span className="font-mono text-[9px] tracking-wide">{tbl.id}</span>
                          <span className="text-[7px] font-sans opacity-70">{tbl.seats}P</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Floor plan legendary indicators */}
                  <div className="flex justify-between text-[8px] font-sans text-gray-500 font-semibold uppercase tracking-wider">
                    <span className="flex items-center space-x-1"><span className="w-2 h-2 border border-gold bg-gold/5 block"></span><span>Preferred Zone</span></span>
                    <span className="flex items-center space-x-1"><span className="w-2 h-2 bg-gold block"></span><span>Selected Table</span></span>
                    <span className="flex items-center space-x-1"><span className="w-2 h-2 border border-zinc-850 block"></span><span>Standard</span></span>
                  </div>
                </div>

                {/* Real-time details summary checklist */}
                <div className="pt-4 border-t border-gold/10 space-y-3 font-sans text-xs tracking-wider">
                  <h4 className="font-serif text-[10px] text-gold tracking-widest uppercase">CONCIERGE SUMMARY</h4>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-gray-500">Representative:</span>
                      <span className="text-gold font-bold">{name || 'Await name...'}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Date & Hour:</span>
                      <span className="text-gold font-bold">{date ? `${date} at ${time}` : 'Await parameter...'}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Bespoke Zone:</span>
                      <span className="text-gold font-bold uppercase">{tablePref}</span>
                    </li>
                    {selectedSeatTable && (
                      <li className="flex justify-between">
                        <span className="text-gray-500">Assigned Table:</span>
                        <span className="text-gold font-bold uppercase">Table {selectedSeatTable} ({tablesMap.find(t => t.id === selectedSeatTable)?.label})</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Golden Confirmed Booking Overlay Modal */}
      <AnimatePresence>
        {confirmedBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative max-w-xl w-full border border-gold p-8 sm:p-12 text-center bg-zinc-950 text-white space-y-6"
            >
              {/* Corner Frame decor */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-gold"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-gold"></div>

              <CheckCircle className="h-16 w-16 text-gold mx-auto animate-pulse" />
              <h2 className="font-serif text-3xl text-gold font-bold tracking-widest uppercase">
                YOUR SEAT IS SEALED
              </h2>
              <p className="font-serif text-sm text-gold-light italic tracking-widest">
                Verification complete. Invitation dispatched to {confirmedBooking.email}
              </p>

              <div className="py-6 border-t border-b border-gold/20 max-w-sm mx-auto space-y-4 text-xs font-sans tracking-widest uppercase">
                <p className="text-gold font-semibold">Tasting flight code: {confirmedBooking.id}</p>
                <div className="flex justify-between text-gray-400">
                  <span>Guest representative:</span>
                  <span className="text-white font-medium">{confirmedBooking.name}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Party size:</span>
                  <span className="text-white font-medium">{confirmedBooking.guests} Guests</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Concierge Hour:</span>
                  <span className="text-white font-medium">{confirmedBooking.date} • {confirmedBooking.time}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Allocated Zone:</span>
                  <span className="text-white font-medium">{confirmedBooking.tablePref}</span>
                </div>
              </div>

              <p className="text-[10px] text-gray-500 font-sans tracking-wide leading-relaxed max-w-sm mx-auto">
                {confirmedBooking.tablePref === 'vip_lounge'
                  ? 'Your special private VIP status requires active cellier coordination. A personal concierge will phone you in 2 hours.'
                  : 'Your table has been automatically scheduled in the dining book. Dress code: Formal culinary eveningwear.'}
              </p>

              <div className="pt-4">
                <button
                  onClick={() => setConfirmedBooking(null)}
                  className="px-8 py-3.5 bg-gold hover:bg-gold-dark text-black font-sans text-xs tracking-widest font-bold uppercase transition-all duration-300"
                >
                  SECURE ANOTHER DATE
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
