import { Dish, Review, Offer, GalleryItem } from './types';

// Exquisite dishes curated for L'Étoile
export const DISHES: Dish[] = [
  {
    id: 'starter-1',
    name: 'Oscietra Caviar Imperial',
    description: 'Golden Oscietra caviar served on dry ice with standard blinis, crême fraîche, sieved organic egg yolk, and fine chives.',
    price: 185,
    category: 'starters',
    image: 'https://tse1.mm.bing.net/th/id/OIP.O662isscdQ30TSF-Rwn98wHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    tags: ['Signature', 'Gluten-Free Option'],
    rating: 4.9,
    ingredients: ['Oscietra Caviar', 'Crème Fraîche', 'Organic Egg', 'Buckwheat Blinis'],
    winePairing: 'Krug Clos d\'Ambonnay Champagne 2002',
    prepTime: '10 mins',
    calories: 220
  },
  {
    id: 'starter-2',
    name: 'Pan-Seared Foie Gras de Canard',
    description: 'Artisanal duck liver caramelized with heirloom mission fig compote, aged balsamic reduction, and toasted homemade brioche.',
    price: 48,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop',
    tags: ['Classic French'],
    rating: 4.8,
    ingredients: ['Foie Gras', 'Mission Figs', 'Balsamic of Modena', 'Sweet Brioche'],
    winePairing: 'Château d\'Yquem Sauternes 2015',
    prepTime: '15 mins',
    calories: 410
  },
  {
    id: 'starter-3',
    name: 'Hokkaido Scallops Tartare',
    description: 'Knife-cut raw sea scallops dressed with white truffle oil, finger lime pearls, radish shavings, and edible gold leaf.',
    price: 38,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1532636875304-0c8fe119ff91?q=80&w=600&auto=format&fit=crop',
    tags: ['Signature', 'Gluten-Free', 'Raw'],
    rating: 4.7,
    ingredients: ['Hokkaido Scallops', 'White Truffle', 'Finger Lime', 'Gold Leaf'],
    winePairing: 'Domaine Leflaive Puligny-Montrachet 2018',
    prepTime: '12 mins',
    calories: 180
  },
  {
    id: 'main-1',
    name: 'A5 Miyazaki Wagyu Tenderloin',
    description: 'Searing marbled A5 grade beef served with parsnip silk, charred baby leeks, and a rich Périgord black truffle jus.',
    price: 210,
    category: 'signatures',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop',
    tags: ['Award Winner', 'Gluten-Free'],
    rating: 5.0,
    ingredients: ['Miyazaki Wagyu', 'Black Truffles', 'Parsnip Purée', 'Baby Leeks'],
    winePairing: 'Château Margaux Premier Grand Cru Classé 2010',
    prepTime: '25 mins',
    calories: 680
  },
  {
    id: 'main-2',
    name: 'L\'Homard de Bretagne Flambé',
    description: 'Whole Brittany blue lobster, oven-roasted and flambéed at tableside with Cognac, served with buttered coral foam.',
    price: 135,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1559742811-82410b5103a1?q=80&w=600&auto=format&fit=crop', // lobster styled
    tags: ['Classic', 'Tableside Play'],
    rating: 4.9,
    ingredients: ['Brittany Blue Lobster', 'Cognac VSOP', 'Coral Butter', 'Sea Asparagus'],
    winePairing: 'Coche-Dury Meursault Les Rougeots 2016',
    prepTime: '30 mins',
    calories: 550
  },
  {
    id: 'main-3',
    name: 'Roasted Challans Duck Brest',
    description: 'Spiced honey glazed duck breast with caramelized blood orange, braised chicory, and sweet cardamom carrot velvet.',
    price: 64,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1514516345957-556ca7d90a29?q=80&w=600&auto=format&fit=crop',
    tags: ['Gluten-Free'],
    rating: 4.8,
    ingredients: ['Challans Duck', 'Blood Orange', 'Cardamom', 'Chicory'],
    winePairing: 'Domaine de la Romanée-Conti Échezeaux Grand Cru 2014',
    prepTime: '20 mins',
    calories: 580
  },
  {
    id: 'main-4',
    name: 'Patagonian Toothfish Royale',
    description: 'Pan-seared Patagonian toothfish (Chilean Seabass) over wild sea succulents, saffron-infused shellfish broth, and razor clams.',
    price: 72,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=600&auto=format&fit=crop',
    tags: ['Sustainable Seafood', 'Gluten-Free'],
    rating: 4.9,
    ingredients: ['Toothfish', 'Saffron', 'Razor Clams', 'Sea Succulents'],
    winePairing: 'M. Chapoutier Ermitage de l\'Orée Blanc 2017',
    prepTime: '22 mins',
    calories: 490
  },
  {
    id: 'dessert-1',
    name: 'Grand Araguani Chocolate Soufflé',
    description: 'Baked warm chocolate soufflé utilizing 70% single-origin Venezuelan cacao, fluid center, with Madagascar vanilla-bean gelato.',
    price: 28,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600&auto=format&fit=crop',
    tags: ['Vegetarian', 'Warm'],
    rating: 4.9,
    ingredients: ['Araguani Cacao', 'Madagascar Vanilla Pods', 'Organic Eggs', 'Gold Lustre'],
    winePairing: 'Taylor\'s Vintage Port 1994',
    prepTime: '18 mins',
    calories: 390
  },
  {
    id: 'dessert-2',
    name: 'L\’Étoile Golden Pear Sphere',
    description: 'A blown sugar golden sphere containing pear sorbet, vanilla poached pear brunoise, caramel mousse, and hot ginger caramel poured at tableside.',
    price: 32,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=600&auto=format&fit=crop',
    tags: ['Signature', 'Vegetarian'],
    rating: 5.0,
    ingredients: ['Williams Pear', 'Blown Sugar', 'Ginger Root', 'Salted Fleur de Sel Caramel'],
    winePairing: 'Disznókő Tokaji Aszú 6 Puttonyos 2013',
    prepTime: '15 mins',
    calories: 340
  },
  {
    id: 'wine-1',
    name: 'Château Pétrus Pomerol 2011',
    description: 'An legendary vintage displaying majestic aromas of dark truffles, mulberry silk, and tobacco, with velvet texture and an endless finish.',
    price: 320,
    category: 'wines',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=600&auto=format&fit=crop',
    tags: ['Exclusive', 'Grand Vintage', '98 pts'],
    rating: 4.9,
    ingredients: ['Merlot Grapes', 'Clay Terroir', 'Aged French Oak'],
    prepTime: 'Immediate Bottle Service',
    calories: 120
  },
  {
    id: 'wine-2',
    name: 'Dom Pérignon P2 Plénitude Brut 2004',
    description: 'Elegant golden champagne boasting mineral clarity, toasted almond, yellow stone fruits, and an exquisite creamy micro-effervescence.',
    price: 180,
    category: 'wines',
    image: 'https://images.unsplash.com/photo-1578911373434-0cb395d2cbfb?q=80&w=600&auto=format&fit=crop',
    tags: ['Exclusive', 'Vintage Champagne', '97 pts'],
    rating: 4.8,
    ingredients: ['Pinot Noir', 'Chardonnay Grapes', 'Aged 15 Years on Lees'],
    prepTime: 'Flute Service',
    calories: 110
  }
];

