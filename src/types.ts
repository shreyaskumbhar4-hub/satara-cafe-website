export type Language = 'en' | 'mr';

export type ActivePage = 
  | 'home'
  | 'menu'
  | 'order-slip'
  | 'story-craft'
  | 'reviews'
  | 'table-booking'
  | 'location';

export type CategoryId = 
  | 'all'
  | 'south-indian'
  | 'satara-katta'
  | 'sandwiches'
  | 'pav-bhaji'
  | 'fast-food'
  | 'beverages';

export interface MenuItem {
  id: string;
  nameEn: string;
  nameMr: string;
  category: CategoryId;
  price: number;
  descriptionEn: string;
  descriptionMr: string;
  popular?: boolean;
  veg: boolean;
  jainAvailable?: boolean;
  image?: string;
  spicyLevel?: 1 | 2 | 3;
  mealTime?: 'morning' | 'afternoon' | 'evening' | 'all-day';
}

export interface CartCustomization {
  spiceLevel: 'mild' | 'medium' | 'spicy';
  extraChutney: boolean;
  extraSambar: boolean;
  extraCheese: boolean;
  packaging: 'dine-in' | 'takeaway';
  note?: string;
}

export interface CartItem {
  cartId: string;
  menuItem: MenuItem;
  quantity: number;
  customization: CartCustomization;
  isCombo?: boolean;
  comboDetails?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  role?: string;
  rating: number;
  date: string;
  text: string;
  textMr?: string;
  dishMentioned?: string;
  ownerReply?: string;
  likes?: number;
}

export interface TableBooking {
  name: string;
  phone: string;
  partySize: number;
  date: string;
  timeSlot: string;
  notes?: string;
  occasion?: string;
}
