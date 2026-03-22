from typing import TypedDict, Literal

class Competitor(TypedDict):
    name: str
    type: str
    presence: str
    strength: str
    weakness: str
    marketShare: Literal["Dominant", "High", "Medium", "Low"]

COMPETITOR_MAP: dict[str, list[Competitor]] = {
    "Restaurant": [
        {"name": "McDonald's", "type": "Global Fast Food Chain", "presence": "Worldwide, 40,000+ locations", "strength": "Brand recognition, supply chain efficiency, value pricing", "weakness": "Perceived low quality, losing health-conscious customers", "marketShare": "Dominant"},
        {"name": "KFC", "type": "Global Fast Food Chain", "presence": "145+ countries, 27,000+ locations", "strength": "Chicken specialization, strong delivery infrastructure", "weakness": "Limited menu variety, high sodium perception", "marketShare": "Dominant"},
        {"name": "Pizza Hut", "type": "Global Pizza Chain", "presence": "100+ countries, 18,000+ locations", "strength": "Dine-in + delivery model, pizza category leadership", "weakness": "Inconsistent quality across franchises", "marketShare": "High"},
        {"name": "Subway", "type": "Global Sandwich Chain", "presence": "100+ countries, 37,000+ locations", "strength": "Customization, healthy positioning, low startup cost", "weakness": "Recent store closures, franchise quality control", "marketShare": "High"},
        {"name": "Local Dine-In Chains", "type": "Regional Chain", "presence": "Local market, 5–50 locations", "strength": "Cultural familiarity, local loyalty, authentic cuisine", "weakness": "Limited marketing budget, supply chain dependence", "marketShare": "Medium"},
    ],
    "Café & Coffee Shop": [
        {"name": "Starbucks", "type": "Global Premium Coffee Chain", "presence": "84 countries, 35,000+ stores", "strength": "Brand loyalty, premium experience, app ecosystem", "weakness": "High prices limit mass market, heavy franchise fees", "marketShare": "Dominant"},
        {"name": "Costa Coffee", "type": "Global Coffee Chain", "presence": "40+ countries, 4,000+ stores", "strength": "Quality consistency, loyalty rewards, European appeal", "weakness": "Less innovation than Starbucks, lower US presence", "marketShare": "High"},
        {"name": "Dunkin'", "type": "Global Coffee & Donuts Chain", "presence": "40+ countries, 12,000+ stores", "strength": "Speed, value pricing, accessible locations", "weakness": "Commodity perception, limited premium appeal", "marketShare": "High"},
        {"name": "Tim Hortons", "type": "Canadian Coffee Chain", "presence": "15 countries, 5,700+ locations", "strength": "Loyal local fan base, affordable pricing, fast service", "weakness": "Limited international recognition outside Canada", "marketShare": "Medium"},
        {"name": "Local Artisan Cafés", "type": "Independent/Regional", "presence": "Local market, 1–10 locations", "strength": "Unique atmosphere, specialty coffee, community feel", "weakness": "No scale, price sensitive, dependent on foot traffic", "marketShare": "Low"},
    ],
    "Retail Store": [
        {"name": "Amazon", "type": "Global E-Commerce & Retail", "presence": "Worldwide, dominant online", "strength": "Price, selection, Prime ecosystem, logistics", "weakness": "No tactile experience, return friction, trust issues", "marketShare": "Dominant"},
        {"name": "Carrefour", "type": "Global Hypermarket Chain", "presence": "30+ countries, 12,000+ stores", "strength": "One-stop-shop, strong private label, foot traffic", "weakness": "Thin margins, logistics costs, online competition", "marketShare": "High"},
        {"name": "IKEA", "type": "Global Furniture Retailer", "presence": "60+ countries, 400+ stores", "strength": "Unique design, affordable luxury, experience-led retail", "weakness": "Assembly hassle, large store format, slow delivery", "marketShare": "High"},
        {"name": "Zara / Inditex", "type": "Global Fashion Retailer", "presence": "96 countries, 2,000+ stores", "strength": "Fast fashion cycle, trendy at accessible price", "weakness": "Sustainability criticism, short product life", "marketShare": "High"},
        {"name": "Local Specialty Stores", "type": "Regional", "presence": "Local market", "strength": "Niche expertise, personal service, community trust", "weakness": "Limited inventory, no online channel, margin pressure", "marketShare": "Low"},
    ],
    "E-Commerce Store": [
        {"name": "Amazon", "type": "Global Marketplace", "presence": "Worldwide, $500B+ GMV", "strength": "Trust, logistics network, customer base, Prime", "weakness": "High seller fees, intense competition, price wars", "marketShare": "Dominant"},
        {"name": "Noon", "type": "MENA E-Commerce Platform", "presence": "UAE, Saudi Arabia, Egypt", "strength": "Regional focus, local payment methods, fast delivery", "weakness": "Smaller catalog than Amazon, limited logistics in tier-2 cities", "marketShare": "High"},
        {"name": "Alibaba / AliExpress", "type": "Global B2B/B2C Marketplace", "presence": "Worldwide, 1B+ products", "strength": "Unbeatable prices, vast supplier network", "weakness": "Long shipping times, quality uncertainty, returns process", "marketShare": "Dominant"},
        {"name": "Shopify Stores", "type": "Independent D2C", "presence": "Varies by niche", "strength": "Niche expertise, brand loyalty, direct margins", "weakness": "Customer acquisition cost, no built-in traffic", "marketShare": "Low"},
        {"name": "eBay", "type": "Global Marketplace", "presence": "190+ countries", "strength": "Auctions, used goods, niche collectibles", "weakness": "Declining relevance among younger shoppers", "marketShare": "Medium"},
    ],
    "SaaS / Tech Platform": [
        {"name": "Salesforce", "type": "Global CRM / SaaS", "presence": "Worldwide, $30B+ ARR", "strength": "Enterprise trust, ecosystem, CRM dominance", "weakness": "Expensive, complex implementation, slow innovation", "marketShare": "Dominant"},
        {"name": "HubSpot", "type": "Inbound Marketing SaaS", "presence": "120+ countries, 160k+ customers", "strength": "SMB focus, free tier, strong inbound marketing tools", "weakness": "Higher tiers expensive, limited enterprise features", "marketShare": "High"},
        {"name": "Microsoft 365 / Azure", "type": "Global Enterprise Platform", "presence": "Worldwide", "strength": "Enterprise relationships, Office integration, scale", "weakness": "Bureaucratic, legacy code, steep learning curve", "marketShare": "Dominant"},
        {"name": "Notion / Asana / Monday", "type": "Productivity SaaS", "presence": "Worldwide, SMB to Enterprise", "strength": "Modern UX, viral growth, flexible workflows", "weakness": "Feature bloat, pricing confusion, integration gaps", "marketShare": "Medium"},
        {"name": "Regional SaaS Startups", "type": "Local Competitors", "presence": "Local / Regional", "strength": "Local language, compliance, pricing in local currency", "weakness": "Limited funding, smaller engineering teams", "marketShare": "Low"},
    ],
    "Consulting Firm": [
        {"name": "McKinsey & Company", "type": "Global Management Consulting", "presence": "130+ countries, $16B revenue", "strength": "Top-tier talent, C-suite access, research capability", "weakness": "Extremely expensive, perceived elitism, long engagements", "marketShare": "Dominant"},
        {"name": "Deloitte", "type": "Global Professional Services", "presence": "150+ countries, 334k employees", "strength": "Full-service (audit, tax, consulting, tech), global brand", "weakness": "Can lack specialization depth in niche domains", "marketShare": "Dominant"},
        {"name": "PwC / KPMG / EY", "type": "Global Big 4", "presence": "150+ countries", "strength": "Brand trust, regulatory expertise, large client base", "weakness": "Bureaucratic, slower to adapt, expensive", "marketShare": "High"},
        {"name": "Boutique Local Consultancies", "type": "Regional Specialist", "presence": "Local market", "strength": "Deep local knowledge, agility, personal relationships", "weakness": "Limited capacity, brand recognition, talent retention", "marketShare": "Low"},
        {"name": "Freelance / Independent Consultants", "type": "Independent", "presence": "Platform-based (Upwork, Toptal)", "strength": "Cost-effective, niche expertise, flexible engagement", "weakness": "No team scalability, liability gaps, trust building", "marketShare": "Low"},
    ],
    "Healthcare Clinic": [
        {"name": "National / Government Hospitals", "type": "Public Healthcare System", "presence": "National", "strength": "Free/subsidized care, wide coverage, brand authority", "weakness": "Long wait times, less personalized, outdated systems", "marketShare": "Dominant"},
        {"name": "HealthCare International (HCI)", "type": "Private Hospital Group", "presence": "MENA & Asia", "strength": "Premium care, insurance integration, specialist doctors", "weakness": "High cost, limited accessibility in smaller cities", "marketShare": "High"},
        {"name": "Apollo Hospitals", "type": "Private Hospital Chain (Asia)", "presence": "12 countries, 70+ hospitals", "strength": "Medical tourism, affordable premium care, telemedicine", "weakness": "Geographic concentration, brand less known in West", "marketShare": "High"},
        {"name": "Polyclinics / Local Clinics", "type": "Local Private Clinic", "presence": "Local market", "strength": "Accessibility, community trust, low waiting time", "weakness": "Limited specializations, equipment constraints", "marketShare": "Medium"},
        {"name": "Telemedicine Platforms (Babylon, Alodokter)", "type": "Digital Health", "presence": "Global/Regional", "strength": "Convenience, lower cost, AI triage", "weakness": "Cannot handle emergencies, regulatory hurdles", "marketShare": "Low"},
    ],
    "Gym & Fitness Center": [
        {"name": "Gold's Gym", "type": "Global Gym Franchise", "presence": "30+ countries, 600+ locations", "strength": "Brand heritage, bodybuilding culture, franchise support", "weakness": "Dated brand image, losing to boutique fitness", "marketShare": "High"},
        {"name": "Planet Fitness", "type": "Budget Gym Chain (US-focused)", "presence": "USA/Canada, 2,000+ locations", "strength": "Very low pricing ($10/mo), no-judgment culture", "weakness": "Limited equipment, no free weights culture", "marketShare": "High"},
        {"name": "Anytime Fitness", "type": "Global Franchise Gym", "presence": "50+ countries, 4,000+ gyms", "strength": "24/7 access, franchise support, global network", "weakness": "Inconsistent quality, equipment age varies", "marketShare": "High"},
        {"name": "Boutique Fitness Studios (CrossFit, F45)", "type": "Premium Boutique", "presence": "Global, 5,000+ CrossFit boxes", "strength": "Community culture, specialty programming, premium pricing", "weakness": "High membership cost, niche appeal", "marketShare": "Medium"},
        {"name": "Local Independent Gyms", "type": "Independent", "presence": "Local market", "strength": "Personal training, community feel, flexible pricing", "weakness": "Equipment investment, marketing budget, retention", "marketShare": "Low"},
    ],
    "Beauty Salon & Spa": [
        {"name": "Supercuts / Great Clips", "type": "Hair Salon Chain", "presence": "USA/Canada, 4,000+ locations", "strength": "Walk-in convenience, standardized pricing, speed", "weakness": "No luxury experience, low retention, high turnover", "marketShare": "High"},
        {"name": "Regis Salons", "type": "Global Salon Franchise", "presence": "20+ countries, 5,000+ locations", "strength": "Mall presence, training program, brand consistency", "weakness": "Dated experience, online booking lag", "marketShare": "High"},
        {"name": "TONI&GUY", "type": "Premium Salon Brand", "presence": "50+ countries, 475+ salons", "strength": "Fashion-forward, education brand, editorial credibility", "weakness": "Premium pricing limits mass market access", "marketShare": "Medium"},
        {"name": "Sephora Inside JCPenney / Beauty Bars", "type": "Retail-Integrated Beauty", "presence": "Global retail presence", "strength": "Beauty experience + retail, brand crossover", "weakness": "Limited service depth", "marketShare": "Medium"},
        {"name": "Local Freelance Stylists", "type": "Independent Professionals", "presence": "Local market", "strength": "Loyal client base, personalized service, low overhead", "weakness": "No scalability, dependent on one person", "marketShare": "Low"},
    ],
    "Education & Training Center": [
        {"name": "Coursera", "type": "Global Online Learning Platform", "presence": "Worldwide, 100M+ learners", "strength": "University partnerships, certifications, flexible learning", "weakness": "Completion rates low, less suited for hands-on skills", "marketShare": "Dominant"},
        {"name": "Udemy", "type": "Global Online Course Marketplace", "presence": "Worldwide, 57M+ students", "strength": "Instructor variety, low pricing ($15–20), breadth of topics", "weakness": "Quality inconsistency, no curriculum structure", "marketShare": "High"},
        {"name": "British Council / Alliance Française", "type": "Language Training Institution", "presence": "100+ countries", "strength": "Internationally recognized certificates, brand authority", "weakness": "High price, rigid schedule, limited subject range", "marketShare": "High"},
        {"name": "GEMS Education", "type": "Private School Network (MENA)", "presence": "UAE, Egypt, India, Malaysia", "strength": "Premium K-12, multiple curricula, global accreditation", "weakness": "Very high fees, limited geographical spread", "marketShare": "High"},
        {"name": "Local Training Centers", "type": "Regional", "presence": "Local market", "strength": "In-person experience, local language, job placement", "weakness": "Limited accreditation, small curriculum library", "marketShare": "Low"},
    ],
    "Real Estate Agency": [
        {"name": "RE/MAX", "type": "Global Real Estate Franchise", "presence": "110+ countries, 140,000+ agents", "strength": "Agent network, brand trust, CRM tools", "weakness": "Franchisee inconsistency, agent commission model", "marketShare": "Dominant"},
        {"name": "CBRE Group", "type": "Global Commercial RE", "presence": "100+ countries, $30B+ revenue", "strength": "Commercial RE leadership, research capability, global deals", "weakness": "Less accessible for residential / SMB", "marketShare": "Dominant"},
        {"name": "Bayut / Property Finder (MENA)", "type": "PropTech Platform", "presence": "UAE, Saudi Arabia, Egypt, Pakistan", "strength": "Digital listings, AI search, high traffic", "weakness": "Referral dependency, listing quality varies", "marketShare": "High"},
        {"name": "Zillow / Trulia", "type": "PropTech Platform (US)", "presence": "United States", "strength": "Consumer trust, data analytics, buyer intent", "weakness": "US-only, agent displeasure, iBuying losses", "marketShare": "High"},
        {"name": "Local Agencies", "type": "Independent Regional", "presence": "Local market", "strength": "Local knowledge, negotiation, personal relationships", "weakness": "Limited digital presence, small inventory", "marketShare": "Low"},
    ],
    "Food Delivery Service": [
        {"name": "Talabat (Delivery Hero)", "type": "MENA Food Delivery Leader", "presence": "9 countries, MENA-dominant", "strength": "Deep regional presence, restaurant relationships, speed", "weakness": "Logistics costs, restaurant margin squeezing", "marketShare": "Dominant"},
        {"name": "Deliveroo", "type": "Global Premium Food Delivery", "presence": "10 countries", "strength": "Premium restaurant partnerships, premium UX", "weakness": "Higher fees, exited some markets", "marketShare": "High"},
        {"name": "Uber Eats", "type": "Global Food Delivery", "presence": "45+ countries, 800k+ restaurants", "strength": "Uber ecosystem, global brand, driver network", "weakness": "High commission rates, profitability challenges", "marketShare": "Dominant"},
        {"name": "Instacart / Nana (grocery delivery)", "type": "Grocery Delivery", "presence": "Regional (US, MENA)", "strength": "Grocery specialization, same-day delivery", "weakness": "High surge pricing, substitution issues", "marketShare": "Medium"},
        {"name": "Local Cloud Kitchens", "type": "Ghost Kitchen Operators", "presence": "Local market", "strength": "Low rent, delivery-first, multiple brands one kitchen", "weakness": "Brand building difficulty, platform dependency", "marketShare": "Low"},
    ],
    "Logistics & Delivery": [
        {"name": "DHL", "type": "Global Logistics Leader", "presence": "220 countries and territories", "strength": "Reliability, global network, express speed, technology", "weakness": "High cost, slower for last-mile in developing regions", "marketShare": "Dominant"},
        {"name": "FedEx", "type": "Global Express Shipping", "presence": "220+ countries", "strength": "Time-definite delivery, B2B relationships, tracking", "weakness": "Premium pricing, less competitive on ground shipping", "marketShare": "Dominant"},
        {"name": "Aramex", "type": "MENA & Emerging Markets Logistics", "presence": "65+ countries", "strength": "Regional expertise, e-commerce fulfillment, last-mile", "weakness": "Less brand recognition vs global giants in West", "marketShare": "High"},
        {"name": "Amazon Logistics", "type": "Captive Logistics Network", "presence": "US, EU, expanding globally", "strength": "Vertical integration, cost efficiency, scale", "weakness": "Only serves Amazon sellers, not open platform", "marketShare": "Dominant"},
        {"name": "Local Courier Companies", "type": "Regional", "presence": "Local market", "strength": "Lower pricing, local relationships, flexible terms", "weakness": "Limited scale, tracking gaps, insurance limitations", "marketShare": "Low"},
    ],
    "Pharmacy": [
        {"name": "CVS Health", "type": "US Pharmacy Retail Leader", "presence": "USA, 10,000+ locations", "strength": "Pharmacy + clinic model, PBM integration, loyalty", "weakness": "US-only, complex insurance model", "marketShare": "Dominant"},
        {"name": "Boots / Alliance Healthcare", "type": "European Pharmacy Chain", "presence": "UK + 11 markets, 2,500+ stores", "strength": "Health & beauty integration, OTC strength", "weakness": "Healthcare reforms affecting margins", "marketShare": "High"},
        {"name": "IQVIA / International Pharma Distributors", "type": "Wholesale Pharma", "presence": "100+ countries", "strength": "Supply chain, regulatory compliance, bulk pricing", "weakness": "Not consumer-facing, B2B model", "marketShare": "Dominant"},
        {"name": "1mg / Noon Pharmacy / Online Pharmacies", "type": "Digital Pharmacy", "presence": "India, MENA growing", "strength": "Convenience, prescription upload, home delivery", "weakness": "Cold chain logistics, regulatory restrictions", "marketShare": "Medium"},
        {"name": "Local Independent Pharmacies", "type": "Community Pharmacy", "presence": "Local market", "strength": "Community trust, quick access, pharmacist advice", "weakness": "Margin pressure from chains, limited OTC brands", "marketShare": "Low"},
    ],
    "Fashion & Clothing Brand": [
        {"name": "Zara (Inditex)", "type": "Global Fast Fashion", "presence": "96 countries, 2,000+ stores", "strength": "Trend speed (2-week cycle), vertical integration, global retail", "weakness": "Sustainability criticism, counterfeiting", "marketShare": "Dominant"},
        {"name": "H&M Group", "type": "Global Fashion Retailer", "presence": "75 countries, 4,700+ stores", "strength": "Price accessibility, volume scale, brand variety (ARKET etc)", "weakness": "Inventory buildup, fashion miss risks", "marketShare": "High"},
        {"name": "SHEIN", "type": "Ultra-Fast Fashion E-Commerce", "presence": "150+ countries", "strength": "Extreme pricing, social commerce, mega selection", "weakness": "Quality perception, IP controversies, environmental issues", "marketShare": "High"},
        {"name": "Nike / Adidas", "type": "Global Sportswear Brands", "presence": "Worldwide", "strength": "Brand equity, athlete endorsements, premium pricing", "weakness": "Manufacturing cost, limited fashion positioning", "marketShare": "Dominant"},
        {"name": "Local Fashion Brands", "type": "Regional Designer", "presence": "Local market", "strength": "Cultural authenticity, local fabric/design, community pride", "weakness": "Distribution scale, online presence, production cost", "marketShare": "Low"},
    ],
    "Import & Export": [
        {"name": "Maersk", "type": "Global Shipping Conglomerate", "presence": "130+ countries", "strength": "Container fleet, end-to-end logistics, digital platform", "weakness": "Price volatility, port dependency, climate risk", "marketShare": "Dominant"},
        {"name": "Alibaba International / Global Sources", "type": "B2B Trade Platforms", "presence": "Worldwide", "strength": "Supplier discovery, verified trade, huge catalog", "weakness": "Quality verification, communication barrier", "marketShare": "Dominant"},
        {"name": "International Trading Houses (MUFG, Mitsubishi)", "type": "Integrated Trading Companies", "presence": "Worldwide", "strength": "Capital, government relationships, sector diversification", "weakness": "Not accessible for SME, slow decision-making", "marketShare": "High"},
        {"name": "Regional Import/Export Agents", "type": "Local Trade Broker", "presence": "Local / Regional", "strength": "Regulatory knowledge, customs relationships, flexibility", "weakness": "Limited resources, informal operations", "marketShare": "Low"},
        {"name": "TradeIndia / Kompass", "type": "B2B Trade Directories", "presence": "Regional", "strength": "Lead generation, supplier network, trade intelligence", "weakness": "Listing quality varies, spam leads", "marketShare": "Low"},
    ],
    "Tourism & Travel Agency": [
        {"name": "Booking.com", "type": "Global OTA (Online Travel Agency)", "presence": "Worldwide, 28M+ listings", "strength": "Inventory breadth, pricing, reviews, B2B tools", "weakness": "Commission rates for hotels, brand commoditization", "marketShare": "Dominant"},
        {"name": "Expedia / Hotels.com", "type": "Global OTA", "presence": "Worldwide, $11B+ revenue", "strength": "Package deals, loyalty, white-label B2B", "weakness": "Complex UI, less strong outside US", "marketShare": "Dominant"},
        {"name": "Airbnb", "type": "Global P2P Accommodation", "presence": "220 countries, 7M+ listings", "strength": "Unique experiences, local feel, Experiences product", "weakness": "Regulation risk, quality inconsistency, party concerns", "marketShare": "Dominant"},
        {"name": "Regional Travel Agencies (Dnata, Al Futtaim)", "type": "Regional Full-Service Agency", "presence": "MENA & Asia", "strength": "Corporate travel expertise, local knowledge, visas", "weakness": "Traditional model under OTA pressure", "marketShare": "High"},
        {"name": "Boutique / Niche Tour Operators", "type": "Specialty Travel", "presence": "Local / Niche", "strength": "Curated experiences, expert guides, community trust", "weakness": "Scale limitation, marketing budget, seasonality", "marketShare": "Low"},
    ],
    "Media & Content Studio": [
        {"name": "Meta (Facebook/Instagram)", "type": "Global Social Media Platform", "presence": "Worldwide, 3.5B users", "strength": "Advertising reach, targeting precision, creator tools", "weakness": "Declining youth engagement, algorithm unpredictability", "marketShare": "Dominant"},
        {"name": "YouTube (Google)", "type": "Global Video Platform", "presence": "Worldwide, 2.7B users", "strength": "Monetization ecosystem, search integration, long-form dominance", "weakness": "AdSense revenue variability, algorithm changes", "marketShare": "Dominant"},
        {"name": "TikTok / ByteDance", "type": "Short-Form Video Platform", "presence": "150+ countries, 1.5B users", "strength": "Viral algorithm, Gen Z dominance, creator fund", "weakness": "Regulatory pressure, ban risks, brand safety", "marketShare": "High"},
        {"name": "Production Houses (MBC, OSN, Rotana)", "type": "Regional Media Group", "presence": "MENA + international", "strength": "Arabic content leadership, broadcasting rights, talent", "weakness": "Legacy infrastructure, slow digital transition", "marketShare": "High"},
        {"name": "Independent Content Studios", "type": "Boutique Creative Agency", "presence": "Local market", "strength": "Agility, specialization, brand authenticity", "weakness": "Client dependency, limited scale, talent cost", "marketShare": "Low"},
    ],
    "Photography & Events": [
        {"name": "Getty Images / Shutterstock", "type": "Global Stock Photography", "presence": "Worldwide", "strength": "Massive library, licensing model, AI-generated content", "weakness": "Commoditizing professional photography, flat pricing", "marketShare": "Dominant"},
        {"name": "CVENT / Eventbrite", "type": "Global Event Management Platform", "presence": "Worldwide", "strength": "Corporate events expertise, ticketing integration, analytics", "weakness": "High platform fees, less personalized service", "marketShare": "High"},
        {"name": "GIF Booth / Photo Activation Companies", "type": "Event Tech", "presence": "Regional", "strength": "Trend-driven, viral social content, corporate demand", "weakness": "Niche market, equipment-heavy, maintenance", "marketShare": "Low"},
        {"name": "Local Wedding & Events Planners", "type": "Regional Specialist", "presence": "Local market", "strength": "Client relationships, local venue knowledge, cultural sensitivity", "weakness": "Seasonal revenue, no recurring clients, social media dependent", "marketShare": "Medium"},
        {"name": "Corporate Event Agencies (FIVE, George P. Johnson)", "type": "Global Event Agency", "presence": "50+ countries", "strength": "Global brand events, production scale, technology integration", "weakness": "High minimum spend, not accessible for SMBs", "marketShare": "High"},
    ],
    "Construction & Contracting": [
        {"name": "AECOM", "type": "Global Engineering & Construction", "presence": "150+ countries, $14B revenue", "strength": "Mega-project expertise, government contracts, engineering depth", "weakness": "High overhead, complex procurement, slow bids", "marketShare": "Dominant"},
        {"name": "Bechtel", "type": "US Engineering Giant", "presence": "160+ countries", "strength": "Nuclear, infrastructure, oil & gas expertise, government trust", "weakness": "Limited SMB accessibility, lengthy procurement", "marketShare": "Dominant"},
        {"name": "ALDAR / Emaar / DAMAC", "type": "Regional Real Estate Developer", "presence": "MENA + international", "strength": "Integrated development, capital access, government partnerships", "weakness": "Market concentration risk, luxury focus", "marketShare": "High"},
        {"name": "Bin Laden Group / NBCI", "type": "Regional Construction Giant", "presence": "MENA", "strength": "Saudi market dominance, government work, scale", "weakness": "Bureaucratic, limited transparency, dependence on oil economy", "marketShare": "High"},
        {"name": "Local Contractors / MEP Specialists", "type": "SME Contractor", "presence": "Local market", "strength": "Cost competitiveness, relationships, flexibility", "weakness": "Limited bonding capacity, labor management, safety compliance", "marketShare": "Low"},
    ],
}