// High-end reviews
export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Eleanor Vance-Stanton',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    text: "An unforgettable gastronomical journey. The A5 Miyazaki Wagyu was like velvet; it melted instantaneously. The server was beautifully attentive, orchestrating the dinner like a ballet. Truly deserves a third Michelin Star.",
    date: 'May 12, 2026',
    dishName: 'A5 Miyazaki Wagyu Tenderloin',
    highlight: true
  },
  {
    id: 'rev-2',
    author: 'Chef Marc-Antoine Royer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    text: "L'Étoile sets the absolute gold standard for modern French cuisine in the city. The technique exhibited on Foie Gras and the Golden Pear Sphere is completely flawless. Precise seasoning and masterfully balanced textures.",
    date: 'April 28, 2026',
    dishName: 'Pan-Seared Foie Gras de Canard',
    highlight: true
  },
  {
    id: 'rev-3',
    author: 'Lady Charlotte Montgomery',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    text: "The ambiance is stunning—drenched in rich gold and black velvet, complete with candle-lit tables. The Brittany Blue Lobster tableside presentation was pure cinematic theater. Absolutely immaculate design.",
    date: 'May 30, 2026',
    dishName: 'L\'Homard de Bretagne Flambé',
    highlight: false
  },
  {
    id: 'rev-4',
    author: 'Julian Thorne',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    text: "Exceptional wine cellar matching outstanding cuisine. Sommelier picked an incredible Chateau Margaux that elevated the marbled Wagyu beyond imagination. Absolute recommendation for special celebrations.",
    date: 'June 02, 2026',
    dishName: 'A5 Miyazaki Wagyu Tenderloin',
    highlight: false
  }
];

