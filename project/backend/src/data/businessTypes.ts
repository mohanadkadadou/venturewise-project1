export const BUSINESS_TYPES = [
  "Restaurant",
  "Café & Coffee Shop",
  "Retail Store",
  "E-Commerce Store",
  "SaaS / Tech Platform",
  "Consulting Firm",
  "Healthcare Clinic",
  "Gym & Fitness Center",
  "Beauty Salon & Spa",
  "Education & Training Center",
  "Real Estate Agency",
  "Food Delivery Service",
  "Logistics & Delivery",
  "Pharmacy",
  "Fashion & Clothing Brand",
  "Import & Export",
  "Tourism & Travel Agency",
  "Media & Content Studio",
  "Photography & Events",
  "Construction & Contracting",
] as const;

export type BusinessType = typeof BUSINESS_TYPES[number];

export const TARGET_AUDIENCES = [
  "Young Adults (18–30)",
  "Families & Parents",
  "Working Professionals",
  "Students",
  "Seniors (50+)",
  "Businesses (B2B)",
  "Tourists & Visitors",
  "Health Enthusiasts",
  "Budget Shoppers",
  "Luxury Seekers",
  "Entrepreneurs & Startups",
  "Local Community",
] as const;

export type TargetAudience = typeof TARGET_AUDIENCES[number];
