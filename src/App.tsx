import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Building2,
  Building,
  Home,
  MapPin,
  Bed,
  Bath,
  Ruler,
  Sliders,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MessageSquare,
  Search,
  Filter,
  ArrowRight,
  ChevronRight,
  X,
  CheckCircle2,
  Calculator,
  Award,
  ShieldCheck,
  Check,
  Activity,
  Sparkles,
  Menu,
  Heart,
  LandPlot,
  TrendingUp,
  Briefcase,
  ExternalLink,
  MessageCircle,
  Clock3,
  HelpCircle,
  Sun,
  Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Property, TourBooking, Review } from './types';

// Import local assets so Vite processes them during production build
import heroImg from './assets/images/hero_mansion_1780555313002.png';
import duplexImg from './assets/images/duplex_lekki_1780555328277.png';
import penthouseImg from './assets/images/apartment_ikoyi_1780555341236.png';
import terraceImg from './assets/images/terrace_ajah_1780555356676.png';

// Concrete, photorealistic image URLs created via generate_image in the workspace
const ASSET_IMAGES = {
  hero: heroImg,
  duplex: duplexImg,
  penthouse: penthouseImg,
  terrace: terraceImg
};

const HERO_SLIDES = [
  heroImg,
  duplexImg,
  penthouseImg,
  terraceImg,
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80'
];

// Seed premium luxury listings in Lagos, Nigeria
const PROPERTY_DATA: Property[] = [
  {
    id: 'riviera-penthouse',
    title: 'The Riviera Oceanfront Penthouse',
    price: 1500000000,
    location: 'Banana Island, Ikoyi, Lagos',
    description: 'An elite vertical sanctuary standing majestic tall. This ultra-modern 4-bedroom ocean-view penthouse features high double-height gallery windows, a private cantilevered glass lap pool, and seamless indoor-outdoor panoramic terraces overlooking Lagos Lagoon. Crafted with premium Italian marble flooring, high automated home automation, and professional chef culinary kitchen.',
    images: [
      ASSET_IMAGES.penthouse,
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    bedrooms: 4,
    bathrooms: 5,
    areaSqFt: 6800,
    type: 'penthouse',
    status: 'For sale',
    features: ['Private Infinity Pool', 'Ocean Lagoon View', 'Smart Home Controls', 'Private Glass Lift', 'Concierge & Spa Access', 'Professional Chef Kitchen'],
    refNumber: 'ADZ-BAN-01',
    isFeatured: true
  },
  {
    id: 'crest-duplex',
    title: 'The Horizon Smart Duplex',
    price: 750000000,
    location: 'Phase 1, Lekki, Lagos',
    description: 'A masterclass architectural masterpiece in the heart of high-class Lekki. Pristine 5-bedroom fully detached smart residence boasting elegant facade framing, custom high-grain oak ceiling contours, a fully private cinema room, automated mood lighting, and a beautiful outdoor dining gazebo next to a manicured garden. Fully secured behind double biometric gates.',
    images: [
      ASSET_IMAGES.duplex,
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80'
    ],
    bedrooms: 5,
    bathrooms: 6,
    areaSqFt: 5200,
    type: 'duplex',
    status: 'For sale',
    features: ['Sound-Proof Cinema Room', 'Biometric Automated Entry', 'Lush Gazebo Garden', 'Lacquered Chef Pantry', 'Detached Premium BQ', 'Solar Grid Hybrid System'],
    refNumber: 'ADZ-LEK-05',
    isFeatured: true
  },
  {
    id: 'laurel-terrace',
    title: 'Laurel Heights Executive Terraces',
    price: 180000000,
    location: 'Abraham Adesanya, Ajah, Lagos',
    description: 'Affordable luxury gracefully redrawn. These state-of-the-art 4-bedroom terraced home residences offer highly functional space optimization. Appreciate the high-volume glass vents, private parking arrays, fully pre-fitted kitchen layout docks, master suite balconies, and reliable compound utilities located inside a safe, double-gated community enclave.',
    images: [
      ASSET_IMAGES.terrace,
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb?auto=format&fit=crop&w=1200&q=80'
    ],
    bedrooms: 4,
    bathrooms: 4,
    areaSqFt: 3400,
    type: 'terrace',
    status: 'Under construction',
    features: ['In-Built Kitchen Appliances', 'Private Secure Gatehouse', 'Borehole with Custom Osmosis', 'Master Balcony Views', '24/7 Monitored Cameras', 'Inverter Solar Pre-wiring'],
    refNumber: 'ADZ-AJH-04',
    isFeatured: true
  },
  {
    id: 'atlantic-pearl',
    title: 'Atlantic Pearl High-Rise Flat',
    price: 1200000000,
    location: 'Eko Atlantic City, VI, Lagos',
    description: 'Live where the city meets ocean majesty. A high-contrast modern 3-bedroom luxury flat directly fronting the premium harbor line of Eko Atlantic. Equipped with floor-to-ceiling anti-glare double-pane glass, high central air vents, custom structural quartz worktops, and full membership accesses to local recreation wellness centers.',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
    ],
    bedrooms: 3,
    bathrooms: 4,
    areaSqFt: 4100,
    type: 'apartment',
    status: 'For sale',
    features: ['Concierge Services Desk', 'Atlantic Sunset Balcony', 'Central Climatic AC Plan', 'Integrated Sound systems', 'Heated Indoor Swimming Pool', 'Valet Reserved Parking Lot'],
    refNumber: 'ADZ-EKO-02',
    isFeatured: false
  },
  {
    id: 'chevron-land',
    title: 'Chevron Conservation Premium Land Parcel',
    price: 450000000,
    location: 'Chevron District, Lekki, Lagos',
    description: 'An exceptional rare investment goldmine. Fully sand-filled, 100% stable dry commercial/residential parcel measuring exactly 800 square meters. Positioned right beside the pristine Chevron Conservation reserve. This lot features verified land administration documentation (original Governor Consent certificate) with premium drainage infrastructure.',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80'
    ],
    bedrooms: 0,
    bathrooms: 0,
    areaSqFt: 8611,
    type: 'land',
    status: 'For sale',
    features: ['Original Governor Consent', 'Gated Premium Paved Roads', 'Deep Storm Drainage channels', 'Direct Perimeter Lighting', 'Proximity to Lekki Highway', 'Immediate Construction Access'],
    refNumber: 'ADZ-CHV-LAND',
    isFeatured: false
  },
  {
    id: 'obsidian-sold',
    title: 'The Obsidian Classic Mansion',
    price: 820000000,
    location: 'Pinewood Gates Est, Lekki, Lagos',
    description: 'A structural exhibition of our build precision. Completed and delivered to private investors. 5-bedroom luxury monolithic villa clad in pristine Greek marble tiles, showcasing smart automation nodes, custom built-in closets, multi-zone water treatment systems, and spectacular terrace deck pools that illustrate Adzan’s premium portfolio deliverables.',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'
    ],
    bedrooms: 5,
    bathrooms: 5,
    areaSqFt: 5500,
    type: 'duplex',
    status: 'Sold',
    features: ['Grade-A European Marble', 'Automated Venetian Shutters', 'Multi-Floor Glass Shaft', 'Sound system distribution', 'Dual-Room Service Quarters', 'Dedicated Water Purification'],
    refNumber: 'ADZ-LEK-SOLD',
    isFeatured: false
  }
];

// Testimonials
const REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Chief Babatunde Alao',
    role: 'Investment Director, Alao Capitals',
    comment: 'Adzan Homes delivered on their exact promise of reliable and affordable high-end quality. Our Banana Island penthouse acquisition was processed with extreme regulatory speed and transparency. Phenomenal engineering.',
    rating: 5
  },
  {
    id: '2',
    name: 'Dr. Elizabeth Chidi',
    role: 'Managing Partner, Chidi Clinic VI',
    comment: 'Most developers over-promise and under-deliver on materials in Lagos. Adzan is an outstanding exception. The finishing in the smart terrace homes exceeded my premium standards. High level of customer service too!',
    rating: 5
  },
  {
    id: '3',
    name: 'Mr. & Mrs. Adebayo',
    role: 'Diaspora Real Estate Investors',
    comment: 'Buying properties from Canada is always nerve-wrecking due to trust. Adzan Luxury Homes gave us structural video reports every fortnight and fully managed our governor verification paperwork smoothly. Highly recommended.',
    rating: 5
  }
];

