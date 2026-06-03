/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'starters' | 'mains' | 'desserts' | 'wines' | 'signatures';
  image: string;
  tags: string[];
  rating: number;
  ingredients: string[];
  winePairing?: string;
  prepTime?: string;
  calories?: number;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
  dishName?: string;
  highlight?: boolean;
}

export interface Offer {
  id: string;
  title: string;
  subtitle: string;
  discount: string;
  promoCode: string;
  image: string;
  expiryDate: string;
  conditions: string[];
  description: string;
  category: 'seasonal' | 'tasting' | 'event';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'interior' | 'plating' | 'chef' | 'wine';
  image: string;
  description: string;
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  tablePref: 'standard' | 'window' | 'terrace' | 'vip_lounge';
  specialRequest?: string;
  status: 'confirmed' | 'pending';
}