// Special Luxury Offers
export const OFFERS: Offer[] = [
  {
    id: 'offer-1',
    title: 'Grand Gastronomic Degustation',
    subtitle: '7-Course Masterpiece Culinary Flight',
    discount: 'Value of $340 per guest',
    promoCode: 'DEGUSTATION_ETOILE',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=600&auto=format&fit=crop',
    expiryDate: 'August 31, 2026',
    conditions: [
      'Advanced 48-hour reservation required',
      'Available Tuesday through Thursday only',
      'Excludes standard bottled wine, customized pairings extra'
    ],
    description: 'An immersive sensory flight curated by Executive Chef Laurent Dumont. Explore seven legendary creations spanning organic caviar, blue lobster, Miyazaki A5 Wagyu, and artisanal dessert wonders, paired with historical storytelling of each dish sourcing.',
    category: 'tasting'
  },
  {
    id: 'offer-2',
    title: 'Symphony of Wine & Truffles',
    subtitle: 'Autumn Harvest Exclusive Celebration',
    discount: '15% Off Exclusive Pairings',
    promoCode: 'HARVEST_GOLD',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=600&auto=format&fit=crop',
    expiryDate: 'November 15, 2026',
    conditions: [
      'Applicable on standard cellar reservations',
      'Minimum group size of 2 guests',
      'Promo code must be presented in reservation request'
    ],
    description: 'Experience the magical marriages of shaved Italian white truffles over wild velvet pastas accompanied by our master sommelier\'s private collection bottles of Puligny-Montrachet and aged Bordeaux.',
    category: 'seasonal'
  },
  {
    id: 'offer-3',
    title: 'The Solstice Private Salon',
    subtitle: 'Ultimate VIP Bespoke Banquet',
    discount: 'Complimentary Grand Cru Champagne Bottle',
    promoCode: 'SOLSTICE_VIP',
    image: 'https://images.unsplash.com/photo-1578911373434-0cb395d2cbfb?q=80&w=600&auto=format&fit=crop',
    expiryDate: 'December 31, 2026',
    conditions: [
      'Applicable for Private Salon VIP room booking only',
      'Minimum direct spend of $1200',
      'Requires validation from the booking concierge team'
    ],
    description: 'Book our gold-gilded Private Salon for your exclusive business banquet or family anniversary, and receive an exquisite bottle of Dom Pérignon P2 vintage Champagne on us, plus customized printed menu souvenirs.',
    category: 'event'
  }
];

// Luxury gallery masonry items
export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Main Dining Hall Chandelier',
    category: 'interior',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=800&auto=format&fit=crop',
    description: 'Handcrafted Murano crystal chandeliers lighting our black velvet gold-accented grand hall.'
  },
  {
    id: 'gal-2',
    title: 'Wagyu Tenderloin Plating',
    category: 'plating',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
    description: 'Executive Chef Laurent Laurent garnishing Miyazaki beef with Périgord winter truffle slices.'
  },
  {
    id: 'gal-3',
    title: 'Chef Laurent Dumont',
    category: 'chef',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=800&auto=format&fit=crop',
    description: 'Chef Laurent overseeing kitchen operations, ensuring culinary exactness in every single plate.'
  },
  {
    id: 'gal-4',
    title: 'Whisper Velvet Lounge',
    category: 'interior',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop', // cozy layout
    description: 'Exclusive marble cocktail bar and velvet lounge for post-dinner spirits.'
  },
  {
    id: 'gal-5',
    title: 'Sommelier Wine Vault',
    category: 'wine',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&auto=format&fit=crop',
    description: '温度 control state-of-the-art vault containing over 10,000 vintage grand d\'Ecolia bottles.'
  },
  {
    id: 'gal-6',
    title: 'Blown Golden sugar sphere',
    category: 'plating',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=800&auto=format&fit=crop',
    description: 'Precision art of dessert sugar craft at L\'Étoile culinary workshop.'
  }
];
