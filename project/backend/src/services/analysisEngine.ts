/**
 * VentureWise Feasibility Analysis Engine v2
 * Rule-based, realistic, specific scoring — not random.
 * Uses products/services, competitors, and city data for deep analysis.
 */

import { getCompetitorsForBusiness, type Competitor } from "../data/competitors.js";
import { getCityData, getZonesByBusinessType, type CommercialZone } from "../data/cityData.js";

interface AnalysisInput {
  businessType: string;
  description: string;
  budget: number;
  targetAudience: string;
  productsOrServices: string;
  categoryName: string;
  locationSizeCategory: string;
  city: string;
  country: string;
}

interface AnalysisResult {
  successScore: number;
  riskLevel: "Low" | "Medium" | "High";
  marketDemand: "Low" | "Medium" | "High" | "Very High";
  competitionLevel: "Low" | "Medium" | "High" | "Very High";
  estimatedRevenueMin: number;
  estimatedRevenueMax: number;
  explanation: string;
  marketAnalysis: string;
  pricingStrategy: string;
  marketingPlan: string;
  brandingSuggestions: string;
  hiringNeeds: string;
  competitors: string; // JSON
  bestLocations: string; // JSON
}

const HIGH_DEMAND_KEYWORDS = [
  "food", "restaurant", "cafe", "delivery", "health", "fitness", "gym",
  "tech", "software", "app", "digital", "online", "e-commerce", "education",
  "beauty", "salon", "retail", "fashion", "consulting", "finance", "cleaning",
  "logistics", "healthcare", "medical", "pharmacy", "grocery", "coffee", "beverage",
  "skincare", "cosmetic", "clothing", "apparel", "travel", "tourism", "training"
];

const HIGH_COMPETITION_KEYWORDS = [
  "restaurant", "coffee", "cafe", "gym", "fitness", "salon", "beauty",
  "retail", "fashion", "food", "delivery", "e-commerce", "consulting",
  "travel", "pharmacy", "clothing", "cosmetic"
];

const LOW_COMPETITION_KEYWORDS = [
  "niche", "specialized", "unique", "innovative", "patent", "proprietary",
  "exclusive", "custom", "bespoke", "artisan", "boutique", "handmade", "organic"
];

function calculateMarketDemand(input: AnalysisInput): { demand: "Low" | "Medium" | "High" | "Very High"; score: number } {
  const text = `${input.businessType} ${input.categoryName} ${input.description} ${input.productsOrServices}`.toLowerCase();
  let demandScore = 50;

  const highMatches = HIGH_DEMAND_KEYWORDS.filter(k => text.includes(k)).length;
  demandScore += highMatches * 7;

  if (input.locationSizeCategory === "metro") demandScore += 15;
  else if (input.locationSizeCategory === "large") demandScore += 10;
  else if (input.locationSizeCategory === "medium") demandScore += 5;
  else demandScore -= 5;

  // Specific demand boosters
  const bt = input.businessType.toLowerCase();
  if (bt.includes("food delivery") || bt.includes("café") || bt.includes("coffee")) demandScore += 12;
  if (bt.includes("tech") || bt.includes("saas") || bt.includes("digital")) demandScore += 10;
  if (bt.includes("healthcare") || bt.includes("clinic") || bt.includes("pharmacy")) demandScore += 8;
  if (bt.includes("education") || bt.includes("training")) demandScore += 6;

  demandScore = Math.min(100, Math.max(0, demandScore));

  let demand: "Low" | "Medium" | "High" | "Very High";
  if (demandScore >= 75) demand = "Very High";
  else if (demandScore >= 55) demand = "High";
  else if (demandScore >= 35) demand = "Medium";
  else demand = "Low";

  return { demand, score: demandScore };
}

