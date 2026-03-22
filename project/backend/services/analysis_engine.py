import json
from dataclasses import dataclass
from data.competitors import get_competitors_for_business
from data.city_data import get_city_data, get_zones_by_business_type

HIGH_DEMAND_KEYWORDS = [
    "food", "restaurant", "cafe", "delivery", "health", "fitness", "gym",
    "tech", "software", "app", "digital", "online", "e-commerce", "education",
    "beauty", "salon", "retail", "fashion", "consulting", "finance", "cleaning",
    "logistics", "healthcare", "medical", "pharmacy", "grocery", "coffee", "beverage",
    "skincare", "cosmetic", "clothing", "apparel", "travel", "tourism", "training",
]

HIGH_COMPETITION_KEYWORDS = [
    "restaurant", "coffee", "cafe", "gym", "fitness", "salon", "beauty",
    "retail", "fashion", "food", "delivery", "e-commerce", "consulting",
    "travel", "pharmacy", "clothing", "cosmetic",
]

LOW_COMPETITION_KEYWORDS = [
    "niche", "specialized", "unique", "innovative", "patent", "proprietary",
    "exclusive", "custom", "bespoke", "artisan", "boutique", "handmade", "organic",
]


@dataclass
class AnalysisInput:
    businessType: str
    description: str
    budget: float
    targetAudience: str
    productsOrServices: str
    categoryName: str
    locationSizeCategory: str
    city: str
    country: str


@dataclass
class AnalysisResult:
    successScore: int
    riskLevel: str
    marketDemand: str
    competitionLevel: str
    estimatedRevenueMin: int
    estimatedRevenueMax: int
    explanation: str
    marketAnalysis: str
    pricingStrategy: str
    marketingPlan: str
    brandingSuggestions: str
    hiringNeeds: str
    competitors: str
    bestLocations: str


def _calculate_market_demand(inp: AnalysisInput) -> tuple[str, int]:
    text = f"{inp.businessType} {inp.categoryName} {inp.description} {inp.productsOrServices}".lower()
    score = 50

    high_matches = sum(1 for k in HIGH_DEMAND_KEYWORDS if k in text)
    score += high_matches * 7

    if inp.locationSizeCategory == "metro":
        score += 15
    elif inp.locationSizeCategory == "large":
        score += 10
    elif inp.locationSizeCategory == "medium":
        score += 5
    else:
        score -= 5

    bt = inp.businessType.lower()
    if "food delivery" in bt or "café" in bt or "coffee" in bt:
        score += 12
    if "tech" in bt or "saas" in bt or "digital" in bt:
        score += 10
    if "healthcare" in bt or "clinic" in bt or "pharmacy" in bt:
        score += 8
    if "education" in bt or "training" in bt:
        score += 6

    score = min(100, max(0, score))

    if score >= 75:
        demand = "Very High"
    elif score >= 55:
        demand = "High"
    elif score >= 35:
        demand = "Medium"
    else:
        demand = "Low"

    return demand, score


def _calculate_competition(inp: AnalysisInput) -> tuple[str, int]:
    text = f"{inp.businessType} {inp.categoryName} {inp.description} {inp.productsOrServices}".lower()
    score = 50

    high_matches = sum(1 for k in HIGH_COMPETITION_KEYWORDS if k in text)
    score += high_matches * 6

    low_matches = sum(1 for k in LOW_COMPETITION_KEYWORDS if k in text)
    score -= low_matches * 12

    if inp.locationSizeCategory == "metro":
        score += 15
    elif inp.locationSizeCategory == "large":
        score += 8
    elif inp.locationSizeCategory == "small":
        score -= 10

    score = min(100, max(0, score))

    if score >= 75:
        competition = "Very High"
    elif score >= 55:
        competition = "High"
    elif score >= 35:
        competition = "Medium"
    else:
        competition = "Low"

    return competition, score


def _estimate_revenue(budget: float, demand_score: int, competition_score: int, business_type: str) -> tuple[int, int]:
    demand_multiplier = demand_score / 50
    competition_penalty = (100 - competition_score) / 100

    base_rate = 0.15
    bt = business_type.lower()
    if "saas" in bt or "tech" in bt or "software" in bt:
        base_rate = 0.25
    elif "consulting" in bt or "real estate" in bt:
        base_rate = 0.20
    elif "restaurant" in bt or "café" in bt or "food" in bt:
        base_rate = 0.12
    elif "logistics" in bt or "delivery" in bt:
        base_rate = 0.10

    base_monthly = budget * base_rate * demand_multiplier * competition_penalty
    min_rev = round(max(500, base_monthly * 0.7) / 100) * 100
    max_rev = round(max(1000, base_monthly * 1.4) / 100) * 100

    return int(min_rev), int(max_rev)


