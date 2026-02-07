export interface Theme {
  id: string;
  name: string;
  category: 'destinations' | 'special' | 'minimal';
  isNew: boolean;
}

export interface Bundle {
  id: string;
  name: string;
  quantity: number;
  discount: number;
  freeShipping: boolean;
  label?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Review {
  name: string;
  country: string;
  text: string;
}

export const themes: Theme[] = [
  // DESTINATIONS (50+)
  { id: 'paris-1', name: 'Paris 1', category: 'destinations', isNew: false },
  { id: 'paris-2', name: 'Paris 2', category: 'destinations', isNew: false },
  { id: 'paris-3', name: 'Paris 3', category: 'destinations', isNew: true },
  { id: 'morocco-1', name: 'Morocco 1', category: 'destinations', isNew: false },
  { id: 'morocco-2', name: 'Morocco 2', category: 'destinations', isNew: false },
  { id: 'bali-1', name: 'Bali 1', category: 'destinations', isNew: false },
  { id: 'bali-2', name: 'Bali 2', category: 'destinations', isNew: true },
  { id: 'dubai-1', name: 'Dubai 1', category: 'destinations', isNew: false },
  { id: 'dubai-2', name: 'Dubai 2', category: 'destinations', isNew: false },
  { id: 'amsterdam-1', name: 'Amsterdam 1', category: 'destinations', isNew: false },
  { id: 'amsterdam-2', name: 'Amsterdam 2', category: 'destinations', isNew: true },
  { id: 'london-1', name: 'London 1', category: 'destinations', isNew: false },
  { id: 'london-2', name: 'London 2', category: 'destinations', isNew: false },
  { id: 'rome-1', name: 'Rome 1', category: 'destinations', isNew: false },
  { id: 'rome-2', name: 'Rome 2', category: 'destinations', isNew: true },
  { id: 'tokyo-1', name: 'Tokyo 1', category: 'destinations', isNew: false },
  { id: 'tokyo-2', name: 'Tokyo 2', category: 'destinations', isNew: false },
  { id: 'japan-1', name: 'Japan 1', category: 'destinations', isNew: false },
  { id: 'new-york-1', name: 'New York 1', category: 'destinations', isNew: false },
  { id: 'new-york-2', name: 'New York 2', category: 'destinations', isNew: true },
  { id: 'barcelona-1', name: 'Barcelona 1', category: 'destinations', isNew: false },
  { id: 'lisbon-1', name: 'Lisbon 1', category: 'destinations', isNew: false },
  { id: 'santorini-1', name: 'Santorini 1', category: 'destinations', isNew: false },
  { id: 'santorini-2', name: 'Santorini 2', category: 'destinations', isNew: true },
  { id: 'iceland-1', name: 'Iceland 1', category: 'destinations', isNew: false },
  { id: 'egypt-1', name: 'Egypt 1', category: 'destinations', isNew: false },
  { id: 'thailand-1', name: 'Thailand 1', category: 'destinations', isNew: false },
  { id: 'thailand-2', name: 'Thailand 2', category: 'destinations', isNew: true },
  { id: 'australia-1', name: 'Australia 1', category: 'destinations', isNew: false },
  { id: 'mexico-1', name: 'Mexico 1', category: 'destinations', isNew: false },
  { id: 'turkey-1', name: 'Turkey 1', category: 'destinations', isNew: false },
  { id: 'istanbul-1', name: 'Istanbul 1', category: 'destinations', isNew: false },
  { id: 'vietnam-1', name: 'Vietnam 1', category: 'destinations', isNew: true },
  { id: 'india-1', name: 'India 1', category: 'destinations', isNew: false },
  { id: 'hawaii-1', name: 'Hawaii 1', category: 'destinations', isNew: false },
  { id: 'maldives-1', name: 'Maldives 1', category: 'destinations', isNew: true },
  { id: 'switzerland-1', name: 'Switzerland 1', category: 'destinations', isNew: false },
  { id: 'croatia-1', name: 'Croatia 1', category: 'destinations', isNew: false },
  { id: 'korea-1', name: 'Korea 1', category: 'destinations', isNew: false },
  { id: 'berlin-1', name: 'Berlin 1', category: 'destinations', isNew: false },
  { id: 'prague-1', name: 'Prague 1', category: 'destinations', isNew: true },
  { id: 'vienna-1', name: 'Vienna 1', category: 'destinations', isNew: false },
  { id: 'budapest-1', name: 'Budapest 1', category: 'destinations', isNew: false },
  { id: 'peru-1', name: 'Peru 1', category: 'destinations', isNew: false },
  { id: 'colombia-1', name: 'Colombia 1', category: 'destinations', isNew: true },
  { id: 'south-africa-1', name: 'South Africa 1', category: 'destinations', isNew: false },
  { id: 'kenya-1', name: 'Kenya 1', category: 'destinations', isNew: false },
  { id: 'philippines-1', name: 'Philippines 1', category: 'destinations', isNew: false },
  { id: 'singapore-1', name: 'Singapore 1', category: 'destinations', isNew: false },
  { id: 'cuba-1', name: 'Cuba 1', category: 'destinations', isNew: true },
  
  // SPECIAL THEMES
  { id: 'always-you', name: 'Always You', category: 'special', isNew: false },
  { id: 'first-edition', name: 'First Edition', category: 'special', isNew: false },
  { id: 'me-and-you', name: 'Me & You', category: 'special', isNew: false },
  { id: 'best-friends', name: 'Best Friends', category: 'special', isNew: false },
  { id: 'my-valentine', name: 'My Valentine', category: 'special', isNew: true },
  { id: 'our-story', name: 'Our Story', category: 'special', isNew: false },
  { id: 'wanderlust', name: 'Wanderlust', category: 'special', isNew: false },
  { id: 'adventure-awaits', name: 'Adventure Awaits', category: 'special', isNew: true },
  { id: 'bon-voyage', name: 'Bon Voyage', category: 'special', isNew: false },
  { id: 'summer-vibes', name: 'Summer Vibes', category: 'special', isNew: false },
  
  // MINIMAL
  { id: 'minimal-white', name: 'Minimal White', category: 'minimal', isNew: false },
  { id: 'minimal-black', name: 'Minimal Black', category: 'minimal', isNew: false },
  { id: 'minimal-kraft', name: 'Minimal Kraft', category: 'minimal', isNew: true },
];

export const bundles: Bundle[] = [
  { 
    id: 'single', 
    name: 'Single', 
    quantity: 1, 
    discount: 50, 
    freeShipping: false,
    label: 'Save 50%'
  },
  { 
    id: 'duo', 
    name: 'Duo', 
    quantity: 2, 
    discount: 60, 
    freeShipping: false,
    label: 'Save 60%'
  },
  { 
    id: 'trio', 
    name: 'Trio', 
    quantity: 3, 
    discount: 70, 
    freeShipping: true,
    label: 'Save 70% + Free Shipping'
  },
];

export const faqItems: FAQItem[] = [
  {
    question: 'How does it work?',
    answer: 'Creating your custom travel photobook is simple! Choose your favorite template from our extensive collection, upload your travel photos, and customize the layout, text, and design to match your journey. Our intuitive editor makes it easy to create a professional-looking photobook in minutes. Once you\'re happy with your design, place your order and we\'ll print and ship your beautiful hardcover book directly to your door.'
  },
  {
    question: 'Description',
    answer: 'Our premium travel photobooks feature a durable hardcover with your choice of matte or glossy finish. Each book is professionally printed on high-quality 200gsm paper that brings your travel memories to life with vibrant colors and sharp details. Choose from multiple page counts (24, 50, 100, 150, or 200 pages) and sizes (8x8", 10x10", or 12x12") to perfectly showcase your adventures. Every photobook is lay-flat bound, allowing your photos to span across pages without losing any detail in the gutter.'
  },
  {
    question: 'Shipping & Returns',
    answer: 'We offer worldwide shipping with the following estimated delivery times: USA (5-7 business days), Canada (7-10 business days), Europe (7-12 business days), Australia/NZ (10-14 business days), Rest of World (14-21 business days). All orders are tracked and you\'ll receive a confirmation email once your book ships. We stand behind our quality with a 30-day satisfaction guarantee. If you\'re not completely happy with your photobook, contact us within 30 days of delivery for a full refund or free replacement.'
  },
  {
    question: 'Materials',
    answer: 'Premium hardcover construction with your choice of matte or glossy lamination. Thick 200gsm lustre photo paper for vibrant, gallery-quality prints. Lay-flat binding technology that allows seamless two-page spreads. Smudge-proof and water-resistant coating protects your memories. Professional-grade printing with accurate color reproduction. Acid-free archival paper ensures your photobook will last for generations without yellowing or fading.'
  }
];

export const reviews: Review[] = [
  {
    name: 'Asami T.',
    country: 'Australia',
    text: 'The best photobook I\'ve ever ordered! The quality is outstanding - the colors are vibrant, the binding is perfect, and the pages feel premium. I created a book for our Japan trip and it turned out even better than I imagined. The templates made the design process so easy. Highly recommend Picphoto!'
  },
  {
    name: 'Lorendanu',
    country: 'Australia',
    text: 'I couldn\'t be happier with how my travel book turned out! The whole process was incredibly smooth from start to finish. The template selection is amazing and the final product exceeded my expectations. The hardcover feels luxurious and the photo quality is superb. This is now my go-to for preserving travel memories!'
  },
  {
    name: 'Vivi C.',
    country: 'Denmark',
    text: 'I absolutely love my Picphoto book! The templates are gorgeous and made it so easy to create something professional-looking. The print quality is exceptional - every photo looks crisp and the colors are perfect. It arrived quickly and was packaged beautifully. Already working on my next one!'
  }
];