function calculateCompetition(input: AnalysisInput): { competition: "Low" | "Medium" | "High" | "Very High"; score: number } {
  const text = `${input.businessType} ${input.categoryName} ${input.description} ${input.productsOrServices}`.toLowerCase();
  let competitionScore = 50;

  const highMatches = HIGH_COMPETITION_KEYWORDS.filter(k => text.includes(k)).length;
  competitionScore += highMatches * 6;

  const lowMatches = LOW_COMPETITION_KEYWORDS.filter(k => text.includes(k)).length;
  competitionScore -= lowMatches * 12;

  if (input.locationSizeCategory === "metro") competitionScore += 15;
  else if (input.locationSizeCategory === "large") competitionScore += 8;
  else if (input.locationSizeCategory === "small") competitionScore -= 10;

  competitionScore = Math.min(100, Math.max(0, competitionScore));

  let competition: "Low" | "Medium" | "High" | "Very High";
  if (competitionScore >= 75) competition = "Very High";
  else if (competitionScore >= 55) competition = "High";
  else if (competitionScore >= 35) competition = "Medium";
  else competition = "Low";

  return { competition, score: competitionScore };
}

function estimateRevenue(budget: number, demandScore: number, competitionScore: number, businessType: string): { min: number; max: number } {
  const demandMultiplier = demandScore / 50;
  const competitionPenalty = (100 - competitionScore) / 100;

  let baseRate = 0.15;
  const bt = businessType.toLowerCase();
  if (bt.includes("saas") || bt.includes("tech") || bt.includes("software")) baseRate = 0.25;
  else if (bt.includes("consulting") || bt.includes("real estate")) baseRate = 0.20;
  else if (bt.includes("restaurant") || bt.includes("café") || bt.includes("food")) baseRate = 0.12;
  else if (bt.includes("logistics") || bt.includes("delivery")) baseRate = 0.10;

  const baseMonthlyRevenue = budget * baseRate * demandMultiplier * competitionPenalty;
  const min = Math.round(Math.max(500, baseMonthlyRevenue * 0.7) / 100) * 100;
  const max = Math.round(Math.max(1000, baseMonthlyRevenue * 1.4) / 100) * 100;

  return { min, max };
}

export function runAnalysis(input: AnalysisInput): AnalysisResult {
  const { demand, score: demandScore } = calculateMarketDemand(input);
  const { competition, score: competitionScore } = calculateCompetition(input);

  let successScore = 40;
  successScore += (demandScore - 50) * 0.4;
  successScore -= (competitionScore - 50) * 0.3;

  if (input.budget >= 100000) successScore += 20;
  else if (input.budget >= 50000) successScore += 12;
  else if (input.budget >= 20000) successScore += 6;
  else if (input.budget < 5000) successScore -= 10;

  if (input.locationSizeCategory === "metro") successScore += 5;
  else if (input.locationSizeCategory === "small") successScore -= 5;

  const descLength = (input.description + input.productsOrServices).length;
  if (descLength > 200) successScore += 5;
  else if (descLength < 50) successScore -= 5;

  // Products/services specificity bonus
  if (input.productsOrServices.length > 20) successScore += 4;

  successScore = Math.round(Math.min(97, Math.max(12, successScore)));

  let riskLevel: "Low" | "Medium" | "High";
  if (successScore >= 70) riskLevel = "Low";
  else if (successScore >= 45) riskLevel = "Medium";
  else riskLevel = "High";

  const { min, max } = estimateRevenue(input.budget, demandScore, competitionScore, input.businessType);

  // Get competitors and city data
  const competitorList = getCompetitorsForBusiness(input.businessType, input.categoryName);
  const cityInfo = getCityData(input.city);
  const bestZones = cityInfo ? getZonesByBusinessType(cityInfo.zones, input.businessType) : [];

  const locationPayload = cityInfo
    ? { cityLat: cityInfo.lat, cityLng: cityInfo.lng, cityName: cityInfo.city, zones: bestZones }
    : { cityLat: 25.2048, cityLng: 55.2708, cityName: input.city, zones: bestZones };

  const explanation = generateExplanation(input, successScore, riskLevel, demand, competition);
  const marketAnalysis = generateMarketAnalysis(input, demand, competition, competitorList);
  const pricingStrategy = generatePricingStrategy(input, competition);
  const marketingPlan = generateMarketingPlan(input, demand);
  const brandingSuggestions = generateBrandingSuggestions(input);
  const hiringNeeds = generateHiringNeeds(input, input.budget);

  return {
    successScore,
    riskLevel,
    marketDemand: demand,
    competitionLevel: competition,
    estimatedRevenueMin: min,
    estimatedRevenueMax: max,
    explanation,
    marketAnalysis,
    pricingStrategy,
    marketingPlan,
    brandingSuggestions,
    hiringNeeds,
    competitors: JSON.stringify(competitorList),
    bestLocations: JSON.stringify(locationPayload),
  };
}

