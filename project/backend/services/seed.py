import json
import sys
from db import get_connection, count_table

CATEGORIES = [
    {"name": "Food & Beverage", "description": "Restaurants, cafes, bakeries, and food production businesses", "icon": "🍽️"},
    {"name": "Retail & Fashion", "description": "Clothing stores, boutiques, online retail and fashion brands", "icon": "🛍️"},
    {"name": "Technology", "description": "Software, SaaS platforms, tech startups and digital services", "icon": "💻"},
    {"name": "Health & Wellness", "description": "Clinics, gyms, wellness centers, and healthcare services", "icon": "🏥"},
    {"name": "Education", "description": "Schools, training centers, online courses and tutoring", "icon": "📚"},
    {"name": "Real Estate", "description": "Property agencies, construction, and real estate development", "icon": "🏢"},
    {"name": "Beauty & Personal Care", "description": "Salons, spas, cosmetics, and personal care services", "icon": "💄"},
    {"name": "Logistics & Supply Chain", "description": "Delivery, freight, warehousing, and supply chain management", "icon": "🚚"},
    {"name": "Finance & Investment", "description": "Financial services, investment firms, and fintech", "icon": "💰"},
    {"name": "Media & Entertainment", "description": "Content studios, events, photography, and entertainment", "icon": "🎬"},
    {"name": "Tourism & Hospitality", "description": "Hotels, travel agencies, and hospitality services", "icon": "✈️"},
    {"name": "Professional Services", "description": "Consulting, legal, accounting, and B2B professional services", "icon": "💼"},
]

