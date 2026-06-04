/**
 * TypeScript types for Adzan Luxury Homes Limited Portfolio Website
 */

export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  description: string;
  images: string[];
  bedrooms: number;
  bathrooms: number;
  areaSqFt: number;
  type: 'duplex' | 'penthouse' | 'terrace' | 'apartment' | 'land';
  status: 'For sale' | 'Under construction' | 'Sold';
  features: string[];
  refNumber: string;
  isFeatured?: boolean;
}

export interface TourBooking {
  id: string;
  propertyId: string;
  propertyName: string;
  fullName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  tourType: 'In-person' | 'Video Call';
  message?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
}