function generateExplanation(
  input: AnalysisInput,
  score: number,
  risk: string,
  demand: string,
  competition: string
): string {
  const city = input.city || "your target city";
  const country = input.country ? `, ${input.country}` : "";
  const budgetStr = input.budget >= 1000000
    ? `$${(input.budget / 1000000).toFixed(1)}M`
    : input.budget >= 1000
    ? `$${Math.round(input.budget / 1000)}K`
    : `$${input.budget}`;

  const outlook = score >= 70 ? "strong" : score >= 50 ? "moderate" : "challenging";
  const riskNote = risk === "Low"
    ? "Your budget level and market positioning significantly minimize financial exposure."
    : risk === "Medium"
    ? "Moderate risk factors exist — careful launch planning and phased investment will be key."
    : "Elevated risk profile requires strategic mitigation: tighter cost control, phased rollout, and strong differentiation.";

  const productsNote = input.productsOrServices
    ? ` Your core offering — ${input.productsOrServices} — targets a ${demand.toLowerCase()} demand segment.`
    : "";

  return `${input.businessType} shows ${outlook} viability in the ${input.categoryName} sector within ${city}${country}. ` +
    `With a capital allocation of ${budgetStr}, market demand is ${demand.toLowerCase()} and competitive pressure is ${competition.toLowerCase()}. ` +
    `The feasibility score of ${score}/100 reflects these combined market dynamics.${productsNote} ` +
    `${riskNote} ` +
    `Success hinges on differentiated positioning, early brand trust-building, ` +
    `and precise alignment with your primary segment: ${input.targetAudience}.`;
}

function generateMarketAnalysis(
  input: AnalysisInput,
  demand: string,
  competition: string,
  competitors: Competitor[]
): string {
  const city = input.city || "the selected location";
  const locationNote = input.locationSizeCategory === "metro"
    ? `${city} is a major metropolitan market offering a massive addressable customer base, but also attracting well-funded established players.`
    : input.locationSizeCategory === "large"
    ? `${city} provides sufficient population density and consumer spending capacity for sustainable business growth.`
    : `${city} presents a focused opportunity with less saturation — ideal for building a loyal core base before scaling.`;

  const competitionNote = (competition === "Low" || competition === "Medium")
    ? "a favorable window exists to capture market share before the space matures"
    : "strong differentiation and execution speed are critical to carve out a defensible position";

  const topCompetitor = competitors[0];
  const competitorInsight = topCompetitor
    ? `The dominant player, ${topCompetitor.name} (${topCompetitor.type}), is strong in ${topCompetitor.strength.split(",")[0].toLowerCase()} — but exposed in ${topCompetitor.weakness.split(",")[0].toLowerCase()}, which is your entry opportunity.`
    : "";

  const productsContext = input.productsOrServices
    ? ` Consumer appetite for ${input.productsOrServices} in this market is driven by evolving lifestyle preferences and rising disposable income.`
    : "";

  return `The ${input.categoryName} sector in ${city} demonstrates ${demand.toLowerCase()} consumer demand. ${locationNote} ` +
    `Competition intensity is ${competition.toLowerCase()}, indicating that ${competitionNote}. ` +
    `${competitorInsight}${productsContext} ` +
    `Your target segment — "${input.targetAudience}" — aligns with documented spending growth patterns ` +
    `in this vertical, suggesting real and monetizable demand.`;
}