LOCATIONS = [
    ("Dubai", "United Arab Emirates", "Middle East", "metro"),
    ("Abu Dhabi", "United Arab Emirates", "Middle East", "metro"),
    ("Riyadh", "Saudi Arabia", "Middle East", "metro"),
    ("Jeddah", "Saudi Arabia", "Middle East", "metro"),
    ("Cairo", "Egypt", "Africa", "metro"),
    ("Istanbul", "Turkey", "Europe", "metro"),
    ("Doha", "Qatar", "Middle East", "large"),
    ("Kuwait City", "Kuwait", "Middle East", "large"),
    ("Manama", "Bahrain", "Middle East", "medium"),
    ("Muscat", "Oman", "Middle East", "large"),
    ("Amman", "Jordan", "Middle East", "large"),
    ("Beirut", "Lebanon", "Middle East", "large"),
    ("Casablanca", "Morocco", "Africa", "metro"),
    ("Tunis", "Tunisia", "Africa", "large"),
    ("Nairobi", "Kenya", "Africa", "metro"),
    ("Lagos", "Nigeria", "Africa", "metro"),
    ("Accra", "Ghana", "Africa", "large"),
    ("Johannesburg", "South Africa", "Africa", "metro"),
    ("Addis Ababa", "Ethiopia", "Africa", "metro"),
    ("Dar es Salaam", "Tanzania", "Africa", "large"),
    ("Kampala", "Uganda", "Africa", "large"),
    ("London", "United Kingdom", "Europe", "metro"),
    ("Paris", "France", "Europe", "metro"),
    ("Berlin", "Germany", "Europe", "metro"),
    ("Amsterdam", "Netherlands", "Europe", "large"),
    ("Madrid", "Spain", "Europe", "metro"),
    ("Rome", "Italy", "Europe", "metro"),
    ("Vienna", "Austria", "Europe", "large"),
    ("Zurich", "Switzerland", "Europe", "large"),
    ("Stockholm", "Sweden", "Europe", "large"),
    ("Prague", "Czech Republic", "Europe", "large"),
    ("Warsaw", "Poland", "Europe", "metro"),
    ("Bucharest", "Romania", "Europe", "metro"),
    ("Athens", "Greece", "Europe", "metro"),
    ("Lisbon", "Portugal", "Europe", "large"),
    ("Barcelona", "Spain", "Europe", "metro"),
    ("Milan", "Italy", "Europe", "metro"),
    ("Munich", "Germany", "Europe", "metro"),
    ("Zurich", "Switzerland", "Europe", "large"),
    ("Brussels", "Belgium", "Europe", "large"),
    ("New York", "United States", "North America", "metro"),
    ("Los Angeles", "United States", "North America", "metro"),
    ("Chicago", "United States", "North America", "metro"),
    ("Houston", "United States", "North America", "metro"),
    ("Toronto", "Canada", "North America", "metro"),
    ("Vancouver", "Canada", "North America", "large"),
    ("Mexico City", "Mexico", "North America", "metro"),
    ("Monterrey", "Mexico", "North America", "metro"),
    ("São Paulo", "Brazil", "South America", "metro"),
    ("Rio de Janeiro", "Brazil", "South America", "metro"),
    ("Buenos Aires", "Argentina", "South America", "metro"),
    ("Bogotá", "Colombia", "South America", "metro"),
    ("Lima", "Peru", "South America", "metro"),
    ("Santiago", "Chile", "South America", "metro"),
    ("Tokyo", "Japan", "Asia Pacific", "metro"),
    ("Seoul", "South Korea", "Asia Pacific", "metro"),
    ("Beijing", "China", "Asia Pacific", "metro"),
    ("Shanghai", "China", "Asia Pacific", "metro"),
    ("Guangzhou", "China", "Asia Pacific", "metro"),
    ("Shenzhen", "China", "Asia Pacific", "metro"),
    ("Hong Kong", "Hong Kong SAR", "Asia Pacific", "metro"),
    ("Singapore", "Singapore", "Asia Pacific", "metro"),
    ("Kuala Lumpur", "Malaysia", "Asia Pacific", "metro"),
    ("Bangkok", "Thailand", "Asia Pacific", "metro"),
    ("Jakarta", "Indonesia", "Asia Pacific", "metro"),
    ("Manila", "Philippines", "Asia Pacific", "metro"),
    ("Ho Chi Minh City", "Vietnam", "Asia Pacific", "metro"),
    ("Mumbai", "India", "Asia Pacific", "metro"),
    ("Delhi", "India", "Asia Pacific", "metro"),
    ("Bangalore", "India", "Asia Pacific", "metro"),
    ("Karachi", "Pakistan", "Asia Pacific", "metro"),
    ("Dhaka", "Bangladesh", "Asia Pacific", "metro"),
    ("Lahore", "Pakistan", "Asia Pacific", "metro"),
    ("Colombo", "Sri Lanka", "Asia Pacific", "large"),
    ("Kathmandu", "Nepal", "Asia Pacific", "large"),
    ("Phnom Penh", "Cambodia", "Asia Pacific", "large"),
    ("Yangon", "Myanmar", "Asia Pacific", "large"),
    ("Sydney", "Australia", "Oceania", "metro"),
    ("Melbourne", "Australia", "Oceania", "metro"),
    ("Brisbane", "Australia", "Oceania", "large"),
    ("Auckland", "New Zealand", "Oceania", "large"),
    ("Tehran", "Iran", "Middle East", "metro"),
    ("Baghdad", "Iraq", "Middle East", "metro"),
    ("Erbil", "Iraq", "Middle East", "large"),
    ("Sanaa", "Yemen", "Middle East", "large"),
    ("Damascus", "Syria", "Middle East", "large"),
    ("Khartoum", "Sudan", "Africa", "metro"),
    ("Abidjan", "Ivory Coast", "Africa", "metro"),
    ("Dakar", "Senegal", "Africa", "large"),
    ("Douala", "Cameroon", "Africa", "large"),
    ("Kinshasa", "DR Congo", "Africa", "metro"),
    ("Algiers", "Algeria", "Africa", "metro"),
    ("Tripoli", "Libya", "Africa", "large"),
    ("Lusaka", "Zambia", "Africa", "large"),
    ("Harare", "Zimbabwe", "Africa", "large"),
    ("Maputo", "Mozambique", "Africa", "large"),
    ("Baku", "Azerbaijan", "Europe", "large"),
    ("Tbilisi", "Georgia", "Europe", "large"),
    ("Almaty", "Kazakhstan", "Central Asia", "metro"),
    ("Tashkent", "Uzbekistan", "Central Asia", "metro"),
]