def _generate_explanation(inp: AnalysisInput, score: int, risk: str, demand: str, competition: str) -> str:
    city = inp.city or "your target city"
    country = f", {inp.country}" if inp.country else ""

    if inp.budget >= 1_000_000:
        budget_str = f"${inp.budget / 1_000_000:.1f}M"
    elif inp.budget >= 1000:
        budget_str = f"${round(inp.budget / 1000)}K"
    else:
        budget_str = f"${inp.budget:.0f}"

    outlook = "strong" if score >= 70 else "moderate" if score >= 50 else "challenging"

    if risk == "Low":
        risk_note = "Your budget level and market positioning significantly minimize financial exposure."
    elif risk == "Medium":
        risk_note = "Moderate risk factors exist — careful launch planning and phased investment will be key."
    else:
        risk_note = "Elevated risk profile requires strategic mitigation: tighter cost control, phased rollout, and strong differentiation."

    products_note = f" Your core offering — {inp.productsOrServices} — targets a {demand.lower()} demand segment." if inp.productsOrServices else ""

    return (
        f"{inp.businessType} shows {outlook} viability in the {inp.categoryName} sector within {city}{country}. "
        f"With a capital allocation of {budget_str}, market demand is {demand.lower()} and competitive pressure is {competition.lower()}. "
        f"The feasibility score of {score}/100 reflects these combined market dynamics.{products_note} "
        f"{risk_note} "
        f"Success hinges on differentiated positioning, early brand trust-building, "
        f"and precise alignment with your primary segment: {inp.targetAudience}."
    )


def _generate_market_analysis(inp: AnalysisInput, demand: str, competition: str, competitors: list) -> str:
    city = inp.city or "the selected location"

    if inp.locationSizeCategory == "metro":
        location_note = f"{city} is a major metropolitan market offering a massive addressable customer base, but also attracting well-funded established players."
    elif inp.locationSizeCategory == "large":
        location_note = f"{city} provides sufficient population density and consumer spending capacity for sustainable business growth."
    else:
        location_note = f"{city} presents a focused opportunity with less saturation — ideal for building a loyal core base before scaling."

    if competition in ("Low", "Medium"):
        competition_note = "a favorable window exists to capture market share before the space matures"
    else:
        competition_note = "strong differentiation and execution speed are critical to carve out a defensible position"

    competitor_insight = ""
    if competitors:
        top = competitors[0]
        competitor_insight = f"The dominant player, {top['name']} ({top['type']}), is strong in {top['strength'].split(',')[0].lower()} — but exposed in {top['weakness'].split(',')[0].lower()}, which is your entry opportunity."

    products_context = f" Consumer appetite for {inp.productsOrServices} in this market is driven by evolving lifestyle preferences and rising disposable income." if inp.productsOrServices else ""

    return (
        f"The {inp.categoryName} sector in {city} demonstrates {demand.lower()} consumer demand. {location_note} "
        f"Competition intensity is {competition.lower()}, indicating that {competition_note}. "
        f"{competitor_insight}{products_context} "
        f"Your target segment — \"{inp.targetAudience}\" — aligns with documented spending growth patterns "
        f"in this vertical, suggesting real and monetizable demand."
    )