def get_competitors_for_business(business_type: str, category_name: str) -> list[Competitor]:
    if business_type in COMPETITOR_MAP:
        return COMPETITOR_MAP[business_type]

    bt_lower = business_type.lower()
    for key, comps in COMPETITOR_MAP.items():
        key_lower = key.lower()
        if bt_lower.split()[0] in key_lower or key_lower.split()[0] in bt_lower:
            return comps

    cat_lower = category_name.lower()
    if any(k in cat_lower for k in ["food", "restaurant", "beverage"]):
        return COMPETITOR_MAP["Restaurant"]
    if any(k in cat_lower for k in ["tech", "software", "digital"]):
        return COMPETITOR_MAP["SaaS / Tech Platform"]
    if any(k in cat_lower for k in ["health", "medical", "clinic"]):
        return COMPETITOR_MAP["Healthcare Clinic"]
    if any(k in cat_lower for k in ["consult", "advisory"]):
        return COMPETITOR_MAP["Consulting Firm"]
    if any(k in cat_lower for k in ["retail", "shop", "store"]):
        return COMPETITOR_MAP["Retail Store"]
    if any(k in cat_lower for k in ["fitness", "gym", "wellness"]):
        return COMPETITOR_MAP["Gym & Fitness Center"]
    if any(k in cat_lower for k in ["beauty", "salon", "spa"]):
        return COMPETITOR_MAP["Beauty Salon & Spa"]

    return [
        {"name": "Local Market Leaders", "type": "Established Regional Player", "presence": "Local market, 5–20 locations", "strength": "Brand recognition, loyal customer base, market knowledge", "weakness": "Resistance to innovation, limited digital presence", "marketShare": "High"},
        {"name": "International Brands (entering market)", "type": "Global Expansion", "presence": "New entrant, 1–3 pilot locations", "strength": "Capital, proven model, premium positioning", "weakness": "Cultural mismatch, high setup cost, trust building", "marketShare": "Low"},
        {"name": "Online Competitors", "type": "E-Commerce / Digital-First", "presence": "Digital, serving same customers", "strength": "Lower cost, 24/7 availability, scalable", "weakness": "No personal touch, delivery logistics, quality perception", "marketShare": "Medium"},
        {"name": "Freelancers / Gig Economy", "type": "Independent Operators", "presence": "Local market, platform-based", "strength": "Competitive pricing, flexibility, personal service", "weakness": "No scale, inconsistent quality, no brand equity", "marketShare": "Low"},
        {"name": "Adjacent Category Players", "type": "Cross-Category Competitor", "presence": "Local + Regional", "strength": "Cross-sell customer base, established distribution", "weakness": "Not specialists, diluted brand focus", "marketShare": "Medium"},
    ]