JOBS = [
    {"title": "Senior Full-Stack Developer", "company": "TechVenture ME", "description": "Build scalable web applications for enterprise clients. You'll work with React, Node.js, and PostgreSQL in an agile team. Own features from design to deployment.", "requiredSkills": ["React", "Node.js", "PostgreSQL", "TypeScript", "AWS"], "salaryMin": 8000, "salaryMax": 14000, "jobType": "Full-time", "location": "Dubai, UAE", "experienceLevel": "Senior", "isActive": True},
    {"title": "Digital Marketing Manager", "company": "GrowthHive MENA", "description": "Lead end-to-end digital campaigns across paid, organic, and social channels. Drive ROI for clients in e-commerce, SaaS, and retail sectors.", "requiredSkills": ["Google Ads", "Meta Ads", "SEO", "Analytics", "Content Strategy"], "salaryMin": 5500, "salaryMax": 8000, "jobType": "Full-time", "location": "Riyadh, Saudi Arabia", "experienceLevel": "Mid", "isActive": True},
    {"title": "Operations Manager – F&B", "company": "Crescent Hospitality Group", "description": "Oversee daily operations of multiple restaurant branches. Manage inventory, staff scheduling, supplier relationships, and quality standards.", "requiredSkills": ["P&L Management", "Staff Training", "Inventory Control", "HACCP", "POS Systems"], "salaryMin": 6000, "salaryMax": 9500, "jobType": "Full-time", "location": "Dubai, UAE", "experienceLevel": "Senior", "isActive": True},
    {"title": "UX/UI Designer", "company": "Pixel & Curve Studio", "description": "Design intuitive interfaces for web and mobile products. Conduct user research, create wireframes, build interactive prototypes, and collaborate with development.", "requiredSkills": ["Figma", "User Research", "Prototyping", "Design Systems", "Accessibility"], "salaryMin": 5000, "salaryMax": 8500, "jobType": "Full-time", "location": "Cairo, Egypt", "experienceLevel": "Mid", "isActive": True},
    {"title": "Real Estate Investment Analyst", "company": "Empower Properties LLC", "description": "Evaluate residential and commercial investment opportunities across MENA. Build financial models, conduct due diligence, and support acquisition decisions.", "requiredSkills": ["Financial Modeling", "Excel", "Market Analysis", "ARGUS", "Due Diligence"], "salaryMin": 9000, "salaryMax": 16000, "jobType": "Full-time", "location": "Abu Dhabi, UAE", "experienceLevel": "Senior", "isActive": True},
    {"title": "Sales Executive – SaaS", "company": "CloudStack Solutions", "description": "Own the full sales cycle for a B2B SaaS platform. Prospect enterprise accounts, run demos, negotiate contracts, and consistently exceed quota.", "requiredSkills": ["CRM", "Outbound Sales", "SaaS", "Negotiation", "Pipeline Management"], "salaryMin": 4500, "salaryMax": 7000, "jobType": "Full-time", "location": "Istanbul, Turkey", "experienceLevel": "Mid", "isActive": True},
    {"title": "Data Scientist", "company": "Insightify Analytics", "description": "Develop predictive models and data pipelines to drive business decisions. Work with large datasets, build ML models, and communicate insights to stakeholders.", "requiredSkills": ["Python", "Machine Learning", "SQL", "TensorFlow", "Tableau"], "salaryMin": 10000, "salaryMax": 17000, "jobType": "Full-time", "location": "Dubai, UAE", "experienceLevel": "Senior", "isActive": True},
    {"title": "Brand Manager", "company": "Mena Brand Collective", "description": "Develop and manage brand identity across product lines. Oversee campaigns, packaging, influencer partnerships, and consumer insights research.", "requiredSkills": ["Brand Strategy", "Consumer Insights", "Campaign Management", "Adobe Suite", "PR"], "salaryMin": 6500, "salaryMax": 10000, "jobType": "Full-time", "location": "Jeddah, Saudi Arabia", "experienceLevel": "Senior", "isActive": True},
    {"title": "Logistics Coordinator", "company": "FastTrack Freight", "description": "Coordinate shipments, manage carrier relationships, and optimize last-mile delivery for e-commerce clients. Ensure on-time SLAs and cost efficiency.", "requiredSkills": ["SAP", "Freight Management", "Customs Procedures", "Excel", "Supply Chain"], "salaryMin": 3800, "salaryMax": 5500, "jobType": "Full-time", "location": "Dubai, UAE", "experienceLevel": "Junior", "isActive": True},
    {"title": "Clinic Manager – Healthcare", "company": "MedPoint Clinics", "description": "Manage daily operations of a multi-specialty clinic. Handle staffing, patient experience, compliance, and financial performance.", "requiredSkills": ["Healthcare Ops", "HR Management", "Compliance", "Budgeting", "Patient Satisfaction"], "salaryMin": 7000, "salaryMax": 11000, "jobType": "Full-time", "location": "Abu Dhabi, UAE", "experienceLevel": "Senior", "isActive": True},
    {"title": "Content Creator & Videographer", "company": "Viral Frame Media", "description": "Produce high-quality video content for brands on Instagram, TikTok, and YouTube. Handle filming, editing, and content calendar management.", "requiredSkills": ["Video Editing", "Adobe Premiere", "DaVinci Resolve", "Scriptwriting", "Social Media"], "salaryMin": 3500, "salaryMax": 5500, "jobType": "Freelance", "location": "Beirut, Lebanon", "experienceLevel": "Mid", "isActive": True},
    {"title": "Financial Controller", "company": "NexGen Ventures", "description": "Lead financial reporting, budgeting, and compliance for a growing Group of companies. Work closely with the CFO on forecasting and investor relations.", "requiredSkills": ["IFRS", "Financial Reporting", "ERP Systems", "Forecasting", "Big 4 Background"], "salaryMin": 14000, "salaryMax": 22000, "jobType": "Full-time", "location": "Dubai, UAE", "experienceLevel": "Senior", "isActive": True},
    {"title": "HR Business Partner", "company": "PeopleFirst Consulting", "description": "Partner with business leaders to implement HR strategies. Handle talent acquisition, performance management, employee engagement, and policy compliance.", "requiredSkills": ["HR Strategy", "Talent Acquisition", "Performance Management", "Labor Law", "HRIS"], "salaryMin": 6000, "salaryMax": 9000, "jobType": "Full-time", "location": "Cairo, Egypt", "experienceLevel": "Mid", "isActive": True},
    {"title": "Product Manager – Mobile Apps", "company": "AppZone Middle East", "description": "Drive the product roadmap for a consumer mobile application with 500k+ MAU. Define features, work with engineering and design, and analyze user data.", "requiredSkills": ["Product Strategy", "Jira", "SQL", "User Research", "Agile"], "salaryMin": 9000, "salaryMax": 15000, "jobType": "Full-time", "location": "Dubai, UAE", "experienceLevel": "Senior", "isActive": True},
    {"title": "E-Commerce Manager", "company": "Shoparabia", "description": "Manage end-to-end e-commerce operations including platform management, product listings, pricing, customer experience, and performance analytics.", "requiredSkills": ["Shopify", "Google Analytics", "CRO", "Paid Ads", "Inventory Management"], "salaryMin": 5000, "salaryMax": 8000, "jobType": "Full-time", "location": "Riyadh, Saudi Arabia", "experienceLevel": "Mid", "isActive": True},
    {"title": "Architect – Commercial Projects", "company": "Blueprint Designs ME", "description": "Lead architectural design for large-scale commercial and hospitality projects. Coordinate with MEP teams, contractors, and clients from concept to completion.", "requiredSkills": ["AutoCAD", "Revit", "BIM", "Project Management", "Sustainable Design"], "salaryMin": 10000, "salaryMax": 16000, "jobType": "Full-time", "location": "Doha, Qatar", "experienceLevel": "Senior", "isActive": True},
    {"title": "Customer Success Manager", "company": "Retainly SaaS", "description": "Own post-sales customer relationships for enterprise SaaS accounts. Drive renewals, upsells, onboarding, and advocacy among a portfolio of high-value clients.", "requiredSkills": ["Account Management", "CRM", "Onboarding", "Retention Strategy", "Communication"], "salaryMin": 6000, "salaryMax": 9500, "jobType": "Full-time", "location": "Dubai, UAE", "experienceLevel": "Mid", "isActive": True},
    {"title": "Procurement Specialist", "company": "Gulf Supply Group", "description": "Source suppliers, negotiate contracts, and manage vendor relationships for a diversified trading group. Ensure quality, cost targets, and delivery timelines.", "requiredSkills": ["Procurement", "Vendor Management", "SAP MM", "Negotiation", "Supply Chain"], "salaryMin": 5000, "salaryMax": 7500, "jobType": "Full-time", "location": "Kuwait City, Kuwait", "experienceLevel": "Mid", "isActive": True},
    {"title": "Social Media Manager", "company": "Influence Arabia", "description": "Manage brand social media accounts across Instagram, TikTok, and LinkedIn. Create content calendars, run campaigns, track KPIs, and grow engaged communities.", "requiredSkills": ["Content Creation", "Community Management", "Analytics", "Canva", "Meta Business Suite"], "salaryMin": 3500, "salaryMax": 5500, "jobType": "Full-time", "location": "Amman, Jordan", "experienceLevel": "Junior", "isActive": True},
]