export default function App() {
  // Light mode by default with persistence
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('adzan_dark_mode');
    return saved === 'true'; // Default is false (Light Mode)
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('adzan_dark_mode', darkMode.toString());
  }, [darkMode]);

  // Hero section slideshow background images
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000); // Change image every 6 seconds
    return () => clearInterval(slideInterval);
  }, []);

  // Navigation & UI States
  const [activeTab, setActiveTab] = useState<'all' | 'duplex' | 'penthouse' | 'terrace' | 'apartment' | 'land'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [priceRange, setPriceRange] = useState(1500000000); // Max Naira Price
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [myTours, setMyTours] = useState<TourBooking[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Custom interactive dashboard toggle
  const [dashboardOpen, setDashboardOpen] = useState(false);

  // Tour Booking State (Dynamic within slideover modal)
  const [bookingFullName, setBookingFullName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingType, setBookingType] = useState<'In-person' | 'Video Call'>('In-person');
  const [bookingMessage, setBookingMessage] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Mortgage Calculator state
  const [calcPrice, setCalcPrice] = useState(750000000);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [interestRate, setInterestRate] = useState(12);
  const [loanTermYrs, setLoanTermYrs] = useState(5);

  // Floating active broker WhatsApp chat simulated module
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'user' | 'broker', text: string; time: string }>>([
    { sender: 'broker', text: 'Good day! I am Alvin Cole, Principal Executive Broker at Adzan Luxury Homes. How may I guide your luxury property portfolio today?', time: 'Just now' }
  ]);
  const [brokerTyping, setBrokerTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Synchronize Mortgage pricing when a property is viewed
  const handlePropToCalculator = (price: number) => {
    setCalcPrice(price);
    const element = document.getElementById('mortgage-calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Toggle property in wishlist favorites
  const handleToggleWishlist = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter(item => item !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };

  // Property categorization filtering
  const filteredProperties = useMemo(() => {
    return PROPERTY_DATA.filter((prop) => {
      const matchTab = activeTab === 'all' || prop.type === activeTab;
      const matchSearch = prop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prop.refNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prop.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchLocation = locationFilter === '' || prop.location.toLowerCase().includes(locationFilter.toLowerCase());
      const matchPrice = prop.price <= priceRange;
      return matchTab && matchSearch && matchLocation && matchPrice;
    });
  }, [activeTab, searchQuery, locationFilter, priceRange]);

  // Extract unique locations for selection drop-down
  const uniqueLocations = useMemo(() => {
    return ['Ikoyi', 'Lekki', 'Ajah', 'VI'];
  }, []);

  // Format currency inside Nigerian Naira
  const formatNaira = (value: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Mortgage calculator calculations
  const mortgageResult = useMemo(() => {
    const principal = calcPrice * (1 - downPaymentPct / 100);
    const monthlyRate = (interestRate / 100) / 12;
    const totalPayments = loanTermYrs * 12;
    let monthlyAmortization = 0;

    if (monthlyRate === 0) {
      monthlyAmortization = principal / totalPayments;
    } else {
      monthlyAmortization = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
                            (Math.pow(1 + monthlyRate, totalPayments) - 1);
    }

    const totalOutlay = (monthlyAmortization * totalPayments) + (calcPrice * (downPaymentPct / 100));
    const totalInterest = totalOutlay - calcPrice;

    return {
      monthlyPayment: Math.round(monthlyAmortization),
      principalAmount: Math.round(principal),
      downPaymentAmt: Math.round(calcPrice * (downPaymentPct / 100)),
      totalInterest: Math.round(totalInterest),
      totalOutlay: Math.round(totalOutlay)
    };
  }, [calcPrice, downPaymentPct, interestRate, loanTermYrs]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, brokerTyping]);

  // Handle User message send to simulated broker
  const handleSendChatMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatMessage.trim()) return;

    const userMsg = chatMessage;
    setChatHistory(prev => [...prev, { sender: 'user', text: userMsg, time: 'Just now' }]);
    setChatMessage('');
    setBrokerTyping(true);

    // Dynamic broker automated replies based on message content
    setTimeout(() => {
      let reply = "Thank you for reaching out. I receive your inquiry regarding Adzan properties. Let me double check the availability with our legal department and call you back in 5 minutes. What is your direct phone number?";
      const lower = userMsg.toLowerCase();
      
      if (lower.includes('banana') || lower.includes('riviera') || lower.includes('penthouse')) {
        reply = "The Riviera Oceanfront Penthouse is arguably the most premium asset in high-security Banana Island. Only 1 unit remains available. I can arrange an exclusive yacht-landing private tour for tomorrow. Would you prefer 11:00 AM or 3:00 PM?";
      } else if (lower.includes('lekki') || lower.includes('crest') || lower.includes('duplex')) {
        reply = "Our Horizon Smart Duplex is fully complete and smart home configured. We verified the original Governor Consent credentials so it is completely clean. Let me register you for a guided walkthrough of Phase 1 Lekki.";
      } else if (lower.includes('price') || lower.includes('discount') || lower.includes('negotiate')) {
        reply = "At Adzan Luxury Homes, we emphasize reliable and affordable execution. For the Ikoyi penthouse and Lekki duplexes, we can arrange customized milestone payment structures spread over 12 months with a 30% initial equity deposit. Would you like a brokerage proposal?";
      } else if (lower.includes('document') || lower.includes('consent') || lower.includes('rc') || lower.includes('legal')) {
        reply = "Safety is our absolute cornerstone. Adzan Luxury Homes Limited is registered under Corporate Affairs Commission RC: 6896512. Every property we represent has authentic land files verified at the Alausa land registry. I can email you copies of certificates directly.";
      } else if (lower.includes('tour') || lower.includes('book') || lower.includes('visit')) {
        reply = "I would be honored to show you our luxury developments! I have open spots tomorrow afternoon. Let me know your full name and email, and I will issue your official VIP visitor access credentials.";
      }

      setChatHistory(prev => [...prev, { sender: 'broker', text: reply, time: 'Just now' }]);
      setBrokerTyping(false);
    }, 1500);
  };

  // Submit dynamic Tour Booking inside slideover
  const handleBookTour = (e: React.FormEvent, property: Property) => {
    e.preventDefault();
    if (!bookingFullName || !bookingEmail || !bookingPhone || !bookingDate || !bookingTime) {
      alert('Please fill out all booking schedules.');
      return;
    }

    const newBooking: TourBooking = {
      id: 'TOU-' + Math.floor(100000 + Math.random() * 900000),
      propertyId: property.id,
      propertyName: property.title,
      fullName: bookingFullName,
      email: bookingEmail,
      phone: bookingPhone,
      date: bookingDate,
      time: bookingTime,
      tourType: bookingType,
      message: bookingMessage,
      createdAt: new Date().toISOString()
    };

    setMyTours([newBooking, ...myTours]);
    setBookingSuccess(true);
    
    // Clear forms after brief period
    setTimeout(() => {
      setBookingFullName('');
      setBookingEmail('');
      setBookingPhone('');
      setBookingDate('');
      setBookingTime('');
      setBookingMessage('');
      setBookingSuccess(false);
      setSelectedProperty(null);
      // Automatically open dashboard area so the user spots their tour live!
      setDashboardOpen(true);
    }, 2800);
  };

  return (
    <div className="min-h-screen bg-[#fbfbfa] dark:bg-[#0c0b0a] text-stone-900 dark:text-[#ECE9E4] font-sans antialiased selection:bg-gold-500 selection:text-white transition-colors duration-200">
      
      {/* 1. BRAND HEADER HUD */}
      <header className="sticky top-0 z-40 w-full border-b border-stone-200/60 dark:border-white/5 bg-[#fbfbfa]/90 dark:bg-[#0c0b0a]/90 backdrop-blur-md transition-colors duration-200">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* CRITICAL: Vector Brand Logo of Adzan Luxury */}
          <div className="cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 rounded-full flex items-center justify-center border border-emerald-600/20 dark:border-gold-500/25 bg-emerald-500/10 dark:bg-stone-900/50 p-1">
                {/* Custom High-Fidelity Vector SVG matching the user's uploaded Adzan logo perfectly */}
                <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Swoosh arcs overhead */}
                  <path d="M15 65 A 40 40 0 0 1 85 65" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
                  <path d="M22 62 A 32 32 0 0 1 78 62" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" />
                  
                  {/* Skyscraper array in brand green */}
                  <rect x="42" y="25" width="8" height="30" fill="#15803d" />
                  <rect x="51" y="20" width="10" height="35" fill="#166534" />
                  <rect x="62" y="28" width="8" height="27" fill="#15803d" />
                  
                  {/* Windows slivers inside skyscrapers */}
                  <rect x="44" y="29" width="2" height="3.5" fill="#ffffff" />
                  <rect x="44" y="36.5" width="2" height="3.5" fill="#ffffff" />
                  <rect x="44" y="44" width="2" height="3.5" fill="#ffffff" />
                  
                  <rect x="53.5" y="24" width="2.2" height="4" fill="#ffffff" />
                  <rect x="53.5" y="32" width="2.2" height="4" fill="#ffffff" />
                  <rect x="53.5" y="40" width="2.2" height="4" fill="#ffffff" />
                  <rect x="57" y="24" width="2.2" height="4" fill="#ffffff" />
                  <rect x="57" y="32" width="2.2" height="4" fill="#ffffff" />
                  <rect x="57" y="40" width="2.2" height="4" fill="#ffffff" />

                  <rect x="64" y="32" width="2" height="3.5" fill="#ffffff" />
                  <rect x="64" y="39" width="2" height="3.5" fill="#ffffff" />
                  <rect x="64" y="46" width="2" height="3.5" fill="#ffffff" />

                  {/* House roof outlines in brand red */}
                  <path d="M24 53 L45 38 L66 53 Z" fill="none" stroke="#ef4444" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M53 53 L68 42 L83 53" fill="none" stroke="#ef4444" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
                  
                  {/* Red windows/squares */}
                  <rect x="31" y="45" width="4" height="4" fill="#ef4444" />
                  <rect x="37" y="45" width="4" height="4" fill="#ef4444" />
                  
                  <rect x="60" y="47" width="3" height="3.5" fill="#ef4444" />
                </svg>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-serif font-extrabold text-base tracking-[0.12em] text-emerald-700 dark:text-emerald-400 leading-none">
                  ADZAN
                </span>
                <span className="font-sans font-bold text-[8.5px] tracking-[0.22em] text-stone-850 dark:text-[#ECE9E4]/90 leading-none mt-1">
                  LUXURY HOMES
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Link Array */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-[#D1CCC4]">
            <a href="#properties-hub" className="hover:text-gold-500 transition-colors">Brokerage Registry</a>
            <a href="#mortgage-calculator" className="hover:text-gold-500 transition-colors">Yield Estimator</a>
            <a href="#brand-philosophy" className="hover:text-gold-500 transition-colors">Corporate Pillars</a>
            <a href="#executive-reviews" className="hover:text-gold-500 transition-colors">Investor Testimonials</a>
          </nav>

          {/* Right Hub Interactions (Private Desk CTA) */}
          <div className="flex items-center gap-3">
            
            {/* Theme Mode Toggle Button */}
            <button
              id="theme-mode-toggle"
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full border border-stone-200 dark:border-white/10 bg-stone-100 dark:bg-stone-900/60 text-stone-600 dark:text-[#ECE9E4] hover:text-gold-500 transition-all active:scale-90"
              title={darkMode ? "Switch to Light Gallery" : "Switch to Dark Haven"}
            >
              {darkMode ? <Sun className="h-4 w-4 text-amber-500 fill-amber-400" /> : <Moon className="h-4 w-4 text-stone-700" />}
            </button>

            {/* Wishlist Favorites counter widget */}
            <button
              id="wishlist-trigger-btn"
              onClick={() => setDashboardOpen(!dashboardOpen)}
              className="relative p-2 text-stone-600 dark:text-[#D1CCC4] hover:text-gold-500 transition-colors border border-stone-200 dark:border-white/5 rounded-full bg-stone-100 dark:bg-stone-900 dark:hover:bg-stone-800"
              title="View your saved items and schedules"
            >
              <Heart className={`h-4.5 w-4.5 ${wishlist.length > 0 ? "fill-red-500 text-red-500" : ""}`} />
              {(wishlist.length > 0 || myTours.length > 0) && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold-500 text-[9px] font-bold text-black ring-2 ring-[#0c0b0a]">
                  {wishlist.length + myTours.length}
                </span>
              )}
            </button>

            {/* Main Interactive Cabinet Toggle */}
            <button
               id="cabinet-toggle-btn"
               onClick={() => setDashboardOpen(!dashboardOpen)}
               className="hidden sm:flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-widest rounded-full bg-stone-100 hover:bg-stone-200 dark:bg-stone-900 dark:hover:bg-stone-800 text-gold-500 border border-stone-200 dark:border-gold-500/20 transition-all"
            >
               <Briefcase className="h-3.5 w-3.5" />
               Private Desk
            </button>

            {/* Mobile Nav Menu Drawer Toggle */}
            <button
              id="mobile-drawer-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden text-stone-600 dark:text-[#D1CCC4] hover:text-gold-500"
              aria-label="Toggle mobile navigator menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE HUD DRAWER MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-hud-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden border-b border-stone-200 dark:border-white/5 bg-[#fbfbfa] dark:bg-[#0c0b0a] px-4 py-6 z-30 relative"
          >
            <div className="flex flex-col gap-4 text-sm font-semibold uppercase tracking-widest">
              <a
                href="#properties-hub"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-stone-200 dark:border-white/5 text-stone-800 dark:text-[#ECE9E4] hover:text-gold-500"
              >
                Brokerage Registry
              </a>
              <a
                href="#mortgage-calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-stone-200 dark:border-white/5 text-stone-800 dark:text-[#ECE9E4] hover:text-gold-500"
              >
                Yield Estimator
              </a>
              <a
                href="#brand-philosophy"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-stone-200 dark:border-white/5 text-stone-800 dark:text-[#ECE9E4] hover:text-gold-500"
              >
                Corporate Pillars
              </a>
              <a
                href="#executive-reviews"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-stone-800 dark:text-[#ECE9E4] hover:text-gold-500"
              >
                Investor Testimonials
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setDashboardOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 mt-2 rounded-lg bg-stone-100 dark:bg-stone-900 text-gold-500 border border-stone-200 dark:border-gold-500/30"
              >
                <Briefcase className="h-4 w-4" />
                Private Desk Panel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. PRIVATE DESK: STATEFUL CLIENT DASHBOARD BOX */}
      <AnimatePresence>
        {dashboardOpen && (
          <motion.div
            id="private-broker-desk-box"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="w-full bg-[#f4f3ef] dark:bg-[#13110E] border-b border-stone-200 dark:border-[#2C261A] overflow-hidden transition-colors duration-200"
          >
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between border-b border-stone-200 dark:border-[#2C261A] pb-4 mb-6">
                <div>
                  <h2 className="font-serif text-lg font-bold text-emerald-600 dark:text-gold-500 tracking-tight flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    My Private Portfolios & Schedules
                  </h2>
                  <p className="text-[11px] text-stone-500 dark:text-[#A69F95] mt-0.5">Track your wishlisted active buildings and confirmed VIP site tours in real-time.</p>
                </div>
                <button
                  onClick={() => setDashboardOpen(false)}
                  className="p-1 px-2.5 rounded-lg border border-stone-200 dark:border-[#2C261A] text-stone-600 dark:text-[#A69F95] hover:text-stone-900 dark:hover:text-white text-xs bg-white dark:bg-[#1C1A17]"
                >
                  Close Desk
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Wishlist favorites col */}
                <div className="bg-white dark:bg-[#1A1815] p-5 rounded-2xl border border-stone-200 dark:border-[#2C261A]">
                  <h3 className="text-xs font-semibold uppercase text-emerald-700 dark:text-gold-500 bg-emerald-500/5 dark:bg-gold-500/5 py-1 px-3.5 rounded-full inline-block mb-4 tracking-wider">
                    Property Spec Wishlist ({wishlist.length})
                  </h3>
                  {wishlist.length === 0 ? (
                    <div className="text-center py-8">
                      <Heart className="h-8 w-8 text-stone-400 dark:text-stone-700 mx-auto mb-2" />
                      <p className="text-xs text-stone-500 dark:text-[#A69F95]">No properties saved. Tap the heart icons on listings to catalog them here.</p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                      {PROPERTY_DATA.filter(p => wishlist.includes(p.id)).map(p => (
                        <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-[#2C261A]">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.images[0]}
                              alt={p.title}
                              referrerPolicy="no-referrer"
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <h4 className="text-xs font-bold text-stone-900 dark:text-white line-clamp-1">{p.title}</h4>
                              <p className="text-[10px] text-stone-500 dark:text-[#A69F95]">{p.location}</p>
                              <span className="text-[10px] font-semibold text-emerald-600 dark:text-gold-500">{formatNaira(p.price)}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => {
                                setSelectedProperty(p);
                                window.scrollTo({ top: 300, behavior: 'smooth' });
                              }}
                              className="p-1.5 bg-stone-100 dark:bg-[#1C1A17] text-stone-700 dark:text-white hover:text-emerald-500 dark:hover:text-gold-500 rounded-lg text-xs"
                              title="Inspect in Depth"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={(e) => handleToggleWishlist(e, p.id)}
                              className="p-1.5 bg-red-50 dark:bg-red-950/20 text-red-500 hover:bg-stone-800 rounded-lg"
                              title="Remove"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Tour bookings tracker col */}
                <div className="bg-white dark:bg-[#1A1815] p-5 rounded-2xl border border-stone-200 dark:border-[#2C261A]">
                  <h3 className="text-xs font-semibold uppercase text-emerald-700 dark:text-gold-500 bg-emerald-500/5 dark:bg-gold-500/5 py-1 px-3.5 rounded-full inline-block mb-4 tracking-wider">
                    Scheduled VIP Land Inspections ({myTours.length})
                  </h3>
                  {myTours.length === 0 ? (
                    <div className="text-center py-8">
                      <Calendar className="h-8 w-8 text-stone-400 dark:text-stone-700 mx-auto mb-2" />
                      <p className="text-xs text-stone-500 dark:text-[#A69F95]">No upcoming property inspections scheduled. Book a tour using the viewings registry drawer.</p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                      {myTours.map(tour => (
                        <div key={tour.id} className="p-4 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-[#2C261A]">
                          <div className="flex items-center justify-between mb-3 border-b border-stone-200 dark:border-[#2C261A] pb-2">
                            <div className="flex items-center gap-1">
                              <span className="text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 py-0.5 px-2 rounded-full">
                                Verified Schedule
                              </span>
                              <span className="text-[9px] text-stone-500 dark:text-[#A69F95] font-mono">{tour.id}</span>
                            </div>
                            <span className="text-[9px] text-stone-500 dark:text-gray-400">
                              {new Date(tour.createdAt).toLocaleDateString()}
                            </span>
                          </div>

                          <h4 className="text-xs font-bold text-stone-900 dark:text-white mb-2 line-clamp-1">
                            {tour.propertyName}
                          </h4>

                          <div className="grid grid-cols-2 gap-2 text-[10px] text-stone-600 dark:text-[#D1CCC4] mb-3">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="h-3 w-3 text-emerald-600 dark:text-gold-500" />
                              <span>{tour.date}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock className="h-3 w-3 text-emerald-600 dark:text-gold-500" />
                              <span>{tour.time}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Home className="h-3 w-3 text-emerald-600 dark:text-gold-500" />
                              <span>{tour.tourType} Mode</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <User className="h-3 w-3 text-emerald-600 dark:text-gold-500" />
                              <span className="truncate">Broker: Alvin Cole (Lagos)</span>
                            </div>
                          </div>

                          {/* Beautiful Access Credentials Box */}
                          <div className="mt-2.5 p-2 bg-stone-100 dark:bg-[#1C1A17] rounded-lg border border-stone-200 dark:border-[#2C261A] text-left text-[9px] text-stone-600 dark:text-gray-400 font-mono">
                            <strong className="text-emerald-600 dark:text-gold-500 block uppercase mb-0.5">Site Entry Token</strong>
                            <span>INSPECT-PIN: ADZ-{tour.id}-{tour.date.replace(/-/g, '')} | Verified Client Entry Gate 2</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. HERO SHOWCASE: WORLD-CLASS EDITORIAL SPLIT INTERFACE WITH AMBIENT BACKGROUND */}
      <section className="relative overflow-hidden w-full transition-colors duration-200 border-b border-stone-200/60 dark:border-white/5 min-h-[640px] flex items-center">
        
        {/* Cinematic Backdrop: Beautiful Fading Slideshow of Custom Homes and Lands */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={currentHeroSlide}
              src={HERO_SLIDES[currentHeroSlide]}
              alt="Adzan Luxury Estates and Lands background"
              referrerPolicy="no-referrer"
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover brightness-[0.93] dark:brightness-[0.38] contrast-[1.02]"
            />
          </AnimatePresence>
          
          {/* Soft, beautiful dynamic vignette overlay for pristine typography contrast and theme compliance */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#fbfbfa] via-[#fbfbfa]/95 to-[#fbfbfa]/45 dark:from-[#0c0b0a] dark:via-[#0c0b0a]/95 dark:to-[#0c0b0a]/45 transition-colors duration-200" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_right_top,transparent_30%,#fbfbfa_90%)] dark:bg-[radial-gradient(circle_at_right_top,transparent_30%,#0c0b0a_90%)] transition-colors duration-200" />
        </div>

        {/* Subtle decorative grid pattern background overlayed */}
        <div className="absolute inset-0 opacity-[0.01] dark:opacity-[0.03] select-none pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] z-1" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* COLUMN 1: EDITORIAL TYPOGRAPHY & TAGLINE (7 Cols) */}
            <motion.div 
              className="lg:col-span-7 space-y-8 text-left"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.12
                  }
                }
              }}
            >
              
              {/* Premium understated badge */}
              <motion.div 
                className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-600/10 rounded-full text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-800 dark:text-emerald-400 backdrop-blur-sm"
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
                }}
              >
                <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-gold-500" />
                <span>Corporate Registry RC. 6896512</span>
              </motion.div>

              {/* Masterful Display Title displaying luxury editorial aesthetics */}
              <motion.div 
                className="space-y-4"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
                }}
              >
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light leading-[1.1] text-stone-900 dark:text-white tracking-tight">
                  Homes of <span className="font-serif italic text-emerald-700 dark:text-gold-500 font-normal">rare elegance</span>,<br />
                  crafted with absolute <span className="font-serif italic text-emerald-700 dark:text-gold-500 font-normal">diligence</span>.
                </h1>
                
                {/* Clean, simple under-heading tagline containing required slogan "Reliable and Affordable" */}
                <p className="text-stone-605 dark:text-[#A69F95] text-sm sm:text-base leading-relaxed max-w-xl">
                  We engineer premium real estate portfolios in Lagos that stand as timeless architectural expressions. Complete with verified land titles, built under our unyielding commitment: <strong className="font-semibold text-emerald-800 dark:text-gold-500 uppercase tracking-wider text-xs">Reliable and Affordable</strong>.
                </p>
              </motion.div>

              {/* Clean, understated call-to-actions */}
              <motion.div 
                className="flex flex-wrap items-center gap-4 pt-2"
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 14 } }
                }}
              >
                <a
                  href="#properties-hub"
                  className="px-6 py-3.5 bg-stone-900 hover:bg-stone-800 text-white dark:bg-[#ece9e4] dark:hover:bg-[#fff] dark:text-stone-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md group inline-flex items-center gap-2"
                >
                  Explore Registry <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#contact-brokerage-dock"
                  className="px-6 py-3.5 border border-stone-250 dark:border-white/10 hover:bg-stone-50 dark:hover:bg-[#13110e]/40 text-stone-700 dark:text-[#ECE9E4] text-xs font-bold uppercase tracking-widest rounded-xl transition-all backdrop-blur-xs"
                >
                  Request Proposal
                </a>
              </motion.div>

              {/* Minimal Trust Indicator inside hero */}
              <motion.div 
                className="pt-6 border-t border-stone-200/70 dark:border-[#2C261A]/50 max-w-md grid grid-cols-3 gap-6"
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 16 } }
                }}
              >
                <div>
                  <span className="block text-2xl font-serif text-stone-900 dark:text-white font-medium">₦4.2B+</span>
                  <span className="block text-[9px] uppercase tracking-wider text-stone-400 dark:text-gray-550">Portfolio Closed</span>
                </div>
                <div>
                  <span className="block text-2xl font-serif text-stone-900 dark:text-white font-medium">100%</span>
                  <span className="block text-[9px] uppercase tracking-wider text-stone-400 dark:text-gray-550">Clean Land Title</span>
                </div>
                <div>
                  <span className="block text-2xl font-serif text-stone-900 dark:text-white font-medium">RC</span>
                  <span className="block text-[9px] uppercase tracking-wider text-stone-400 dark:text-gray-550">CAC Verified</span>
                </div>
              </motion.div>

            </motion.div>

            {/* COLUMN 2: THE PICTURE ART FRAME (5 Cols) */}
            <motion.div 
              className="lg:col-span-5 relative"
              initial={{ opacity: 0, scale: 0.96, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 50, damping: 16, delay: 0.25 }}
            >
              <div className="relative mx-auto max-w-sm lg:max-w-none">
                
                {/* Thin, elegant architectural decoration ring */}
                <div className="absolute -inset-4 border border-stone-200/50 dark:border-[#2C261A]/40 rounded-3xl -rotate-1 select-none pointer-events-none" />
                
                {/* The main asset picture container */}
                <div className="relative overflow-hidden aspect-[4/5] rounded-2xl border border-stone-250 dark:border-[#2C261A] bg-stone-100 dark:bg-stone-950 shadow-xl group">
                  <img
                    src={ASSET_IMAGES.hero}
                    alt="Adzan Luxury Mansion"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover brightness-[0.9] dark:brightness-[0.75] transition-transform duration-1000 scale-101 group-hover:scale-105"
                  />
                  
                  {/* Subtle inner shadow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 pointer-events-none" />

                  {/* Absolute framed badge at the bottom */}
                  <div className="absolute bottom-5 inset-x-5 bg-white/94 dark:bg-stone-950/94 backdrop-blur-md border border-stone-200/50 dark:border-[#2C261A] rounded-xl p-4 text-left transition-colors duration-200">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-700 dark:text-gold-500 block mb-0.5">Signature Asset</span>
                    <strong className="block font-serif text-sm text-stone-900 dark:text-white font-normal">Our Alausa-Approved Mansion Portfolio</strong>
                    <span className="text-[9px] text-stone-500 dark:text-gray-400 block mt-1">Lekki Phase 1, Lagos</span>
                  </div>
                </div>

              </div>
            </motion.div>

          </div>

          {/* Subtle premium horizontal indicators of the changing backdrop images */}
          <div className="flex flex-col items-center justify-center gap-2.5 mt-10 pointer-events-auto relative z-20">
            <div className="flex items-center gap-2">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentHeroSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentHeroSlide === idx
                      ? 'w-7 bg-emerald-700 dark:bg-gold-500 shadow-sm'
                      : 'w-2 bg-stone-400/40 dark:bg-stone-750/90 hover:bg-stone-550 dark:hover:bg-stone-600'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <span className="text-[10px] font-mono tracking-widest text-stone-500 dark:text-[#A69F95] uppercase bg-stone-100/60 dark:bg-[#13110E]/40 backdrop-blur-md px-3 py-1 rounded-full border border-stone-200/50 dark:border-[#2C261A]/50 transition-all">
              Slide Showcase {currentHeroSlide + 1}: {
                currentHeroSlide === 0 ? "Signature Adzan Mansion Portfolio" :
                currentHeroSlide === 1 ? "The Horizon Smart Duplex (Lekki Phase 1)" :
                currentHeroSlide === 2 ? "The Riviera Oceanfront Penthouse (Banana Island)" :
                currentHeroSlide === 3 ? "The Grand Orchard Terrace (Ajah Luxury)" :
                currentHeroSlide === 4 ? "Modernist Custom Mansion (Architectural Sunset)" :
                currentHeroSlide === 5 ? "Mediterranean Oasis Infinity Villa" :
                currentHeroSlide === 6 ? "Contemporary Glass & Concrete Landmark" :
                "Palatial Landscaped Tropical Estate Gardens"
              }
            </span>
          </div>

          {/* DYNAMIC SEARCH FILTER CAB DOCK: SEAMLESS INTEGRATION BELOW HERO GRID */}
          <div id="search-container-hud" className="w-full mt-16 bg-white/90 dark:bg-[#13110E]/90 backdrop-blur-md border border-stone-200 dark:border-[#2C261A] p-5 sm:p-7 rounded-2xl shadow-xl transition-colors duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              
              {/* Query location finder input */}
              <div className="flex flex-col text-left">
                <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-gray-400 mb-2 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-emerald-600 dark:text-gold-500" /> Location / Region
                </label>
                <div className="relative">
                  <select
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="w-full rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-[#2C261A] px-4 py-3 text-xs text-stone-900 dark:text-[#ECE9E4] outline-none focus:border-emerald-650 dark:focus:border-gold-500 cursor-pointer appearance-none"
                  >
                    <option value="">All Regions</option>
                    {uniqueLocations.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                  <ChevronRight className="absolute right-3.5 top-3.5 h-4.5 w-4.5 text-stone-500 dark:text-gray-500 rotate-90 pointer-events-none" />
                </div>
              </div>

              {/* Keyword / Feature general input search */}
              <div className="flex flex-col text-left">
                <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-gray-400 mb-2 flex items-center gap-1.5">
                  <Search className="h-3.5 w-3.5 text-emerald-600 dark:text-gold-500" /> Find Specs & Features
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g. Cinema, Pool, BQ..."
                    className="w-full rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-[#2C261A] px-4.5 py-3 text-xs text-stone-900 dark:text-[#ECE9E4] placeholder-stone-450 dark:placeholder-gray-550 outline-none focus:border-emerald-650 dark:focus:border-gold-500"
                  />
                  <Search className="absolute right-4 top-3.5 h-4 w-4 text-stone-500 dark:text-gray-500 pointer-events-none" />
                </div>
              </div>

              {/* Price Range Slider Container */}
              <div className="flex flex-col lg:col-span-2 text-left">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-gray-400 flex items-center gap-1.5">
                    <Sliders className="h-3.5 w-3.5 text-emerald-600 dark:text-gold-500" /> Maximum Investment Outlay
                  </label>
                  <span className="text-[11px] font-bold text-stone-900 dark:text-white font-mono">{formatNaira(priceRange)}</span>
                </div>
                <div className="flex items-center gap-4 py-1.5">
                  <span className="text-[10px] text-stone-500 dark:text-gray-500">180M</span>
                  <input
                    type="range"
                    min={180000000}
                    max={1500000000}
                    step={20000000}
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="flex-1 h-1.5 bg-stone-200 dark:bg-stone-950 rounded-lg appearance-none cursor-pointer accent-emerald-600 dark:accent-gold-500 theme-slider"
                  />
                  <span className="text-[10px] text-stone-500 dark:text-gray-500">1.5B</span>
                </div>
              </div>

            </div>

            {/* Micro details row below filter search */}
            <div className="flex items-center justify-between mt-5 pt-4 border-t border-stone-150 dark:border-[#1C1A18] text-[9px] text-stone-500 dark:text-[#A69F95]">
              <span>Matching Properties found: <strong className="text-stone-900 dark:text-white">{filteredProperties.length}</strong></span>
              { (searchQuery || locationFilter || priceRange < 1500000000) && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setLocationFilter('');
                    setPriceRange(1500000000);
                  }}
                  className="text-emerald-700 dark:text-gold-500 hover:underline font-bold"
                >
                  Clear Active Filters
                </button>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* 4. ACTIVE PORTFOLIO GRID SECTION (EXECUTIVE REGISTRY) */}
      <section id="properties-hub" className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
               {/* Title structure */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 dark:border-[#2C261A] pb-8 mb-12">
          <div>
            <span className="text-xs font-bold uppercase text-emerald-700 dark:text-gold-500 tracking-widest block mb-2">Spec Handover Catalog</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-stone-900 dark:text-white tracking-tight">
              Exclusive <span className="font-serif italic text-emerald-600 dark:text-gold-500">Hand-Picked</span> Lagos Listings
            </h2>
            <p className="text-sm text-stone-500 dark:text-[#A69F95] mt-2 max-w-xl">Every listing carries a distinct architectural design template, validated title certificates, and verified materials delivery structures.</p>
          </div>

          {/* Premium Selector Categories array */}
          <div className="flex flex-wrap items-center gap-1.5 bg-stone-100 dark:bg-stone-900/40 p-1.5 rounded-xl border border-stone-200 dark:border-white/5 self-start md:self-auto overflow-x-auto transition-colors duration-200">
            {['all', 'penthouse', 'duplex', 'terrace', 'apartment', 'land'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4.5 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${
                  activeTab === tab
                    ? 'bg-gold-500 text-white dark:text-stone-950 shadow-md'
                    : 'text-stone-600 dark:text-[#D1CCC4] hover:text-stone-900 dark:hover:text-white hover:bg-stone-200/55 dark:hover:bg-stone-800/40'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Empty listings report */}
        {filteredProperties.length === 0 ? (
          <div className="text-center py-20 bg-stone-50 dark:bg-[#13110E] rounded-3xl border border-stone-200 dark:border-[#2C261A] px-6 transition-colors duration-205">
            <Building2 className="h-12 w-12 text-stone-400 dark:text-stone-700 mx-auto mb-4" />
            <h3 className="font-serif text-lg text-stone-900 dark:text-white font-normal">No Luxury Portfolios Found</h3>
            <p className="text-xs text-stone-550 dark:text-[#A69F95] max-w-md mx-auto mt-2 leading-relaxed">Adjust your investment slider values or search keys to list available luxury townhouses or commercial dry parcels.</p>
            <button
              onClick={() => {
                setActiveTab('all');
                setSearchQuery('');
                setLocationFilter('');
                setPriceRange(1500000000);
              }}
              className="mt-6 inline-flex px-6 py-2.5 text-xs font-bold uppercase tracking-widest rounded-full bg-stone-100 hover:bg-stone-200 dark:bg-stone-900 dark:hover:bg-stone-800 text-gold-550 border border-stone-200 dark:border-gold-500/20"
            >
              Reset Search Parameters
            </button>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08
                }
              }
            }}
          >
            {filteredProperties.map((prop) => {
              const itemWishlisted = wishlist.includes(prop.id);
              
              return (
                <motion.div
                  id={`prop-card-${prop.id}`}
                  key={prop.id}
                  onClick={() => setSelectedProperty(prop)}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 14 } }
                  }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="group cursor-pointer flex flex-col justify-between h-full bg-white dark:bg-[#13110E] border border-stone-200 dark:border-[#2C261A] hover:border-emerald-600/35 dark:hover:border-gold-500/30 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  
                  {/* Media Wrapper */}
                  <div className="relative overflow-hidden aspect-4/3 bg-stone-900">
                    <img
                      src={prop.images[0]}
                      alt={prop.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-105"
                    />
                    
                    {/* Dark gradient shadow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-85" />

                    {/* Badge top elements */}
                    <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none">
                      
                      {/* Property build status */}
                      <span className={`text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full text-[#0c0b0a] shadow-md ${
                        prop.status === 'Sold'
                          ? 'bg-stone-500 text-stone-100'
                          : prop.status === 'Under construction'
                          ? 'bg-amber-400'
                          : 'bg-emerald-400'
                      }`}>
                        {prop.status}
                      </span>

                      {/* Add to wishlist interaction bubble */}
                      <button
                        id={`wishlist-toggle-${prop.id}`}
                        onClick={(e) => handleToggleWishlist(e, prop.id)}
                        className="pointer-events-auto p-2 rounded-full backdrop-blur-md bg-[#0c0b0a]/40 hover:bg-[#0c0b0a]/80 text-[#ECE9E4] transition-colors border border-white/10"
                        title={itemWishlisted ? "Remove from Private Portfolio" : "Save to Private Portfolio"}
                      >
                        <Heart className={`h-4 w-4 ${itemWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                      </button>
                    </div>

                    {/* Price stamp at bottom of image overlay */}
                    <div className="absolute bottom-4 left-4.5">
                      <span className="text-xs uppercase tracking-wider font-semibold text-gold-100/80 block mb-0.5">Asset Value</span>
                      <span className="font-serif text-lg font-bold text-white tracking-tight">{formatNaira(prop.price)}</span>
                    </div>

                    {/* Small reference tag on bottom right cover */}
                    <span className="absolute bottom-4 right-4 text-[8px] font-mono tracking-widest text-[#ECE9E4]/60 bg-[#0c0b0a]/70 py-0.5 px-2 rounded-lg">
                      {prop.refNumber}
                    </span>
                  </div>

                  {/* Body textual content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Location text label */}
                      <div className="flex items-center gap-1.5 text-xs text-stone-505 dark:text-[#A69F95] mb-2">
                        <MapPin className="h-3.5 w-3.5 text-emerald-600 dark:text-gold-500" />
                        <span>{prop.location}</span>
                      </div>

                      <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white tracking-tight group-hover:text-emerald-750 dark:group-hover:text-gold-500 transition-colors leading-snug">
                        {prop.title}
                      </h3>

                      <p className="text-xs text-stone-500 dark:text-[#A69F95] mt-2 line-clamp-2 leading-relaxed">
                        {prop.description}
                      </p>
                    </div>

                    {/* Spec features metrics dock */}
                    <div className="mt-5 pt-5 border-t border-stone-200 dark:border-[#1C1A18]">
                      
                      {/* Metric icons row */}
                      <div className="grid grid-cols-3 gap-4 text-xs font-semibold text-stone-605 dark:text-[#D1CCC4] mb-4">
                        <div className="flex items-center gap-1.5">
                          {prop.bedrooms > 0 ? (
                            <>
                              <Bed className="h-4 w-4 text-emerald-600 dark:text-gold-500" />
                              <span>{prop.bedrooms} Beds</span>
                            </>
                          ) : (
                            <>
                              <LandPlot className="h-4 w-4 text-emerald-600 dark:text-gold-500" />
                              <span>Dry Land</span>
                            </>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5">
                          {prop.bathrooms > 0 ? (
                            <>
                              <Bath className="h-4 w-4 text-emerald-600 dark:text-gold-500" />
                              <span>{prop.bathrooms} Baths</span>
                            </>
                          ) : (
                            <>
                              <Award className="h-4 w-4 text-emerald-600 dark:text-gold-500" />
                              <span>Gov Consent</span>
                            </>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 justify-end">
                          <Ruler className="h-4 w-4 text-emerald-600 dark:text-gold-500" />
                          <span>{prop.areaSqFt.toLocaleString()} SqFt</span>
                        </div>
                      </div>

                      {/* Primary CTA view layout */}
                      <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-emerald-750 dark:text-gold-500 group-hover:underline">
                        <span>Inspect Particulars</span>
                        <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1.5" />
                      </div>

                    </div>

                  </div>

                </motion.div>
              );
            })}
          </motion.div>
        )}

      </section>

      {/* 5. INTERACTIVE INVESTMENT & CALC GAUGE (YIELD ESTIMATOR) */}
      <section id="mortgage-calculator" className="bg-stone-55 dark:bg-[#13110E] border-y border-stone-200 dark:border-primary-900 py-24 transition-colors duration-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Standard contextual explanation block */}
            <div className="lg:col-span-5">
              <span className="text-sm font-bold uppercase text-emerald-700 dark:text-gold-500 tracking-widest block mb-2">Milestone Liquidation</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-stone-900 dark:text-white tracking-tight">
                Premium Real Estate <span className="font-serif italic text-emerald-600 dark:text-gold-500">Milestone Loan</span> Estimator
              </h2>
              <p className="text-sm leading-relaxed text-stone-550 dark:text-[#A69F95] mt-4">
                Lagos premium real estate demands structured asset acquisition. Predict your amortization outlays. Adjust down payments, select real-term interest margins, and customize payment timelines.
              </p>
              
              {/* Pillar specs checklist */}
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-emerald-600/10 text-emerald-700 dark:bg-gold-500/10 dark:text-gold-500 mt-0.5">
                    <Check className="h-4 w-4" />
                  </div>
                  <div>
                    <strong className="text-xs text-stone-900 dark:text-white block">Custom Capital Outlay Plan</strong>
                    <span className="text-[11px] text-stone-550 dark:text-[#A69F95]">spread down-payments starting at 10% on under-construction designs.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-emerald-600/10 text-emerald-700 dark:bg-gold-500/10 dark:text-gold-500 mt-0.5">
                    <Check className="h-4 w-4" />
                  </div>
                  <div>
                    <strong className="text-xs text-stone-900 dark:text-white block">Zero Registry Penalties</strong>
                    <span className="text-[11px] text-stone-550 dark:text-[#A69F95]">Flexible structures spread directly with direct asset administrators.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive sliders & results block */}
            <div className="lg:col-span-7 bg-[#fcfcfa]/98 dark:bg-stone-900/90 border border-stone-200 dark:border-[#2C261A] p-6 sm:p-8 rounded-3xl shadow-2xl relative transition-colors duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                
                {/* Sliders Area */}
                <div className="space-y-6">
                  
                  {/* Property Price Selector */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold mb-2">
                      <span className="text-emerald-700 dark:text-gold-500">Asset Price Value</span>
                      <span className="font-mono text-stone-900 dark:text-white">{formatNaira(calcPrice)}</span>
                    </div>
                    <input
                      type="range"
                      min={180000000}
                      max={1500000000}
                      step={20000000}
                      value={calcPrice}
                      onChange={(e) => setCalcPrice(Number(e.target.value))}
                      className="w-full h-1.5 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-emerald-600 dark:accent-gold-500"
                    />
                  </div>

                  {/* Down Payment slider */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold mb-2">
                      <span className="text-emerald-700 dark:text-gold-500">Equity Deposit %</span>
                      <span className="font-mono text-stone-900 dark:text-white">{downPaymentPct}%</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={60}
                      step={5}
                      value={downPaymentPct}
                      onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                      className="w-full h-1.5 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-emerald-600 dark:accent-gold-500"
                    />
                    <span className="text-[10px] text-stone-500 dark:text-gray-400 block mt-1">
                      Min down-payment equivalent: <strong className="text-stone-800 dark:text-stone-200">{formatNaira(mortgageResult.downPaymentAmt)}</strong>
                    </span>
                  </div>

                  {/* Interst Rate slide bar */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold mb-2">
                      <span className="text-emerald-700 dark:text-gold-500">Interest Margin %</span>
                      <span className="font-mono text-stone-900 dark:text-white">{interestRate}%</span>
                    </div>
                    <input
                      type="range"
                      min={6}
                      max={24}
                      step={1}
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full h-1.5 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-emerald-600 dark:accent-gold-500"
                    />
                  </div>

                  {/* Installment terms in years */}
                  <div>
                    <label className="text-[10px] uppercase font-bold text-emerald-700 dark:text-gold-500 block mb-2">Loan Term Period</label>
                    <div className="grid grid-cols-4 gap-2">
                      {[1, 2, 3, 5].map(yrs => (
                        <button
                          key={yrs}
                          onClick={() => setLoanTermYrs(yrs)}
                          className={`py-2 text-[10px] font-mono rounded-lg border font-bold ${
                            loanTermYrs === yrs
                              ? 'bg-gold-500 text-white dark:text-stone-950 border-gold-500 shadow-md'
                              : 'bg-stone-100 dark:bg-stone-900 text-stone-600 dark:text-[#D1CCC4] border-stone-200 dark:border-[#2C261A] hover:bg-stone-250 dark:hover:bg-stone-800'
                          }`}
                        >
                          {yrs} {yrs === 1 ? 'Year' : 'Yrs'}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Dashboard Results display columns */}
                <div className="flex flex-col justify-between bg-stone-100/60 dark:bg-stone-950/80 p-5 rounded-2xl border border-stone-200 dark:border-[#2C261A] text-center transition-colors duration-200">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-stone-500 dark:text-gray-400 block mb-1">
                      Estimated Monthly Installment
                    </span>
                    <span className="font-serif text-2xl sm:text-3xl font-extrabold text-emerald-700 dark:text-gold-500 tracking-tight block">
                      {formatNaira(mortgageResult.monthlyPayment)}
                    </span>
                    <span className="text-[9px] text-stone-500 dark:text-gray-500 mt-1 block">Spread over {loanTermYrs * 12} consecutive payments</span>
                  </div>

                  {/* Mini data breakdowns */}
                  <div className="mt-6 space-y-3/4 text-[11px] text-stone-605 dark:text-[#A69F95] border-t border-stone-200 dark:border-[#1C1A18] pt-4 text-left">
                    <div className="flex justify-between">
                      <span>Principal Amount:</span>
                      <strong className="text-stone-900 dark:text-white text-xs font-mono">{formatNaira(mortgageResult.principalAmount)}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Equated Cash Deposit:</span>
                      <strong className="text-stone-900 dark:text-white text-xs font-mono">{formatNaira(mortgageResult.downPaymentAmt)}</strong>
                    </div>
                    <div className="flex justify-between border-b border-stone-200 dark:border-[#1C1A18] pb-2">
                      <span>Accumulated Interest:</span>
                      <strong className="text-amber-700 dark:text-yellow-500 text-xs font-mono">{formatNaira(mortgageResult.totalInterest)}</strong>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="font-bold text-stone-900 dark:text-white">Full Cost Capitalization:</span>
                      <strong className="text-emerald-700 dark:text-gold-500 font-bold text-xs font-mono">{formatNaira(mortgageResult.totalOutlay)}</strong>
                    </div>
                  </div>

                  <a
                    href="#contact-brokerage-dock"
                    className="mt-6 w-full py-3 bg-gold-500 hover:bg-gold-600 active:scale-98 transition-all text-white dark:text-stone-950 font-bold text-[10px] uppercase tracking-widest rounded-xl inline-flex items-center justify-center gap-1.5 shadow-lg shadow-gold-500/10"
                  >
                    <Calculator className="h-4 w-4" /> Apply for Custom Plans
                  </a>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>      {/* 6. COPRORATE PILLARS (THE ADZAN PHILOSOPHY) */}
      <section id="brand-philosophy" className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase text-emerald-700 dark:text-gold-500 tracking-widest block mb-1">Corporate Mandates</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-stone-900 dark:text-white tracking-tight">
            The <span className="font-serif italic text-emerald-600 dark:text-gold-500">Adzan Luxury</span> Pillars
          </h2>
          <p className="text-xs text-stone-500 dark:text-[#A69F95] leading-relaxed mt-2">Integrating legal diligence under registry code RC 6896512 with visual architecture mastery in Lekki and Ikoyi.</p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 14 } }
            }}
            whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.2 } }}
            className="p-6 rounded-2xl bg-white dark:bg-[#13110E] border border-stone-200 dark:border-[#2C261A] text-left shadow-md transition-all duration-200 cursor-default hover:shadow-lg"
          >
            <div className="p-3 w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-5 flex items-center justify-center">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-base font-bold text-stone-900 dark:text-white mb-2 leading-tight">Authentic Diligence</h3>
            <p className="text-xs text-stone-500 dark:text-[#A69F95] leading-relaxed">
              We operate strictly verified by regulatory offices. Our company certification under entry registration RC: 6896512 protects your title interests effortlessly.
            </p>
          </motion.div>

          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 14 } }
            }}
            whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.2 } }}
            className="p-6 rounded-2xl bg-white dark:bg-[#13110E] border border-stone-200 dark:border-[#2C261A] text-left shadow-md transition-all duration-200 cursor-default hover:shadow-lg"
          >
            <div className="p-3 w-12 h-12 rounded-xl bg-gold-400/10 text-emerald-600 dark:text-gold-500 mb-5 flex items-center justify-center">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-base font-bold text-stone-900 dark:text-white mb-2 leading-tight">Reliable Finishing</h3>
            <p className="text-xs text-stone-500 dark:text-[#A69F95] leading-relaxed">
              Grade-A specifications. We coordinate fine bespoke timber profiles, anti-glare double panel glazing, water osmosis systems, and fully active home controls.
            </p>
          </motion.div>

          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 14 } }
            }}
            whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.2 } }}
            className="p-6 rounded-2xl bg-white dark:bg-[#13110E] border border-stone-200 dark:border-[#2C261A] text-left shadow-md transition-all duration-200 cursor-default hover:shadow-lg"
          >
            <div className="p-3 w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-5 flex items-center justify-center">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-base font-bold text-stone-900 dark:text-white mb-2 leading-tight">Affordable Luxury</h3>
            <p className="text-xs text-stone-500 dark:text-[#A69F95] leading-relaxed">
              Optimized portfolios. By managing construction supply lines directly, we deliver real estate assets up to 20% lower than competing realities without reducing material grade.
            </p>
          </motion.div>

          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 14 } }
            }}
            whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.2 } }}
            className="p-6 rounded-2xl bg-white dark:bg-[#13110E] border border-stone-200 dark:border-[#2C261A] text-left shadow-md transition-all duration-200 cursor-default hover:shadow-lg"
          >
            <div className="p-3 w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 mb-5 flex items-center justify-center">
              <Activity className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-base font-bold text-stone-900 dark:text-white mb-2 leading-tight">Active Custody Desk</h3>
            <p className="text-xs text-stone-500 dark:text-[#A69F95] leading-relaxed">
              Complete support from documentation registers to post-purchase asset management. Dedicated client concierge brokers available 24/7.
            </p>
          </motion.div>

        </motion.div>

      </section>

      {/* 7. DIASPORA AND LOCAL INVESTOR TESTIMONIALS */}
      <section id="executive-reviews" className="bg-stone-55 dark:bg-[#13110E] border-t border-stone-200 dark:border-primary-900 py-24 transition-colors duration-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
            <div>
              <span className="text-xs font-bold uppercase text-emerald-700 dark:text-gold-500 tracking-widest block mb-1">Diligence Reviews</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-stone-900 dark:text-white tracking-tight">
                Endorsed by High <span className="font-serif italic text-emerald-600 dark:text-gold-500">Net-Worth</span> Investors
              </h2>
            </div>
            <div className="flex gap-1 text-emerald-600 dark:text-gold-500">
               <Sparkles className="h-5 w-5 fill-emerald-600 dark:fill-gold-500" />
               <Sparkles className="h-5 w-5 fill-emerald-600 dark:fill-gold-500" />
               <Sparkles className="h-5 w-5 fill-emerald-600 dark:fill-gold-500" />
               <span className="text-xs text-stone-700 dark:text-white font-bold uppercase tracking-wider ml-1">Alausa Verified Real Estate</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((rev) => (
              <div key={rev.id} className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-[#2C261A] flex flex-col justify-between shadow-md transition-colors duration-200">
                <div>
                  <div className="flex items-center gap-1 text-emerald-600 dark:text-gold-500 mb-4 text-xs">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="text-xs italic text-stone-605 dark:text-[#A69F95] leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-stone-200 dark:border-[#1C1A18]">
                  <h4 className="text-xs font-bold text-stone-900 dark:text-white">{rev.name}</h4>
                  <span className="text-[10px] text-emerald-700 dark:text-gold-500 block mt-0.5">{rev.role}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. STATEFUL SIDE-OVER PROPERT SPECIFICATION DRAWER */}
      <AnimatePresence>
        {selectedProperty && (
          <div id="prop-slideover-modal" className="fixed inset-0 z-50 overflow-hidden flex justify-end">
            
            {/* Dark background modal overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.65 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setSelectedProperty(null);
                setBookingSuccess(false);
              }}
              className="absolute inset-0 bg-black cursor-pointer"
            />

            {/* Content Sidebar Sheet */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-full max-w-2xl bg-white dark:bg-[#0c0b0a] border-l border-stone-200 dark:border-white/5 h-full overflow-y-auto flex flex-col shadow-2xl z-10 transition-colors duration-200"
            >
              
              {/* Image Banner Slides */}
              <div className="relative h-72 sm:h-96 w-full bg-stone-900 shrink-0">
                <img
                  src={selectedProperty.images[0]}
                  alt={selectedProperty.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                
                {/* Visual shadow top and bottoms */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />

                {/* Sticky Header info */}
                <div className="absolute top-4 inset-x-4 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-stone-900/85 border border-white/5 text-emerald-400 dark:text-gold-500 rounded-full">
                    SPEC-REF: {selectedProperty.refNumber}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedProperty(null);
                      setBookingSuccess(false);
                    }}
                    className="p-2 bg-[#0c0b0a]/80 hover:bg-stone-900 text-[#ECE9E4] hover:text-white rounded-full transition-colors border border-white/5"
                    title="Close"
                  >
                    <X className="h-4.5 w-4.5" />
                  </button>
                </div>

                {/* Pricing overlays */}
                <div className="absolute bottom-4 left-6">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight leading-none mb-1">
                    {selectedProperty.title}
                  </h3>
                  <p className="text-xs text-gold-500 font-bold tracking-wider mt-1.5 font-mono">
                    Asset Listing Value : {formatNaira(selectedProperty.price)}
                  </p>
                </div>
              </div>

              {/* Slider Specifications contents */}
              <div className="p-6 sm:p-8 flex-1 space-y-8">
                
                {/* General metadata specs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-stone-100/60 dark:bg-stone-900/60 border border-stone-200 dark:border-[#2C261A] p-4.5 rounded-2xl text-center">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-stone-500 dark:text-[#A69F95] block mb-0.5">Location Region</span>
                    <strong className="text-stone-900 dark:text-white text-xs block">{selectedProperty.location.split(',')[1] || selectedProperty.location}</strong>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-stone-500 dark:text-[#A69F95] block mb-0.5">Asset Type</span>
                    <strong className="text-emerald-700 dark:text-gold-500 text-xs uppercase block tracking-wider">{selectedProperty.type}</strong>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-stone-500 dark:text-[#A69F95] block mb-0.5">Dimension size</span>
                    <strong className="text-stone-900 dark:text-white text-xs block">{selectedProperty.areaSqFt.toLocaleString()} SqFt</strong>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-stone-500 dark:text-[#A69F95] block mb-0.5">Registry documentation</span>
                    <strong className="text-emerald-600 dark:text-emerald-400 text-xs block"> Alausa Certified</strong>
                  </div>
                </div>

                {/* About description text */}
                <div>
                  <h4 className="text-[10px] font-bold uppercase text-emerald-700 dark:text-gold-500 tracking-widest border-l-2 border-emerald-600 dark:border-gold-500 pl-2.5 mb-3">
                    Architectural Narrative
                  </h4>
                  <p className="text-xs text-stone-605 dark:text-[#A69F95] leading-relaxed">
                    {selectedProperty.description}
                  </p>
                </div>

                {/* Modular specs pills */}
                <div>
                  <h4 className="text-[10px] font-bold uppercase text-emerald-700 dark:text-gold-500 tracking-widest border-l-2 border-emerald-600 dark:border-gold-500 pl-2.5 mb-3">
                    Premium Material Deliverables
                  </h4>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {selectedProperty.features.map((feat, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 text-[10px] bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-[#2C261A] px-3.5 py-1.5 rounded-lg text-stone-850 dark:text-[#D1CCC4]">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-gold-500" />
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action button row helper */}
                <div className="p-1 border-t border-stone-150 dark:border-[#1C1A18] pt-6 flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => handlePropToCalculator(selectedProperty.price)}
                    className="flex-1 py-3 bg-stone-100 hover:bg-stone-200 text-stone-900 dark:bg-stone-900 dark:hover:bg-stone-800 dark:text-white border border-stone-250 dark:border-[#2C261A] rounded-xl text-xs font-bold uppercase tracking-widest transition-all inline-flex items-center justify-center gap-2"
                  >
                    <Calculator className="h-4 w-4 text-emerald-600 dark:text-gold-500" /> Convert in Mortgage Plan
                  </button>
                  <a
                    href={`https://wa.me/234800000000?text=Hello%20Adzan%20Homes%2C%20I%20am%20interested%20in%20the%20property%3A%20${encodeURIComponent(selectedProperty.title)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all inline-flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/10"
                  >
                    <Phone className="h-4 w-4" /> Quick WhatsApp Broker
                  </a>
                </div>

                {/* TOUR BOOKING SCHEDULE (DILIGENCE SCHEDULER BOARD) */}
                <div className="border-t border-stone-200 dark:border-[#2C261A] pt-8">
                  <div className="bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-[#2C261A] rounded-2xl p-5 sm:p-6 text-left relative overflow-hidden">
                    
                    <h4 className="font-serif text-lg font-bold text-stone-900 dark:text-white mb-1 tracking-tight">
                      Schedule VIP Site Visitation
                    </h4>
                    <p className="text-[11px] text-stone-500 dark:text-[#A69F95] mb-6">
                      Book a private security-gated physical inspection or a live spatial drone call walkthrough of the build.
                    </p>

                    <AnimatePresence>
                      {bookingSuccess ? (
                        <motion.div
                          id="booking-success-indicator"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="text-center py-10 bg-emerald-950/10 dark:bg-emerald-950/20 rounded-xl border border-emerald-600/30 p-5"
                        >
                          <CheckCircle2 className="h-10 w-10 text-emerald-600 dark:text-emerald-400 mx-auto mb-3.5" />
                          <h4 className="text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400 tracking-wider">Viewing Registered Successfully</h4>
                          <p className="text-[11px] text-stone-605 dark:text-[#A69F95] max-w-sm mx-auto mt-2 leading-relaxed">
                            A VIP credential card has been added to your <strong>Private Broker Desk</strong> at the client panel top. We sent a booking code voucher message to your number.
                          </p>
                        </motion.div>
                      ) : (
                        <form onSubmit={(e) => handleBookTour(e, selectedProperty)} className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            
                            <div>
                              <label className="text-[9px] uppercase tracking-wider font-bold text-emerald-700 dark:text-gold-500 block mb-1.5">Your Full Name</label>
                              <div className="relative">
                                <input
                                  type="text"
                                  required
                                  value={bookingFullName}
                                  onChange={(e) => setBookingFullName(e.target.value)}
                                  placeholder="e.g. Kolawole Davies"
                                  className="w-full text-xs font-medium rounded-xl bg-white dark:bg-stone-950 border border-stone-200 dark:border-[#2C261A] px-4 py-2.5 text-stone-900 dark:text-white outline-none focus:border-emerald-600 dark:focus:border-gold-500 pl-4.5"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="text-[9px] uppercase tracking-wider font-bold text-emerald-700 dark:text-gold-500 block mb-1.5">Direct Whatsapp Phone</label>
                              <div className="relative">
                                <input
                                  type="tel"
                                  required
                                  value={bookingPhone}
                                  onChange={(e) => setBookingPhone(e.target.value)}
                                  placeholder="e.g. +234 81 2345 6789"
                                  className="w-full text-xs font-medium rounded-xl bg-white dark:bg-stone-950 border border-stone-200 dark:border-[#2C261A] px-4 py-2.5 text-stone-900 dark:text-white outline-none focus:border-emerald-600 dark:focus:border-gold-500 pl-4.5"
                                />
                              </div>
                            </div>

                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            
                            <div>
                              <label className="text-[9px] uppercase tracking-wider font-bold text-emerald-700 dark:text-gold-500 block mb-1.5">Preferred Date</label>
                              <input
                                type="date"
                                required
                                value={bookingDate}
                                onChange={(e) => setBookingDate(e.target.value)}
                                className="w-full text-xs font-medium rounded-xl bg-white dark:bg-stone-950 border border-stone-200 dark:border-[#2C261A] px-4 py-2.5 text-stone-900 dark:text-white outline-none focus:border-emerald-600 dark:focus:border-gold-500"
                              />
                            </div>

                            <div>
                              <label className="text-[9px] uppercase tracking-wider font-bold text-emerald-700 dark:text-gold-500 block mb-1.5">Preferred Time Block</label>
                              <select
                                required
                                value={bookingTime}
                                onChange={(e) => setBookingTime(e.target.value)}
                                className="w-full text-xs font-medium rounded-xl bg-white dark:bg-stone-950 border border-stone-200 dark:border-[#2C261A] px-4 py-2.5 text-stone-900 dark:text-white outline-none focus:border-emerald-600 dark:focus:border-gold-500 cursor-pointer"
                              >
                                <option value="">Select slot</option>
                                <option value="10:00 AM - 12:00 PM">Morning (10 AM - 12 PM)</option>
                                <option value="12:00 PM - 02:00 PM">Midday (12 PM - 2 PM)</option>
                                <option value="02:00 PM - 04:00 PM">Afternoon (2 PM - 4 PM)</option>
                              </select>
                            </div>

                          </div>

                          {/* Tour mode picker */}
                          <div>
                            <label className="text-[9px] uppercase tracking-wider font-bold text-emerald-700 dark:text-gold-500 block mb-1.5">Mode of Visitation</label>
                            <div className="grid grid-cols-2 gap-3">
                              {(['In-person', 'Video Call'] as const).map(mode => (
                                <button
                                  type="button"
                                  key={mode}
                                  onClick={() => setBookingType(mode)}
                                  className={`py-2 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider border flex items-center justify-center gap-1.5 transition-all ${
                                    bookingType === mode
                                      ? 'bg-gold-500 text-white dark:text-stone-950 border-gold-500 font-bold'
                                      : 'bg-stone-100 dark:bg-stone-950 text-stone-605 dark:text-[#D1CCC4] border-stone-200 dark:border-[#2C261A] hover:bg-stone-200 dark:hover:bg-stone-900'
                                  }`}
                                >
                                  {mode === 'In-person' ? (
                                    <>
                                      <MapPin className="h-3.5 w-3.5" /> Physical Site Walk
                                    </>
                                  ) : (
                                    <>
                                      <Phone className="h-3.5 w-3.5" /> High-Res Video Link
                                    </>
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Email input */}
                          <div>
                            <label className="text-[9px] uppercase tracking-wider font-bold text-emerald-700 dark:text-gold-500 block mb-1.5">Your Email Address</label>
                            <input
                              type="email"
                              required
                              value={bookingEmail}
                              onChange={(e) => setBookingEmail(e.target.value)}
                              placeholder="e.g. client@investments.com"
                              className="w-full text-xs font-medium rounded-xl bg-white dark:bg-stone-950 border border-stone-200 dark:border-[#2C261A] px-4 py-2.5 text-stone-900 dark:text-white outline-none focus:border-emerald-600 dark:focus:border-gold-500"
                            />
                          </div>

                          <button
                            type="submit"
                            className="w-full py-3.5 bg-gold-500 hover:bg-gold-600 active:scale-98 text-white dark:text-stone-950 rounded-xl text-xs font-bold uppercase tracking-widest transition-all inline-flex items-center justify-center gap-1.5 shadow-md"
                          >
                            <Calendar className="h-4 w-4" /> Book VIP Site Tour
                          </button>
                        </form>
                      )}
                    </AnimatePresence>

                  </div>
                </div>

              </div>
            </motion.div>

          </div>
        )}
      </AnimatePresence>

      {/* 9. STATS AND DIASPORA COUNTERS */}
      <section className="bg-stone-100 dark:bg-stone-900 border-t border-stone-200 dark:border-[#1C1A18] py-16 transition-colors duration-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <span className="font-serif text-3xl sm:text-4xl font-bold text-emerald-700 dark:text-gold-500 tracking-tight block">98%</span>
              <span className="text-[10px] uppercase font-bold text-stone-550 dark:text-gray-400 mt-1 block">Legal Diligence Rating</span>
            </div>
            <div>
              <span className="font-serif text-3xl sm:text-4xl font-bold text-emerald-700 dark:text-gold-500 tracking-tight block">₦4.2B+</span>
              <span className="text-[10px] uppercase font-bold text-stone-550 dark:text-gray-400 mt-1 block">Asset Portfolio Closed</span>
            </div>
            <div>
              <span className="font-serif text-3xl sm:text-4xl font-bold text-emerald-700 dark:text-gold-500 tracking-tight block">6896512</span>
              <span className="text-[10px] uppercase font-bold text-stone-550 dark:text-gray-400 mt-1 block">Verified CAC RC Registry</span>
            </div>
            <div>
              <span className="font-serif text-3xl sm:text-4xl font-bold text-emerald-700 dark:text-gold-500 tracking-tight block">14 Days</span>
              <span className="text-[10px] uppercase font-bold text-stone-550 dark:text-gray-400 mt-1 block">Average Handover Speed</span>
            </div>
          </div>
        </div>
      </section>

      {/* 10. REAL CONTACT BRIDGES (BROKER DOCK) */}
      <section id="contact-brokerage-dock" className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
        <div className="bg-[#fbfcfa] dark:bg-[#13110E] border border-stone-200 dark:border-[#2C261A] rounded-3xl p-8 sm:p-12 shadow-sm dark:shadow-none relative overflow-hidden transition-colors duration-200">
          
          <div className="absolute top-0 right-0 p-10 select-none pointer-events-none opacity-4 dark:opacity-5 hidden lg:block">
             <Building className="h-[250px] w-[250px] text-stone-300 dark:text-white" />
          </div>

          <div className="max-w-xl text-left">
            <span className="text-xs font-bold uppercase text-emerald-700 dark:text-gold-500 tracking-widest block mb-2">Corporate Correspondence</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-stone-900 dark:text-white tracking-tight">
              Request VIP <span className="font-serif italic text-emerald-600 dark:text-gold-500">Corporate</span> Portfolio Presentation
            </h2>
            <p className="text-sm leading-relaxed text-stone-550 dark:text-[#A69F95] mt-4 mb-8">
              Are you looking to invest in verified dry parcels or ultra-luxury smart villas from the diaspora? Contact our Alausa-verified registry offices directly.
            </p>

            <div className="space-y-4 text-xs font-medium text-stone-800 dark:text-[#ECE9E4]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-stone-100 border border-stone-200 dark:bg-stone-900 dark:border-[#2C261A] text-emerald-600 dark:text-gold-500">
                  <MapPin className="h-4 w-4" />
                </div>
                <span>Banex Plaza Mall, Plot 15, Admiralty Way, Phase 1 Lekki, Lagos</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-stone-100 border border-stone-200 dark:bg-stone-900 dark:border-[#2C261A] text-emerald-600 dark:text-gold-500">
                  <Phone className="h-4 w-4" />
                </div>
                <span>+234 (0) 805 ADZAN REALTY (0805 239 2673)</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-stone-100 border border-stone-200 dark:bg-stone-900 dark:border-[#2C261A] text-emerald-600 dark:text-gold-500">
                  <Mail className="h-4 w-4" />
                </div>
                <span>inquiries@adzanluxuryhomes.com</span>
              </div>
            </div>

            <div className="mt-8 pt-4 flex flex-wrap gap-4">
              <a
                href="mailto:inquiries@adzanluxuryhomes.com?subject=Real%20Estate%20Portfolio%20Inquiry%20-%20AI%20Lead"
                className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-widest rounded-xl inline-flex items-center gap-2 shadow-lg shadow-emerald-600/10"
              >
                <Mail className="h-4 w-4" /> Request Call Back Proposal
              </a>
              <a
                href="https://wa.me/2348052392673"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 bg-stone-100 hover:bg-stone-200 text-stone-800 dark:bg-stone-900 dark:hover:bg-stone-800 dark:text-white border border-stone-250 dark:border-[#2C261A] text-xs font-bold uppercase tracking-widest rounded-xl inline-flex items-center gap-2"
              >
                <Phone className="h-4 w-4 text-emerald-500" /> WhatsApp Direct line
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 11. DYNAMIC PORTFOLIO WHATSAPP Broker simulated widget (THE CHAT CONCIERGE) */}
      <div id="concierge-floating-widget" className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        
        {/* Toggle popup panel bubble */}
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              id="concierge-chat-panel"
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              className="w-80 sm:w-[350px] bg-white dark:bg-stone-900 border border-stone-200 dark:border-[#2C261A] rounded-2xl overflow-hidden shadow-2xl mb-3 flex flex-col h-[400px] transition-colors duration-200"
            >
              {/* Chat header area */}
              <div className="bg-stone-50 dark:bg-[#13110E] p-4 border-b border-stone-200 dark:border-[#2C261A] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-9 h-9 bg-stone-100 dark:bg-[#222E46] rounded-full flex items-center justify-center p-0.5 border border-emerald-600/40 dark:border-gold-500/40">
                    <User className="h-5 w-5 text-emerald-600 dark:text-gold-400" />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-stone-900 rounded-full" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-stone-900 dark:text-white leading-tight">Alvin Cole</h4>
                    <span className="text-[9px] text-stone-500 dark:text-gray-400 flex items-center gap-1 leading-none mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active Broker Advisor
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setChatOpen(false)}
                  className="p-1 text-stone-400 hover:text-stone-800 dark:text-gray-500 dark:hover:text-white"
                  title="Minimize Advisor Panel"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Chat thread list viewports */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-stone-50 dark:bg-[#0c0b0a] text-xs text-left">
                {chatHistory.map((chat, idx) => (
                  <div
                    key={idx}
                    className={`flex ${chat.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] rounded-2xl p-3 leading-relaxed shadow-sm ${
                      chat.sender === 'user'
                        ? 'bg-emerald-600 text-white rounded-tr-none font-medium'
                        : 'bg-white text-stone-800 border border-stone-200 dark:bg-stone-900 dark:text-[#ECE9E4] dark:border-white/5 rounded-tl-none font-normal'
                    }`}>
                      <p className="text-[11px] font-sans pr-1">{chat.text}</p>
                      <span className="text-[8px] opacity-60 block mt-1 text-right font-mono text-stone-500 dark:text-gray-550">
                        {chat.time}
                      </span>
                    </div>
                  </div>
                ))}
                
                {/* Simulated live typing status indicators */}
                {brokerTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white text-stone-800 border border-stone-200 dark:bg-stone-900 dark:text-[#ECE9E4] dark:border-[#2C261A] rounded-2xl rounded-tl-none p-3 max-w-[80%]">
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                      </span>
                    </div>
                  </div>
                )}
                
                <div ref={chatBottomRef} />
              </div>

              {/* Instant dynamic question option pills */}
              <div className="bg-stone-100 dark:bg-stone-900 border-t border-[#1C1A18] p-2 flex items-center gap-1 overflow-x-auto whitespace-nowrap scrollbar-none shadow-sm shrink-0">
                <button
                  onClick={() => {
                    setChatMessage("Verify land documents and CAC registry details");
                    setTimeout(() => handleSendChatMessage(), 80);
                  }}
                  className="p-1.5 px-3 bg-white hover:bg-stone-200 dark:bg-[#1C1A17] dark:hover:bg-[#2C261A] text-[9px] text-emerald-800 dark:text-[#D1CCC4] font-bold uppercase rounded-lg border border-stone-250 dark:border-[#2C261A]"
                >
                  Verify CAC RC
                </button>
                <button
                  onClick={() => {
                    setChatMessage("How does the down payment spread work?");
                    setTimeout(() => handleSendChatMessage(), 80);
                  }}
                  className="p-1.5 px-3 bg-white hover:bg-stone-200 dark:bg-[#1C1A17] dark:hover:bg-[#2C261A] text-[9px] text-emerald-800 dark:text-[#D1CCC4] font-bold uppercase rounded-lg border border-stone-250 dark:border-[#2C261A]"
                >
                  Spread down payments
                </button>
                <button
                  onClick={() => {
                    setChatMessage("Are Banana Island Penthouse viewings active?");
                    setTimeout(() => handleSendChatMessage(), 80);
                  }}
                  className="p-1.5 px-3 bg-white hover:bg-stone-200 dark:bg-[#1C1A17] dark:hover:bg-[#2C261A] text-[9px] text-emerald-800 dark:text-[#D1CCC4] font-bold uppercase rounded-lg border border-stone-250 dark:border-[#2C261A]"
                >
                  Banana Island Tour
                </button>
              </div>

              {/* Chat send input widgets */}
              <form onSubmit={handleSendChatMessage} className="p-3 bg-stone-50 dark:bg-stone-900 border-t border-stone-200 dark:border-[#1C1A18] flex items-center gap-2 shrink-0">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Direct message Alvin..."
                  className="flex-1 bg-white dark:bg-stone-950 border border-stone-250 dark:border-[#2C261A] rounded-xl px-3.5 py-2 text-xs text-stone-900 dark:text-white outline-none focus:border-emerald-600 dark:focus:border-gold-500 placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 dark:bg-gold-500 dark:hover:bg-gold-600 active:scale-95 text-white dark:text-[#0c0b0a] font-bold transition-all"
                  title="Send Message"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>

            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Toggle Round Handle Button */}
        <button
          id="broker-chat-round-dot"
          onClick={() => setChatOpen(!chatOpen)}
          className="p-4 bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-gold-500 dark:hover:bg-gold-600 dark:text-stone-950 rounded-full shadow-2xl transition-all flex items-center justify-center relative border border-emerald-500 dark:border-gold-600 group"
          title="Direct Simulated Chat Broker"
        >
          <MessageCircle className="h-6 w-6" />
          {!chatOpen && (
            <span className="absolute -top-1.5 -left-1.5 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-505 border-2 border-white dark:border-stone-900 text-[8px] font-bold text-white dark:text-[#0c0b0a] items-center justify-center">1</span>
            </span>
          )}
        </button>

      </div>

      {/* 12. ELEGNAT COROPRATE FOOTER */}
      <footer className="border-t border-stone-200 bg-stone-50 dark:border-[#2C261A] dark:bg-[#0A0908] py-16 text-xs text-stone-500 dark:text-[#A69F95] transition-colors duration-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 border-b border-stone-150 dark:border-[#1C1A18] pb-12">
            
            {/* Branding widget column */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative h-9 w-9 rounded-full flex items-center justify-center border border-emerald-605/20 dark:border-gold-500/25 bg-white dark:bg-stone-900/50 shadow-sm">
                  <svg viewBox="0 0 100 100" className="w-4 h-4 text-emerald-600 dark:text-gold-500" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M50 15 L20 85 M50 15 L80 85 M35 55 L65 55" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-serif font-light text-xs tracking-[0.18em] text-emerald-700 dark:text-gold-500 leading-none">ADZAN</span>
                  <span className="font-sans font-light text-[8px] tracking-[0.25em] text-stone-700 dark:text-[#ECE9E4]/85 leading-none mt-1">LUXURY HOMES</span>
                </div>
              </div>
              <p className="text-[11px] leading-relaxed text-stone-500 dark:text-[#A69F95]">
                Corporate real estate investments verified under registry RC: 6896512. Handing over premium residential assets throughout prime Lekki, Ajah, and Banana Island, VI.
              </p>
            </div>

            {/* Quick sections anchors column */}
            <div className="text-left">
              <h4 className="font-serif text-sm font-bold text-stone-900 dark:text-white mb-4">Investment Hub</h4>
              <ul className="space-y-2 text-[11px]">
                <li><a href="#properties-hub" className="hover:text-emerald-700 dark:hover:text-gold-500">Lekki Detached Duplexes</a></li>
                <li><a href="#properties-hub" className="hover:text-emerald-700 dark:hover:text-gold-500">Banana Island Penthouses</a></li>
                <li><a href="#properties-hub" className="hover:text-emerald-700 dark:hover:text-gold-500">Abraham Adesanya Terraces</a></li>
                <li><a href="#properties-hub" className="hover:text-emerald-700 dark:hover:text-gold-500">Chevron Gated Parcels</a></li>
              </ul>
            </div>

            {/* Regulatory items column */}
            <div className="text-left">
              <h4 className="font-serif text-sm font-bold text-stone-900 dark:text-white mb-4">Diligence & Clean Title</h4>
              <ul className="space-y-2 text-[11px]">
                <li><span className="text-stone-500 dark:text-gray-400">Governor Consent Registry</span></li>
                <li><span className="text-stone-500 dark:text-gray-400">Alausa Certificate Clearance</span></li>
                <li><span className="text-stone-500 dark:text-gray-400">CAC RC. 6896512 Legal Status</span></li>
                <li><span className="text-stone-500 dark:text-gray-400">Bespoke Milestone Spread plan</span></li>
              </ul>
            </div>

            {/* Credit developer tag column */}
            <div className="text-left space-y-4">
              <h4 className="font-serif text-sm font-bold text-stone-900 dark:text-white mb-2">Portfolio Handover Desk</h4>
              <p className="text-[11px] leading-relaxed text-stone-500 dark:text-[#A69F95]">
                Mock visual representation developed for the real estate developer portfolio demonstration. Fits standard fullstack preview scopes.
              </p>
              <div className="p-2 border border-stone-200 dark:border-[#2C261A] bg-stone-100 dark:bg-stone-900/60 rounded-xl text-[9px] text-stone-505 dark:text-[#A69F95] font-mono leading-relaxed">
                 <strong className="text-emerald-700 dark:text-gold-550 block mb-0.5 uppercase">Developer Credentials</strong>
                 <span>Client Audit Demo Mode</span>
              </div>
            </div>

          </div>

          {/* Slogan and copyright footer bottom */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400 dark:text-[#7E786E] text-center sm:text-left gap-4">
            <p>© {new Date().getFullYear()} Adzan Luxury Homes Limited. All portfolios simulated. Slogan: "Reliable and Affordable".</p>
            <p className="font-serif italic text-stone-605 dark:text-[#A69F95]">Excellence and Integrity in every brick.</p>
          </div>

        </div>
      </footer>

    </div>
  );
}