function generatePricingStrategy(input: AnalysisInput, competition: string): string {
  const isHighBudget = input.budget >= 50000;
  const isPremiumCategory = ["technology", "consulting", "healthcare", "luxury", "real estate"].some(c =>
    input.categoryName.toLowerCase().includes(c) || input.businessType.toLowerCase().includes(c)
  );

  const productsRef = input.productsOrServices ? `for your ${input.productsOrServices}` : "";

  if (isPremiumCategory || isHighBudget) {
    return `Adopt a value-based pricing model ${productsRef} that positions ${input.businessType} in the premium tier. ` +
      `Price 15–30% above market average to signal quality, expertise, and exclusivity. ` +
      `Structure tiered service packages (Essential, Professional, Enterprise) to capture multiple segments simultaneously. ` +
      `Introductory pricing for the first 90 days can accelerate initial acquisition without permanently anchoring price expectations downward. ` +
      `Target lifetime value (LTV) should exceed customer acquisition cost (CAC) by at least 3:1 within month 6.`;
  }

  if (competition === "High" || competition === "Very High") {
    return `Given the competitive landscape ${productsRef}, a penetration-pricing approach is recommended at launch. ` +
      `Open 10–15% below the prevailing market rate to generate initial traction and word-of-mouth. ` +
      `Bundle complementary products/services to increase perceived value while protecting unit margins. ` +
      `After 90 days, begin incremental price normalization as your brand recognition builds. ` +
      `Loyalty and subscription programs are critical here — they lock in recurring revenue while reducing churn risk in price-sensitive markets.`;
  }

  return `A market-rate pricing strategy is appropriate for ${productsRef || "your offering"}. ` +
    `Price competitively at category benchmarks while highlighting specific differentiators. ` +
    `Consider subscription or membership models to generate predictable monthly recurring revenue. ` +
    `Dynamic seasonal pricing during peak periods can improve yield without eroding everyday price perception. ` +
    `Build in a clear upsell path — at least one complementary add-on that increases average order value by 20–35%.`;
}

function generateMarketingPlan(input: AnalysisInput, _demand: string): string {
  const productsRef = input.productsOrServices ? `your ${input.productsOrServices}` : `${input.businessType}`;
  const city = input.city || "your target city";

  const channels = input.targetAudience.toLowerCase().includes("student") || input.targetAudience.toLowerCase().includes("young")
    ? "TikTok and Instagram Reels"
    : input.targetAudience.toLowerCase().includes("b2b") || input.targetAudience.toLowerCase().includes("professional")
    ? "LinkedIn and Google Search"
    : input.targetAudience.toLowerCase().includes("senior") || input.targetAudience.toLowerCase().includes("family")
    ? "Facebook and Google Maps"
    : "Instagram, Google, and TikTok";

  return `Phase 1 — Launch (Months 1–2): Build a professional presence. Claim and optimize your Google Business profile for ${city}. ` +
    `Activate ${channels} with content showcasing ${productsRef}. Launch a referral program with a clear incentive (e.g., 15% off next purchase). ` +
    `Run a geo-targeted opening campaign covering a 5km radius around your primary location. ` +
    `Phase 2 — Growth (Months 3–6): Scale paid channels with a budget of 8–12% of monthly revenue on Meta/Google Ads. ` +
    `Partner with 3–5 local micro-influencers (10k–100k followers) in the ${input.categoryName} space for authentic endorsements. ` +
    `Launch weekly educational or behind-the-scenes content to build brand trust and category authority. ` +
    `Phase 3 — Retention (Month 6+): Implement a CRM to track customer lifetime value and purchase patterns. ` +
    `Introduce a loyalty rewards program with tiered benefits. ` +
    `Collect 50+ verified reviews on Google by month 6 — reviews are the #1 local discovery signal. ` +
    `Retarget website visitors with personalized offers and abandoned-cart sequences (for e-commerce).`;
}