STARTUP_IDEAS = [
    {"title": "AI-Powered Menu Engineering Platform", "description": "SaaS tool for restaurant owners that analyzes sales data, customer reviews, and ingredient costs to automatically optimize menus — flagging low-margin dishes, suggesting seasonal updates, and A/B testing menu layouts to maximize revenue per cover.", "category": "Food & Beverage", "requiredBudget": 40000, "expectedReturn": 350, "riskLevel": "Medium", "stage": "Idea", "isFeatured": True},
    {"title": "Smart Solar Leasing for SMEs", "description": "Zero upfront solar installation for small and medium enterprises through a subscription model. Businesses pay a monthly fee lower than their current electricity bill, while the platform manages installation, maintenance, and monitoring via IoT sensors.", "category": "Clean Energy", "requiredBudget": 250000, "expectedReturn": 220, "riskLevel": "Medium", "stage": "Prototype", "isFeatured": True},
    {"title": "B2B Halal Certification SaaS", "description": "End-to-end digital platform that simplifies halal certification for food manufacturers and exporters. Automates documentation, connects with accredited certification bodies, tracks compliance, and generates country-specific export certificates.", "category": "Food Tech", "requiredBudget": 60000, "expectedReturn": 290, "riskLevel": "Low", "stage": "Idea", "isFeatured": False},
    {"title": "Urban Micro-Fulfillment Centers", "description": "Hyper-local warehousing pods (500–1,000 sqft) embedded in residential buildings and malls for same-day delivery. Brands rent shelf space and fulfillment ops, reducing last-mile delivery time from hours to under 30 minutes.", "category": "Logistics", "requiredBudget": 180000, "expectedReturn": 260, "riskLevel": "High", "stage": "Beta", "isFeatured": True},
    {"title": "Mental Health App for Arabic Speakers", "description": "Culturally adapted mental health platform offering anonymous therapy, guided meditation, and CBT programs in Arabic. Addresses the region's significant mental health stigma gap through community features and licensed Arabic-speaking therapists.", "category": "Health & Wellness", "requiredBudget": 75000, "expectedReturn": 310, "riskLevel": "Medium", "stage": "MVP", "isFeatured": True},
    {"title": "EdTech Platform for Vocational Skills", "description": "Online marketplace connecting vocational trainers (electricians, plumbers, AC technicians, barbers) with students seeking certified practical skills. Courses include video tutorials, in-person labs, and industry-recognized certificates.", "category": "Education", "requiredBudget": 55000, "expectedReturn": 270, "riskLevel": "Low", "stage": "Idea", "isFeatured": False},
    {"title": "Predictive Maintenance for HVAC Systems", "description": "IoT + AI solution that monitors commercial HVAC systems in real-time, predicts failures 2–4 weeks before they occur, and automatically dispatches certified technicians. Targets hotels, hospitals, and malls.", "category": "PropTech", "requiredBudget": 120000, "expectedReturn": 340, "riskLevel": "Medium", "stage": "Prototype", "isFeatured": True},
    {"title": "Circular Fashion Marketplace", "description": "Peer-to-peer platform for buying, selling, and renting designer fashion in the MENA region. Includes AI-powered authentication, condition grading, secure payments, and logistics. Captures the growing secondhand luxury segment.", "category": "Retail & Fashion", "requiredBudget": 90000, "expectedReturn": 280, "riskLevel": "Medium", "stage": "MVP", "isFeatured": False},
    {"title": "Ghost Kitchen Network", "description": "Shared commercial kitchen spaces that host 10–15 delivery-only restaurant brands per location. Operators get fully equipped kitchen stations, shared utilities, and built-in marketing on aggregator platforms — dramatically reducing restaurant startup costs.", "category": "Food & Beverage", "requiredBudget": 200000, "expectedReturn": 190, "riskLevel": "High", "stage": "Beta", "isFeatured": False},
    {"title": "Cross-Border Trade Finance Platform", "description": "Fintech platform providing working capital solutions (invoice factoring, trade credit, LC digitization) to SMEs engaged in intra-MENA and Africa trade. Uses alternative data scoring to underwrite businesses excluded by traditional banks.", "category": "Finance & Investment", "requiredBudget": 400000, "expectedReturn": 450, "riskLevel": "High", "stage": "Prototype", "isFeatured": True},
    {"title": "Senior Care Home Monitoring SaaS", "description": "Smart monitoring solution for assisted living facilities using bed sensors, wearables, and cameras (non-intrusive) to track health vitals, falls, and daily activity patterns. Alerts family members and staff via a mobile app.", "category": "Health & Wellness", "requiredBudget": 100000, "expectedReturn": 320, "riskLevel": "Medium", "stage": "MVP", "isFeatured": False},
    {"title": "SME Cybersecurity-as-a-Service", "description": "Affordable, managed cybersecurity for small and medium businesses — offering threat monitoring, employee phishing simulations, vulnerability scanning, and compliance reporting on a monthly subscription. No in-house IT expertise required.", "category": "Technology", "requiredBudget": 70000, "expectedReturn": 380, "riskLevel": "Low", "stage": "Beta", "isFeatured": True},
    {"title": "Agri-Tech Crop Intelligence Platform", "description": "Satellite imagery + IoT soil sensors platform for farmers to monitor crop health, predict irrigation needs, and access market price data. Sold via microSaaS subscriptions to agricultural cooperatives and large farms across Africa and MENA.", "category": "Agriculture", "requiredBudget": 160000, "expectedReturn": 300, "riskLevel": "High", "stage": "Prototype", "isFeatured": False},
]