def _generate_pricing_strategy(inp: AnalysisInput, competition: str) -> str:
    is_high_budget = inp.budget >= 50000
    premium_keywords = ["technology", "consulting", "healthcare", "luxury", "real estate"]
    is_premium = any(k in inp.categoryName.lower() or k in inp.businessType.lower() for k in premium_keywords)
    products_ref = f"for your {inp.productsOrServices}" if inp.productsOrServices else ""

    if is_premium or is_high_budget:
        return (
            f"Adopt a value-based pricing model {products_ref} that positions {inp.businessType} in the premium tier. "
            f"Price 15–30% above market average to signal quality, expertise, and exclusivity. "
            f"Structure tiered service packages (Essential, Professional, Enterprise) to capture multiple segments simultaneously. "
            f"Introductory pricing for the first 90 days can accelerate initial acquisition without permanently anchoring price expectations downward. "
            f"Target lifetime value (LTV) should exceed customer acquisition cost (CAC) by at least 3:1 within month 6."
        )

    if competition in ("High", "Very High"):
        return (
            f"Given the competitive landscape {products_ref}, a penetration-pricing approach is recommended at launch. "
            f"Open 10–15% below the prevailing market rate to generate initial traction and word-of-mouth. "
            f"Bundle complementary products/services to increase perceived value while protecting unit margins. "
            f"After 90 days, begin incremental price normalization as your brand recognition builds. "
            f"Loyalty and subscription programs are critical here — they lock in recurring revenue while reducing churn risk in price-sensitive markets."
        )

    return (
        f"A market-rate pricing strategy is appropriate for {products_ref or 'your offering'}. "
        f"Price competitively at category benchmarks while highlighting specific differentiators. "
        f"Consider subscription or membership models to generate predictable monthly recurring revenue. "
        f"Dynamic seasonal pricing during peak periods can improve yield without eroding everyday price perception. "
        f"Build in a clear upsell path — at least one complementary add-on that increases average order value by 20–35%."
    )


def _generate_marketing_plan(inp: AnalysisInput) -> str:
    products_ref = f"your {inp.productsOrServices}" if inp.productsOrServices else inp.businessType
    city = inp.city or "your target city"
    ta_lower = inp.targetAudience.lower()

    if "student" in ta_lower or "young" in ta_lower:
        channels = "TikTok and Instagram Reels"
    elif "b2b" in ta_lower or "professional" in ta_lower:
        channels = "LinkedIn and Google Search"
    elif "senior" in ta_lower or "family" in ta_lower:
        channels = "Facebook and Google Maps"
    else:
        channels = "Instagram, Google, and TikTok"

    return (
        f"Phase 1 — Launch (Months 1–2): Build a professional presence. Claim and optimize your Google Business profile for {city}. "
        f"Activate {channels} with content showcasing {products_ref}. Launch a referral program with a clear incentive (e.g., 15% off next purchase). "
        f"Run a geo-targeted opening campaign covering a 5km radius around your primary location. "
        f"Phase 2 — Growth (Months 3–6): Scale paid channels with a budget of 8–12% of monthly revenue on Meta/Google Ads. "
        f"Partner with 3–5 local micro-influencers (10k–100k followers) in the {inp.categoryName} space for authentic endorsements. "
        f"Launch weekly educational or behind-the-scenes content to build brand trust and category authority. "
        f"Phase 3 — Retention (Month 6+): Implement a CRM to track customer lifetime value and purchase patterns. "
        f"Introduce a loyalty rewards program with tiered benefits. "
        f"Collect 50+ verified reviews on Google by month 6 — reviews are the #1 local discovery signal. "
        f"Retarget website visitors with personalized offers and abandoned-cart sequences (for e-commerce)."
    )


def _generate_branding(inp: AnalysisInput) -> str:
    positioning = "premium, trustworthy market leader" if inp.budget >= 100000 else "approachable, value-forward community brand"
    products_ref = f"around {inp.productsOrServices}" if inp.productsOrServices else ""
    ta_lower = inp.targetAudience.lower()

    if "luxury" in ta_lower:
        msg_focus = "prestige, exclusivity, and craft"
    elif "student" in ta_lower:
        msg_focus = "value, speed, and community"
    elif "professional" in ta_lower:
        msg_focus = "efficiency, credibility, and ROI"
    else:
        msg_focus = "reliability, quality, and belonging"

    return (
        f"Brand Identity: Position {inp.businessType} {products_ref} as a {positioning} in the {inp.categoryName} space. "
        f"Visual System: Design a clean, memorable logo using 2–3 brand colors tied to your category's emotional cues "
        f"(trust = blue/green, energy = orange/red, luxury = black/gold). "
        f"Typography: pair a bold display font for headlines with a readable sans-serif for body copy. "
        f"Brand Voice: Communicate with confident warmth — knowledgeable but human. "
        f"Your audience \"{inp.targetAudience}\" responds to messaging that emphasizes {msg_focus}. "
        f"Differentiators: Lead with your 3 strongest unique selling points — superior product quality, localized expertise, "
        f"exceptional service — and be consistent across all touchpoints: storefront, packaging, digital channels, and staff."
    )