function generateBrandingSuggestions(input: AnalysisInput): string {
  const positioning = input.budget >= 100000 ? "premium, trustworthy market leader" : "approachable, value-forward community brand";
  const productsRef = input.productsOrServices ? `around ${input.productsOrServices}` : "";

  return `Brand Identity: Position ${input.businessType} ${productsRef} as a ${positioning} in the ${input.categoryName} space. ` +
    `Visual System: Design a clean, memorable logo using 2–3 brand colors tied to your category's emotional cues ` +
    `(trust = blue/green, energy = orange/red, luxury = black/gold). ` +
    `Typography: pair a bold display font for headlines with a readable sans-serif for body copy. ` +
    `Brand Voice: Communicate with confident warmth — knowledgeable but human. ` +
    `Your audience "${input.targetAudience}" responds to messaging that emphasizes ${
      input.targetAudience.toLowerCase().includes("luxury") ? "prestige, exclusivity, and craft" :
      input.targetAudience.toLowerCase().includes("student") ? "value, speed, and community" :
      input.targetAudience.toLowerCase().includes("professional") ? "efficiency, credibility, and ROI" :
      "reliability, quality, and belonging"
    }. ` +
    `Differentiators: Lead with your 3 strongest unique selling points — superior product quality, localized expertise, ` +
    `exceptional service — and be consistent across all touchpoints: storefront, packaging, digital channels, and staff.`;
}

function generateHiringNeeds(input: AnalysisInput, budget: number): string {
  const isLargeOperation = budget >= 100000;
  const isTech = input.businessType.toLowerCase().includes("tech") ||
    input.businessType.toLowerCase().includes("software") ||
    input.businessType.toLowerCase().includes("saas") ||
    input.categoryName.toLowerCase().includes("tech");

  const isFood = input.businessType.toLowerCase().includes("restaurant") ||
    input.businessType.toLowerCase().includes("café") ||
    input.businessType.toLowerCase().includes("food");

  const isHealthcare = input.businessType.toLowerCase().includes("clinic") ||
    input.businessType.toLowerCase().includes("health") ||
    input.categoryName.toLowerCase().includes("health");

  let coreRoles: string;
  let specialtyRoles = "";

  if (isFood) {
    coreRoles = "Head Chef / Kitchen Manager, Floor Manager, 2–4 Service Staff, Delivery Coordinator";
    specialtyRoles = " Consider a Social Media Manager specifically for food content — visual F&B content drives 40% higher engagement on Instagram.";
  } else if (isHealthcare) {
    coreRoles = "Clinic Director, 1–2 Specialist Practitioners, Receptionist & Scheduling Coordinator, Billing Specialist";
    specialtyRoles = " You'll also need a Compliance Officer familiar with local health authority regulations from day one.";
  } else if (isTech) {
    coreRoles = "Product Manager, 2 Full-Stack Developers, UX/UI Designer, DevOps Engineer";
    specialtyRoles = " A dedicated Customer Success Manager will be critical post-launch to reduce churn and gather product feedback.";
  } else if (isLargeOperation) {
    coreRoles = "Operations Manager, Sales Lead, Marketing Coordinator, Customer Service Team (2–3 staff)";
  } else {
    coreRoles = "Generalist Operations Lead, Part-time Sales/Customer Support, Social Media Coordinator";
  }

  return `Priority hires (first 3 months): ${coreRoles}.${specialtyRoles} ` +
    `Scale-up hires (months 4–12): As revenue stabilizes above break-even, add a dedicated ${input.categoryName} ` +
    `specialist, a Financial Analyst for reporting and forecasting, and an HR Coordinator once your team exceeds 8–10 people. ` +
    `Compensation strategy: Offer base salaries 5–10% above local market rate to attract quality talent, ` +
    `plus performance incentives tied to revenue milestones. For specialized roles, ` +
    `consider project-based contractors (graphic design, legal, accounting) in the first 6 months to preserve runway. ` +
    `Build a culture of accountability and clear KPIs from day one — it's significantly harder to retrofit systems later.`;
}