CANDIDATES = [
    {"name": "Ahmed Al Rashidi", "title": "Senior Full-Stack Engineer", "skills": ["React", "Node.js", "PostgreSQL", "TypeScript", "AWS", "Docker"], "yearsExperience": 7, "bio": "7-year MENA tech veteran who has shipped products for fintech, e-commerce, and SaaS platforms. Led engineering at a Dubai-based Series A startup that scaled to 500k users.", "availability": "Available in 2 weeks", "monthlyRate": 12000, "location": "Dubai, UAE", "categories": ["Technology"]},
    {"name": "Sara Mahmoud", "title": "Digital Marketing Lead", "skills": ["Meta Ads", "Google Ads", "SEO", "Content Strategy", "Analytics", "Email Marketing"], "yearsExperience": 5, "bio": "Managed $3M+ in annual ad spend for consumer brands across Egypt, UAE, and Saudi Arabia. Specializes in performance marketing with a track record of 4x ROAS.", "availability": "Immediately available", "monthlyRate": 6500, "location": "Cairo, Egypt", "categories": ["Technology", "Retail & Fashion"]},
    {"name": "James Okonkwo", "title": "Operations & Supply Chain Manager", "skills": ["Logistics", "SAP", "Warehouse Management", "Procurement", "LEAN", "Six Sigma"], "yearsExperience": 9, "bio": "Oversaw logistics for 3 FMCG brands across West Africa, reducing delivery costs by 23% through route optimization and vendor consolidation. PMP certified.", "availability": "Available in 1 month", "monthlyRate": 9000, "location": "Lagos, Nigeria", "categories": ["Logistics & Supply Chain", "Retail & Fashion"]},
    {"name": "Nour Khalil", "title": "UX Designer & Design Lead", "skills": ["Figma", "User Research", "Prototyping", "Design Systems", "Usability Testing", "Framer"], "yearsExperience": 6, "bio": "Led design at a Beirut-based edtech platform with 200k users. Built a design system from scratch and drove a 40% improvement in onboarding completion rates.", "availability": "Immediately available", "monthlyRate": 7000, "location": "Beirut, Lebanon", "categories": ["Technology", "Education"]},
    {"name": "Rania Hassan", "title": "Financial Controller & CFO Advisor", "skills": ["IFRS", "Financial Modeling", "ERP", "Forecasting", "Investor Relations", "Big 4"], "yearsExperience": 12, "bio": "Former Big 4 auditor with 12 years transitioning into CFO advisory for growth-stage companies. Has supported 4 companies through fundraising rounds totaling $25M.", "availability": "Part-time available now", "monthlyRate": 18000, "location": "Riyadh, Saudi Arabia", "categories": ["Finance & Investment", "Professional Services"]},
    {"name": "Carlos Mendez", "title": "Growth & Sales Director", "skills": ["B2B Sales", "CRM", "Pipeline Management", "SaaS Sales", "Team Leadership", "Negotiations"], "yearsExperience": 10, "bio": "Scaled a B2B SaaS sales team from 3 to 25 reps, achieving 200% YoY revenue growth. Closed enterprise deals with Fortune 500 companies in EMEA.", "availability": "Available in 3 weeks", "monthlyRate": 14000, "location": "Istanbul, Turkey", "categories": ["Technology", "Professional Services"]},
    {"name": "Fatima Al Zahra", "title": "F&B Brand Manager & Chef Consultant", "skills": ["Menu Development", "Brand Strategy", "HACCP", "Franchise Management", "Marketing", "P&L"], "yearsExperience": 8, "bio": "Launched and scaled 3 restaurant concepts across UAE and Saudi Arabia. Specializes in franchise systems, brand consistency, and menu optimization for profitability.", "availability": "Immediately available", "monthlyRate": 10500, "location": "Dubai, UAE", "categories": ["Food & Beverage"]},
    {"name": "David Kowalski", "title": "Data Scientist & ML Engineer", "skills": ["Python", "TensorFlow", "SQL", "NLP", "Big Data", "Tableau", "Scikit-learn"], "yearsExperience": 6, "bio": "Built recommendation engines and fraud detection models for a Polish fintech company. MSc in Data Science from Warsaw University. Trilingual: English, Polish, German.", "availability": "Available in 1 month", "monthlyRate": 11000, "location": "Warsaw, Poland", "categories": ["Technology", "Finance & Investment"]},
    {"name": "Layla Benali", "title": "HR Director & Talent Strategist", "skills": ["Talent Acquisition", "Performance Management", "Labor Law", "HRIS", "Employer Branding", "OKRs"], "yearsExperience": 11, "bio": "Built HR functions from scratch for 3 startups in Morocco and France, including one acquired for €40M. Fluent in Arabic, French, and English.", "availability": "Available in 2 weeks", "monthlyRate": 9500, "location": "Casablanca, Morocco", "categories": ["Professional Services"]},
    {"name": "Patrick Osei", "title": "Real Estate Analyst & Investment Manager", "skills": ["Financial Modeling", "Market Research", "ARGUS", "Due Diligence", "Asset Management", "Excel"], "yearsExperience": 7, "bio": "Managed a $120M commercial real estate portfolio across Ghana and Nigeria. Specializes in mixed-use developments and retail asset valuations.", "availability": "Immediately available", "monthlyRate": 12000, "location": "Accra, Ghana", "categories": ["Real Estate"]},
    {"name": "Mia Chen", "title": "E-Commerce & Marketplace Manager", "skills": ["Shopify", "Amazon Seller Central", "CRO", "PPC", "Google Shopping", "Customer Retention"], "yearsExperience": 5, "bio": "Grew a DTC health brand from $0 to $3M revenue in 18 months through Amazon and Shopify. Expert in conversion rate optimization and cross-border e-commerce.", "availability": "Available in 1 month", "monthlyRate": 7500, "location": "Singapore", "categories": ["Retail & Fashion", "Technology"]},
    {"name": "Khalid Al Tamimi", "title": "Construction Project Manager", "skills": ["AutoCAD", "Primavera P6", "MS Project", "Contract Management", "Risk Management", "BIM"], "yearsExperience": 15, "bio": "Delivered $400M+ in infrastructure and commercial projects across Saudi Arabia, UAE, and Qatar. PMP and CIOB certified. Expert in FIDIC contracts.", "availability": "Available in 1 month", "monthlyRate": 16000, "location": "Riyadh, Saudi Arabia", "categories": ["Real Estate"]},
]