def _generate_hiring(inp: AnalysisInput) -> str:
    bt = inp.businessType.lower()
    cat = inp.categoryName.lower()
    is_large = inp.budget >= 100000
    is_tech = any(k in bt or k in cat for k in ["tech", "software", "saas"])
    is_food = any(k in bt for k in ["restaurant", "café", "food"])
    is_health = any(k in bt or k in cat for k in ["clinic", "health"])

    if is_food:
        core_roles = "Head Chef / Kitchen Manager, Floor Manager, 2–4 Service Staff, Delivery Coordinator"
        specialty = " Consider a Social Media Manager specifically for food content — visual F&B content drives 40% higher engagement on Instagram."
    elif is_health:
        core_roles = "Clinic Director, 1–2 Specialist Practitioners, Receptionist & Scheduling Coordinator, Billing Specialist"
        specialty = " You'll also need a Compliance Officer familiar with local health authority regulations from day one."
    elif is_tech:
        core_roles = "Product Manager, 2 Full-Stack Developers, UX/UI Designer, DevOps Engineer"
        specialty = " A dedicated Customer Success Manager will be critical post-launch to reduce churn and gather product feedback."
    elif is_large:
        core_roles = "Operations Manager, Sales Lead, Marketing Coordinator, Customer Service Team (2–3 staff)"
        specialty = ""
    else:
        core_roles = "Generalist Operations Lead, Part-time Sales/Customer Support, Social Media Coordinator"
        specialty = ""

    return (
        f"Priority hires (first 3 months): {core_roles}.{specialty} "
        f"Scale-up hires (months 4–12): As revenue stabilizes above break-even, add a dedicated {inp.categoryName} "
        f"specialist, a Financial Analyst for reporting and forecasting, and an HR Coordinator once your team exceeds 8–10 people. "
        f"Compensation strategy: Offer base salaries 5–10% above local market rate to attract quality talent, "
        f"plus performance incentives tied to revenue milestones. For specialized roles, "
        f"consider project-based contractors (graphic design, legal, accounting) in the first 6 months to preserve runway. "
        f"Build a culture of accountability and clear KPIs from day one — it's significantly harder to retrofit systems later."
    )


def run_analysis(inp: AnalysisInput) -> AnalysisResult:
    demand, demand_score = _calculate_market_demand(inp)
    competition, competition_score = _calculate_competition(inp)

    success_score = 40
    success_score += (demand_score - 50) * 0.4
    success_score -= (competition_score - 50) * 0.3

    if inp.budget >= 100000:
        success_score += 20
    elif inp.budget >= 50000:
        success_score += 12
    elif inp.budget >= 20000:
        success_score += 6
    elif inp.budget < 5000:
        success_score -= 10

    if inp.locationSizeCategory == "metro":
        success_score += 5
    elif inp.locationSizeCategory == "small":
        success_score -= 5

    desc_len = len(inp.description + inp.productsOrServices)
    if desc_len > 200:
        success_score += 5
    elif desc_len < 50:
        success_score -= 5

    if len(inp.productsOrServices) > 20:
        success_score += 4

    success_score = int(min(97, max(12, round(success_score))))

    if success_score >= 70:
        risk_level = "Low"
    elif success_score >= 45:
        risk_level = "Medium"
    else:
        risk_level = "High"

    rev_min, rev_max = _estimate_revenue(inp.budget, demand_score, competition_score, inp.businessType)

    competitors = get_competitors_for_business(inp.businessType, inp.categoryName)
    city_info = get_city_data(inp.city)

    if city_info:
        best_zones = get_zones_by_business_type(city_info["zones"], inp.businessType)
        location_payload = {
            "cityLat": city_info["lat"],
            "cityLng": city_info["lng"],
            "cityName": city_info["city"],
            "zones": best_zones,
        }
    else:
        location_payload = {
            "cityLat": 25.2048,
            "cityLng": 55.2708,
            "cityName": inp.city,
            "zones": [],
        }

    return AnalysisResult(
        successScore=success_score,
        riskLevel=risk_level,
        marketDemand=demand,
        competitionLevel=competition,
        estimatedRevenueMin=rev_min,
        estimatedRevenueMax=rev_max,
        explanation=_generate_explanation(inp, success_score, risk_level, demand, competition),
        marketAnalysis=_generate_market_analysis(inp, demand, competition, competitors),
        pricingStrategy=_generate_pricing_strategy(inp, competition),
        marketingPlan=_generate_marketing_plan(inp),
        brandingSuggestions=_generate_branding(inp),
        hiringNeeds=_generate_hiring(inp),
        competitors=json.dumps(competitors),
        bestLocations=json.dumps(location_payload),
    )