def seed_if_empty():
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT COUNT(*) FROM categories")
            cat_count = cur.fetchone()[0]

            if cat_count > 0:
                print(f"[seed] Database already seeded ({cat_count} categories). Skipping.", flush=True)
                return

            print("[seed] Seeding database...", flush=True)

            cur.execute("DELETE FROM analyses")
            cur.execute("DELETE FROM projects")
            cur.execute("DELETE FROM applications")
            cur.execute("DELETE FROM jobs")
            cur.execute("DELETE FROM startup_ideas")
            cur.execute("DELETE FROM candidates")
            cur.execute("DELETE FROM locations")
            cur.execute("DELETE FROM categories")

            cat_ids = {}
            for c in CATEGORIES:
                cur.execute(
                    "INSERT INTO categories (name, description, icon) VALUES (%s, %s, %s) RETURNING id",
                    (c["name"], c["description"], c["icon"])
                )
                row = cur.fetchone()
                cat_ids[c["name"]] = row[0]

            seen_locations = set()
            for loc in LOCATIONS:
                key = f"{loc[0]}|{loc[1]}"
                if key not in seen_locations:
                    cur.execute(
                        'INSERT INTO locations (city, country, region, "sizeCategory") VALUES (%s, %s, %s, %s)',
                        loc
                    )
                    seen_locations.add(key)

            for job in JOBS:
                cur.execute(
                    '''INSERT INTO jobs (title, company, description, "requiredSkills", "salaryMin", "salaryMax", "jobType", location, "experienceLevel", "isActive")
                       VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)''',
                    (job["title"], job["company"], job["description"],
                     json.dumps(job["requiredSkills"]),
                     job["salaryMin"], job["salaryMax"], job["jobType"],
                     job["location"], job["experienceLevel"], job["isActive"])
                )

            for idea in STARTUP_IDEAS:
                cur.execute(
                    '''INSERT INTO startup_ideas (title, description, category, "requiredBudget", "expectedReturn", "riskLevel", stage, "isFeatured")
                       VALUES (%s, %s, %s, %s, %s, %s, %s, %s)''',
                    (idea["title"], idea["description"], idea["category"],
                     idea["requiredBudget"], idea["expectedReturn"],
                     idea["riskLevel"], idea["stage"], idea["isFeatured"])
                )

            for cand in CANDIDATES:
                cur.execute(
                    '''INSERT INTO candidates (name, title, skills, "yearsExperience", bio, availability, "monthlyRate", location, categories)
                       VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)''',
                    (cand["name"], cand["title"],
                     json.dumps(cand["skills"]),
                     cand["yearsExperience"], cand["bio"],
                     cand["availability"], cand["monthlyRate"],
                     cand["location"], json.dumps(cand["categories"]))
                )

            conn.commit()
            print(f"[seed] Done. Seeded {len(CATEGORIES)} categories, {len(seen_locations)} locations, {len(JOBS)} jobs, {len(STARTUP_IDEAS)} startup ideas, {len(CANDIDATES)} candidates.", flush=True)

    except Exception as e:
        conn.rollback()
        print(f"[seed] Error during seeding: {e}", flush=True, file=sys.stderr)
    finally:
        conn.close()
